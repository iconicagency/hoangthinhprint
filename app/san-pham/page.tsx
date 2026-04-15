'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

const products = [
  { id: 1, title: 'Hộp cứng nam châm Saffron cao cấp', tag: 'Saffron', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod1/400/400' },
  { id: 2, title: 'Hộp cứng âm dương đồng hồ Bamoer', tag: 'Bamoer', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod2/400/400' },
  { id: 3, title: 'Hộp cứng nước hoa YSL', tag: 'YSL', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod3/400/400' },
  { id: 4, title: 'Hộp cứng yến đông trùng HQ Farm', tag: 'HQ Farm', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod4/400/400' },
  { id: 5, title: 'Hộp cứng nam châm TPCN GenX', tag: 'GenX', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod5/400/400' },
  { id: 6, title: 'Hộp giấy dược phẩm Vipha Bona', tag: 'Vipha', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod6/400/400' },
  { id: 7, title: 'Hộp giấy mỹ phẩm Shiny Magic', tag: 'Shiny Magic', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod7/400/400' },
  { id: 8, title: 'Hộp giấy tinh dầu Dagiafa', tag: 'Dagiafa', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod8/400/400' },
  { id: 9, title: 'Hộp giấy mỹ phẩm Mỹ Nhân', tag: 'Mỹ Nhân', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod9/400/400' },
  { id: 10, title: 'Hộp giấy trà Free O\'Clock', tag: 'Free O\'Clock', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod10/400/400' },
  { id: 11, title: 'Hộp giấy trà Gia Đức', tag: 'Gia Đức Tea', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod11/400/400' },
  { id: 12, title: 'Bộ sưu tập hộp trà Gia Đức', tag: 'Gia Đức Collection', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod12/400/400' },
  { id: 13, title: 'Hộp giấy hạt điều Như Hoàng', tag: 'Như Hoàng', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod13/400/400' },
  { id: 14, title: 'Hộp giấy dược phẩm Sin Sú Tiến Vua', tag: 'Mộc Hương Group', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod14/400/400' },
  { id: 15, title: 'Hộp giấy hạt Macca Bazang', tag: 'Bazang', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod15/400/400' },
  { id: 16, title: 'Hộp giấy dược phẩm Hoàng Khớp Vương', tag: 'Hoàng Khớp Vương', category: 'Hộp giấy', img: 'https://picsum.photos/seed/prod16/400/400' },
  { id: 17, title: 'Túi giấy cao cấp Brown Thomas', tag: 'Brown Thomas', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod17/400/400' },
  { id: 18, title: 'Túi giấy điện thoại Táo Pro', tag: 'Táo Pro', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod18/400/400' },
  { id: 19, title: 'Túi giấy Lavish Korea Cosmetics', tag: 'Lavish', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod19/400/400' },
  { id: 20, title: 'Túi giấy Obsess Cosmetics', tag: 'Obsess', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod20/400/400' },
  { id: 21, title: 'Túi giấy T.J For Men', tag: 'T.J For Men', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod21/400/400' },
  { id: 22, title: 'Túi giấy Spa cao cấp', tag: 'Spa Luxury', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod22/400/400' },
  { id: 23, title: 'Túi giấy 3 phần khúc Ivory Couche Kraft', tag: '3 Loại', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod23/400/400' },
  { id: 24, title: 'Túi giấy 3 phần khúc cao cấp', tag: 'Luxe Moderne', category: 'Túi giấy', img: 'https://picsum.photos/seed/prod24/400/400' },
  { id: 25, title: 'Hộp cứng Thuận Buồm Xuôi Gió', tag: 'Thuận Buồm', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod25/400/400' },
  { id: 26, title: 'Hộp cứng Cát Tường Như Ý', tag: 'Cát Tường', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod26/400/400' },
  { id: 27, title: 'Hộp cứng Xuân Thịnh Vượng', tag: 'Xuân Thịnh Vượng', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod27/400/400' },
  { id: 28, title: 'Hộp cứng Tết Happy New Year', tag: 'New Year Red', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod28/400/400' },
  { id: 29, title: 'Hộp cứng Tết Chúc Mừng Năm Mới', tag: 'New Year Gold', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod29/400/400' },
  { id: 30, title: 'Hộp cứng Tết Sum Vầy', tag: 'Tết Sum Vầy', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod30/400/400' },
  { id: 31, title: 'Hộp cứng quà tặng Echo', tag: 'Echo', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod31/400/400' },
  { id: 32, title: 'Bộ sưu tập hộp cứng cao cấp', tag: 'Gia Đức Premium', category: 'Hộp cứng', img: 'https://picsum.photos/seed/prod32/400/400' },
  { id: 33, title: 'Hộp cứng Happy New Year cam', tag: 'Happy New Year', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod33/400/400' },
  { id: 34, title: 'Hộp cứng Tết Vinh Hoa Phú Quý', tag: 'Vinh Hoa', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod34/400/400' },
  { id: 35, title: 'Hộp cứng Tết vàng Chúc Mừng Năm Mới', tag: 'Tết Vàng', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod35/400/400' },
  { id: 36, title: 'Hộp Trung Thu Mid-Autumn combo xanh', tag: 'Mid-Autumn Green', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod36/400/400' },
  { id: 37, title: 'Hộp Trung Thu cá chép hoa cúc', tag: 'Cá Chép', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod37/400/400' },
  { id: 38, title: 'Hộp Trung Thu Allianz hoa sen', tag: 'Allianz', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod38/400/400' },
  { id: 39, title: 'Hộp Trung Thu rồng ép kim vàng', tag: 'Rồng Vàng', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod39/400/400' },
  { id: 40, title: 'Hộp Trung Thu hoa sen trắng', tag: 'Sen Trắng', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod40/400/400' },
  { id: 41, title: 'Hộp Trung Thu Tết đỏ truyền thống', tag: 'Tết Đỏ', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod41/400/400' },
  { id: 42, title: 'Hộp Trung Thu sen đỏ Sum Vầy', tag: 'Sen Đỏ', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod42/400/400' },
  { id: 43, title: 'Hộp Trung Thu xanh navy mẫu đơn', tag: 'Navy', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod43/400/400' },
  { id: 44, title: 'Hộp Trung Thu Mövenpick Premium', tag: 'Mövenpick', category: 'Hộp Trung Thu', img: 'https://picsum.photos/seed/prod44/400/400' },
  { id: 45, title: 'Hộp sóng nắp gài in logo thương hiệu', tag: 'Brand Box', category: 'Hộp sóng', img: 'https://picsum.photos/seed/prod45/400/400' },
  { id: 46, title: 'Hộp sóng trắng nắp gài đa năng', tag: 'White Box', category: 'Hộp sóng', img: 'https://picsum.photos/seed/prod46/400/400' },
  { id: 47, title: 'Hộp sóng cuộn kraft cao cấp', tag: 'Kraft Pro', category: 'Hộp sóng', img: 'https://picsum.photos/seed/prod47/400/400' },
  { id: 48, title: 'Hộp sóng ship hàng Ecommerce', tag: 'E-Ship', category: 'Hộp sóng', img: 'https://picsum.photos/seed/prod48/400/400' },
  { id: 49, title: 'Catalogue sản phẩm cao cấp', tag: 'Catalogue', category: 'Catalogue', img: 'https://picsum.photos/seed/prod49/400/400' },
  { id: 50, title: 'Catalogue giới thiệu doanh nghiệp', tag: 'Corp Brochure', category: 'Catalogue', img: 'https://picsum.photos/seed/prod50/400/400' },
  { id: 51, title: 'Phong bì thư in logo thương hiệu', tag: 'Phong Bì', category: 'Phong bì', img: 'https://picsum.photos/seed/prod51/400/400' },
  { id: 52, title: 'Phong bì A4 doanh nghiệp', tag: 'Envelope A4', category: 'Phong bì', img: 'https://picsum.photos/seed/prod52/400/400' },
  { id: 53, title: 'Kẹp file in logo công ty', tag: 'File Folder', category: 'Kẹp file', img: 'https://picsum.photos/seed/prod53/400/400' },
  { id: 54, title: 'Kẹp file hồ sơ doanh nghiệp', tag: 'Corp File', category: 'Kẹp file', img: 'https://picsum.photos/seed/prod54/400/400' },
  { id: 55, title: 'Name card ép kim cao cấp', tag: 'Name Card', category: 'Name card', img: 'https://picsum.photos/seed/prod55/400/400' },
  { id: 56, title: 'Name card doanh nghiệp chuẩn quốc tế', tag: 'Business Card', category: 'Name card', img: 'https://picsum.photos/seed/prod56/400/400' },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredProducts = activeCategory === 'Tất cả' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      <Header />

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

      <Footer />
    </div>
  );
}
