// ProductsClient.tsx — Client Component trang san pham
// - Danh muc lay DONG tu WordPress (children cua category san-pham)
//   → them/xoa/doi ten danh muc trong WP Admin, filter tu cap nhat
// - Fetch theo category dang xem + phan trang cursor (nut Xem them)
// - Filter mobile: 1 hang truot ngang (snap, an scrollbar), desktop: wrap
'use client';

import { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import Image from 'next/image';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchWP, getPageBySlug } from '../lib/wp';
import Lightbox from '../components/Lightbox';

const PER_PAGE = 100; // WPGraphQL gioi han toi da 100 bai/query

// Fallback khi khong ket noi duoc WP — khop voi danh muc trong admin
const FALLBACK_CATS = [
  { slug: 'catalogue', name: 'Catalogue', count: 0 },
  { slug: 'hop-carton-lanh', name: 'Hộp carton lạnh', count: 0 },
  { slug: 'hop-carton-song', name: 'Hộp carton sóng', count: 0 },
  { slug: 'hop-giay', name: 'Hộp giấy', count: 0 },
  { slug: 'hop-qua-tet', name: 'Hộp quà tết', count: 0 },
  { slug: 'hop-trung-thu', name: 'Hộp trung thu', count: 0 },
  { slug: 'kep-file', name: 'Kẹp file', count: 0 },
  { slug: 'name-card', name: 'Name card', count: 0 },
  { slug: 'phong-bi', name: 'Phong bì', count: 0 },
  { slug: 'tui-giay', name: 'Túi giấy', count: 0 },
];

// Lay danh muc con cua "san-pham" truc tiep tu WordPress
const PRODUCT_CATS_QUERY = `
  query GetProductCats {
    category(id: "san-pham", idType: SLUG) {
      children(first: 50) {
        nodes { name slug count }
      }
    }
  }
`;

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

function ProductsContent() {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get('cat') || 'tat-ca';

  const [activeSlug, setActiveSlug] = useState(catFromUrl);
  const [cmsProducts, setCmsProducts] = useState<any[]>([]);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [wpCategories, setWpCategories] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Danh muc + page info: chi tai 1 lan
  useEffect(() => {
    async function loadMeta() {
      try {
        const [catsData, pData] = await Promise.all([
          fetchWP(PRODUCT_CATS_QUERY),
          getPageBySlug('san-pham'),
        ]);
        const children = catsData?.category?.children?.nodes;
        if (children?.length) setWpCategories(children);
        if (pData) setPageData(pData);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    }
    loadMeta();
  }, []);

  // Dong bo activeSlug voi URL (?cat=...)
  useEffect(() => { setActiveSlug(catFromUrl); }, [catFromUrl]);

  // Tu cuon thanh filter toi danh muc dang chon (mobile truot ngang)
  useEffect(() => {
    const el = filterRef.current?.querySelector(`[data-slug="${activeSlug}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeSlug, wpCategories.length]);

  // Moi khi doi category: reset va tai trang dau tien
  // "Tat ca" fetch theo slug cha "san-pham" — WordPress tu bao gom moi danh muc con
  useEffect(() => {
    let cancelled = false;
    async function loadFirstPage() {
      setLoading(true);
      setCmsProducts([]);
      setHasNextPage(false);
      setEndCursor(null);
      try {
        const slugParam = activeSlug === 'tat-ca' ? 'san-pham' : activeSlug;
        const data: any = await fetchWP(GALLERY_QUERY, { variables: { first: PER_PAGE, categorySlug: slugParam, after: null } });
        if (cancelled) return;
        const posts = data?.posts;
        setCmsProducts(posts?.nodes || []);
        setHasNextPage(!!posts?.pageInfo?.hasNextPage);
        setEndCursor(posts?.pageInfo?.endCursor || null);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadFirstPage();
    return () => { cancelled = true; };
  }, [activeSlug]);

  // Nut "Xem them": tai trang tiep theo
  const loadMore = useCallback(async () => {
    if (!hasNextPage || loadingMore || !endCursor) return;
    setLoadingMore(true);
    try {
      const slugParam = activeSlug === 'tat-ca' ? 'san-pham' : activeSlug;
      const data: any = await fetchWP(GALLERY_QUERY, { variables: { first: PER_PAGE, categorySlug: slugParam, after: endCursor } });
      const posts = data?.posts;
      if (posts?.nodes?.length) {
        setCmsProducts(prev => [...prev, ...posts.nodes]);
      }
      setHasNextPage(!!posts?.pageInfo?.hasNextPage);
      setEndCursor(posts?.pageInfo?.endCursor || null);
    } catch (error) {
      console.error('Lỗi khi tải thêm sản phẩm:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [activeSlug, endCursor, hasNextPage, loadingMore]);

  const products = cmsProducts.map(p => {
    const subCat = p.categories?.nodes?.find((c: any) => c.slug !== 'san-pham');
    return {
      id: p.id, title: p.title, slug: p.slug,
      categorySlug: subCat?.slug || '',
      categoryName: subCat?.name || 'Sản phẩm',
      img: p.featuredImage?.node?.sourceUrl || null,
    };
  });

  const cats = wpCategories.length > 0 ? wpCategories : FALLBACK_CATS;
  const totalCount = cats.reduce((sum: number, c: any) => sum + (c.count || 0), 0);
  const filterCategories = [{ slug: 'tat-ca', name: 'Tất cả', count: totalCount }, ...cats];

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + products.length) % products.length : null), [products.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % products.length : null), [products.length]);

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      {lightboxIndex !== null && <Lightbox items={products} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />}

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
        {/* Filter danh muc:
            - Mobile: 1 hang truot ngang, snap tung chip, an scrollbar, gradient mo 2 mep bao hieu con noi dung
            - Desktop (md+): wrap nhieu hang nhu cu */}
        <div className="relative mb-12">
          <div
            ref={filterRef}
            className="flex md:flex-wrap flex-nowrap gap-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0 pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {filterCategories.map((cat: any) => (
              <Link
                key={cat.slug}
                data-slug={cat.slug}
                href={cat.slug === 'tat-ca' ? '/san-pham' : `/san-pham?cat=${cat.slug}`}
                onClick={() => setActiveSlug(cat.slug)}
                className={`snap-start shrink-0 md:shrink whitespace-nowrap px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm font-medium transition-colors ${activeSlug === cat.slug ? 'bg-[var(--accent)] text-[var(--bg)] shadow-md shadow-[var(--accent)]/25' : 'bg-[var(--bg)] text-[var(--text-dim)] hover:bg-[var(--card-bg)] border border-[var(--border)]'}`}
              >
                {cat.name}{cat.count > 0 && <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>}
              </Link>
            ))}
          </div>
          {/* Gradient mo 2 mep — chi mobile, bao hieu vuot ngang de xem them */}
          <div className="md:hidden pointer-events-none absolute inset-y-0 -left-4 w-6 bg-gradient-to-r from-slate-50 to-transparent"></div>
          <div className="md:hidden pointer-events-none absolute inset-y-0 -right-4 w-10 bg-gradient-to-l from-slate-50 to-transparent"></div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <div key={i} className="animate-pulse bg-slate-200 rounded-xl aspect-square"></div>)}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div key={product.id} className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer" onClick={() => openLightbox(index)}>
                  <div className="relative aspect-square overflow-hidden bg-[var(--bg)]">
                    {product.img ? (
                      <>
                        <Image src={product.img} alt={product.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
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

            {hasNextPage && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 bg-[var(--accent)] text-white font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loadingMore ? (
                    <><span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>Đang tải...</>
                  ) : (
                    <>Xem thêm sản phẩm</>
                  )}
                </button>
                <p className="text-slate-400 text-sm mt-3">Đã hiển thị {products.length} sản phẩm</p>
              </div>
            )}
          </>
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
