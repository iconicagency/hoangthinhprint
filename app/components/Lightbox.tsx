'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxItem {
  img: string;
  title: string;
  categoryName?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const current = items[currentIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Nút đóng */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
        aria-label="Đóng"
      >
        <X size={20} />
      </button>

      {/* Nút prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Ảnh chính */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full mx-16 rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.img}
          alt={current.title}
          width={1200}
          height={800}
          className="object-contain w-full h-full max-h-[75vh]"
          referrerPolicy="no-referrer"
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-6 py-4">
          <p className="text-white font-medium text-sm md:text-base">{current.title}</p>
          {current.categoryName && (
            <p className="text-white/70 text-xs mt-1">{current.categoryName}</p>
          )}
          <p className="text-white/50 text-xs mt-1">{currentIndex + 1} / {items.length}</p>
        </div>
      </div>

      {/* Nút next */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Ảnh tiếp"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative w-12 h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                i === currentIndex ? 'border-white scale-110' : 'border-white/30 opacity-60'
              }`}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
