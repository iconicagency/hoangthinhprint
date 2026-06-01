'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  price?: string;
  img?: string;
}

interface ServiceLightboxProps {
  services: ServiceItem[];
}

export default function ServiceLightbox({ services }: ServiceLightboxProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const close = () => setLightboxIdx(null);
  const goPrev = useCallback(() =>
    setLightboxIdx(i => i !== null ? (i - 1 + services.length) % services.length : null),
    [services.length]
  );
  const goNext = useCallback(() =>
    setLightboxIdx(i => i !== null ? (i + 1) % services.length : null),
    [services.length]
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxIdx, goPrev, goNext]);

  const getImg = (service: ServiceItem, idx: number) => {
    if (service.img && service.img.startsWith('http')) return service.img;
    return `https://picsum.photos/seed/svc${idx}/1200/900`;
  };

  const currentService = lightboxIdx !== null ? services[lightboxIdx] : null;

  return (
    <>
      {/* Grid dịch vụ */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard key={i} service={service} index={i} onOpen={() => setLightboxIdx(i)} getImg={getImg} />
          ))}
        </div>
        {services.length > 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(4).map((service, i) => (
              <ServiceCard key={i + 4} service={service} index={i + 4} onOpen={() => setLightboxIdx(i + 4)} getImg={getImg} />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && currentService && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          {/* Đóng */}
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white z-10 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {services.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white z-10 transition-colors"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Panel chính — ảnh trái + nội dung phải */}
          <div
            className="bg-[var(--card-bg)] rounded-2xl overflow-hidden w-full shadow-2xl flex flex-col md:flex-row"
            style={{ maxWidth: '960px', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Ảnh — 600x600 */}
            <div
              className="relative shrink-0 bg-slate-900"
              style={{ width: '100%', aspectRatio: '1/1', maxWidth: '600px', minHeight: '280px' }}
            >
              <Image
                src={getImg(currentService, lightboxIdx)}
                alt={currentService.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="600px"
              />
            </div>

            {/* Nội dung */}
            <div className="flex flex-col justify-between p-8 md:p-10 overflow-y-auto flex-1">
              <div>
                <p className="text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-3">
                  {lightboxIdx + 1} / {services.length}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-4 leading-tight">
                  {currentService.title}
                </h2>
                <p className="text-[var(--text-dim)] leading-relaxed text-base mb-6">
                  {currentService.desc}
                </p>
                {currentService.price && (
                  <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] font-bold px-4 py-2 rounded-lg text-sm">
                    {currentService.price}
                  </span>
                )}
              </div>
              <div className="flex gap-3 mt-8">
                <Link
                  href="/bao-gia"
                  className="flex-1 bg-[var(--accent)] text-white py-3.5 rounded-xl font-bold text-center hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2"
                >
                  Nhận báo giá <ArrowRight size={16} />
                </Link>
                <Link
                  href="/san-pham"
                  className="flex-1 border border-[var(--border)] text-[var(--text-main)] py-3.5 rounded-xl font-bold text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-sm"
                >
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          </div>

          {/* Next */}
          {services.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white z-10 transition-colors"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Thumbnail strip */}
          {services.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] px-2">
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    i === lightboxIdx ? 'border-white scale-110' : 'border-white/30 opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={getImg(s, i)} alt={s.title} fill className="object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

function ServiceCard({ service, index, onOpen, getImg }: {
  service: ServiceItem;
  index: number;
  onOpen: () => void;
  getImg: (s: ServiceItem, i: number) => string;
}) {
  return (
    <div
      className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] hover:shadow-xl hover:border-[var(--accent)]/50 transition-all duration-300 group cursor-pointer"
      onClick={onOpen}
    >
      {/* Ảnh */}
      <div className="h-52 relative overflow-hidden bg-slate-200">
        <Image
          src={getImg(service, index)}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-4 py-2 rounded-full">
            Xem chi tiết
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="p-5">
        <h3 className="font-bold text-[var(--text-main)] mb-1.5 group-hover:text-[var(--accent)] transition-colors line-clamp-1 text-base">
          {service.title}
        </h3>
        <p className="text-sm text-[var(--text-dim)] line-clamp-2 mb-3">{service.desc}</p>
        <span className="text-[var(--accent)] text-xs font-bold flex items-center gap-1">
          Xem sản phẩm <ArrowRight size={13} />
        </span>
      </div>
    </div>
  );
}
