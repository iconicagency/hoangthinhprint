'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getProductsByCategory, getCategories, getPageBySlug } from '../lib/wp';

const CATEGORY_LABELS: Record<string, string> = {
  'catalogue': 'Catalogue',
  'tui-giay': 'Túi giấy',
  'hop-giay': 'Hộp giấy',
  'hop-carton-lanh': 'Hộp carton lạnh',
  'hop-carton-song': 'Hộp carton sóng',
  'in-nhan-tem-decal': 'In nhãn - Tem decal',
  'hop-cung': 'Hộp cứng',
  'hop-trung-thu': 'Hộp Trung Thu',
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get('cat') || 'tat-ca';

  const [activeSlug, setActiveSlug] = useState(catFromUrl);
  const [cmsProducts, setCmsProducts] = useState<any[]>([]);
  const [wpCategories, setWpCategories] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, catsData, pData] = await Promise.all([
          getProductsByCategory("san-pham", 200),
          getCategories(),
          getPageBySlug('san-pham'),
        ]);
        if (productsData) setCmsProducts(productsData);
        if (catsData) setWpCategories(catsData.filter((c: any) => c.slug !== 'uncategorized'));
        if (pData) setPageData(pData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    setActiveSlug(catFromUrl);
  }, [catFromUrl]);

  const products = cmsProducts.map(p => {
    const subCat = p.categories?.nodes?.find((c: any) => c.slug !== 'san-pham');
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      categorySlug: subCat?.slug || '',
      categoryName: subCat?.name || 'Sản phẩm',
      img: p.featuredImage?.node?.sourceUrl || `https://picsum.photos/seed/${p.id}/400/400`,
    };
  });

  const filteredProducts = activeSlug === 'tat-ca'
    ? products
    : products.filter(p => p.categorySlug === activeSlug);

  const filterCategories = wpCategories.length > 0
    ? [{ slug: 'tat-ca', name: 'Tất cả', count: cmsProducts.length },
       ...wpCategories.filter(c => c.slug !== 'san-pham')]
    : [
        { slug: 'tat-ca', name: 'Tất cả', count: 0 },
        ...Object.entries(CATEGORY_LABELS).map(([slug, name]) => ({ slug, name, count: 0 })),
      ];

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      <section className="relative py-20 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Sản phẩm</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">
            {pageData?.title || 'Tất cả sản phẩm'}
          </h1>
          {pageData?.content && (
            <div className="text-[var(--text-dim)] mt-3 max-w-2xl text-lg"
              dangerouslySetInnerHTML={{ __html: pageData.content }} />
          )}
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {filterCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'tat-ca' ? '/san-pham' : `/san-pham?cat=${cat.slug}`}
              onClick={() => setActiveSlug(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeSlug === cat.slug
                  ? 'bg-[var(--accent)] text-[var(--bg)]'
                  : 'bg-[var(--bg)] text-[var(--text-dim)] hover:bg-[var(--card-bg)] border border-[var(--border)]'
              }`}
            >
              {cat.name}
              {cat.count > 0 && (
                <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>
              )}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-200 rounded-xl aspect-square"></div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-[var(--bg)]">
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[var(--text-main)] text-sm mb-1.5 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                    {product.title}
                  </h3>
                  <div className="text-xs font-medium text-[var(--accent)]">
                    {product.categoryName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 text-lg mb-2">Chưa có sản phẩm trong danh mục này.</p>
            <p className="text-slate-300 text-sm">Vui lòng thêm sản phẩm trên WordPress với danh mục tương ứng.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent)] border-t-transparent"></div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
