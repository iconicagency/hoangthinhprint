'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, Clock, ArrowRight, Phone } from 'lucide-react';

const categories = [
  'Tất cả',
  'Kiến thức in ấn',
  'Mẫu đẹp',
  'Bảng giá',
  'Ngành hàng',
  'Tin tức',
  'Hướng dẫn'
];

const blogPosts = [
  {
    id: 1,
    title: 'In Túi Giấy In Logo 2026: 3 Phân Khúc Giá Từ 1.500đ [Hướng Dẫn]',
    excerpt: 'Hướng dẫn chọn túi giấy in logo năm 2026. Phân tích 3 phân khúc giá từ 1.500đ, ưu nhược điểm các loại giấy Ivory, Couch...',
    date: '13/4/2026',
    readTime: '4 phút đọc',
    category: 'Kiến Thức In Ấn',
    categoryColor: 'bg-[#e88b1e]',
    img: 'https://picsum.photos/seed/blog1/600/400'
  },
  {
    id: 2,
    title: 'Giá In Hộp Cứng 2026: Bảng Giá Chi Tiết Theo Loại + Số Lượng',
    excerpt: 'Trong bối cảnh thị trường bao bì năm 2026, việc tối ưu chi phí sản xuất là ưu tiên hàng đầu của mọi doanh nghiệp. Việc tìm...',
    date: '8/4/2026',
    readTime: '5 phút đọc',
    category: 'Bảng Giá In Ấn',
    categoryColor: 'bg-[#22c55e]',
    img: 'https://picsum.photos/seed/blog2/600/400'
  },
  {
    id: 3,
    title: 'In Hộp Cứng Cao Cấp 2026: Báo Giá & 50+ Mẫu Sang Trọng',
    excerpt: 'Hướng dẫn toàn diện về dịch vụ in hộp cứng cao cấp năm 2026. Cập nhật báo giá tại xưởng, các loại hộp nam châm, â...',
    date: '7/4/2026',
    readTime: '6 phút đọc',
    category: 'Bao Bì Theo Ngành',
    categoryColor: 'bg-[#6366f1]',
    img: 'https://picsum.photos/seed/blog3/600/400'
  }
];

const popularPosts = [
  {
    id: 3,
    title: 'In Hộp Cứng Cao Cấp 2026: Báo Giá & 50+ Mẫu Sang Trọng',
    date: '7/4/2026',
    img: 'https://picsum.photos/seed/blog3/100/100'
  },
  {
    id: 2,
    title: 'Giá In Hộp Cứng 2026: Bảng Giá Chi Tiết Theo Loại + Số Lượng',
    date: '8/4/2026',
    img: 'https://picsum.photos/seed/blog2/100/100'
  },
  {
    id: 1,
    title: 'In Túi Giấy In Logo 2026: 3 Phân Khúc Giá Từ 1.500đ [Hướng Dẫn]',
    date: '13/4/2026',
    img: 'https://picsum.photos/seed/blog1/100/100'
  }
];

const sidebarCategories = [
  { name: 'Mẫu Bao Bì Đẹp', count: 0, color: 'bg-pink-500' },
  { name: 'Tin Tức Công Ty', count: 0, color: 'bg-blue-500' },
  { name: 'Hướng Dẫn', count: 0, color: 'bg-purple-500' },
  { name: 'Kiến Thức In Ấn', count: 0, color: 'bg-orange-500' },
  { name: 'Bao Bì Theo Ngành', count: 1, color: 'bg-indigo-500' },
  { name: 'Bảng Giá In Ấn', count: 1, color: 'bg-green-500' }
];

const tags = [
  'in túi giấy', 'túi giấy in logo', 'in túi giấy giá rẻ',
  'in gia đức', 'giá in hộp cứng 2026', 'in hộp cứng giá rẻ',
  'in bao bì', 'xưởng in gia đức', 'in hộp cứng',
  'in hộp cứng cao cấp', 'xưởng in bao bì', 'báo giá in hộp cứng',
  'in hộp quà tặng'
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  return (
    <div className="min-h-screen bg-white text-[var(--text-main)] font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-[#111827] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/blog-hero/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-slate-400 mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-white font-medium">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Blog — Kiến Thức Bao Bì & In Ấn</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Cập nhật xu hướng bao bì và kiến thức in ấn cho doanh nghiệp.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Blog Posts */}
        <div className="lg:w-2/3">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat 
                    ? 'bg-[#cca35e] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-60 overflow-hidden">
                  <Image 
                    src={post.img} 
                    alt={post.title} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-4 left-4 ${post.categoryColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2 hover:text-[var(--accent)] transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100 mt-auto">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                  </div>
                  <div className="mt-4">
                    <Link href="#" className="text-[#cca35e] font-bold text-sm flex items-center gap-1 hover:text-yellow-700 transition-colors">
                      Đọc thêm <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:w-1/3 space-y-8">
          
          {/* Search */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#cca35e] focus:ring-1 focus:ring-[#cca35e]"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>

          {/* Popular Posts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Bài viết nổi bật</h3>
            <div className="space-y-6">
              {popularPosts.map((post) => (
                <div key={post.id} className="flex gap-4 group cursor-pointer">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-[#cca35e] transition-colors mb-1">
                      {post.title}
                    </h4>
                    <span className="text-xs text-slate-500">{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Danh mục</h3>
            <ul className="space-y-4">
              {sidebarCategories.map((cat, index) => (
                <li key={index} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                    <span className="text-slate-600 group-hover:text-[#cca35e] transition-colors text-sm">{cat.name}</span>
                  </div>
                  <span className="text-slate-400 text-sm">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Tags phổ biến</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span key={index} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs hover:bg-[#cca35e] hover:text-white transition-colors cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-[#cca35e] rounded-2xl p-8 text-white">
            <h3 className="font-bold text-xl mb-2">Cần báo giá?</h3>
            <p className="text-white/90 text-sm mb-6">Liên hệ ngay để nhận báo giá miễn phí.</p>
            <div className="flex items-center gap-2 font-bold text-xl">
              <Phone size={24} />
              090.XXX.XXXX
            </div>
          </div>

        </div>

      </section>

      <Footer />
    </div>
  );
}
