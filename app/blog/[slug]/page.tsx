import { getPostBySlug } from "@/app/lib/wp";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, Calendar, Clock, Eye, Share2, Facebook, Twitter, PhoneCall } from "lucide-react";

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Fallback ảnh
  const imgUrl = post.featuredImage?.node?.sourceUrl || 'https://picsum.photos/seed/placeholder/1200/600';
  
  // Tính số phút đọc nháp (khoảng 200 từ/phút)
  const wordCount = post.content ? post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen bg-white pt-24 pb-20 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center space-x-2">
          <Link href="/" className="hover:text-[var(--accent)]">Trang chủ</Link>
          <span>&gt;</span>
          <Link href="/blog" className="hover:text-[var(--accent)]">Blog</Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-medium line-clamp-1">{post.title}</span>
        </nav>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8">
            <div className="mb-6">
              <span className="inline-block bg-[var(--accent)] text-white px-3 py-1 text-xs font-bold rounded-sm mb-4">
                Kiến Thức In Ấn
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-slate-500 gap-4 md:gap-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-1">
                  <User size={16} className="text-[var(--accent)]" /> Ghi Đức
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-[var(--accent)]" /> {new Date(post.date).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-[var(--accent)]" /> {readTime} phút đọc
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={16} className="text-[var(--accent)]" /> {post.slug ? (post.slug.length * 12 + 45) : 102} lượt xem
                </div>
              </div>
            </div>

            <div className="mb-8 w-full relative rounded-md overflow-hidden aspect-[16/9]">
              <Image src={imgUrl} alt={post.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>

            {/* Prose Content */}
            <div 
              className="prose prose-lg max-w-none prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-md prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content || '<p>Đang cập nhật nội dung...</p>' }}
            />

            {/* Tags & Share */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-slate-700">Tags:</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm">in túi giấy</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-sm">túi giấy in logo</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700 text-sm">Chia sẻ:</span>
                <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80"><Facebook size={14}/></button>
                <button className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:opacity-80"><Twitter size={14}/></button>
                <button className="w-8 h-8 rounded-full border border-slate-300 text-slate-600 flex items-center justify-center hover:bg-slate-50"><Share2 size={14}/></button>
              </div>
            </div>

            {/* CTA Box CTA (Cam gradient) */}
            <div className="mt-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-6 sm:p-8 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2">Cần in bao bì? Nhận báo giá miễn phí trong 5 phút</h3>
              <p className="text-sm text-white/90 mb-6">
                Liên hệ ngay với In Gia Đức để được tư vấn giải pháp bao bì phù hợp nhất.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-orange-600 px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-md transition-shadow">
                  Nhận báo giá
                </button>
                <Link href="tel:0812960988" className="flex items-center gap-2 border border-white/50 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors">
                  <PhoneCall size={16} /> 0812 96 0988
                </Link>
              </div>
            </div>
            
            {/* Nav prev/next (Giả lập) */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between">
              <Link href="#" className="text-sm text-[var(--accent)] hover:underline">
                ← Bài trước<br/>
                <span className="text-slate-800 font-medium">Bảng báo giá chi tiết Dịch Vụ In</span>
              </Link>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <h3 className="font-bold border-b border-slate-100 pb-3 mb-4 flex items-center gap-2 text-slate-800">
                  <span className="w-1 h-4 bg-[var(--accent)] rounded-full"></span>
                  Mục lục
                </h3>
                <ul className="text-sm space-y-3 text-slate-600">
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">1. Tại sao doanh nghiệp cần túi giấy in logo?</a>
                  </li>
                  <li className="pl-3 relative before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full before:absolute before:left-0 before:top-2">
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">1.1 Lợi ích cốt lõi</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">2. 3 Phân khúc in túi giấy phổ biến</a>
                  </li>
                  <li className="pl-3 relative before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full before:absolute before:left-0 before:top-2">
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">2.1 Phân khúc giá rẻ</a>
                  </li>
                  <li className="pl-3 relative before:content-[''] before:w-1 before:h-1 before:bg-slate-300 before:rounded-full before:absolute before:left-0 before:top-2">
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">2.2 Phân khúc trung cấp</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">3. Bảng giá in túi giấy tham khảo 2026</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">4. Quy trình đặt in tại Gia Đức</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
