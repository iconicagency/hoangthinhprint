'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, ArrowRight, GripVertical } from 'lucide-react';

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
  const [items, setItems] = useState<ServiceItem[]>(services);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  useEffect(() => { setItems(services); }, [services]);

  const open = (i: number) => setLightboxIdx(i);
  const close = () => setLightboxIdx(null);
  const goPrev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + items.length) % items.length : null), [items.length]);
  const goNext = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % items.length : null), [items.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [lightboxIdx, goPrev, goNext]);

  const onDragStart = (i: number) => setDragIdx(i);
  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === i) return;
    const next = [...items];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    setItems(next);
    setDragIdx(i);
  };
  const onDragEnd = () => setDragIdx(null);

  const getImg = (service: ServiceItem, idx: number) => {
    if (service.img && service.img.startsWith('http')) return service.img;
    return `https://picsum.photos/seed/svc${idx}/800/600`;
  };

  const currentService = lightboxIdx !== null ? items[lightboxIdx] : null;

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {items.slice(0, 4).map((service, i) => (
            <ServiceCard key={i} service={service} index={i} onOpen={open}
              onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}
              isDragging={dragIdx === i} getImg={getImg} />
          ))}
        </div>
        {items.length > 4 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.slice(4).map((service, i) => (
              <ServiceCard key={i + 4} service={service} index={i + 4} onOpen={open}
                onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd}
                isDragging={dragIdx === i + 4} getImg={getImg} />
            ))}
          </div>
        )}
        <p className="text-center text-xs text-[var(--text-dim)] mt-6 opacity-60">
          Kéo thả để đổi vị trí · Click ảnh để xem chi tiết
        </p>
      </div>

      {lightboxIdx !== null && currentService && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={close}>
          <button onClick={close} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10">
            <X size={20} />
          </button>
          {items.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10">
                <ChevronLeft size={24} />
              </button>
              <button onClick={e => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white z-10">
                <ChevronRight size={24} />
              </button>
            </>
          )}
          <div className="bg-[var(--card-bg)] rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative md:w-1/2 aspect-video md:aspect-auto min-h-[200px] bg-slate-800">
              <Image src={getImg(currentService, lightboxIdx)} alt={currentService.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="text-xs text-[var(--accent)] font-bold uppercase tracking-widest mb-3">
                  Dịch vụ {lightboxIdx + 1}/{items.length}
                </div>
                <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">{currentService.title}</h2>
                <p className="text-[var(--text-dim)] leading-relaxed mb-6">{currentService.desc}</p>
                {currentService.price && (
                  <div className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] font-bold px-4 py-2 rounded-lg text-sm mb-6">
                    {currentService.price}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Link href="/bao-gia"
                  className="flex-1 bg-[var(--accent)] text-white py-3 rounded-xl font-bold text-center hover:opacity-90 transition-opacity text-sm flex items-center justify-center gap-2">
                  Nhận báo giá <ArrowRight size={16} />
                </Link>
                <Link href="/san-pham"
                  className="flex-1 border border-[var(--border)] text-[var(--text-main)] py-3 rounded-xl font-bold text-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-sm">
                  Xem sản phẩm
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
            {items.map((s, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${i === lightboxIdx ? 'border-white scale-110' : 'border-white/30 opacity-60'}`}>
                <Image src={getImg(s, i)} alt={s.title} fill className="object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function ServiceCard({ service, index, onOpen, onDragStart, onDragOver, onDragEnd, isDragging, getImg }: {
  service: ServiceItem; index: number; onOpen: (i: number) => void;
  onDragStart: (i: number) => void; onDragOver: (e: React.DragEvent, i: number) => void;
  onDragEnd: () => void; isDragging: boolean; getImg: (s: ServiceItem, i: number) => string;
}) {
  return (
    <div draggable onDragStart={() => onDragStart(index)} onDragOver={e => onDragOver(e, index)} onDragEnd={onDragEnd}
      className={`bg-[var(--card-bg)] rounded-xl overflow-hidden border transition-all duration-300 group cursor-pointer ${
        isDragging ? 'border-[var(--accent)] opacity-60 scale-95' : 'border-[var(--border)] hover:shadow-xl hover:border-[var(--accent)]/50'
      }`}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <span className="text-xs text-[var(--text-dim)] font-medium">#{index + 1}</span>
        <GripVertical size={16} className="text-[var(--text-dim)] opacity-40 cursor-grab active:cursor-grabbing" />
      </div>
      <div className="h-48 relative overflow-hidden bg-slate-200 mx-3 rounded-lg" onClick={() => onOpen(index)}>
        <Image src={getImg(service, index)} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
          <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded-full">Xem chi tiết</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[var(--text-main)] mb-1.5 group-hover:text-[var(--accent)] transition-colors line-clamp-1">{service.title}</h3>
        <p className="text-sm text-[var(--text-dim)] line-clamp-2 mb-3">{service.desc}</p>
        <Link href="/san-pham" className="text-[var(--accent)] text-xs font-bold flex items-center gap-1 hover:opacity-80 transition-opacity" onClick={e => e.stopPropagation()}>
          Xem sản phẩm <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
