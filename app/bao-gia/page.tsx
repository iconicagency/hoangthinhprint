'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/calculator/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Bảng giá</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Bảng giá sản phẩm</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">
            Giá tham khảo — Liên hệ để nhận báo giá chính xác cho đơn hàng của bạn.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
        
        {/* Table 1: Hộp cứng cao cấp */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Hộp cứng cao cấp</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Sản phẩm</th>
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Giá gốc</th>
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-[var(--accent)] uppercase tracking-wider text-right">Giá ưu đãi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Âm dương thanh quay</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">53.200đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">39.200đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Âm dương 25x33</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">28.000đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">17.800đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Âm dương 15x15</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">17.000đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">10.200đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Nam châm 20x15</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">27.200đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">18.000đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Nam châm 24x32</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">39.800đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">30.400đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Bao diêm 20x24</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">33.200đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">21.500đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Bao diêm 12x8.5</td>
                  <td className="py-4 px-6 md:px-8 text-slate-400 line-through text-right">20.000đ</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">11.900đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Túi giấy thương hiệu */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Túi giấy thương hiệu</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-2/3">Sản phẩm</th>
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-[var(--accent)] uppercase tracking-wider text-right">Giá ưu đãi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Cao cấp Ivory</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">8.500đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Trung cấp Couche</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">4.200đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Giá rẻ Kraft</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">1.500đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Hộp sóng carton */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Hộp sóng carton</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-slate-500 uppercase tracking-wider w-2/3">Sản phẩm</th>
                  <th className="py-4 px-6 md:px-8 text-xs font-bold text-[var(--accent)] uppercase tracking-wider text-right">Giá ưu đãi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Nắp gài 30x20</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">3.000đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Nắp gài 40x30</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">4.500đ</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 md:px-8 text-slate-700 font-medium">Cuộn</td>
                  <td className="py-4 px-6 md:px-8 text-[var(--accent)] font-bold text-right">3.500đ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-8">
          <Link href="/gioi-thieu" className="bg-[var(--accent)] text-white font-bold py-4 px-8 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-red-500/30">
            NHẬN BÁO GIÁ CHI TIẾT <ArrowRight size={20} />
          </Link>
        </div>

      </section>

      <Footer />
    </div>
  );
}
