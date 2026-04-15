'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSettings } from './SettingsProvider';

export default function Header() {
  const settings = useSettings();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[var(--card-bg)] text-[var(--text-dim)] text-xs py-2 px-8 flex justify-between items-center hidden md:flex border-b border-[var(--border)]">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Mail size={14}/> {settings.contactEmail}</span>
          <span className="flex items-center gap-2"><MapPin size={14}/> {settings.contactAddress}</span>
        </div>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2 text-[var(--accent)] font-bold text-sm"><Phone size={14}/> Hotline: {settings.contactPhone}</span>
          <a href={settings.zaloLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">ZALO</a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[var(--bg)] py-4 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-[var(--border)]">
        <Link href="/" className="text-2xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-sm flex items-center justify-center text-[var(--bg)] text-xs">{settings.logoText}</div>
          IN HOÀNG THỊNH
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex gap-8 text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
            <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link></li>
            <li><Link href="/gioi-thieu" className="hover:text-[var(--accent)] transition-colors">Giới thiệu</Link></li>
            <li><Link href="/san-pham" className="hover:text-[var(--accent)] transition-colors">Sản phẩm</Link></li>
            <li><Link href="/du-an" className="hover:text-[var(--accent)] transition-colors">Dự án</Link></li>
            <li><Link href="/bao-gia" className="hover:text-[var(--accent)] transition-colors">Báo giá</Link></li>
            <li><Link href="/quy-trinh" className="hover:text-[var(--accent)] transition-colors">Quy trình</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">Blog</Link></li>
            <li><Link href="/lien-he" className="hover:text-[var(--accent)] transition-colors">Liên hệ</Link></li>
          </ul>
        </nav>
        <Link href="/bao-gia" className="bg-[var(--accent)] text-[var(--bg)] px-6 py-2.5 rounded text-sm font-bold uppercase hover:opacity-90 transition-opacity shadow-lg shadow-[var(--accent)]/20">
          Báo Giá Ngay
        </Link>
      </header>
    </>
  );
}
