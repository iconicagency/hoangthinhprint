'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, Package, ChevronDown, ArrowRight, ChevronUp } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function CosmeticsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: 'Có in số lượng nhỏ cho startup mỹ phẩm không?', a: 'Chúng tôi nhận in từ 500 hộp/túi để đảm bảo chi phí sản xuất tối ưu nhất cho khách hàng, rất phù hợp cho các startup.' },
    { q: 'Có hỗ trợ thiết kế không?', a: 'Có, In Hoàng Thịnh hỗ trợ thiết kế 3D miễn phí khi khách hàng đặt in, giúp bạn hình dung rõ nhất về sản phẩm trước khi sản xuất hàng loạt.' },
    { q: 'Bao lâu nhận hàng?', a: 'Thời gian sản xuất trung bình từ 7-10 ngày làm việc kể từ khi chốt thiết kế và đặt cọc.' },
    { q: 'Chất liệu nào phù hợp mỹ phẩm?', a: 'Với mỹ phẩm, khách hàng thường ưa chuộng giấy Ivory cán mờ kết hợp ép kim, UV spot hoặc hộp cứng bồi giấy mỹ thuật để tăng vẻ sang trọng.' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans">
      <Header />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-sm text-slate-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/nganh-hang" className="hover:text-white transition-colors">Ngành hàng</Link>
            <span>/</span>
            <span className="text-white">Mỹ Phẩm & Skincare</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">
            Bao Bì Cho Ngành Mỹ Phẩm
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Hộp cứng, túi giấy cao cấp — Nâng tầm thương hiệu mỹ phẩm
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-8 bg-[var(--bg)] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">Bao Bì Cho Ngành Mỹ Phẩm</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
          <p className="text-[var(--text-dim)] text-lg leading-relaxed">
            Bao bì mỹ phẩm là yếu tố quyết định ấn tượng đầu tiên của khách hàng. Từ hộp cứng ép kim sang trọng đến túi giấy ivory cao cấp, In Hoàng Thịnh giúp thương hiệu mỹ phẩm của bạn nổi bật và chuyên nghiệp.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-12 text-center">Tại sao mỹ phẩm cần bao bì cao cấp?</h2>
          <div className="space-y-6">
            {[
              'Khách hàng mua mỹ phẩm bằng mắt — bao bì đẹp tăng tỷ lệ chuyển đổi',
              'Trải nghiệm unboxing — khách cảm thấy đang \'mở quà\'',
              'Ép kim, cán mờ, UV spot tạo hiệu ứng sang trọng',
              'Túi giấy đi kèm giúp branding hoàn thiện',
              'Thiết kế 3D miễn phí — duyệt trước khi in'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-1" size={24} />
                <p className="text-lg text-[var(--text-main)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suitable Products */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">Sản phẩm phù hợp</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Hộp cứng nam châm', desc: 'Đóng mở từ tính, lót nhung. Cho set mỹ phẩm.' },
              { title: 'Hộp giấy mỹ phẩm', desc: 'In offset 4 màu, cán mờ. Cho sản phẩm đơn lẻ.' },
              { title: 'Túi giấy ivory', desc: 'Cao cấp, dây xách cotton. Cho cửa hàng, spa.' }
            ].map((prod, i) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Package size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">{prod.title}</h3>
                <p className="text-[var(--text-dim)] mb-8 h-12">{prod.desc}</p>
                <Link href="/san-pham" className="text-[var(--accent)] font-bold flex items-center justify-center gap-2 w-full hover:opacity-80 transition-opacity">
                  Xem thêm <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
          
          <p className="text-center text-[var(--accent)] font-bold text-lg">
            Hộp cứng từ 10.200đ. Túi giấy ivory từ 8.500đ. MOQ 500.
          </p>
        </div>
      </section>

      {/* Sample Products */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">Sản phẩm mẫu</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] group">
                <Image src={`https://picsum.photos/seed/cosmetic${i}/400/400`} alt={`Sample ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">Câu hỏi thường gặp</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[var(--border)] rounded-xl overflow-hidden bg-white">
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-[var(--text-main)] hover:bg-[var(--card-bg)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp size={20} className="text-[var(--accent)]" /> : <ChevronDown size={20} className="text-[var(--text-dim)]" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-[var(--text-dim)] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Nhận báo giá miễn phí</h2>
            <p className="text-slate-400">Phản hồi trong 5 phút</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="0901 234 567" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tên công ty</label>
                  <input type="text" placeholder="Công ty ABC" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sản phẩm cần in</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900">
                    <option>-- Chọn --</option>
                    <option>Hộp cứng</option>
                    <option>Túi giấy</option>
                    <option>Hộp sóng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Số lượng dự kiến</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900">
                    <option>-- Chọn --</option>
                    <option>500 - 1.000</option>
                    <option>1.000 - 5.000</option>
                    <option>&gt; 5.000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ngành hàng</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900">
                    <option>Mỹ phẩm & Skincare</option>
                    <option>TPCN & Dược phẩm</option>
                    <option>Thực phẩm</option>
                    <option>Quà tặng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú thêm</label>
                <textarea placeholder="Mô tả yêu cầu chi tiết..." rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white text-slate-900"></textarea>
              </div>
              <button type="button" className="w-full bg-[var(--accent)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2">
                GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={20} />
              </button>
              <p className="text-center text-xs text-slate-500 mt-4">Cam kết bảo mật thông tin - Phản hồi trong 5 phút</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
