import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles
import SettingsProvider from './components/SettingsProvider';

const inter = Inter({
  subsets: ["vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'In Hoàng Thịnh',
  description: 'Giải Pháp In Ấn Bao Bì Trọn Gói',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-[var(--text-main)]">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
