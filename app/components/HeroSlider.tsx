'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { homeConfig } from '../lib/config';

interface Slide {
  img: string;
  tagline?: string;
  title?: string;
  subtitle?: string;
  buttons?: { label: string; link: string }[];
  benefits?: { title: string; subtitle?: string }[];
}

function buildSlides(dynamicHero: any): Slide[] {
  if (dynamicHero?.heroSlidesList?.length) {
    return dynamicHero.heroSlidesList.map((s: any) => ({
      img: s.slideImage?.node?.sourceUrl || '',
      tagline: s.slideTagline || dynamicHero.heroTagline,
      title: s.slideTitle || dynamicHero.heroTitle,
      subtitle: s.slideSubtitle || dynamicHero.heroSubtitle,
      buttons: dynamicHero.heroButtons || [],
      benefits: dynamicHero.heroBenefits || [],
    }));
  }

  const imgs: string[] =
    dynamicHero?.heroSlides?.nodes?.map((n: any) => n.sourceUrl) ||
    dynamicHero?.slides?.nodes?.map((n: any) => n.sourceUrl) ||
    dynamicHero?.slides ||
    homeConfig.hero.slides;

  const sharedContent = {
    tagline: dynamicHero?.heroTagline || dynamicHero?.tagline || homeConfig.hero.tagline,
    title: dynamicHero?.heroTitle || dynamicHero?.title || homeConfig.hero.title,
    subtitle: dynamicHero?.heroSubtitle || dynamicHero?.subtitle || homeConfig.hero.subtitle,
    buttons: dynamicHero?.heroButtons || [
      { label: 'Xem sản phẩm', link: '/san-pham' },
      { label: 'Nhận báo giá miễn phí', link: '/bao-gia' },
    ],
    benefits: dynamicHero?.heroBenefits?.map((b: any) =>
      typeof b === 'string' ? { title: b, subtitle: '' } : b
    ) || homeConfig.hero.benefits.map(b => ({ title: b, subtitle: '' })),
  };

  return (imgs.length ? imgs : homeConfig.hero.slides).map(img => ({ img, ...sharedContent }));
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

  return (
    <section
      className="relative h-[750px] bg-slate-900 text-white overflow-hidden flex items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          {s.img ? (
            <Image src={s.img} alt={s.title || ''} fill className="object-cover" priority={i === 0} referrerPolicy="no-referrer" />
          ) : (
            <div className="absolute inset-0 bg-slate-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        </div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center mt-10">
        <div key={current}>
          {slide.tagline && (
            <div className="inline-block border border-[var(--accent)] text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-[var(--accent)]/80 backdrop-blur-sm mb-8 shadow-lg">
              {slide.tagline}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight drop-shadow-xl">
            {slide.title}
          </h1>
          <p className="text-gray-200 mb-10 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md">
            {slide.subtitle}
          </p>

          {slide.buttons && slide.buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {slide.buttons.map((btn: any, i: number) => (
                <Link key={i} href={btn.link}
                  className={i === 0
                    ? "bg-[var(--accent)] text-white px-10 py-4 rounded-lg font-bold hover:scale-105 transition-all shadow-xl shadow-[var(--accent)]/30 flex items-center justify-center gap-2 text-lg"
                    : "bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center text-lg shadow-lg"
                  }>
                  {btn.label} {i === 0 && <ArrowRight size={20} />}
                </Link>
              ))}
            </div>
          )}

          {slide.benefits && slide.benefits.length > 0 && (
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base text-gray-200 font-medium">
              {slide.benefits.map((b: any, i: number) => (
                <div key={i} className="flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={24} className="text-[var(--accent)] group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-white text-lg">{b.title}</span>
                  </div>
                  {b.subtitle && <span className="text-gray-300 text-xs md:text-sm">{b.subtitle}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm" aria-label="Slide trước">
            <ChevronLeft size={22} />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm" aria-label="Slide tiếp">
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`transition-all rounded-full ${i === current ? 'bg-[var(--accent)] w-6 h-3' : 'bg-white/50 hover:bg-white/80 w-3 h-3'}`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}
