'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductsByCategory, getPageBySlug } from '../lib/wp';

const categories = [
  'Tất cả',
  'Hộp cứng',
  'Hộp giấy',
  'Túi giấy',
  'Hộp sóng',
  'Hộp Trung Thu',
  'Catalogue',
  'Phong bì',
  'Kẹp file',
  'Name card'
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [cmsProducts, setCmsProducts] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, pData] = await Promise.all([
          getProductsByCategory("san-pham"),
          getPageBySlug('san-pham')
        ]);
        if (productsData) setCmsProducts(productsData);
        if (pData) setPageData(pData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const products = cmsProducts.map(p => ({
    id: p.id,
    title: p.title,
    tag: p.categories?.nodes.find((c: any) => c.slug !== 'san-pham')?.name || 'Sản phẩm',
    category: p.categories?.nodes.find((c: any) => c.slug !== 'san-pham')?.name || 'Tất cả',
    img: p.featuredImage?.node?.sourceUrl || 'https://picsum.photos/seed/prod/400/400'
  }));

  const filteredProducts = activeCategory === 'Tất cả' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Sản phẩm</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight">Tất cả sản phẩm</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-[var(--accent)] text-[var(--bg)]' 
                  : 'bg-[var(--bg)] text-[var(--text-dim)] hover:bg-[var(--card-bg)] border border-[var(--border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[var(--card-bg)] rounded-xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className="relative aspect-square overflow-hidden bg-[var(--bg)]">
                <Image 
                  src={product.img} 
                  alt={product.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[var(--text-main)] text-sm mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                  {product.title}
                </h3>
                <div className="text-xs font-medium text-[var(--accent)]">
                  {product.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[var(--text-dim)]">
            Không tìm thấy sản phẩm nào trong danh mục này.
          </div>
        )}

      </section>
    </div>
  );
}
