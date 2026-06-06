// Component placeholder khi chưa có ảnh từ WP — không dùng ảnh ngoài
// Hiện ô xám với icon và text gợi ý upload ảnh
import { ImageIcon } from 'lucide-react';

export default function ImagePlaceholder({ label = 'Chưa có ảnh' }: { label?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[var(--card-bg)] border border-dashed border-[var(--border)] rounded-2xl">
      <ImageIcon size={28} className="text-[var(--text-dim)] opacity-40" strokeWidth={1.5} />
      <span className="text-xs text-[var(--text-dim)] opacity-50 text-center px-2">{label}</span>
    </div>
  );
}
