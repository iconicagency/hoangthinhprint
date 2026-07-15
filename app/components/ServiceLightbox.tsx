'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowRight, Phone } from 'lucide-react';

interface ServiceItem {
  title: string;
  desc: string;
  price?: string;
  img?: string;
  link?: string | null;     // Link nut "Xem san pham" (tu ACF servicelink)
  contact?: string | null;  // SDT hoac link cho nut "Lien he" (tu ACF servicecontact)
}

interface ServiceLightboxProps {
  services: ServiceItem[];
}

// Nhan dien contact la so dien thoai hay link
function isPhoneNumber(value: string) {
  return /^[\d\s+.()-]{8,}$/.test(value.trim());
}
function isUrl(value: string) {
  return /^https?:\/\//i.test(value.trim()) || value.trim().startsWith('/');
}

// Chip "Lien he" thong minh: SDT → bam goi ngay; link → mo trang; text thuong → hien thi
function ContactChip({ contact, fallback }: { contact?: string | null; fallback?: string }) {
  const chipClass = 'inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent)] font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm';

  if (contact) {
    const value = contact.trim();
    if (isPhoneNumber(value)) {
      return (
        <a href={`tel:${value.replace(/[^\d+]/g, '')}`} className={`${chipClass} hover:bg-[var(--accent)] hover:text-white transition-colors`}>
          <Phone size={14} /> {value}
        </a>
      );
    }
    if (isUrl(value)) {
      const external = /^https?:\/\//i.test(value);
      return (
        <a
          href={value}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`${chipClass} hover:bg-[var(--accent)] hover:text-white transition-colors`}
        >
          Liên hệ <ArrowRight size={14} />
        </a>
      );
    }
    return <span className={chipClass}>{value}</span>;
  }

  if (fallback) return <span className={chipClass}>{fallback}</span>;
  return null;
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
            className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 bg-white/10 hover:bg-white/25 rounded-full flex items-center justify-center text-white z-10 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          {services.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); goPrev(); }}
              className="hidden md:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full items-center justify-center text-white z-10 transition-colors"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Panel chính — mobile gọn: ảnh 4:3 thấp + nội dung compact; desktop: ảnh vuông lớn bên trái */}
          <div
            className="bg-[var(--card-bg)] rounded-2xl overflow-hidden w-full max-w-sm md:max-w-[960px] shadow-2xl flex flex-col md:flex-row"
            style={{ maxHeight: '85vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Ảnh — mobile 4:3 giới hạn 34vh, desktop vuông 600px */}
            <div className="relative shrink-0 bg-slate-900 w-full aspect-[4/3] max-h-[34vh] md:max-h-none md:w-[480px] lg:w-[560px] md:aspect-square">
              <Image
                src={getImg(currentService, lightboxIdx)}
                alt={currentService.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, 600px"
              />

              {/* Mobile: mũi tên đặt trên ảnh */}
              {services.length > 1 && (
                <>
                  <button
                    onClick={e => { e.stopPropagation(); goPrev(); }}
                    className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/35 active:bg-black/55 rounded-full flex items-center justify-center text-white z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); goNext(); }}
                    className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/35 active:bg-black/55 rounded-full flex items-center justify-center text-white z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Nội dung */}
            <div className="flex flex-col justify-between p-5 md:p-10 overflow-y-auto flex-1">
              <div>
                <p className="text-[10px] md:text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-1.5 md:mb-3">
                  {lightboxIdx + 1} / {services.length}
                </p>
                <h2 className="text-lg md:text-3xl font-bold text-[var(--text-main)] mb-2 md:mb-4 leading-tight">
                  {currentService.title}
                </h2>
                <p className="text-[var(--text-dim)] leading-relaxed text-sm md:text-base mb-3 md:mb-6">
                  {currentService.desc}
                </p>
                <ContactChip contact={currentService.contact} fallback={currentService.price} />
              </div>
              <div className="flex gap-2.5 md:gap-3 mt-5 md:mt-8">
                <Link
                  href="/bao-gia"
                  className="flex-1 bg-[var(--accent)] text-white py-2.5 md:py-3.5 rounded-xl font-bold text-center hover:opacity-90 transition-opacity text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2"
                >
                  Nhận báo giá <ArrowRight size={15} />
                </Link>
                {/^https?:\/\//i.test(currentService.link || '') ? (
                  <a
                    href={currentService.link as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-[var(--border)] text-[var(--text-main)] py-2.5 md:py-3.5 rounded-xl font-bold text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-xs md:text-sm flex items-center justify-center"
                  >
                    Xem sản phẩm
                  </a>
                ) : (
                  <Link
                    href={currentService.link || '/san-pham'}
                    className="flex-1 border border-[var(--border)] text-[var(--text-main)] py-2.5 md:py-3.5 rounded-xl font-bold text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-xs md:text-sm flex items-center justify-center"
                  >
                    Xem sản phẩm
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Next */}
          {services.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); goNext(); }}
              className="hidden md:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/25 rounded-full items-center justify-center text-white z-10 transition-colors"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Thumbnail strip — chỉ desktop, mobile ẩn cho gọn */}
          {services.length > 1 && (
            <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 overflow-x-auto max-w-[80vw] px-2">
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
        {service.link ? (
          <Link
            href={service.link}
            onClick={e => e.stopPropagation()}
            {...(/^https?:\/\//i.test(service.link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-[var(--accent)] text-xs font-bold flex items-center gap-1 hover:underline"
          >
            Xem sản phẩm <ArrowRight size={13} />
          </Link>
        ) : (
          <span className="text-[var(--accent)] text-xs font-bold flex items-center gap-1">
            Xem sản phẩm <ArrowRight size={13} />
          </span>
        )}
      </div>
    </div>
  );
}
