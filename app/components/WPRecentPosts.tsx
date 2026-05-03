'use client';

import { useState, useEffect } from 'react';
import { getRecentPosts } from '@/app/lib/wp';
import Link from 'next/link';
import Image from 'next/image';

export default function WPRecentPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getRecentPosts();
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Fetch Posts Error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 bg-slate-50 animate-pulse border border-slate-200 rounded-xl">
        <p className="text-slate-400 font-medium">Đang tải dữ liệu từ WordPress...</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
        <p className="text-slate-500 font-medium">Chưa có bài viết hoặc không thể lấy dữ liệu (Lỗi kết nối).</p>
        <p className="text-xs text-slate-400 mt-2">Vui lòng kiểm tra lại cấu hình tên miền GraphQL của bạn.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post: any) => (
        <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden flex flex-col group">
          {post.featuredImage?.node?.sourceUrl && (
            <div className="relative h-48 overflow-hidden">
              <Image 
                src={post.featuredImage.node.sourceUrl} 
                alt={post.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
          <div className="p-6 flex-1 flex flex-col">
            <time className="text-xs text-[var(--accent)] font-bold tracking-wider mb-3">
              {new Date(post.date).toLocaleDateString('vi-VN')}
            </time>
            <h3 className="font-serif text-xl font-bold mb-3 text-slate-800 group-hover:text-[var(--accent)] transition-colors leading-tight">
              {post.title}
            </h3>
            <div 
              className="text-slate-500 text-sm line-clamp-3 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.excerpt }} 
            />
            <div className="mt-auto font-medium text-sm text-slate-600 flex items-center gap-2 group-hover:text-[var(--accent)] transition-colors">
              Đọc tiếp <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
