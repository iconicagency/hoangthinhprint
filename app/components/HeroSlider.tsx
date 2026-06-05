'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  img: string;
  tagline?: string;
  title?: string;
  subtitle?: string;
  buttons?: { label: string; link: string }[];
  benefits?: { title: string; subtitle?: string }[];
}

const DEFAULT_BUTTONS = [
  { label: 'Xem sản phẩm', link: '/san-pham' },
  { label: 'Nhận báo giá miễn phí', link: '/bao-gia' },
];

const DEFAULT_BENEFITS = [
  { title: 'Thiết kế 3D miễn phí', subtitle: '' },
  { title: 'In mẫu test màu', subtitle: '' },
  { title: 'Giao hàng tận nơi', subtitle: '' },
  { title: 'Giá gốc tại xưởng', subtitle: '' },
];

function buildSlides(dynamicHero: any): Slide[] {
  // buttons & benefits là toàn cục, không per-slide
  const buttons: { label: string; link: string }[] =
    dynamicHero?.heroButtons?.length ? dynamicHero.heroButtons : DEFAULT_BUTTONS;

  const benefits: { title: string; subtitle?: string }[] =
    dynamicHero?.heroBenefits?.length
      ? dynamicHero.heroBenefits.map((b: any) =>
          typeof b === 'string' ? { title: b, subtitle: '' } : b
        )
      : DEFAULT_BENEFITS;

  // Ưu tiên heroSlidesList — mỗi slide có ảnh + text riêng từ WP
  const slidesList = dynamicHero?.heroSlidesList;
  if (Array.isArray(slidesList) && slidesList.length > 0) {
    const validSlides = slidesList
      .filter((s: any) => s?.slideImage)
      .map((s: any) => ({
        img: s.slideImage,
        // Chỉ set nếu WP thực sự nhập text — không fallback về DEFAULT
        tagline: s.slideTagline?.trim() || undefined,
        title: s.slideTitle?.trim() || undefined,
        subtitle: s.slideSubtitle?.trim() || undefined,
        buttons,
        benefits,
      }));
    if (validSlides.length > 0) return validSlides;
  }

  // Fallback: heroSlides (Gallery field cũ) — shared text từ heroTitle/heroSubtitle
  const heroSlides = dynamicHero?.heroSlides;
  if (Array.isArray(heroSlides) && heroSlides.length > 0) {
    const sharedText = {
      tagline: dynamicHero.heroTagline?.trim() || undefined,
      title: dynamicHero.heroTitle?.trim() || undefined,
      subtitle: dynamicHero.heroSubtitle?.trim() || undefined,
    };
    return heroSlides
      .filter(Boolean)
      .map((img: string) => ({ img, ...sharedText, buttons, benefits }));
  }

  // Không có WP data — hiện slide mặc định có đầy đủ text
  return [{
    img: '',
    tagline: 'GIẢI PHÁP IN ẤN BAO BÌ TRỌN GÓI',
    title: 'Giải pháp bao bì toàn diện cho doanh nghiệp',
    subtitle: 'Thiết kế sáng tạo - In ấn chất lượng - Giao hàng đúng hẹn. Đối tác tin cậy của hơn 500+ thương hiệu.',
    buttons,
    benefits,
  }];
}

export default function HeroSlider({ dynamicHero }: { dynamicHero?: any }) {
  const slides = buildSlides(dynamicHero);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next, slides.length]);

  const slide = slides[current];

  // Slide có text khi có ít nhất title hoặc subtitle
  const hasText = !!(slide.title || slide.subtitle);

  return (
    <section
      className="relative overflow-hidden bg-slate-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Mobile: aspect-ratio 4/3; Desktop: height cố định 750px */}
      <div className="aspect-[4/3] md:aspect-auto md:h-[750px] relative">

        {/* Slides background */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
          >
            {s.img ? (
              <Image
                src={s.img}
                alt={s.title || 'In Hoàng Thịnh'}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-center"
                priority={i === 0}
                referrerPolicy="no-referrer"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-red-950" />
            )}
            {/* Desktop overlay — luôn hiện để text dễ đọc */}
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
            {/* Mobile overlay — chỉ gradient đáy để button dễ đọc */}
            <div className="absolute inset-0 md:hidden bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          </div>
        ))}

        {/* ── DESKTOP CONTENT ── */}
        <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center">
          <div className="max-w-5xl mx-auto px-8 text-center" key={current}>

            {/* Tagline — chỉ hiện nếu có */}
            {slide.tagline && (
              <div className="inline-block border border-[var(--accent)] text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-[var(--accent)]/80 backdrop-blur-sm mb-8 shadow-lg">
                {slide.tagline}
              </div>
            )}

            {/* Title + subtitle — chỉ render nếu slide có text */}
            {hasText && (
              <>
                {slide.title && (
                  <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight drop-shadow-xl">
                    {slide.title}
                  </h1>
                )}
                {slide.subtitle && (
                  <p className="text-gray-200 mb-10 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                )}
              </>
            )}

            {/* Buttons — luôn hiện */}
            {slide.buttons && slide.buttons.length > 0 && (
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${hasText ? '' : 'mt-0'}`}>
                {slide.buttons.map((btn, idx) => (
                  <Link key={idx} href={btn.link}
                    className={idx === 0
                      ? "bg-[var(--accent)] text-white px-10 py-4 rounded-lg font-bold hover:scale-105 transition-all shadow-xl shadow-[var(--accent)]/30 flex items-center justify-center gap-2 text-lg"
                      : "bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center text-lg shadow-lg"
                    }>
                    {btn.label} {idx === 0 && <ArrowRight size={20} />}
                  </Link>
                ))}
              </div>
            )}

            {/* Benefits — luôn hiện */}
            {slide.benefits && slide.benefits.length > 0 && (
              <div className="mt-14 grid grid-cols-4 gap-6 text-base text-gray-200 font-medium">
                {slide.benefits.map((b, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="font-bold text-white text-lg">{b.title}</span>
                    {b.subtitle && <span className="text-gray-300 text-sm">{b.subtitle}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── MOBILE: chỉ buttons ở đáy ── */}
        <div className="md:hidden absolute inset-x-0 bottom-0 z-10 px-4 pb-5">
          {slide.buttons && slide.buttons.length > 0 && (
            <div className="flex gap-3">
              {slide.buttons.map((btn, idx) => (
                <Link
                  key={idx}
                  href={btn.link}
                  className={
                    idx === 0
                      ? "flex-1 bg-[var(--accent)] text-white py-3 rounded-xl font-bold text-sm text-center shadow-lg flex items-center justify-center gap-1 active:scale-95 transition-transform"
                      : "flex-1 bg-black/50 backdrop-blur-sm border border-white/30 text-white py-3 rounded-xl font-bold text-sm text-center active:scale-95 transition-transform"
                  }
                >
                  {btn.label} {idx === 0 && <ArrowRight size={15} />}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── Arrows ── */}
        {slides.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* ── Dots ── */}
        {slides.length > 1 && (
          <div className="absolute bottom-14 md:bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all rounded-full ${i === current ? 'bg-[var(--accent)] w-5 h-2' : 'bg-white/50 hover:bg-white/80 w-2 h-2'}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
