'use client';

import { useState, useEffect } from 'react';
import { X, Phone, Gift } from 'lucide-react';
import { useSettings } from './SettingsProvider';
import { VI } from '../lib/vi';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const settings = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-4 z-50 transition-all duration-500 ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      style={{ maxWidth: '280px' }}
    >
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[var(--accent)] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Gift size={16} />
            <span className="text-xs font-bold uppercase tracking-wide">{VI.popupTitle}</span>
          </div>
          <button
            onClick={() => { setVisible(false); setTimeout(() => setDismissed(true), 500); }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-4 py-4">
          <p className="text-sm font-bold text-[var(--text-main)] mb-1">{VI.popupHeading}</p>
          <p className="text-xs text-[var(--text-dim)] mb-4 leading-relaxed">{VI.popupDesc}</p>
          <a
            href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
            className="flex items-center justify-center gap-2 bg-[var(--accent)] text-white text-sm font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity w-full"
          >
            <Phone size={15} />
            {settings.contactPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
