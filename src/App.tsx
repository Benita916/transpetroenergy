/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { MarketsPage } from './pages/MarketsPage';
import { ProductsServicesPage } from './pages/ProductsServicesPage';
import { SupplyLogisticsPage } from './pages/SupplyLogisticsPage';
import { WhyChooseUsPage } from './pages/WhyChooseUsPage';

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-[800px] px-6 py-24 text-center">
      <p className="text-sm font-semibold text-[#DC620B] mb-2">404</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0B2545]">
        Page Not Found
      </h1>
      <p className="mt-4 text-base text-slate-600">
        The page you requested could not be located on the Transpetro Energy Limited website.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-[#0B2545] hover:bg-[#13355E] text-white text-sm font-semibold px-6 py-3 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products-services" element={<ProductsServicesPage />} />
            <Route path="supply-logistics" element={<SupplyLogisticsPage />} />
            <Route path="markets" element={<MarketsPage />} />
            <Route path="why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
