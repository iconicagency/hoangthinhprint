'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { useSettings } from '../components/SettingsProvider';
import { getPageBySlug } from '../lib/wp';
import QuoteForm from '../components/QuoteForm';

export default function Contact() {
  const settings = useSettings();
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPageBySlug('lien-he');
        if (data) setPageData(data);
      } catch (error) {
        console.error('Lỗi khi tải trang liên hệ:', error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[var(--text-main)] font-sans">
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        {pageData?.featuredImage?.node?.sourceUrl ? (
          <div className="absolute inset-0">
            <img src={pageData.featuredImage.node.sourceUrl} className="w-full h-full object-cover opacity-10" alt="" />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/contact-hero/1920/1080')] bg-cover bg-center"></div>
        )}
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">{pageData?.title || 'Liên hệ'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">
            {pageData?.title || 'Liên hệ báo giá'}
          </h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">
            Đội ngũ tư vấn sẵn sàng hỗ trợ bạn trong 30 phút.
          </p>
        </div>
      </section>

      {pageData?.content && (
        <section className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="prose max-w-none bg-slate-50 p-8 rounded-3xl border border-[var(--border)]"
            dangerouslySetInnerHTML={{ __html: pageData.content }} />
        </section>
      )}

      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="lg:w-5/12">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">THÔNG TIN</div>
          <h2 className="text-4xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Kết nối với In Hoàng Thịnh</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mb-12"></div>

          <div className="space-y-8 mb-12">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)] font-bold uppercase tracking-wider mb-1">HOTLINE</div>
                <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="font-bold text-[var(--text-main)] text-lg hover:text-[var(--accent)] transition-colors">
                  {settings.contactPhone}
                </a>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)] font-bold uppercase tracking-wider mb-1">EMAIL</div>
                <a href={`mailto:${settings.contactEmail}`} className="font-bold text-[var(--text-main)] hover:text-[var(--accent)] transition-colors">
                  {settings.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <Building2 size={24} />
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)] font-bold uppercase tracking-wider mb-1">VĂN PHÒNG & XƯỜNG</div>
                <div className="text-[var(--text-main)] leading-relaxed">{settings.contactAddress}</div>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)] font-bold uppercase tracking-wider mb-1">MẠNG XÃ HỘI</div>
                <div className="flex gap-4 mt-1">
                  <a href={settings.facebookLink} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2 border border-[var(--border)] rounded-lg text-[var(--text-main)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--card-bg)] shadow-sm text-sm">
                    Facebook
                  </a>
                  <a href={settings.zaloLink} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2 border border-[var(--border)] rounded-lg text-[var(--text-main)] font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--card-bg)] shadow-sm text-sm">
                    Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-7/12">
          <div className="bg-[var(--card-bg)] p-8 md:p-10 rounded-3xl border border-[var(--border)] shadow-sm">
            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Gửi yêu cầu báo giá</h3>
            <p className="text-[var(--text-dim)] mb-8">Điền thông tin bên dưới — nhận phản hồi nhanh nhất.</p>
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
