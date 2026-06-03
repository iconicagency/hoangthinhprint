'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { useSettings } from './SettingsProvider';
import { VI } from '../lib/vi';

export default function Header() {
  const settings = useSettings();
  const M = VI.menu;

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

      {/* Header — padding 1px trên dưới, logo 100px */}
      <header className="bg-[var(--bg)] px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-[var(--border)]" style={{ paddingTop: '1px', paddingBottom: '1px' }}>
        <Link href="/" className="flex items-center shrink-0">
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt="Logo"
              width={400}
              height={100}
              className="object-contain w-auto"
              style={{ height: '100px' }}
              priority
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-2xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-2">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-sm flex items-center justify-center text-[var(--bg)] text-sm">H</div>
              {settings.logoText || 'In Hoàng Thịnh'}
            </div>
          )}
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-6 text-sm font-bold text-[var(--text-main)] uppercase tracking-wide items-center">
            <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">{M.trangChu}</Link></li>
            <li><Link href="/gioi-thieu" className="hover:text-[var(--accent)] transition-colors">{M.gioiThieu}</Link></li>

            <li className="relative group py-4 -my-4">
              <Link href="/nganh-hang" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                {M.nganhHang} <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 mt-0 w-60 bg-[var(--bg)] border border-[var(--border)] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
                <Link href="/nganh-hang/tpcn-duoc-pham" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.tpcnDuocPham}</Link>
                <Link href="/nganh-hang/my-pham-skincare" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.myPhamSkincare}</Link>
                <Link href="/nganh-hang/yen-sao" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.yenSao}</Link>
                <Link href="/nganh-hang/trang-suc-qua-tang" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.trangSucQuaTang}</Link>
                <Link href="/nganh-hang/ecommerce" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.ecommerce}</Link>
              </div>
            </li>

            <li className="relative group py-4 -my-4">
              <Link href="/san-pham" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                {M.sanPham} <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 mt-0 w-60 bg-[var(--bg)] border border-[var(--border)] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
                <Link href="/san-pham?cat=catalogue" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.catalogue}</Link>
                <Link href="/san-pham?cat=tui-giay" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.tuiGiay}</Link>
                <Link href="/san-pham?cat=hop-giay" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.hopGiay}</Link>
                <Link href="/san-pham?cat=hop-carton-lanh" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.hopCartonLanh}</Link>
                <Link href="/san-pham?cat=hop-carton-song" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.hopCartonSong}</Link>
                <Link href="/san-pham?cat=in-nhan-tem-decal" className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M.inNhanTemDecal}</Link>
              </div>
            </li>

            <li><Link href="/du-an" className="hover:text-[var(--accent)] transition-colors">{M.duAnTieuBieu}</Link></li>
            <li><Link href="/bao-gia" className="hover:text-[var(--accent)] transition-colors">{M.baoGia}</Link></li>
            <li><Link href="/quy-trinh" className="hover:text-[var(--accent)] transition-colors">{M.quyTrinh}</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">{M.blog}</Link></li>
            <li><Link href="/lien-he" className="hover:text-[var(--accent)] transition-colors">{M.lienHe}</Link></li>
          </ul>
        </nav>

        <Link href="/bao-gia" className="bg-[var(--accent)] text-[var(--bg)] px-6 py-2.5 rounded text-sm font-bold uppercase hover:opacity-90 transition-opacity shadow-lg shadow-[var(--accent)]/20 shrink-0">
          {M.baoGiaNgay}
        </Link>
      </header>
    </>
  );
}
