'use client';

import ContactForm from '../../components/ContactForm';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CheckCircle2, Package, ChevronDown, ArrowRight, ChevronUp } from 'lucide-react';
import { getIndustryPageData } from '../../lib/wp';
import SampleProductsSection from '../../components/SampleProductsSection';
import SafeHtml from '../../components/SafeHtml';

export default function IndustryClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getIndustryPageData('nganh-hang/my-pham-skincare');
        if (data) setPageData(data);
      } catch (error) {
        console.error('Lỗi khi tải trang:', error);
      }
    }
    loadData();
  }, []);

  const acf = pageData?.cauHinhChiTietNganhHang || {};
  const defaultFaqs = [
    { question: 'Có in số lượng nhỏ cho startup mỹ phẩm không?', answer: 'Chúng tôi nhận in từ 500 hộp/túi.' },
    { question: 'Có hỗ trợ thiết kế không?', answer: 'Có, thiết kế 3D miễn phí khi đặt in.' },
    { question: 'Bao lâu nhận hàng?', answer: 'Từ 7-10 ngày làm việc kể từ khi chốt thiết kế.' },
    { question: 'Chất liệu nào phù hợp mỹ phẩm?', answer: 'Giấy Ivory cán mờ kết hợp ép kim, UV spot hoặc hộp cứng bồi giấy mỹ thuật.' },
  ];
  const faqs = acf.faqs && acf.faqs.length > 0 ? acf.faqs : defaultFaqs;
  const whyList = acf.whyList && acf.whyList.length > 0 ? acf.whyList.map((w: any) => w.item) : [
    'Khách hàng mua mỹ phẩm bằng mắt — bao bì đẹp tăng tỷ lệ chuyển đổi',
    'Trải nghiệm unboxing — khách cảm thấy đang mở quà',
    'Ép kim, cán mờ, UV spot tạo hiệu ứng sang trọng',
    'Túi giấy đi kèm giúp branding hoàn thiện',
    'Thiết kế 3D miễn phí — duyệt trước khi in',
  ];
  const productsList = acf.productsList && acf.productsList.length > 0 ? acf.productsList : [
    { title: 'Hộp cứng nam châm', description: 'Đóng mở từ tính, lót nhung. Cho set mỹ phẩm.' },
    { title: 'Hộp giấy mỹ phẩm', description: 'In offset 4 màu, cán mờ. Cho sản phẩm đơn lẻ.' },
    { title: 'Túi giấy ivory', description: 'Cao cấp, dây xách cotton. Cho cửa hàng, spa.' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans">
      <section className="bg-slate-900 text-white py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-sm text-slate-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/nganh-hang" className="hover:text-white transition-colors">Ngành hàng</Link>
            <span>/</span>
            <span className="text-white">Mỹ Phẩm &amp; Skincare</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">{acf.heroTitle || 'Bao Bì Cho Ngành Mỹ Phẩm'}</h1>
          <p className="text-xl text-slate-300 max-w-2xl">{acf.heroSubtitle || 'Hộp cứng, túi giấy cao cấp — Nâng tầm thương hiệu mỹ phẩm'}</p>
        </div>
      </section>

      {/* San pham mau: loc theo tag "my-pham-skincare", fallback san pham moi nhat — dat ngay duoi hero */}
      <SampleProductsSection tag="my-pham-skincare" fallbackImages={acf.sampleImages?.nodes} />

      <section className="py-24 px-8 bg-[var(--bg)] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">{acf.introTitle || 'Bao Bì Cho Ngành Mỹ Phẩm'}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
          {acf.introContent ? (
            <SafeHtml className="text-[var(--text-dim)] text-lg leading-relaxed prose max-w-none" html={acf.introContent} />
          ) : (
            <p className="text-[var(--text-dim)] text-lg leading-relaxed">Bao bì mỹ phẩm là yếu tố quyết định ấn tượng đầu tiên của khách hàng.</p>
          )}
        </div>
      </section>

      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-12 text-center">{acf.whyTitle || 'Tại sao mỹ phẩm cần bao bì cao cấp?'}</h2>
          <div className="space-y-6">
            {whyList.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-1" size={24} />
                <p className="text-lg text-[var(--text-main)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">{acf.productsTitle || 'Sản phẩm phù hợp'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {productsList.map((prod: any, i: number) => (
              <div key={i} className="bg-white border border-[var(--border)] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow group">
                <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Package size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-main)] mb-4">{prod.title}</h3>
                <p className="text-[var(--text-dim)] mb-8 h-12">{prod.description}</p>
                <Link href={prod.link || '/san-pham'} className="text-[var(--accent)] font-bold flex items-center justify-center gap-2 w-full hover:opacity-80 transition-opacity">
                  Xem thêm <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--accent)] font-bold text-lg">{acf.pricingText || 'Hộp cứng từ 10.200đ. Túi giấy ivory từ 8.500đ. MOQ 500.'}</p>
        </div>
      </section>

      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">Câu hỏi thường gặp</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq: any, i: number) => (
              <div key={i} className="border border-[var(--border)] rounded-xl overflow-hidden bg-white">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-[var(--text-main)] hover:bg-[var(--card-bg)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.question || faq.q}
                  {openFaq === i ? <ChevronUp size={20} className="text-[var(--accent)]" /> : <ChevronDown size={20} className="text-[var(--text-dim)]" />}
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-[var(--text-dim)] leading-relaxed">{faq.answer || faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Nhận báo giá miễn phí</h2>
            <p className="text-slate-400">Phản hồi trong 5 phút</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <ContactForm showCompany={true} showIndustry={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
