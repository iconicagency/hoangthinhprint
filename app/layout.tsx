import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SettingsProvider from './components/SettingsProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FloatContact from './components/FloatContact';
import PromoPopup from './components/PromoPopup';
import { getHeaderFooterSettings } from './lib/wp';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'In Hoang Thinh',
  description: 'Giai Phap In An Bao Bi Tron Goi',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const wpSettings = await getHeaderFooterSettings().catch(() => null);

  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-[var(--text-main)] overflow-x-hidden flex flex-col min-h-screen">
        <SettingsProvider initialSettings={wpSettings}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <BackToTop />
          <FloatContact />
          <PromoPopup />
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
