'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Phone, Gift, Send, User } from 'lucide-react';
import { useSettings } from './SettingsProvider';
import { VI } from '../lib/vi';

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const settings = useSettings();

  // Hiện sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Ẩn khi scroll vào hero, hiện lại khi qua hero
  useEffect(() => {
    const handleScroll = () => {
      // Hero slider cao ~750px, thêm header ~100px
      const heroBottom = 750;
      const scrollY = window.scrollY;
      if (scrollY < heroBottom) {
        setHiddenByScroll(true);
      } else {
        setHiddenByScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Chạy ngay lần đầu
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Tính trạng thái hiển thị:
  // - visible = false → chưa đến lúc xuất hiện
  // - hiddenByScroll = true → đang ở vùng hero → ẩn
  const show = visible && !hiddenByScroll;

  return (
    <div
      className={`fixed bottom-6 left-4 z-50 transition-all duration-500 ${
        show ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
      style={{ width: '260px' }}
    >
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--accent)] px-3 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white">
            <Gift size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wide">{VI.popupTitle}</span>
          </div>
          <button
            onClick={() => { setVisible(false); setTimeout(() => setDismissed(true), 500); }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Nội dung */}
        <div className="px-3 py-3">
          {!sent ? (
            <>
              <p className="text-xs font-bold text-[var(--text-main)] mb-0.5">{VI.popupHeading}</p>
              <p className="text-[11px] text-[var(--text-dim)] mb-3 leading-relaxed">{VI.popupDesc}</p>

              {/* Form */}
              <div className="space-y-1.5 mb-2.5">
                <div className="relative">
                  <User size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-7 pr-2.5 py-1.5 text-xs border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
                <div className="relative">
                  <Phone size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full pl-7 pr-2.5 py-1.5 text-xs border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-dim)]"
                  />
                </div>
              </div>

              {/* Nút đặt lịch */}
              <button
                onClick={handleSubmit}
                disabled={sending || !name.trim() || !phone.trim()}
                className="w-full flex items-center justify-center gap-1.5 bg-[var(--accent)] text-white text-xs font-bold py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mb-2"
              >
                <Send size={12} />
                {sending ? 'Đang gửi...' : 'Đặt lịch tư vấn'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-px bg-[var(--border)]"></div>
                <span className="text-[10px] text-[var(--text-dim)]">hoặc</span>
                <div className="flex-1 h-px bg-[var(--border)]"></div>
              </div>

              {/* Hotline */}
              <a
                href={`tel:${settings.contactPhone.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-1.5 border border-[var(--accent)] text-[var(--accent)] text-xs font-bold py-2 rounded-lg hover:bg-[var(--accent)] hover:text-white transition-all w-full"
              >
                <Phone size={13} />
                {settings.contactPhone}
              </a>
            </>
          ) : (
            <div className="text-center py-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="font-bold text-[var(--text-main)] mb-1 text-xs">Đã nhận thông tin!</p>
              <p className="text-[11px] text-[var(--text-dim)] mb-3">Chúng tôi sẽ liên hệ trong 5 phút.</p>
              <button
                onClick={() => { setVisible(false); setTimeout(() => setDismissed(true), 500); }}
                className="text-[11px] text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
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
