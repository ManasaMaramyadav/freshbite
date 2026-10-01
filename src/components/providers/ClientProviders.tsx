'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CartProvider } from '@/context/CartContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { AnalyticsHUD } from '@/components/analytics/AnalyticsHUD';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { analytics } from '@/lib/analytics';

function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    analytics.trackPageView(pathname);
  }, [pathname]);

  return null;
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <PageViewTracker />
      <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer />
        <AnalyticsHUD />
      </div>
    </CartProvider>
  );
}
