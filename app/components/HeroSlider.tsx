'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { homeConfig } from '../lib/config';

export default function HeroSlider({ dynamicHero }: { dynamicHero?: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Ưu tiên dữ liệu từ WordPress, nếu không có thì fallback về homeConfig tĩnh
  const finalHero = dynamicHero || homeConfig.hero;

  // Xử lý slide ảnh (Do WP trả về object có chứa node)
  const slideUrls = finalHero.heroSlides?.nodes 
    ? finalHero.heroSlides.nodes.map((n: any) => n.sourceUrl) 
    : (finalHero.slides?.nodes ? finalHero.slides.nodes.map((n: any) => n.sourceUrl) : finalHero.slides);

  // Xử lý benefits text
  const benefits = finalHero.heroBenefits 
    ? finalHero.heroBenefits.map((b: any) => ({ title: b.title, subtitle: b.subtitle })) 
    : finalHero.benefits?.map((b: string) => ({ title: b, subtitle: '' }));

  // Xử lý buttons
  const buttons = finalHero.heroButtons 
    ? finalHero.heroButtons 
    : [
        { label: 'Xem sản phẩm', link: '/san-pham' },
        { label: 'Nhận báo giá miễn phí', link: '/bao-gia' }
      ];

  useEffect(() => {
    if (!slideUrls || slideUrls.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideUrls.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slideUrls]);

  return (
    <section className="relative h-[750px] bg-slate-900 text-white overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {slideUrls && slideUrls[currentSlide] && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slideUrls[currentSlide]}')` }}
            />
          )}
          {/* Dark overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center mt-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="inline-block border border-[var(--accent)] text-white px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-[var(--accent)]/80 backdrop-blur-sm mb-8 shadow-lg">
            {finalHero.heroTagline || finalHero.tagline}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight drop-shadow-xl">
            {finalHero.heroTitle || finalHero.title}
          </h1>
          <p className="text-gray-200 mb-10 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md">
            {finalHero.heroSubtitle || finalHero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((btn: any, i: number) => (
              <Link 
                key={i} 
                href={btn.link} 
                className={i === 0 
                  ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white px-10 py-4 rounded-lg font-bold hover:scale-105 transition-all shadow-xl shadow-[var(--accent)]/30 flex items-center justify-center gap-2 text-lg"
                  : "bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center text-lg shadow-lg"
                }
              >
                {btn.label} {i === 0 && <ArrowRight size={20}/>}
              </Link>
            ))}
          </div>
          
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm md:text-base text-gray-200 font-medium">
            {benefits && benefits.map((benefit: any, i: number) => (
              <div key={i} className="flex flex-col items-center gap-1 group">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={24} className="text-[var(--accent-secondary)] group-hover:scale-110 transition-transform"/> 
                  <span className="font-bold text-white text-lg">{benefit.title}</span>
                </div>
                {benefit.subtitle && <span className="text-gray-300 text-xs md:text-sm">{benefit.subtitle}</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
        {slideUrls && slideUrls.map((_: any, i: number) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-[var(--accent)] scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
