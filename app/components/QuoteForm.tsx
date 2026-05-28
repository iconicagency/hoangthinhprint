'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { useSettings } from './SettingsProvider';

interface QuoteFormProps {
  hotline?: string;
}

export default function QuoteForm({ hotline }: QuoteFormProps) {
  const settings = useSettings();
  const displayPhone = hotline || settings.contactPhone;

  const [form, setForm] = useState({
    hoTen: '',
    soDienThoai: '',
    sanPham: '',
    soLuong: '',
    ghiChu: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.hoTen.trim() || !form.soDienThoai.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ họ tên và số điện thoại.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/bao-gia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Gửi thất bại, vui lòng thử lại.');
        setStatus('error');
        return;
      }
      setStatus('success');
      setForm({ hoTen: '', soDienThoai: '', sanPham: '', soLuong: '', ghiChu: '' });
    } catch {
      setErrorMsg('Lỗi mạng, vui lòng thử lại hoặc gọi hotline.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <CheckCircle2 size={56} className="text-green-500" />
        <h3 className="text-2xl font-bold text-[var(--text-main)]">Gửi thành công!</h3>
        <p className="text-[var(--text-dim)] max-w-sm">
          Chúng tôi đã nhận được yêu cầu báo giá của bạn. Chuyên viên sẽ liên hệ trong vòng 5 phút.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-[var(--accent)] underline"
        >
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-[var(--text-main)] font-bold mb-2">
        <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-[var(--accent)]">
          <Phone size={24} />
        </div>
        <div>
          <div className="text-sm text-[var(--text-dim)] font-normal">Gọi ngay hotline</div>
          <a href={`tel:${displayPhone.replace(/\D/g, '')}`} className="text-xl text-[var(--accent)] hover:underline">
            {displayPhone}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="hoTen"
            value={form.hoTen}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="soDienThoai"
            value={form.soDienThoai}
            onChange={handleChange}
            placeholder="0901 234 567"
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Sản phẩm cần in</label>
          <select
            name="sanPham"
            value={form.sanPham}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"
          >
            <option value="">-- Chọn sản phẩm --</option>
            <option>Hộp cứng cao cấp</option>
            <option>Túi giấy</option>
            <option>Hộp sóng carton</option>
            <option>In nhãn - Tem decal</option>
            <option>Catalogue / Brochure</option>
            <option>Bao bì mỹ phẩm</option>
            <option>Bao bì dược phẩm</option>
            <option>Khác</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Số lượng dự kiến</label>
          <select
            name="soLuong"
            value={form.soLuong}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"
          >
            <option value="">-- Chọn số lượng --</option>
            <option>500 - 1.000</option>
            <option>1.000 - 5.000</option>
            <option>5.000 - 10.000</option>
            <option>&gt; 10.000</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Ghi chú thêm</label>
        <textarea
          name="ghiChu"
          value={form.ghiChu}
          onChange={handleChange}
          placeholder="Mô tả yêu cầu chi tiết (kích thước, chất liệu, màu sắc...)"
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"
        />
      </div>

      {errorMsg && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={status === 'loading'}
        className="w-full bg-[var(--accent)] text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            Đang gửi...
          </>
        ) : (
          <>GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={18} /></>
        )}
      </button>

      <p className="text-center text-xs text-[var(--text-dim)]">
        Cam kết bảo mật thông tin - Phản hồi trong 5 phút
      </p>
    </div>
  );
}
