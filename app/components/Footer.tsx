'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { useSettings } from './SettingsProvider';

export default function Footer() {
  const settings = useSettings();

  return (
    <footer className="bg-[var(--bg)] text-[var(--text-dim)] pt-24 pb-12 px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          {/* Logo — chiều rộng full cột, chiều cao tự động theo tỷ lệ 16:9 */}
          <div className="mb-6">
            {settings.logoUrl ? (
              <div className="relative w-full" style={{ aspectRatio: '16/9', maxHeight: '80px' }}>
                <Image
                  src={settings.logoUrl}
                  alt="Logo"
                  fill
                  className="object-contain object-left"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="text-2xl font-black text-[var(--text-main)] tracking-tighter">
                {settings.logoText || 'Hoàng Thịnh Print'}
              </div>
            )}
          </div>
          <p className="text-sm leading-relaxed mb-6">{settings.footerDescription || 'Đối tác in ấn bao bì trọn gói chuyên nghiệp. Cam kết chất lượng, đúng tiến độ, giá gốc tại xưởng.'}</p>
          {/* Social icons */}
          <div className="flex gap-3">
            <a href={settings.facebookLink} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href={settings.youtubeLink || '#'} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href={settings.zaloLink} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0068FF] flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Zalo">
              <svg width="22" height="22" viewBox="0 0 50 50" fill="white">
                <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.854 2.963 11.29L2.037 46.73a1 1 0 001.234 1.234l10.44-2.926A23 23 0 0025 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm-8 28h-2v-8h2v8zm-1-9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 9.5h-2v-4.5c0-.827-.673-1.5-1.5-1.5S21 24.673 21 25.5V30h-2v-8h2v1.078C21.374 22.407 22.362 22 23.5 22c2.206 0 4 1.794 4 4V30zm5 0h-2l-3-8h2.2l1.8 5.143L31.8 22H34l-3 8z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[var(--text-main)] font-bold text-lg mb-6 uppercase tracking-wide">Dịch Vụ In Ấn</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/san-pham" className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Hộp Cứng Cao Cấp</Link></li>
            <li><Link href="/san-pham" className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Túi Giấy</Link></li>
            <li><Link href="/san-pham" className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Hộp Sóng Carton</Link></li>
            <li><Link href="/san-pham" className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Tem Nhãn Decal</Link></li>
            <li><Link href="/san-pham" className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Catalogue, Brochure</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--text-main)] font-bold text-lg mb-6 uppercase tracking-wide">Thông Tin Liên Hệ</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <span>{settings.contactAddress}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[var(--accent)] shrink-0" />
              <span>{settings.contactPhone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[var(--accent)] shrink-0" />
              <span>{settings.contactEmail}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--text-main)] font-bold text-lg mb-6 uppercase tracking-wide">Bản Đồ</h4>
          <a href={settings.mapUrl || '#'} target="_blank" rel="noopener noreferrer"
            className="block w-full h-40 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden relative group">
            {settings.mapImage ? (
              <Image src={settings.mapImage} alt="Map" fill className="object-cover transition-transform group-hover:scale-105" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-[var(--text-dim)]">Chưa có bản đồ</div>
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-white bg-[var(--accent)] px-3 py-1 rounded">Xem trên Google Maps</span>
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--border)] text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
        <p>{settings.copyrightText || `© ${new Date().getFullYear()} In Hoàng Thịnh. All rights reserved.`}</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Chính sách bảo mật</span>
          <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Điều khoản dịch vụ</span>
        </div>
      </div>
    </footer>
  );
}
