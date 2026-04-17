import type {Metadata} from 'next';
import './globals.css'; // Global styles
import SettingsProvider from './components/SettingsProvider';

export const metadata: Metadata = {
  title: 'In Hoàng Thịnh',
  description: 'Giải Pháp In Ấn Bao Bì Trọn Gói',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning className="font-sans">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
