import Script from "next/script";
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'FreshBite | Farm-Fresh Local Kitchen & Fast Delivery',
  description:
    'FreshBite serves chef-crafted, locally sourced organic bowls, artisan burgers, crisp salads, and stone-oven pizzas. Order fresh food online for fast local delivery.',
  keywords: [
    'food delivery',
    'fresh food',
    'farm to table',
    'organic bowls',
    'artisan burgers',
    'local kitchen',
    'healthy takeout',
  ],
  authors: [{ name: 'FreshBite Culinary Co.' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          async
          src="https://t.freshbite-demo.com/sdk/v2.js"
          data-key="cs_live_621r4b262f5m5d0v3h2o5d6s22435y43"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#fcfbf9] text-stone-900`}>
        <ClientProviders>{children}</ClientProviders>
        <Script
  async
  src="https://t.freshbite-demo.com/sdk/v2.js"
  data-key="cs_live_621r4b262f5m5d0v3h2o5d6s22435y43"
/>
      </body>
    </html>
  );
}
