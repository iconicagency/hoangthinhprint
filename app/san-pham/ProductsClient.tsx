// ProductsClient.tsx — Client Component trang san pham
// - Nhan initialData render san tu server (page.tsx) → san pham hien ngay trong HTML,
//   khong con man hinh cho + fetch chain khi mo trang
// - Hien thi dang SLIDE: moi khung slide toi da 16 san pham, dieu huong bang nut Truoc/Sau
//   (thay cho infinite scroll cu). Khi sang slide chua tai, tu dong fetch tiep tu WP (cursor).
// - Neu server render fail (initialData rong) → client tu fetch lai nhu cu
// - Query/hang so dung chung nam o ./queries.ts (KHONG import nguoc tu file use client)
'use client';

import { useState, useEffect, Suspense, useCallback, useRef } from 'react';
import Image from 'next/image';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { fetchWP, getPageBySlug } from '../lib/wp';
import Lightbox from '../components/Lightbox';
import SafeHtml from '../components/SafeHtml';
import { PER_PAGE, PRODUCT_CATS_QUERY, GALLERY_QUERY, type ProductsInitialData } from './queries';

// So san pham toi da tren moi khung slide
const SLIDE_SIZE = PER_PAGE;

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

function ProductsContent({ initialData }: { initialData?: ProductsInitialData }) {
  const searchParams = useSearchParams();
  const catFromUrl = searchParams.get('cat') || 'tat-ca';

  // Chi dung initialData khi server render DUNG category dang xem VA co san pham that
  // (server fail → products rong → de client tu fetch lai)
  const hasInitial = !!initialData && initialData.cat === catFromUrl && initialData.products.length > 0;

  const [activeSlug, setActiveSlug] = useState(catFromUrl);
  const [cmsProducts, setCmsProducts] = useState<any[]>(hasInitial ? initialData!.products : []);
  const [endCursor, setEndCursor] = useState<string | null>(hasInitial ? initialData!.endCursor : null);
  const [hasNextPage, setHasNextPage] = useState(hasInitial ? initialData!.hasNextPage : false);
  const [wpCategories, setWpCategories] = useState<any[]>(initialData?.categories?.length ? initialData.categories : []);
  const [pageData, setPageData] = useState<any>(initialData?.pageData || null);
  const [loading, setLoading] = useState(!hasInitial);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const skipFirstLoadRef = useRef(hasInitial);

  // Danh muc + page info: chi tai khi server chua cung cap
  useEffect(() => {
    if (initialData?.categories?.length) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dong bo activeSlug voi URL (?cat=...)
  useEffect(() => { setActiveSlug(catFromUrl); }, [catFromUrl]);

  // Tu cuon thanh filter toi danh muc dang chon (mobile truot ngang)
  useEffect(() => {
    const el = filterRef.current?.querySelector(`[data-slug="${activeSlug}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeSlug, wpCategories.length]);

  // Moi khi doi category: reset ve slide dau va tai lai tu WP
  // (bo qua lan dau neu server da render san — tranh fetch trung)
  useEffect(() => {
    if (skipFirstLoadRef.current) {
      skipFirstLoadRef.current = false;
      return;
    }
    let cancelled = false;
    async function loadFirstPage() {
      setLoading(true);
      setCmsProducts([]);
      setHasNextPage(false);
      setEndCursor(null);
      setCurrentSlide(0);
      try {
        const slugParam = activeSlug === 'tat-ca' ? 'san-pham' : activeSlug;
        const data: any = await fetchWP(GALLERY_QUERY, { variables: { first: SLIDE_SIZE, categorySlug: slugParam, after: null } });
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

  // Tai them 1 trang du lieu tu WP (cursor pagination) — noi vao cuoi danh sach da co
  const loadMore = useCallback(async () => {
    if (!hasNextPage || loadingMore || !endCursor) return;
    setLoadingMore(true);
    try {
      const slugParam = activeSlug === 'tat-ca' ? 'san-pham' : activeSlug;
      const data: any = await fetchWP(GALLERY_QUERY, { variables: { first: SLIDE_SIZE, categorySlug: slugParam, after: endCursor } });
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

  // Tong so slide duoc tinh tu so luong that cua danh muc (count trong WP) — chinh xac
  // ngay ca khi chua tai het du lieu, thay vi phai doan qua hasNextPage.
  const activeCatObj = filterCategories.find((c: any) => c.slug === activeSlug);
  const totalItems = activeCatObj?.count || products.length;
  const totalSlides = Math.max(1, Math.ceil(totalItems / SLIDE_SIZE));
  const isLastSlide = currentSlide >= totalSlides - 1;

  const visibleProducts = products.slice(currentSlide * SLIDE_SIZE, currentSlide * SLIDE_SIZE + SLIDE_SIZE);

  // Chuyen slide truoc — da co san trong bo nho, khong can fetch
  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
  }, []);

  // Chuyen slide sau — neu chua du du lieu cho slide ke tiep va con trang tren WP thi tu tai them
  const goToNextSlide = useCallback(async () => {
    if (isLastSlide || loadingMore) return;
    const nextSlide = currentSlide + 1;
    const needed = (nextSlide + 1) * SLIDE_SIZE;
    if (products.length < needed && hasNextPage) {
      await loadMore();
    }
    setCurrentSlide(nextSlide);
  }, [isLastSlide, loadingMore, currentSlide, products.length, hasNextPage, loadMore]);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + visibleProducts.length) % visibleProducts.length : null), [visibleProducts.length]);
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % visibleProducts.length : null), [visibleProducts.length]);

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      {lightboxIndex !== null && <Lightbox items={visibleProducts} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />}

      <section className="relative py-20 px-8 bg-[var(--bg)] overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Sản phẩm</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">{pageData?.title || 'Tất cả sản phẩm'}</h1>
          {pageData?.content && <SafeHtml className="text-[var(--text-dim)] mt-3 max-w-2xl text-lg" html={pageData.content} />}
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {[...Array(SLIDE_SIZE)].map((_, i) => <div key={i} className="animate-pulse bg-slate-200 rounded-xl aspect-square"></div>)}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="relative">
              {/* Khung slide: toi da 16 san pham, chuyen slide co hieu ung fade + truot nhe */}
              <div key={currentSlide} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {visibleProducts.map((product, index) => (
                  <div key={product.id} className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer" onClick={() => openLightbox(index)}>
                    <div className="relative aspect-square overflow-hidden bg-[var(--bg)]">
                      {product.img ? (
                        <>
                          <Image src={product.img} alt={product.title} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
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

              {/* Nut truot slide — 2 mui ten canh giua theo chieu doc, an dong tren mobile lan desktop */}
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={currentSlide === 0}
                aria-label="Slide trước"
                className="hidden sm:flex absolute top-1/2 -left-5 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--border)] shadow-md hover:bg-[var(--card-bg)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                type="button"
                onClick={goToNextSlide}
                disabled={isLastSlide || loadingMore}
                aria-label="Slide sau"
                className="hidden sm:flex absolute top-1/2 -right-5 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-white border border-[var(--border)] shadow-md hover:bg-[var(--card-bg)] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {loadingMore ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-[var(--accent)] border-t-transparent"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                )}
              </button>
            </div>

            {/* Dieu huong slide + trang hien tai — luon hien, ca mobile (thay the nut mui ten khi khong du cho) */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goToPrevSlide}
                disabled={currentSlide === 0}
                className="sm:hidden inline-flex items-center gap-1.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-main)] font-medium px-4 py-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Trước
              </button>
              <span className="text-sm font-medium text-[var(--text-dim)] tabular-nums">
                Slide {currentSlide + 1} / {totalSlides}
              </span>
              <button
                type="button"
                onClick={goToNextSlide}
                disabled={isLastSlide || loadingMore}
                className="sm:hidden inline-flex items-center gap-1.5 bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-main)] font-medium px-4 py-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Sau
                {loadingMore ? (
                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[var(--accent)] border-t-transparent"></span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                )}
              </button>
            </div>
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

export default function ProductsClient({ initialData }: { initialData?: ProductsInitialData }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent)] border-t-transparent"></div></div>}>
      <ProductsContent initialData={initialData} />
    </Suspense>
  );
}
