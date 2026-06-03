'use client';

import { useState, useEffect } from 'react';
import { X, Phone, Gift, Send, User } from 'lucide-react';
import { useSettings } from './SettingsProvider';
import { VI } from '../lib/vi';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const settings = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    try {
      await fetch('/api/bao-gia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone,
          message: 'Đặt lịch tư vấn qua popup',
          product: 'Tư vấn chung',
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-4 z-50 transition-all duration-500 ${
        visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      style={{ width: '300px' }}
    >
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
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

        {/* Nội dung */}
        <div className="px-4 py-4">
          {!sent ? (
            <>
              <p className="text-sm font-bold text-[var(--text-main)] mb-1">{VI.popupHeading}</p>
              <p className="text-xs text-[var(--text-dim)] mb-4 leading-relaxed">{VI.popupDesc}</p>

              {/* Form đặt lịch */}
              <div className="space-y-2 mb-3">
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
              </div>

              {/* Nút đặt lịch */}
              <button
                onClick={handleSubmit}
                disabled={sending || !name.trim() || !phone.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-white text-sm font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mb-2"
              >
                <Send size={14} />
                {sending ? 'Đang gửi...' : 'Đặt lịch tư vấn'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2 my-2">
                <div className="flex-1 h-px bg-[var(--border)]"></div>
                <span className="text-xs text-[var(--text-dim)]">hoặc</span>
                <div className="flex-1 h-px bg-[var(--border)]"></div>
              </div>

              {/* Nút hotline */}
              <a
                href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 border border-[var(--accent)] text-[var(--accent)] text-sm font-bold py-2.5 rounded-xl hover:bg-[var(--accent)] hover:text-white transition-all w-full"
              >
                <Phone size={15} />
                {settings.contactPhone}
              </a>
            </>
          ) : (
            /* Màn hình cảm ơn */
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="font-bold text-[var(--text-main)] mb-1 text-sm">Đã nhận thông tin!</p>
              <p className="text-xs text-[var(--text-dim)] mb-4">Chúng tôi sẽ liên hệ lại với bạn trong 5 phút.</p>
              <button
                onClick={() => { setVisible(false); setTimeout(() => setDismissed(true), 500); }}
                className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
