'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { useSettings } from './SettingsProvider';

export default function FloatContact() {
  const settings = useSettings();

  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-3">
      {/* Phone */}
      <a
        href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
        className="w-14 h-14 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Gọi điện"
        title={settings.contactPhone}
      >
        <Phone size={24} className="text-white" />
      </a>

      {/* Zalo */}
      <a
        href={settings.zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Zalo"
        title="Chat Zalo"
      >
        <svg width="28" height="28" viewBox="0 0 50 50" fill="white">
          <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.854 2.963 11.29L2.037 46.73a1 1 0 001.234 1.234l10.44-2.926A23 23 0 0025 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm-8 28h-2v-8h2v8zm-1-9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 9.5h-2v-4.5c0-.827-.673-1.5-1.5-1.5S21 24.673 21 25.5V30h-2v-8h2v1.078C21.374 22.407 22.362 22 23.5 22c2.206 0 4 1.794 4 4V30zm5 0h-2l-3-8h2.2l1.8 5.143L31.8 22H34l-3 8z"/>
        </svg>
      </a>

      {/* Facebook Messenger */}
      <a
        href={settings.facebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Facebook"
        title="Facebook"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>
    </div>
  );
}
