'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, X } from 'lucide-react';
import { useSettings } from './SettingsProvider';

// Widget lien he kieu panel mo/dong (giong mau Dabilux):
// - Nut noi bam vao mo panel liet ke cac kenh lien he (ten + so)
// - PC: toi da 4 hotline + 2 zalo + facebook
// - Mobile: 2 hotline dau tien + 2 zalo + facebook (hotline 3, 4 an bang CSS hidden md:flex)
// - Du lieu tu WP Header Settings (repeater hotlines/zalos) — fallback so mac dinh khi chua nhap
// - Nut BackToTop la component rieng, khong lien quan widget nay

const ZaloIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="white">
    <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.854 2.963 11.29L2.037 46.73a1 1 0 001.234 1.234l10.44-2.926A23 23 0 0025 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm-8 28h-2v-8h2v8zm-1-9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 9.5h-2v-4.5c0-.827-.673-1.5-1.5-1.5S21 24.673 21 25.5V30h-2v-8h2v1.078C21.374 22.407 22.362 22 23.5 22c2.206 0 4 1.794 4 4V30zm5 0h-2l-3-8h2.2l1.8 5.143L31.8 22H34l-3 8z"/>
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function FloatContact() {
  const settings = useSettings();
  const [open, setOpen] = useState(false);

  const hotlines = (settings.hotlines || []).slice(0, 4);
  const zalos = (settings.zalos || []).slice(0, 2);

  return (
    <>
      {/* Nut mo widget — nam tren nut BackToTop (bottom-8) */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed right-8 bottom-28 z-50 w-14 h-14 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label={open ? 'Đóng bảng liên hệ' : 'Mở bảng liên hệ'}
      >
        {open ? (
          <X size={26} className="text-white" />
        ) : (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-50 animate-ping"></span>
            <Phone size={24} className="text-white relative" />
          </>
        )}
      </button>

      {/* Panel lien he */}
      {open && (
        <div className="fixed right-4 md:right-8 bottom-44 z-50 w-[calc(100vw-2rem)] max-w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[var(--border)]">
          {/* Header panel */}
          <div className="bg-[var(--accent)] px-5 py-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
              {settings.logoUrl ? (
                <Image src={settings.logoUrl} alt={settings.logoText} width={40} height={40} className="object-contain p-1" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-[var(--accent)] font-black text-lg">H</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-bold leading-tight truncate">{settings.logoText}</div>
              <div className="text-white/80 text-xs mt-0.5">Chúng tôi có thể hỗ trợ gì cho bạn hôm nay?</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center shrink-0 transition-colors"
              aria-label="Đóng"
            >
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* Danh sach kenh lien he */}
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {hotlines.map((h, i) => (
              <a
                key={`hotline-${i}`}
                href={`tel:${h.phone.replace(/\D/g, '')}`}
                className={`items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors ${i >= 2 ? 'hidden md:flex' : 'flex'}`}
              >
                <span className="w-11 h-11 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-slate-800 text-sm">{h.label || 'Gọi điện thoại trực tiếp'}</span>
                  <span className="block text-sm text-slate-400">{h.phone}</span>
                </span>
              </a>
            ))}

            {zalos.map((z, i) => (
              <a
                key={`zalo-${i}`}
                href={`https://zalo.me/${z.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors"
              >
                <span className="w-11 h-11 rounded-full bg-[#0068FF] flex items-center justify-center shrink-0">
                  <ZaloIcon />
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-slate-800 text-sm">{z.label || 'Nhắn tin qua Zalo'}</span>
                  <span className="block text-sm text-slate-400">{z.phone}</span>
                </span>
              </a>
            ))}

            <a
              href={settings.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors"
            >
              <span className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center shrink-0">
                <FacebookIcon />
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-slate-800 text-sm">Nhắn tin qua Facebook</span>
                <span className="block text-sm text-slate-400">Fanpage {settings.logoText}</span>
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
