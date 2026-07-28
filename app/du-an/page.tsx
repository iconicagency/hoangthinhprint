'use client';

// Trang Du an tieu bieu
// - Uu tien: bai viet san pham gan tag "tieu-bieu" (chon san pham that tu muc Post)
// - Fallback: CPT "cacDuAn" nhu cu neu chua co bai nao gan tag
// - Filter danh muc tu dong build tu san pham dang hien thi
// - Hien thi dang SLIDE (dong bo voi trang /san-pham): moi khung toi da 16 san pham,
//   dieu huong bang nut Truoc/Sau. Du lieu da tai het tu dau (toi da 100 item gan tag
//   tieu-bieu) nen phan trang slide chi la cat mang phia client, khong can fetch them.

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { getProjects, getPageBySlug, fetchWP } from '../lib/wp';

const SLIDE_SIZE = 16;

const FEATURED_PRODUCTS_QUERY = `
  query GetFeaturedProducts($first: Int!) {
    posts(first: $first, where: {tag: "tieu-bieu", orderby: {field: DATE, order: DESC}}) {
      nodes {
        id title slug
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }
`;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [selectedImage, setSelectedImage] = useState<{img: string, title: string} | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [featuredData, projectsData, pData] = await Promise.all([
          fetchWP(FEATURED_PRODUCTS_QUERY, { variables: { first: 100 } }),
          getProjects(),
          getPageBySlug('du-an'),
        ]);
        if (pData) setPageData(pData);

        // Uu tien bai viet san pham gan tag "tieu-bieu"
        const featured = (featuredData?.posts?.nodes || [])
          .filter((p: any) => p?.featuredImage?.node?.sourceUrl)
          .map((p: any) => {
            const subCat = p.categories?.nodes?.find((c: any) => c.slug !== 'san-pham');
            return {
              id: p.id,
              title: p.title,
              tag: subCat?.name || 'Sản phẩm tiêu biểu',
              category: subCat?.name || 'Khác',
              img: p.featuredImage.node.sourceUrl,
            };
          });

        if (featured.length > 0) {
          setProducts(featured);
        } else if (projectsData?.length) {
          // Fallback: CPT du an cu
          setProducts(projectsData.map((p: any) => ({
            id: p.id,
            title: p.title,
            tag: p.thongtinduan?.nhanHienThi || 'Dự án',
            category: p.categories?.nodes?.[0]?.name || 'Dự án',
            img: p.featuredImage?.node?.sourceUrl || 'https://picsum.photos/seed/prod/400/400',
          })));
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dự án:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter danh muc: build tu dong tu san pham dang co
  const categories = ['Tất cả', ...Array.from(new Set(products.map(p => p.category))).sort()];

  const filteredProducts = activeCategory === 'Tất cả'
    ? products
    : products.filter(p => p.category === activeCategory);

  // Doi danh muc → quay ve slide dau
  useEffect(() => { setCurrentSlide(0); }, [activeCategory]);

  const totalSlides = Math.max(1, Math.ceil(filteredProducts.length / SLIDE_SIZE));
  const safeSlide = Math.min(currentSlide, totalSlides - 1);
  const isLastSlide = safeSlide >= totalSlides - 1;
  const visibleProducts = useMemo(
    () => filteredProducts.slice(safeSlide * SLIDE_SIZE, safeSlide * SLIDE_SIZE + SLIDE_SIZE),
    [filteredProducts, safeSlide]
  );

  const goToPrevSlide = () => setCurrentSlide(s => Math.max(0, s - 1));
  const goToNextSlide = () => setCurrentSlide(s => (s >= totalSlides - 1 ? s : s + 1));

  return (
    <div className="bg-[var(--bg)] text-[var(--text-main)] font-sans">

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[var(--accent)] transition-colors p-2 bg-white/10 rounded-full z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>

          <div
            className="relative w-full max-w-5xl aspect-auto max-h-[85vh] h-full mb-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.img}
              alt={selectedImage.title}
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
              unoptimized
            />
          </div>

          <div className="text-center z-10 max-w-4xl px-4">
            <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
              {selectedImage.title}
            </h3>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/factory-dark/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Dự án</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Dự án đã thực hiện</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">
            Sản phẩm thật — Đã giao cho hơn 500 doanh nghiệp trên toàn quốc
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Portfolio Header */}
        <div className="text-center mb-12">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            PORTFOLIO
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Sản phẩm tiêu biểu</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-6"></div>
          <p className="text-[var(--text-dim)] max-w-2xl mx-auto leading-relaxed">
            Mỗi sản phẩm đều được thiết kế riêng, in ấn tại xưởng và kiểm tra chất lượng bởi chủ xưởng trước khi giao.
          </p>
        </div>

        {/* Categories Filter */}
        {products.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[var(--accent)] text-[var(--bg)]'
                    : 'bg-[var(--bg)] text-[var(--text-dim)] hover:bg-[var(--card-bg)] border border-[var(--border)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Slide */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {[...Array(SLIDE_SIZE)].map((_, i) => <div key={i} className="animate-pulse bg-slate-200 rounded-xl aspect-square"></div>)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="relative">
              {/* Khung slide: toi da 16 san pham, chuyen slide co hieu ung fade + truot nhe */}
              <div key={safeSlide} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {visibleProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedImage({ img: product.img, title: product.title })}
                    className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[var(--bg)]">
                      <Image
                        src={product.img}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        unoptimized
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[var(--text-main)] text-sm mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                        {product.title}
                      </h3>
                      <div className="text-xs font-medium text-[var(--accent)]">
                        {product.tag}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Nut truot slide — chi hien khi co hon 1 slide */}
              {totalSlides > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevSlide}
                    disabled={safeSlide === 0}
                    aria-label="Slide trước"
                    className="hidden sm:flex absolute top-1/2 -left-5 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--border)] shadow-md hover:bg-[var(--card-bg)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={goToNextSlide}
                    disabled={isLastSlide}
                    aria-label="Slide sau"
                    className="hidden sm:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--border)] shadow-md hover:bg-[var(--card-bg)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </div>

            {/* Dieu huong slide tren mobile (khong co mui ten 2 ben nhu desktop) — chi hien khi co hon 1 slide */}
            {totalSlides > 1 && (
              <div className="mt-10 flex sm:hidden items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={goToPrevSlide}
                  disabled={safeSlide === 0}
                  className="inline-flex items-center gap-1.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-main)] font-medium px-4 py-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Trước
                </button>
                <button
                  type="button"
                  onClick={goToNextSlide}
                  disabled={isLastSlide}
                  className="inline-flex items-center gap-1.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-main)] font-medium px-4 py-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Sau
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 text-[var(--text-dim)]">
            Chưa có sản phẩm tiêu biểu. Gắn tag &quot;tieu-bieu&quot; vào bài viết sản phẩm trong WP Admin để hiển thị tại đây.
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-[var(--text-dim)] mb-6">Bạn muốn có sản phẩm tương tự? Liên hệ ngay để nhận báo giá miễn phí.</p>
          <Link href="/bao-gia" className="bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto shadow-lg shadow-[var(--accent)]/20 w-fit">
            Nhận báo giá miễn phí <ArrowRight size={18} />
          </Link>
        </div>

      </section>

      {/* Form Section */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Gửi yêu cầu báo giá</h2>
          </div>

          <div className="bg-[var(--bg)] p-8 md:p-10 rounded-3xl border border-[var(--border)] shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="0901 234 567" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Email</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Tên công ty</label>
                  <input type="text" placeholder="Công ty ABC" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Sản phẩm cần in</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]">
                    <option>-- Chọn --</option>
                    <option>Hộp cứng</option>
                    <option>Túi giấy</option>
                    <option>Hộp sóng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số lượng dự kiến</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]">
                    <option>-- Chọn --</option>
                    <option>500 - 1.000</option>
                    <option>1.000 - 5.000</option>
                    <option>&gt; 5.000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Ngành hàng</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]">
                    <option>-- Chọn --</option>
                    <option>Mỹ phẩm</option>
                    <option>Thực phẩm</option>
                    <option>Quà tặng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Ghi chú thêm</label>
                <textarea placeholder="Mô tả yêu cầu chi tiết..." rows={4} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"></textarea>
              </div>
              <button type="button" className="w-full bg-[var(--accent)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20">
                GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={20} />
              </button>
              <p className="text-center text-xs text-[var(--text-dim)] mt-4">Cam kết bảo mật thông tin - Phản hồi trong 5 phút</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
