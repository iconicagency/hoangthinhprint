// Rename san-pham/page.tsx → ProductsClient.tsx (Client Component with UI)
// This file is the Client Component moved from page.tsx
'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import Image from 'next/image';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchWP, getCategories, getPageBySlug } from '../lib/wp';
import Lightbox from '../components/Lightbox';

// Slugs thuộc nhóm sản phẩm — khớp với category thật trong WordPress
const PRODUCT_CATEGORY_SLUGS = new Set([
  'san-pham',
  'catalogue',
  'tui-giay',
  'hop-giay',
  'hop-cung',
  'hop-song',
  'hop-qua-tet',
  'hop-trung-thu',
]);

const CATEGORY_LABELS: Record<string, string> = {
  'catalogue': 'Catalogue',
  'tui-giay': 'Túi giấy',
  'hop-giay': 'Hộp giấy',
  'hop-cung': 'Hộp cứng',
  'hop-song': 'Hộp sóng',
  'hop-qua-tet': 'Hộp quà tết',
  'hop-trung-thu': 'Hộp Trung Thu',
};

// WPGraphQL gioi han 100 bai/query — phan trang cursor de lay het tat ca san pham
const GALLERY_QUERY = `
  query GetGallery($first: Int!, $categorySlug: String!, $after: String) {
    posts(first: $first, after: $after, where: {categoryName: $categorySlug, orderby: {field: DATE, order: DESC}}) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id title slug
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }
`;

// Gioi han 1500 bai (15 trang x 100 bai/trang)
async function fetchAllProducts(categorySlug: string, maxItems = 1500) {
  let all: any[] = [];
  let after: string | null = null;
  for (let i = 0; i < 15; i++) {
    const data: any = await fetchWP(GALLERY_QUERY, { variables: { first: 100, categorySlug, after } });
    const posts = data?.posts;
    if (!posts?.nodes?.length) break;
    all = all.concat(posts.nodes);
    if (!posts.pageInfo?.hasNextPage || all.length >= maxItems) break;
    after = posts.pageInfo.endCursor;
  }
  return all;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get('cat') || 'tat-ca';

  const [activeSlug, setActiveSlug] = useState(catFromUrl);
  const [cmsProducts, setCmsProducts] = useState<any[]>([]);
  const [wpCategories, setWpCategories] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, catsData, pData] = await Promise.all([
          // Fetch theo tat ca category slug (OR) + phan trang de vuot gioi han 100 bai
          fetchAllProducts('san-pham,catalogue,tui-giay,hop-giay,hop-cung,hop-song,hop-qua-tet,hop-trung-thu'),
          getCategories(),
          getPageBySlug('san-pham'),
        ]);
        if (productsData) setCmsProducts(productsData);
        if (catsData) {
          // Chỉ giữ lại categories thuộc nhóm sản phẩm, bỏ 'uncategorized' và 'san-pham' cha
          const productCats = catsData.filter((c: any) =>
            PRODUCT_CATEGORY_SLUGS.has(c.slug) && c.slug !== 'san-pham' && c.slug !== 'uncategorized'
          );
          setWpCategories(productCats);
        }
        if (pData) setPageData(pData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => { setActiveSlug(catFromUrl); }, [catFromUrl]);

  const products = cmsProducts.map(p => {
    const subCat = p.categories?.nodes?.find((c: any) => c.slug !== 'san-pham');
    return {
      id: p.id, title: p.title, slug: p.slug,
      categorySlug: subCat?.slug || '',
      categoryName: subCat?.name || 'Sản phẩm',
      allCategorySlugs: (p.categories?.nodes || []).map((c: any) => c.slug),
      img: p.featuredImage?.node?.sourceUrl || null,
    };
  });

  const filteredProducts = activeSlug === 'tat-ca'
    ? products : products.filter(p => p.allCategorySlugs.includes(activeSlug));

  const filterCategories = wpCategories.length > 0
    ? [{ slug: 'tat-ca', name: 'Tất cả', count: cmsProducts.length }, ...wpCategories]
    : [{ slug: 'tat-ca', name: 'Tất cả', count: 0 }, ...Object.entries(CATEGORY_LABELS).map(([slug, name]) => ({ slug, name, count: 0 }))];

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + filteredProducts.length) % filteredProducts.length : null), [filteredProducts.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % filteredProducts.length : null), [filteredProducts.length]);

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      {lightboxIndex !== null && <Lightbox items={filteredProducts} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />}

      <section className="relative py-20 px-8 bg-[var(--bg)] overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Sản phẩm</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">{pageData?.title || 'Tất cả sản phẩm'}</h1>
          {pageData?.content && <div className="text-[var(--text-dim)] mt-3 max-w-2xl text-lg" dangerouslySetInnerHTML={{ __html: pageData.content }} />}
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {filterCategories.map((cat) => (
            <Link key={cat.slug} href={cat.slug === 'tat-ca' ? '/san-pham' : `/san-pham?cat=${cat.slug}`} onClick={() => setActiveSlug(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeSlug === cat.slug ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--bg)] text-[var(--text-dim)] hover:bg-[var(--card-bg)] border border-[var(--border)]'}`}>
              {cat.name}{cat.count > 0 && <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>}
            </Link>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <div key={i} className="animate-pulse bg-slate-200 rounded-xl aspect-square"></div>)}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer" onClick={() => openLightbox(index)}>
                <div className="relative aspect-square overflow-hidden bg-[var(--bg)]">
                  {product.img ? (
                    <>
                      <Image src={product.img} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-full">Xem ảnh</span>
                      </div>
                    </>
                  ) : (
                    <ImagePlaceholder label="Chưa có ảnh" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[var(--text-main)] text-sm mb-1.5 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">{product.title}</h3>
                  <div className="text-xs font-medium text-[var(--accent)]">{product.categoryName}</div>
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

export default function ProductsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent)] border-t-transparent"></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
