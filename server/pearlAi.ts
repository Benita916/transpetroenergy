import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { PEARL_SYSTEM_INSTRUCTION } from './pearlKnowledge.ts';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface PearlAiStatus {
  configured: boolean;
  provider: 'gemini' | 'openai';
  model: string;
  missingVariables: string[];
}

export class PearlAiError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = 'PearlAiError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

function getConfiguredProvider(): 'gemini' | 'openai' {
  const raw = (process.env.AI_PROVIDER || 'gemini').trim().toLowerCase();
  return raw === 'openai' ? 'openai' : 'gemini';
}

function getConfiguredModel(provider: 'gemini' | 'openai'): string {
  const custom = process.env.AI_MODEL?.trim();
  if (custom) {
    return custom;
  }
  return provider === 'openai' ? 'gpt-4o-mini' : 'gemini-4-hydrogen';
}

export function getPearlAiStatus(): PearlAiStatus {
  const provider = getConfiguredProvider();
  const model = getConfiguredModel(provider);

  if (provider === 'openai') {
    const hasKey = Boolean(process.env.OPENAI_API_KEY?.trim());
    return {
      configured: hasKey,
      provider,
      model,
      missingVariables: hasKey ? [] : ['OPENAI_API_KEY'],
    };
  }

  const hasKey = Boolean(process.env.GEMINI_API_KEY?.trim());
  return {
    configured: hasKey,
    provider,
    model,
    missingVariables: hasKey ? [] : ['GEMINI_API_KEY'],
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGeminiProvider(
  model: string,
  history: ChatTurn[],
  userMessage: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new PearlAiError(
      'Pearl AI service is not yet configured on this server.',
      503,
      'AI_NOT_CONFIGURED'
    );
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const contents = [
    ...history.map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: turn.content }],
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }],
    },
  ];

  const candidateModels =
    !process.env.AI_MODEL?.trim() && model === 'gemini-4-hydrogen'
      ? [model, 'gemini-3.1-flash-lite']
      : [model];

  let lastError: unknown;
  for (const activeModel of candidateModels) {
    const useLowThinking = activeModel.startsWith('gemini-4-');

    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await ai.models.generateContent({
          model: activeModel,
          contents,
          config: {
            systemInstruction: PEARL_SYSTEM_INSTRUCTION,
            ...(useLowThinking
              ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
          },
        });

        const replyText = response.text?.trim();
        if (!replyText) {
          throw new PearlAiError(
            'Pearl received an empty response from the AI service. Please try rephrasing your question.',
            502,
            'EMPTY_AI_RESPONSE'
          );
        }

        return replyText;
      } catch (err) {
        lastError = err;
        const errStatus =
          typeof err === 'object' && err !== null && 'status' in err
            ? Number((err as { status?: unknown }).status)
            : undefined;
        const errMsg = err instanceof Error ? err.message : String(err);

        if (
          errStatus === 401 ||
          errStatus === 403 ||
          errMsg.includes('API_KEY_INVALID') ||
          errMsg.includes('API key not valid') ||
          errMsg.includes('PERMISSION_DENIED')
        ) {
          throw new PearlAiError(
            'The configured AI provider key was rejected. Please verify GEMINI_API_KEY in your server environment or Settings > Secrets.',
            502,
            'AI_AUTH_ERROR'
          );
        }

        if (errStatus === 404 || errMsg.includes('NOT_FOUND')) {
          throw new PearlAiError(
            'The configured AI model is unavailable. Please contact our team directly while the configuration is updated.',
            502,
            'AI_MODEL_UNAVAILABLE'
          );
        }

        const isTransientOverload =
          errStatus === 503 ||
          errStatus === 429 ||
          errMsg.includes('UNAVAILABLE') ||
          errMsg.includes('RESOURCE_EXHAUSTED');

        if (isTransientOverload) {
          if (attempt === 0) {
            await sleep(700);
            continue;
          }
          // Try next fallback model in candidateModels if available
          break;
        }

        if (attempt === 0) {
          await sleep(500);
        }
      }
    }
  }

  if (lastError instanceof PearlAiError) {
    throw lastError;
  }

  const lastStatus =
    typeof lastError === 'object' && lastError !== null && 'status' in lastError
      ? Number((lastError as { status?: unknown }).status)
      : undefined;

  if (lastStatus === 429 || lastStatus === 503) {
    throw new PearlAiError(
      'Pearl is momentarily experiencing high AI service demand. Please try again in a moment, or submit a Business Enquiry directly.',
      503,
      'AI_TEMPORARILY_UNAVAILABLE'
    );
  }

  throw new PearlAiError(
    'Pearl is temporarily unable to connect to the AI service. Please try again shortly or reach Transpetro Energy directly.',
    502,
    'AI_UPSTREAM_ERROR'
  );
}

async function callOpenAiProvider(
  model: string,
  history: ChatTurn[],
  userMessage: string
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new PearlAiError(
      'Pearl AI service is not yet configured on this server.',
      503,
      'AI_NOT_CONFIGURED'
    );
  }

  const messages = [
    { role: 'system', content: PEARL_SYSTEM_INSTRUCTION },
    ...history.map((turn) => ({
      role: turn.role,
      content: turn.content,
    })),
    { role: 'user', content: userMessage },
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 600,
    }),
  });

  if (response.status === 401 || response.status === 403) {
    throw new PearlAiError(
      'The configured AI provider rejected authentication. Please contact the Transpetro Energy team directly while this is resolved.',
      502,
      'AI_AUTH_ERROR'
    );
  }

  if (response.status === 429) {
    throw new PearlAiError(
      'Pearl is currently experiencing high demand. Please wait a moment and try again.',
      429,
      'AI_RATE_LIMITED'
    );
  }

  if (!response.ok) {
    throw new PearlAiError(
      'Pearl is temporarily unable to connect to the AI service. Please try again shortly.',
      502,
      'AI_UPSTREAM_ERROR'
    );
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const replyText = payload.choices?.[0]?.message?.content?.trim();

  if (!replyText) {
    throw new PearlAiError(
      'Pearl received an empty response from the AI service. Please try rephrasing your question.',
      502,
      'EMPTY_AI_RESPONSE'
    );
  }

  return replyText;
}

export async function generatePearlReply(
  history: ChatTurn[],
  userMessage: string
): Promise<{ reply: string; provider: 'gemini' | 'openai'; model: string }> {
  const status = getPearlAiStatus();
  if (!status.configured) {
    throw new PearlAiError(
      'Pearl live AI conversations require server-side AI credentials to be configured. You can still submit a business enquiry below or contact Transpetro Energy directly.',
      503,
      'AI_NOT_CONFIGURED'
    );
  }

  const reply =
    status.provider === 'openai'
      ? await callOpenAiProvider(status.model, history, userMessage)
      : await callGeminiProvider(status.model, history, userMessage);

  return {
    reply,
    provider: status.provider,
    model: status.model,
  };
}
