'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Building2, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-[var(--text-main)] font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/contact-hero/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Liên hệ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Liên hệ báo giá</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">
            Đội ngũ tư vấn sẵn sàng hỗ trợ bạn trong 30 phút.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Contact Info */}
        <div className="lg:w-5/12">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            THÔNG TIN
          </div>
          <h2 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">Kết nối với In Hoàng Thịnh</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mb-12"></div>

          <div className="space-y-8 mb-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">HOTLINE</div>
                <div className="font-bold text-slate-900 text-lg">090.XXX.XXXX</div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">EMAIL</div>
                <div className="font-bold text-slate-900">admin@inhoangthinh.com</div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">VĂN PHÒNG</div>
                <div className="text-slate-900 leading-relaxed">Số 12, Đường số 5, KDC CityLand, Phường 10, Quận Gò Vấp, TP.HCM</div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">XƯỞNG SX</div>
                <div className="text-slate-900 leading-relaxed">KCN Tân Triều, Thanh Trì, Hà Nội</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-white shadow-sm">
              Facebook
            </button>
            <button className="px-6 py-2.5 border border-slate-200 rounded-lg text-slate-700 font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-white shadow-sm">
              Zalo
            </button>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:w-7/12">
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Gửi yêu cầu báo giá</h3>
            <p className="text-slate-500 mb-8">Điền thông tin bên dưới — nhận phản hồi nhanh nhất.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="text" placeholder="Họ và tên *" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white" />
                </div>
                <div>
                  <input type="tel" placeholder="Số điện thoại *" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="email" placeholder="Email" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white" />
                </div>
                <div>
                  <input type="text" placeholder="Tên công ty" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white" />
                </div>
              </div>

              <div>
                <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-500">
                  <option>Chọn loại sản phẩm</option>
                  <option>Hộp cứng</option>
                  <option>Túi giấy</option>
                  <option>Hộp sóng</option>
                  <option>Tem nhãn</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input type="text" placeholder="Số lượng dự kiến" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white" />
                </div>
                <div>
                  <input type="text" placeholder="Ngành nghề" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white" />
                </div>
              </div>

              <div>
                <textarea placeholder="Mô tả yêu cầu chi tiết" rows={5} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white"></textarea>
              </div>

              <button type="button" className="w-full bg-[var(--accent)] text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-red-500/20">
                GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={20} />
              </button>
              
              <p className="text-center text-xs text-slate-500 mt-4">Cam kết bảo mật thông tin · Phản hồi trong 30 phút</p>
            </form>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
