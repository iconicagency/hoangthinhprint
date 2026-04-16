'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[var(--accent)] p-6 text-white relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Gift className="text-[var(--accent)]" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">GIẢM NGAY 10%</h3>
              <p className="text-white/80 text-sm">Cho mọi đơn hàng · Tối đa 2.000.000đ</p>
            </div>
          </div>
          
          <div className="bg-white/10 border border-white/20 rounded-lg py-2 px-4 flex items-center gap-2 text-sm font-medium">
            <Sparkles size={16} className="text-yellow-400" />
            Đăng ký ngay để nhận ưu đãi đặc biệt từ In Hoàng Thịnh!
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Họ tên <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type="tel" placeholder="0901 234 567" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
              <input type="email" placeholder="email@example.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Địa chỉ</label>
              <input type="text" placeholder="Quận/Huyện, Tỉnh/TP" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
            </div>
            
            <button type="button" className="w-full bg-[#d83b20] text-white font-bold py-3.5 rounded-lg hover:bg-[#b92b27] transition-colors mt-2 text-lg">
              Nhận ưu đãi 10% ngay
            </button>
            
            <p className="text-center text-xs text-slate-500 mt-4">
              Ưu đãi có hạn · Áp dụng cho mọi đơn hàng MOQ từ 500 sản phẩm
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
