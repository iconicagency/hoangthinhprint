'use client';

import ContactForm from '../../components/ContactForm';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CheckCircle2, Package, ChevronDown, ArrowRight, ChevronUp } from 'lucide-react';
import { getIndustryPageData } from '../../lib/wp';

export default function EcommercePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getIndustryPageData('nganh-hang/ecommerce');
        if (data) setPageData(data);
      } catch (error) {
        console.error("Loi khi tai trang:", error);
      }
    }
    loadData();
  }, []);

  const acf = pageData?.cauHinhChiTietNganhHang || {};
  const defaultFaqs = [
    { question: 'In logo may mau?', answer: 'Khuyen dung in 1-2 mau de toi uu chi phi.' },
    { question: 'Giao hang bao lau?', answer: 'Tu 7-10 ngay lam viec.' },
    { question: 'MOQ bao nhieu?', answer: 'MOQ la 500 hop.' },
    { question: 'Co thiet ke giup khong?', answer: 'Co, ho tro thiet ke layout mien phi.' },
  ];
  const faqs = acf.faqs && acf.faqs.length > 0 ? acf.faqs : defaultFaqs;
  const whyList = acf.whyList && acf.whyList.length > 0 ? acf.whyList.map((w: any) => w.item) : [
    'Hop in logo giup khach nho thuong hieu',
    'Tang trai nghiem unboxing — tang review tot',
    'Hop song chac chan — ship khong meo',
    'Gia chi tu 3.000d/hop — MOQ 500',
    'In 1-2 mau nhanh — giao trong 7-10 ngay'
  ];
  const productsList = acf.productsList && acf.productsList.length > 0 ? acf.productsList : [
    { title: 'Hop song nap gai', description: 'Pho bien nhat. In logo 1-2 mau. Tu 3.000d.' },
    { title: 'Hop song cuon', description: 'Cuon quanh san pham. Tiet kiem khong gian.' },
    { title: 'Tui giay kraft', description: 'Thay the tui nilon. Eco-friendly. Tu 1.500d.' }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans">
      <section className="bg-slate-900 text-white py-20 px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-sm text-slate-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chu</Link>
            <span>/</span><Link href="/nganh-hang" className="hover:text-white transition-colors">Nganh hang</Link>
            <span>/</span><span className="text-white">Ecommerce</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">{acf.heroTitle || 'Hop Ship Hang Cho Ecommerce'}</h1>
          <p className="text-xl text-slate-300 max-w-2xl">{acf.heroSubtitle || 'Hop song in logo brand — Ship khong meo — Gia tu 3.000d'}</p>
        </div>
      </section>
      <section className="py-24 px-8 bg-[var(--bg)] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">{acf.introTitle || 'Hop Ship Hang Cho Ecommerce'}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
          {acf.introContent ? (
            <div className="text-[var(--text-dim)] text-lg leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: acf.introContent }} />
          ) : (
            <p className="text-[var(--text-dim)] text-lg leading-relaxed">Seller Shopee, TikTok Shop can hop ship hang co logo rieng de xay dung thuong hieu.</p>
          )}
        </div>
      </section>
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-12 text-center">{acf.whyTitle || 'Tai sao ecommerce can hop rieng?'}</h2>
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">{acf.productsTitle || 'San pham phu hop'}</h2>
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
                  Xem them <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-[var(--accent)] font-bold text-lg">{acf.pricingText || 'Hop song tu 3.000d/hop. Tui kraft tu 1.500d. MOQ 500.'}</p>
        </div>
      </section>
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">San pham mau</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {acf.sampleImages?.nodes?.length > 0 ? acf.sampleImages.nodes.map((img: any, i: number) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] group">
                <Image src={img.sourceUrl} alt={`Sample ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            )) : [1,2,3,4].map((i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] group">
                <Image src={`https://picsum.photos/seed/ecommerce${i}/400/400`} alt={`Sample ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">{acf.faqTitle || 'Cau hoi thuong gap'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq: any, i: number) => (
              <div key={i} className="border border-[var(--border)] rounded-xl overflow-hidden bg-white">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-[var(--text-main)] hover:bg-[var(--card-bg)] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.question || faq.q}
                  {openFaq === i ? <ChevronUp size={20} className="text-[var(--accent)]" /> : <ChevronDown size={20} className="text-[var(--text-dim)]" />}
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-[var(--text-dim)] leading-relaxed">{faq.answer || faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Form - ket noi /api/bao-gia */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Nhan bao gia mien phi</h2>
            <p className="text-slate-400">Phan hoi trong 5 phut</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <ContactForm showCompany={true} showIndustry={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
