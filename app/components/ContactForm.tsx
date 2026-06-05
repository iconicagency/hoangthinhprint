'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  showCompany?: boolean;
  showIndustry?: boolean;
  darkMode?: boolean;
}

export default function ContactForm({ showCompany = true, showIndustry = true, darkMode = false }: ContactFormProps) {
  const [form, setForm] = useState({
    hoTen: '', soDienThoai: '', email: '', tenCongTy: '',
    sanPham: '', soLuong: '', nganhHang: '', ghiChu: '',
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
        body: JSON.stringify({
          hoTen: form.hoTen,
          soDienThoai: form.soDienThoai,
          sanPham: form.sanPham,
          soLuong: form.soLuong,
          ghiChu: [
            form.email ? `Email: ${form.email}` : '',
            form.tenCongTy ? `Cong ty: ${form.tenCongTy}` : '',
            form.nganhHang ? `Nganh hang: ${form.nganhHang}` : '',
            form.ghiChu || '',
          ].filter(Boolean).join(' | '),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Gui that bai, vui long thu lai.');
        setStatus('error');
        return;
      }
      setStatus('success');
    } catch {
      setErrorMsg('Loi mang, vui long thu lai hoac goi hotline.');
      setStatus('error');
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 transition-colors ${
    darkMode
      ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white focus:ring-white'
      : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-main)] focus:border-[var(--accent)] focus:ring-[var(--accent)]'
  }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${darkMode ? 'text-white/80' : 'text-[var(--text-dim)]'}`;

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[var(--text-main)]'}`}>Gửi thành công!</h3>
        <p className={`max-w-sm ${darkMode ? 'text-white/70' : 'text-[var(--text-dim)]'}`}>
          Chúng tôi đã nhận được yêu cầu. Chuyên viên sẽ liên hệ trong vòng 5 phút.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-sm text-[var(--accent)] underline">
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Họ tên + SĐT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Họ và tên <span className="text-red-400">*</span></label>
          <input type="text" name="hoTen" value={form.hoTen} onChange={handleChange} placeholder="Nguyễn Văn A" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Số điện thoại <span className="text-red-400">*</span></label>
          <input type="tel" name="soDienThoai" value={form.soDienThoai} onChange={handleChange} placeholder="0901 234 567" className={inputClass} />
        </div>
      </div>

      {/* Email + Công ty */}
      {(showCompany) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tên công ty</label>
            <input type="text" name="tenCongTy" value={form.tenCongTy} onChange={handleChange} placeholder="Công ty ABC" className={inputClass} />
          </div>
        </div>
      )}

      {/* Sản phẩm + Số lượng + Ngành hàng */}
      <div className={`grid gap-4 ${showIndustry ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
        <div>
          <label className={labelClass}>Sản phẩm cần in</label>
          <select name="sanPham" value={form.sanPham} onChange={handleChange} className={inputClass}>
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
          <label className={labelClass}>Số lượng dự kiến</label>
          <select name="soLuong" value={form.soLuong} onChange={handleChange} className={inputClass}>
            <option value="">-- Chọn số lượng --</option>
            <option>500 - 1.000</option>
            <option>1.000 - 5.000</option>
            <option>5.000 - 10.000</option>
            <option>&gt; 10.000</option>
          </select>
        </div>
        {showIndustry && (
          <div>
            <label className={labelClass}>Ngành hàng</label>
            <select name="nganhHang" value={form.nganhHang} onChange={handleChange} className={inputClass}>
              <option value="">-- Chọn --</option>
              <option>TPCN & Dược phẩm</option>
              <option>Mỹ phẩm & Skincare</option>
              <option>Yến sào</option>
              <option>Trang sức & Quà tặng</option>
              <option>Ecommerce</option>
              <option>Thực phẩm</option>
              <option>Khác</option>
            </select>
          </div>
        )}
      </div>

      {/* Ghi chú */}
      <div>
        <label className={labelClass}>Ghi chú thêm</label>
        <textarea
          name="ghiChu" value={form.ghiChu} onChange={handleChange}
          placeholder="Mô tả yêu cầu chi tiết (kích thước, chất liệu, màu sắc...)"
          rows={4} className={inputClass}
        />
      </div>

      {errorMsg && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-400/30 rounded-lg px-4 py-2">{errorMsg}</p>
      )}

      <button
        type="button" onClick={handleSubmit} disabled={status === 'loading'}
        className="w-full bg-[var(--accent)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'loading' ? (
          <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>Đang gửi...</>
        ) : (
          <>GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={18} /></>
        )}
      </button>

      <p className={`text-center text-xs ${darkMode ? 'text-white/50' : 'text-[var(--text-dim)]'}`}>
        Cam kết bảo mật thông tin - Phản hồi trong 5 phút
      </p>
    </div>
  );
}
