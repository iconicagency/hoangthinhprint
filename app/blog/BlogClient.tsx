'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Clock, ArrowRight, Phone } from 'lucide-react';
import { useSettings } from '../components/SettingsProvider';
import { getPosts, getCategories } from '../lib/wp';

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState('tat-ca');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [wpCategories, setWpCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const settings = useSettings();

  useEffect(() => {
    async function loadData() {
      try {
        const [postsData, catsData] = await Promise.all([getPosts(20), getCategories()]);
        if (postsData) setPosts(postsData);
        if (catsData) setWpCategories(catsData.filter((c: any) => c.slug !== 'uncategorized'));
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu blog:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const byCat = activeCategory === 'tat-ca'
    ? posts
    : posts.filter(post => post.categories?.nodes?.some((cat: any) => cat.slug === activeCategory));

  const filteredPosts = searchQuery.trim()
    ? byCat.filter(post =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : byCat;

  const popularPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[var(--text-main)] font-sans">
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/blog-hero/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Blog — Kiến Thức Bao Bì & In Ấn</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">Cập nhật xu hướng bao bì và kiến thức in ấn cho doanh nghiệp.</p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3">
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveCategory('tat-ca')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeCategory === 'tat-ca' ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--card-bg)] text-[var(--text-dim)] hover:bg-[var(--border)]'}`}>
              Tất cả
            </button>
            {wpCategories.map((cat) => (
              <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.slug ? 'bg-[var(--accent)] text-[var(--bg)]' : 'bg-[var(--card-bg)] text-[var(--text-dim)] hover:bg-[var(--border)]'}`}>
                {cat.name}{cat.count > 0 && <span className="ml-1 opacity-60 text-xs">({cat.count})</span>}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="animate-pulse bg-slate-100 h-80 rounded-2xl"></div>)}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-[var(--card-bg)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="relative h-60 overflow-hidden bg-slate-200">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image src={post.featuredImage.node.sourceUrl} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center"><span className="text-slate-400 text-sm">Chưa có ảnh</span></div>
                    )}
                    <div className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--bg)] text-xs font-bold px-3 py-1.5 rounded-full">
                      {post.categories?.nodes?.[0]?.name || 'Tin tức'}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-xl text-[var(--text-main)] mb-3 line-clamp-2 hover:text-[var(--accent)] transition-colors cursor-pointer">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <div className="text-[var(--text-dim)] text-sm mb-6 line-clamp-3 flex-1" dangerouslySetInnerHTML={{ __html: post.excerpt || '' }} />
                    <div className="flex items-center justify-between text-sm text-[var(--text-dim)] pt-4 border-t border-[var(--border)] mt-auto">
                      <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> 5 phút đọc</span>
                    </div>
                    <div className="mt-4">
                      <Link href={`/blog/${post.slug}`} className="text-[var(--accent)] font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity">
                        Đọc thêm <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-400">{searchQuery ? `Không tìm thấy bài viết nào với từ khóa "${searchQuery}".` : 'Không có bài viết nào trong danh mục này.'}</p>
            </div>
          )}
        </div>

        <div className="lg:w-1/3 space-y-8">
          <div className="relative">
            <input type="text" placeholder="Tìm kiếm bài viết..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-main)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" size={20} />
          </div>

          {popularPosts.length > 0 && (
            <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-bold text-lg text-[var(--text-main)] mb-6">Bài viết nổi bật</h3>
              <div className="space-y-6">
                {popularPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image src={post.featuredImage.node.sourceUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                      ) : <div className="w-full h-full bg-slate-200" />}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-[var(--text-main)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors mb-1">{post.title}</h4>
                      <span className="text-xs text-[var(--text-dim)]">{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {wpCategories.length > 0 && (
            <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-bold text-lg text-[var(--text-main)] mb-6">Danh mục</h3>
              <ul className="space-y-4">
                {wpCategories.map((cat) => (
                  <li key={cat.slug} className="flex items-center justify-between group cursor-pointer" onClick={() => setActiveCategory(cat.slug)}>
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-[var(--accent)] transition-colors"></span>
                      <span className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors text-sm">{cat.name}</span>
                    </div>
                    <span className="text-[var(--text-dim)] text-sm">({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-[var(--accent)] rounded-2xl p-8 text-[var(--bg)]">
            <h3 className="font-bold text-xl mb-2">Cần báo giá?</h3>
            <p className="text-[var(--bg)]/90 text-sm mb-6">Liên hệ ngay để nhận báo giá miễn phí.</p>
            <a href={`tel:${settings.contactPhone.replace(/\D/g, '')}`} className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
              <Phone size={24} />{settings.contactPhone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
