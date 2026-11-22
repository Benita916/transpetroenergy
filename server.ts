import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_ENQUIRY_TYPES = new Set([
  'Product Supply',
  'Bulk Diesel Purchase',
  'Export Enquiry',
  'Business Partnership',
  'General Enquiry',
]);

interface EnquiryRecord {
  referenceId: string;
  receivedAt: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  delivered: boolean;
}

const recentEnquiries: EnquiryRecord[] = [];
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim()
  );
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  return true;
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, maxLength);
}

function generateReferenceId(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `TEL-${datePart}-${randomPart}`;
}

async function startServer() {
  const app = express();
  const isProduction = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT) || 3000;

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use(express.json({ limit: '16kb' }));

  app.get('/api/enquiries/status', (_req: Request, res: Response) => {
    res.json({
      emailConfigured: isSmtpConfigured(),
      recipientEmail: 'info.moore@transpetroenergy.org',
    });
  });

  app.post('/api/enquiries', async (req: Request, res: Response) => {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      res.status(429).json({
        ok: false,
        error: 'Too many enquiries submitted from this connection. Please wait a few minutes or contact us directly by phone or email.',
      });
      return;
    }

    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const fullName = sanitizeText(body.fullName, 120);
    const companyName = sanitizeText(body.companyName, 160);
    const email = sanitizeText(body.email, 160);
    const phone = sanitizeText(body.phone, 40);
    const enquiryType = sanitizeText(body.enquiryType, 80);
    const message = sanitizeText(body.message, 3000);

    const fieldErrors: Record<string, string> = {};

    if (fullName.length < 2) {
      fieldErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = 'Please enter a valid business or personal email address.';
    }
    if (phone.length < 7 || !/^[0-9+\-\s()]{7,40}$/.test(phone)) {
      fieldErrors.phone = 'Please enter a valid contact telephone number.';
    }
    if (!ALLOWED_ENQUIRY_TYPES.has(enquiryType)) {
      fieldErrors.enquiryType = 'Please select a valid enquiry category.';
    }
    if (message.length < 15) {
      fieldErrors.message = 'Please provide sufficient details regarding your enquiry (at least 15 characters).';
    }

    if (Object.keys(fieldErrors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Please review the highlighted fields and try again.',
        fieldErrors,
      });
      return;
    }

    const referenceId = generateReferenceId();
    const receivedAt = new Date().toISOString();

    if (!isSmtpConfigured()) {
      recentEnquiries.unshift({
        referenceId,
        receivedAt,
        fullName,
        companyName,
        email,
        phone,
        enquiryType,
        message,
        delivered: false,
      });
      if (recentEnquiries.length > 50) {
        recentEnquiries.pop();
      }

      res.status(200).json({
        ok: true,
        delivered: false,
        mode: 'email_not_configured',
        referenceId,
        receivedAt,
        message:
          'Your enquiry passed validation and was assigned a reference number, but outbound email delivery (SMTP) is not yet configured on this server. No email has been dispatched to Transpetro Energy Limited.',
      });
      return;
    }

    try {
      const smtpPort = Number(process.env.SMTP_PORT) || 587;
      const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipient = process.env.ENQUIRY_RECIPIENT_EMAIL?.trim() || 'info.moore@transpetroenergy.org';
      const sender = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER;

      await transporter.sendMail({
        from: `"Transpetro Energy Website" <${sender}>`,
        to: recipient,
        replyTo: email,
        subject: `[${referenceId}] ${enquiryType} — ${fullName}${companyName ? ` (${companyName})` : ''}`,
        text: [
          `Reference ID: ${referenceId}`,
          `Received: ${receivedAt}`,
          `Enquiry Type: ${enquiryType}`,
          `Full Name: ${fullName}`,
          `Company Name: ${companyName || 'Not provided'}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      });

      recentEnquiries.unshift({
        referenceId,
        receivedAt,
        fullName,
        companyName,
        email,
        phone,
        enquiryType,
        message,
        delivered: true,
      });
      if (recentEnquiries.length > 50) {
        recentEnquiries.pop();
      }

      res.status(200).json({
        ok: true,
        delivered: true,
        mode: 'smtp_dispatched',
        referenceId,
        receivedAt,
        message: 'Your enquiry has been transmitted to Transpetro Energy Limited.',
      });
    } catch {
      res.status(502).json({
        ok: false,
        error:
          'We were unable to dispatch your enquiry via the configured mail server. Please contact Transpetro Energy Limited directly by email or telephone.',
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { maxAge: '7d' }));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      const indexHtml = path.join(distPath, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Application build not found.');
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Transpetro Energy Limited server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
