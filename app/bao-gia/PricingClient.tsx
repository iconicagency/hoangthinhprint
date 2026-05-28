'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug } from '../lib/wp';
import QuoteForm from '../components/QuoteForm';

export default function PricingClient() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPageBySlug('bao-gia');
        if (data) setPageData(data);
      } catch (error) {
        console.error('Lỗi khi tải trang báo giá:', error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        {pageData?.featuredImage?.node?.sourceUrl ? (
          <div className="absolute inset-0">
            <Image src={pageData.featuredImage.node.sourceUrl} alt="" fill className="object-cover opacity-10" referrerPolicy="no-referrer" />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/calculator/1920/1080')] bg-cover bg-center"></div>
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">{pageData?.title || 'Bảng giá'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">{pageData?.title || 'Bảng giá sản phẩm'}</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">Giá tham khảo — Liên hệ để nhận báo giá chính xác cho đơn hàng của bạn.</p>
        </div>
      </section>

      {pageData?.content && (
        <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="prose max-w-none bg-white p-8 rounded-2xl border border-[var(--border)] shadow-sm" dangerouslySetInnerHTML={{ __html: pageData.content }} />
        </section>
      )}

      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-[var(--border)]"><h2 className="text-xl font-bold text-[var(--text-main)]">Hộp cứng cao cấp</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="py-4 px-6 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider w-1/2">Sản phẩm</th>
                <th className="py-4 px-6 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider text-right">Giá gốc</th>
                <th className="py-4 px-6 text-xs font-bold text-[var(--accent)] uppercase tracking-wider text-right">Giá ưu đãi</th>
              </tr></thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[['Âm dương thanh quay','53.200đ','39.200đ'],['Âm dương 25x33','28.000đ','17.800đ'],['Âm dương 15x15','17.000đ','10.200đ'],['Nam châm 20x15','27.200đ','18.000đ'],['Nam châm 24x32','39.800đ','30.400đ'],['Bao diêm 20x24','33.200đ','21.500đ'],['Bao diêm 12x8.5','20.000đ','11.900đ']].map(([n,o,s]) => (
                  <tr key={n} className="hover:bg-[var(--bg)] transition-colors">
                    <td className="py-4 px-6 text-[var(--text-main)] font-medium">{n}</td>
                    <td className="py-4 px-6 text-[var(--text-dim)] line-through text-right">{o}</td>
                    <td className="py-4 px-6 text-[var(--accent)] font-bold text-right">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-[var(--border)]"><h2 className="text-xl font-bold text-[var(--text-main)]">Túi giấy thương hiệu</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="py-4 px-6 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider w-2/3">Sản phẩm</th>
                <th className="py-4 px-6 text-xs font-bold text-[var(--accent)] uppercase tracking-wider text-right">Giá ưu đãi</th>
              </tr></thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[['Cao cấp Ivory','8.500đ'],['Trung cấp Couche','4.200đ'],['Giá rẻ Kraft','1.500đ']].map(([n,p]) => (
                  <tr key={n} className="hover:bg-[var(--bg)] transition-colors">
                    <td className="py-4 px-6 text-[var(--text-main)] font-medium">{n}</td>
                    <td className="py-4 px-6 text-[var(--accent)] font-bold text-right">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-[var(--border)]"><h2 className="text-xl font-bold text-[var(--text-main)]">Hộp sóng carton</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="py-4 px-6 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider w-2/3">Sản phẩm</th>
                <th className="py-4 px-6 text-xs font-bold text-[var(--accent)] uppercase tracking-wider text-right">Giá ưu đãi</th>
              </tr></thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[['Nắp gài 30x20','3.000đ'],['Nắp gài 40x30','4.500đ'],['Cuộn','3.500đ']].map(([n,p]) => (
                  <tr key={n} className="hover:bg-[var(--bg)] transition-colors">
                    <td className="py-4 px-6 text-[var(--text-main)] font-medium">{n}</td>
                    <td className="py-4 px-6 text-[var(--accent)] font-bold text-right">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-serif text-[var(--text-main)] mb-2 tracking-tight">Nhận báo giá chính xác</h2>
          <p className="text-[var(--text-dim)] mb-8">Để lại thông tin, chuyên viên sẽ liên hệ và báo giá chi tiết trong vòng 5 phút.</p>
          <QuoteForm />
        </div>
      </section>
    </div>
  );
}
