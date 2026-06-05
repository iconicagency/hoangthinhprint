'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, Sparkles, Heart, Gift, ShoppingCart, Briefcase, Coffee, Star, Shield } from 'lucide-react';
import { getNganhHangPageData, getPageBySlug } from '../lib/wp';

const iconMap: Record<string, any> = {
  Package, Sparkles, Heart, Gift, ShoppingCart, Briefcase, Coffee, Star, Shield
};

const defaultIndustries = [
  { title: 'TPCN & Dược phẩm', description: 'Hộp giấy, hộp cứng cao cấp bảo vệ sản phẩm, tăng độ tin cậy cho thương hiệu.', icon: 'Package', link: '/nganh-hang/tpcn-duoc-pham', img: 'https://picsum.photos/seed/pharma/600/400' },
  { title: 'Mỹ phẩm & Skincare', description: 'Bao bì sang trọng, ép kim, cán mờ tôn lên vẻ đẹp của sản phẩm làm đẹp.', icon: 'Sparkles', link: '/nganh-hang/my-pham-skincare', img: 'https://picsum.photos/seed/cosmetic/600/400' },
  { title: 'Yến sào', description: 'Hộp cứng lót nhung, thiết kế truyền thống kết hợp hiện đại, xứng tầm sản vật quý.', icon: 'Heart', link: '/nganh-hang/yen-sao', img: 'https://picsum.photos/seed/yensao/600/400' },
  { title: 'Trang sức & Quà tặng', description: 'Hộp cứng nhỏ gọn, tinh xảo, đóng mở nam châm tạo trải nghiệm unboxing đẳng cấp.', icon: 'Gift', link: '/nganh-hang/trang-suc-qua-tang', img: 'https://picsum.photos/seed/jewelry/600/400' },
  { title: 'Ecommerce', description: 'Hộp sóng in logo, chắc chắn, bảo vệ hàng hóa trong vận chuyển với chi phí tối ưu.', icon: 'ShoppingCart', link: '/nganh-hang/ecommerce', img: 'https://picsum.photos/seed/ecommerce/600/400' },
];

export default function Industries() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        let data = await getNganhHangPageData();
        if (!data?.cauHinhTrangNganhHang) {
          const basicData = await getPageBySlug('nganh-hang');
          if (basicData) data = basicData;
        }
        if (data) setPageData(data);
      } catch (error) {
        console.error("Loi khi tai trang nganh hang:", error);
      }
    }
    loadData();
  }, []);

  const acf = pageData?.cauHinhTrangNganhHang;
  // Fix: dung danhsachnganhhang (lowercase) theo GraphQL schema
  const industriesToDisplay = acf?.danhsachnganhhang || defaultIndustries;

  return (
    <div className="min-h-screen bg-white text-[var(--text-main)] font-sans">
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/industry/1920/1080')] bg-cover bg-center">
          {pageData?.featuredImage?.node?.sourceUrl && (
            <img src={pageData.featuredImage.node.sourceUrl} className="w-full h-full object-cover" alt="" />
          )}
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">{acf?.heroTitle || pageData?.title || 'Ngành hàng'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">{acf?.heroTitle || pageData?.title || 'Giải pháp bao bì theo ngành hàng'}</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">
            {acf?.heroSubtitle || 'Thiết kế và sản xuất bao bì chuyên biệt, tối ưu cho từng lĩnh vực kinh doanh.'}
          </p>
        </div>
      </section>

      {pageData?.content && (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="prose max-w-none bg-slate-50 p-8 rounded-3xl border border-[var(--border)]" dangerouslySetInnerHTML={{ __html: pageData.content }} />
        </section>
      )}

      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industriesToDisplay.map((industry: any, index: number) => {
            const IconComp = iconMap[industry.icon] || Package;
            // ACF image: industry.image?.node?.sourceUrl
            // Fallback: industry.img (default array) hoac picsum
            const imgSrc = industry.image?.node?.sourceUrl || industry.img || `https://picsum.photos/seed/indus${index}/600/400`;
            return (
              <Link href={industry.link || '#'} key={index} className="group bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md hover:border-[var(--accent)] transition-all flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <Image src={imgSrc} alt={industry.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[var(--accent)] shadow-sm">
                    <IconComp size={24} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-xl text-[var(--text-main)] mb-3 group-hover:text-[var(--accent)] transition-colors">{industry.title}</h3>
                  <p className="text-[var(--text-dim)] text-sm mb-6 flex-1">{industry.description || industry.desc}</p>
                  <div className="mt-auto">
                    <span className="text-[var(--accent)] font-bold text-sm flex items-center gap-2 group-hover:opacity-80 transition-opacity">
                      Xem chi tiết <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
