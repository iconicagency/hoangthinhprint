'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { useSettings } from './SettingsProvider';
import { VI } from '../lib/vi';
import { fetchWP } from '../lib/wp';

const NGANH_HANG_LINKS = [
  { href: '/nganh-hang/tpcn-duoc-pham', key: 'tpcnDuocPham' },
  { href: '/nganh-hang/my-pham-skincare', key: 'myPhamSkincare' },
  { href: '/nganh-hang/yen-sao', key: 'yenSao' },
  { href: '/nganh-hang/trang-suc-qua-tang', key: 'trangSucQuaTang' },
  { href: '/nganh-hang/ecommerce', key: 'ecommerce' },
];

// Fallback khi chua tai duoc danh muc tu WP — khop voi admin hien tai
const SAN_PHAM_FALLBACK = [
  { slug: 'catalogue', name: 'Catalogue' },
  { slug: 'hop-carton-lanh', name: 'Hộp carton lạnh' },
  { slug: 'hop-carton-song', name: 'Hộp carton sóng' },
  { slug: 'hop-giay', name: 'Hộp giấy' },
  { slug: 'hop-qua-tet', name: 'Hộp quà tết' },
  { slug: 'hop-trung-thu', name: 'Hộp trung thu' },
  { slug: 'kep-file', name: 'Kẹp file' },
  { slug: 'name-card', name: 'Name card' },
  { slug: 'phong-bi', name: 'Phong bì' },
  { slug: 'tui-giay', name: 'Túi giấy' },
];

// Danh muc san pham lay DONG tu WordPress (children cua category san-pham)
const PRODUCT_CATS_QUERY = `
  query GetProductCatsMenu {
    category(id: "san-pham", idType: SLUG) {
      children(first: 50) {
        nodes { name slug }
      }
    }
  }
`;

// Format so dien thoai 10 so ve dang xxx.xxx.xxxx cho de doc
function fmtPhone(p: string): string {
  const d = (p || '').replace(/\D/g, '');
  if (d.length === 10) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return p;
}

export default function Header() {
  const settings = useSettings();
  const M = VI.menu as Record<string, string>;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [productCats, setProductCats] = useState<{ slug: string; name: string }[]>(SAN_PHAM_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchWP(PRODUCT_CATS_QUERY).then((data: any) => {
      const nodes = data?.category?.children?.nodes;
      if (!cancelled && nodes?.length) setProductCats(nodes);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const closeMobile = () => { setMobileOpen(false); setOpenSub(null); };

  const hotlines = (settings.hotlines || []).slice(0, 4);

  return (
    <>
      {/* Top Bar — hien du danh sach hotline tu WP Header Settings */}
      <div className="bg-[var(--card-bg)] text-[var(--text-dim)] text-xs py-2 px-8 justify-between items-center gap-4 hidden md:flex flex-wrap border-b border-[var(--border)]">
        <div className="flex gap-6 items-center flex-wrap">
          <span className="flex items-center gap-2"><Mail size={14}/> {settings.contactEmail}</span>
          <span className="hidden xl:flex items-center gap-2"><MapPin size={14}/> {settings.contactAddress}</span>
        </div>
        <div className="flex gap-4 items-center flex-wrap justify-end">
          {hotlines.map((h, i) => (
            <a
              key={i}
              href={`tel:${h.phone.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 text-[var(--accent)] font-bold text-sm whitespace-nowrap hover:opacity-80 transition-opacity"
              title={h.label}
            >
              <Phone size={14}/> {h.label ? `${h.label}: ` : ''}{fmtPhone(h.phone)}
            </a>
          ))}
          <a href={settings.zaloLink} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer">ZALO</a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-[var(--bg)] px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-[var(--border)]" style={{ lineHeight: 0 }}>
        <Link href="/" className="flex items-center shrink-0" style={{ lineHeight: 0 }} onClick={closeMobile}>
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt="Logo"
              width={400}
              height={100}
              className="object-contain w-auto block h-[72px] md:h-[100px]"
              style={{ display: 'block' }}
              priority
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-2xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-2" style={{ lineHeight: 'normal' }}>
              <div className="w-10 h-10 bg-[var(--accent)] rounded-sm flex items-center justify-center text-[var(--bg)] text-sm">H</div>
              {settings.logoText || 'In Hoàng Thịnh'}
            </div>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block" style={{ lineHeight: 'normal' }}>
          <ul className="flex gap-6 text-sm font-bold text-[var(--text-main)] uppercase tracking-wide items-center">
            <li><Link href="/" className="hover:text-[var(--accent)] transition-colors">{M.trangChu}</Link></li>
            <li><Link href="/gioi-thieu" className="hover:text-[var(--accent)] transition-colors">{M.gioiThieu}</Link></li>

            <li className="relative group py-4 -my-4">
              <Link href="/nganh-hang" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                {M.nganhHang} <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 mt-0 w-60 bg-[var(--bg)] border border-[var(--border)] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
                {NGANH_HANG_LINKS.map(l => (
                  <Link key={l.href} href={l.href} className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{M[l.key]}</Link>
                ))}
              </div>
            </li>

            <li className="relative group py-4 -my-4">
              <Link href="/san-pham" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                {M.sanPham} <ChevronDown size={14} />
              </Link>
              <div className="absolute top-full left-0 mt-0 w-60 bg-[var(--bg)] border border-[var(--border)] shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col py-2">
                {productCats.map(cat => (
                  <Link key={cat.slug} href={`/san-pham?cat=${cat.slug}`} className="px-5 py-2.5 hover:bg-[var(--card-bg)] hover:text-[var(--accent)] transition-colors text-sm normal-case font-medium border-b border-[var(--border)] last:border-0">{cat.name}</Link>
                ))}
              </div>
            </li>

            <li><Link href="/du-an" className="hover:text-[var(--accent)] transition-colors">{M.duAnTieuBieu}</Link></li>
            <li><Link href="/bao-gia" className="hover:text-[var(--accent)] transition-colors">{M.baoGia}</Link></li>
            <li><Link href="/quy-trinh" className="hover:text-[var(--accent)] transition-colors">{M.quyTrinh}</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--accent)] transition-colors">{M.blog}</Link></li>
            <li><Link href="/lien-he" className="hover:text-[var(--accent)] transition-colors">{M.lienHe}</Link></li>
          </ul>
        </nav>

        <div className="flex items-center gap-3" style={{ lineHeight: 'normal' }}>
          <Link href="/bao-gia" className="hidden sm:inline-block bg-[var(--accent)] text-[var(--bg)] px-6 py-2.5 rounded text-sm font-bold uppercase hover:opacity-90 transition-opacity shadow-lg shadow-[var(--accent)]/20 shrink-0">
            {M.baoGiaNgay}
          </Link>

          {/* Hamburger — mobile/tablet */}
          <button
            type="button"
            className="lg:hidden p-2 text-[var(--text-main)] hover:text-[var(--accent)] transition-colors"
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] z-40 bg-black/40" onClick={closeMobile}>
          <nav
            className="bg-[var(--bg)] border-b border-[var(--border)] shadow-xl max-h-[calc(100vh-72px)] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <ul className="flex flex-col text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
              <li className="border-b border-[var(--border)]">
                <Link href="/" className="block px-6 py-4" onClick={closeMobile}>{M.trangChu}</Link>
              </li>
              <li className="border-b border-[var(--border)]">
                <Link href="/gioi-thieu" className="block px-6 py-4" onClick={closeMobile}>{M.gioiThieu}</Link>
              </li>

              {/* Ngành hàng accordion */}
              <li className="border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <Link href="/nganh-hang" className="flex-1 px-6 py-4" onClick={closeMobile}>{M.nganhHang}</Link>
                  <button type="button" className="px-6 py-4" aria-label="Mở danh sách ngành hàng"
                    onClick={() => setOpenSub(openSub === 'nganh-hang' ? null : 'nganh-hang')}>
                    <ChevronDown size={18} className={`transition-transform ${openSub === 'nganh-hang' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {openSub === 'nganh-hang' && (
                  <div className="bg-[var(--card-bg)] flex flex-col">
                    {NGANH_HANG_LINKS.map(l => (
                      <Link key={l.href} href={l.href} onClick={closeMobile}
                        className="px-10 py-3 text-sm normal-case font-medium border-t border-[var(--border)] hover:text-[var(--accent)]">
                        {M[l.key]}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              {/* Sản phẩm accordion */}
              <li className="border-b border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <Link href="/san-pham" className="flex-1 px-6 py-4" onClick={closeMobile}>{M.sanPham}</Link>
                  <button type="button" className="px-6 py-4" aria-label="Mở danh sách sản phẩm"
                    onClick={() => setOpenSub(openSub === 'san-pham' ? null : 'san-pham')}>
                    <ChevronDown size={18} className={`transition-transform ${openSub === 'san-pham' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                {openSub === 'san-pham' && (
                  <div className="bg-[var(--card-bg)] flex flex-col">
                    {productCats.map(cat => (
                      <Link key={cat.slug} href={`/san-pham?cat=${cat.slug}`} onClick={closeMobile}
                        className="px-10 py-3 text-sm normal-case font-medium border-t border-[var(--border)] hover:text-[var(--accent)]">
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li className="border-b border-[var(--border)]">
                <Link href="/du-an" className="block px-6 py-4" onClick={closeMobile}>{M.duAnTieuBieu}</Link>
              </li>
              <li className="border-b border-[var(--border)]">
                <Link href="/bao-gia" className="block px-6 py-4" onClick={closeMobile}>{M.baoGia}</Link>
              </li>
              <li className="border-b border-[var(--border)]">
                <Link href="/quy-trinh" className="block px-6 py-4" onClick={closeMobile}>{M.quyTrinh}</Link>
              </li>
              <li className="border-b border-[var(--border)]">
                <Link href="/blog" className="block px-6 py-4" onClick={closeMobile}>{M.blog}</Link>
              </li>
              <li className="border-b border-[var(--border)]">
                <Link href="/lien-he" className="block px-6 py-4" onClick={closeMobile}>{M.lienHe}</Link>
              </li>
              <li className="p-4">
                <Link href="/bao-gia" onClick={closeMobile}
                  className="block text-center bg-[var(--accent)] text-[var(--bg)] px-6 py-3 rounded text-sm font-bold uppercase">
                  {M.baoGiaNgay}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
