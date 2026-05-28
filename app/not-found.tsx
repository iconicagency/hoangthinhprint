import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center bg-[var(--bg)]">
      <div className="text-8xl font-black text-[var(--accent)] mb-4 tracking-tight">404</div>
      <h1 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-4">Trang không tìm thấy</h1>
      <p className="text-[var(--text-dim)] text-lg max-w-md mb-10">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="bg-[var(--accent)] text-white font-bold py-3.5 px-8 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
          <Home size={18} /> Về trang chủ
        </Link>
        <Link href="/lien-he" className="border-2 border-[var(--border)] text-[var(--text-main)] font-bold py-3.5 px-8 rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center gap-2">
          Liên hệ hỗ trợ <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
