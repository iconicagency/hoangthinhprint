'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSettings } from './SettingsProvider';

const slides = [
  'https://picsum.photos/seed/printingpress/1920/1080',
  'https://picsum.photos/seed/factory2/1920/1080',
  'https://picsum.photos/seed/design3/1920/1080',
];

export default function HeroSlider() {
  const settings = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[650px] bg-slate-900 text-white overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[currentSlide]}')` }}
          />
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
            Giải Pháp In Ấn Bao Bì Trọn Gói
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight drop-shadow-xl">
            {settings.heroTitle}
          </h1>
          <p className="text-gray-200 mb-10 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md">
            {settings.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/san-pham" className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white px-10 py-4 rounded-lg font-bold hover:scale-105 transition-all shadow-xl shadow-[var(--accent)]/30 flex items-center justify-center gap-2 text-lg">
              Xem sản phẩm <ArrowRight size={20}/>
            </Link>
            <Link href="/bao-gia" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center text-lg shadow-lg">
              Nhận báo giá miễn phí
            </Link>
          </div>
          
          <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm md:text-base text-gray-200 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[var(--accent-secondary)]"/> Thiết kế 3D miễn phí</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[var(--accent-secondary)]"/> In mẫu test màu</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[var(--accent-secondary)]"/> Giao hàng tận nơi</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[var(--accent-secondary)]"/> Giá gốc tại xưởng</span>
          </div>
        </motion.div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, i) => (
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
