import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SettingsProvider from './components/SettingsProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
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
  title: 'In Ho\u00e0ng Th\u1ecbnh',
  description: 'Gi\u1ea3i Ph\u00e1p In \u1ea4n Bao B\u00ec Tr\u1ecdn G\u00f3i',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch settings tr\u00ean server \u2014 kh\u00f4ng c\u00f3 flash data c\u0169
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
          <Footer />
        </SettingsProvider>
      </body>
    </html>
  );
}
