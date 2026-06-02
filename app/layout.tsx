import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SettingsProvider from './components/SettingsProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import FloatContact from './components/FloatContact';
import { getHeaderFooterSettings } from './lib/wp';

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
  title: 'In Hoàng Thịnh',
  description: 'Giải Pháp In Ấn Bao Bì Trọn Gói',
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
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
