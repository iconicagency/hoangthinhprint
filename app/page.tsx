'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, ChevronDown, Star, Play, CheckCircle2, Clock, ThumbsUp, ShieldCheck, ArrowRight, Quote } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import { useSettings } from './components/SettingsProvider';
import PromoPopup from './components/PromoPopup';
import HeroSlider from './components/HeroSlider';

// =========================================================================
// MOCK DATA: PHẦN NÀY LÀ KHUNG ĐỂ CHUẨN BỊ ĐỔ DỮ LIỆU TỪ WORDPRESS SANG
// =========================================================================
const pageData = {
  stats: [
    { number: '17+', label: 'Năm kinh nghiệm' },
    { number: '500+', label: 'Đối tác tin tưởng' },
    { number: '300tr', label: 'Đơn hàng lớn nhất', suffix: 'tr' },
    { number: '99%', label: 'Giao đúng hẹn' },
  ],
  services: [
    { title: 'In Hộp Cứng Cao Cấp', desc: 'Hộp bánh Trung Thu · Hộp quà Tết', price: 'Liên hệ', img: 'box1' },
    { title: 'In Sách - Sổ Tay', desc: 'Bìa cứng · Bìa mềm · Đóng gáy', price: 'Liên hệ', img: 'book1' },
    { title: 'In Nhãn - Tem Decal', desc: 'Tem decal · Tem vỡ · Kraft', price: 'Liên hệ', img: 'label1' },
    { title: 'Bao Bì Mỹ Phẩm', desc: 'Bảo vệ tính chất · Ép kim cao cấp', price: 'Liên hệ', img: 'cosmetic1' },
    { title: 'Bao Bì Nông Sản', desc: 'Chuẩn xuất khẩu · Độ bền cao', price: 'Liên hệ', img: 'farm1' },
    { title: 'Bao Bì Dược Phẩm', desc: 'Bảo quản thuốc · Chuẩn y tế', price: 'Liên hệ', img: 'health1' },
    { title: 'Túi Giấy In Logo', desc: 'Ivory · Couche · Kraft', price: 'Liên hệ', img: 'bag1' },
    { title: 'Thiết Kế Đồ Họa', desc: 'Cập nhật xu hướng thiết kế', price: 'Liên hệ', img: 'design1' },
  ],
  features: [
    { icon: Clock, title: 'Máy Ép Kim Tại Xưởng', desc: 'In và ép kim ngay trong cùng xưởng. Không gửi ngoài, không outsource. Kiểm soát chất lượng từ đầu đến cuối.' },
    { icon: ShieldCheck, title: 'Chủ Xưởng QC Trực Tiếp', desc: 'Không phải NV QC — chính chủ xưởng kiểm tra từng lô hàng trước khi giao. 17 năm vẫn giữ nguyên nguyên tắc này.' },
    { icon: CheckCircle2, title: 'Sai Màu = In Lại Miễn Phí', desc: 'Cam kết bằng hợp đồng. Không đạt yêu cầu về màu sắc — in lại toàn bộ, miễn phí.' },
    { icon: ThumbsUp, title: 'MOQ 500 — Nhận Đơn Vừa', desc: 'Xưởng lớn từ chối đơn nhỏ. In Hoàng Thịnh nhận từ 500 sản phẩm. Startup hay doanh nghiệp lớn — đều phục vụ.' }
  ],
  process: [
    { step: '01', title: 'Tiếp nhận' },
    { step: '02', title: 'Tư vấn & Báo giá' },
    { step: '03', title: 'Thiết kế 3D' },
    { step: '04', title: 'In mẫu test' },
    { step: '05', title: 'Ký hợp đồng' },
    { step: '06', title: 'Sản xuất hàng loạt' },
    { step: '07', title: 'Kiểm tra QC' },
    { step: '08', title: 'Giao hàng' },
  ],
  projects: [
    { tag: 'Hộp Trung Thu', title: 'Bộ sưu tập bánh trung thu Hoàng Thịnh #4', img: 'mooncake1' },
    { tag: 'Hộp Trung Thu', title: 'Bộ hộp bánh trung thu của Hoàng Thịnh #3', img: 'mooncake2' },
    { tag: 'Hộp Quà Tết', title: 'Hộp quà Tết âm dương Sen Tây Hồ', img: 'project1' },
    { tag: 'Hộp Quà Tết', title: 'Hộp quà tết tập đoàn công nghệ G-GROUP', img: 'project2' },
    { tag: 'Hộp Chức Năng', title: 'Hộp đựng Đông Trùng Hạ Thảo Viện Hàn Lâm', img: 'project3' },
    { tag: 'Hộp Quà Tết', title: 'Hộp quà tết Tân Niên Phú Quý', img: 'project4' },
    { tag: 'Hộp Cao Cấp', title: 'Hộp cứng đựng trà cao cấp PASHANCHA', img: 'project5' },
    { tag: 'Hộp Quà Tết', title: 'Hộp quà Tết quai xách Sen Tây Hồ', img: 'project6' },
  ],
  machines: [
    { title: 'Máy In Offset', desc: 'In 4 màu CMYK, chuẩn quốc tế. Công suất cao,...' },
    { title: 'Máy Ép Kim Vàng', desc: 'Ép foil vàng, bạc, rose gold. Máy tại xưởng — không...' },
    { title: 'Máy Cán Màng', desc: 'Cán mờ, cán bóng. Bảo vệ bề mặt, tăng độ sang trọng.' },
    { title: 'Máy Bế Tự Động', desc: 'Bế hình chính xác. Đường cắt sắc nét, không bavia.' },
    { title: 'Máy Dán Hộp', desc: 'Dán cạnh, dán đáy tự động. Năng suất cao, đều đẹp.' },
    { title: 'Khu Kiểm Tra QC', desc: 'Bảng Pantone chuẩn. Chủ xưởng kiểm tra trực tiếp...' }
  ]
};

export default function Home() {
  const settings = useSettings();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans">
      <PromoPopup />
      <Header />

      <HeroSlider />

      {/* Stats Section */}
      <section className="bg-[var(--card-bg)] py-12 border border-[var(--border)] shadow-xl relative z-20 -mt-10 mx-4 md:mx-12 rounded-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--border)]">
          {pageData.stats.map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black text-[var(--accent)] mb-2">
                {stat.number.replace(stat.suffix || '', '')}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </div>
              <div className="text-sm text-[var(--text-dim)] font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            DỊCH VỤ IN ẤN
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">DỊCH VỤ IN ẤN CHUYÊN NGHIỆP</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pageData.services.map((service, i) => (
            <div key={i} className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--border)] group">
              <div className="h-56 bg-[var(--border)] relative overflow-hidden">
                <Image src={`https://picsum.photos/seed/${service.img}/400/300`} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-[var(--text-main)] mb-2">{service.title}</h3>
                <div className="text-sm text-[var(--text-dim)] mb-5">
                  <p>{service.desc}</p>
                  <p className="mt-1 text-[var(--accent)] underline">{service.price}</p>
                </div>
                <Link href="/san-pham" className="text-[var(--accent)] text-sm font-bold flex items-center gap-2 hover:opacity-80 transition-opacity">Xem chi tiết <ArrowRight size={16}/></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            LÝ DO CHỌN CHÚNG TÔI
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">TẠI SAO CHỌN IN HOÀNG THỊNH?</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {pageData.features.map((item, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-[var(--bg)] flex items-center justify-center text-[var(--accent)] mb-6 border border-[var(--border)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] transition-colors duration-300 shadow-sm">
                <item.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">{item.title}</h3>
              <p className="text-base text-[var(--text-dim)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            QUY TRÌNH LÀM VIỆC
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">QUY TRÌNH 8 BƯỚC CHUYÊN NGHIỆP</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {pageData.process.map((item, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 mx-auto bg-[var(--card-bg)] rounded-full flex items-center justify-center border-2 border-[var(--accent)] text-[var(--accent)] font-black text-xl mb-4 relative z-10">
                  {item.step}
                </div>
                {i < 7 && <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-[var(--border)] -z-0"></div>}
                <h3 className="font-bold text-sm text-[var(--text-main)]">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Projects */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            DỰ ÁN TIÊU BIỂU
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">SẢN PHẨM ĐÃ THỰC HIỆN</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pageData.projects.map((project, i) => (
            <div key={i} className="bg-[var(--card-bg)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--border)] group flex flex-col">
              <div className="h-64 relative overflow-hidden border-b border-[var(--border)]">
                <Image src={`https://picsum.photos/seed/${project.img}/400/400`} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" referrerPolicy="no-referrer" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-3">
                  <span className="inline-block border border-[var(--accent)]/50 text-[var(--accent)] px-3 py-1 rounded-md text-xs font-medium">
                    {project.tag}
                  </span>
                </div>
                <h3 className="text-[var(--text-main)] font-medium leading-relaxed text-sm">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/du-an" className="inline-block border-2 border-[var(--border)] text-[var(--text-main)] px-8 py-3.5 rounded font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--card-bg)]">
            Xem tất cả dự án
          </Link>
        </div>
      </section>

      {/* Machinery */}
      <section className="py-20 px-8 bg-[var(--bg)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              NĂNG LỰC SẢN XUẤT
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-4 tracking-tight">MÁY MÓC & CÔNG NGHỆ</h2>
            <p className="text-[var(--text-dim)] mb-6">Toàn bộ máy móc tại xưởng — không thuê ngoài</p>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pageData.machines.map((machine, i) => (
              <div key={i} className="flex flex-col gap-4">
                {/* Image Box */}
                <div className="relative h-40 rounded-xl overflow-hidden border border-[var(--border)] group">
                  <Image src={`https://picsum.photos/seed/machine${i+10}/300/200`} alt={machine.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-3">
                    <span className="text-white font-bold text-xs drop-shadow-md">{machine.title}</span>
                  </div>
                </div>
                {/* Text Box */}
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 text-center hover:border-[var(--accent)] transition-colors flex-1 flex flex-col justify-center shadow-sm">
                  <p className="text-xs text-[var(--text-dim)] leading-relaxed">{machine.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-[var(--card-bg)] border-t border-[var(--border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              ĐỐI TÁC
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">KHÁCH HÀNG CỦA CHÚNG TÔI</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
        </div>
        
        <div className="w-full relative">
          {/* Gradient masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--card-bg)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--card-bg)] to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {/* First set */}
            <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16 opacity-60">
              <div className="text-2xl font-black text-[var(--border)]">BRAND LOGO</div>
              <div className="text-2xl font-black text-[var(--border)]">PARTNER</div>
              <div className="text-2xl font-black text-gray-300">COMPANY</div>
              <div className="text-2xl font-black text-gray-300">STUDIO</div>
              <div className="text-2xl font-black text-gray-300">AGENCY</div>
            </div>
            {/* Second set (duplicate for seamless loop) */}
            <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16 opacity-60">
              <div className="text-2xl font-black text-gray-300">BRAND LOGO</div>
              <div className="text-2xl font-black text-gray-300">PARTNER</div>
              <div className="text-2xl font-black text-gray-300">COMPANY</div>
              <div className="text-2xl font-black text-gray-300">STUDIO</div>
              <div className="text-2xl font-black text-gray-300">AGENCY</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 px-8 bg-[var(--bg)] border-y border-[var(--border)] relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/factory/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
         <div className="max-w-4xl mx-auto relative z-10 text-center">
            <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-[var(--accent)]/40 text-[var(--bg)]">
              <Play size={40} fill="currentColor" className="ml-2" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[var(--text-main)] tracking-tight">Tham Quan Xưởng In Hoàng Thịnh</h2>
            <p className="text-[var(--text-dim)] text-lg max-w-2xl mx-auto mb-8">Khám phá quy trình sản xuất khép kín từ thiết kế, in ấn đến gia công thành phẩm tại xưởng in quy mô lớn của chúng tôi.</p>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="pt-24 pb-40 px-8 bg-[var(--card-bg)] border-t border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
            KHÁCH HÀNG NÓI GÌ
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">ĐÁNH GIÁ TỪ ĐỐI TÁC</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[var(--bg)] p-8 rounded-2xl shadow-sm border border-[var(--border)] relative">
              <Quote size={40} className="text-[var(--border)] absolute top-6 right-6" />
              <div className="flex text-[var(--accent)] mb-6">
                <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
              </div>
              <p className="text-[var(--text-dim)] mb-8 leading-relaxed relative z-10">&quot;Chúng tôi rất hài lòng với chất lượng hộp cứng ép kim của In Hoàng Thịnh. Màu sắc in chuẩn xác, đường bế sắc nét, đặc biệt là giao hàng rất đúng hẹn dù đơn hàng gấp.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--border)] rounded-full overflow-hidden relative">
                  <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-main)]">Nguyễn Văn A</h4>
                  <p className="text-xs text-[var(--text-dim)]">Giám đốc Marketing - Công ty ABC</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Overlapping Quote Form */}
      <section className="relative z-20 -mt-32 px-4">
        <div className="max-w-5xl mx-auto bg-[var(--card-bg)] rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 border border-[var(--border)]">
          <div className="md:w-1/2">
            <h3 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-4 tracking-tight">Nhận Báo Giá Trong 5 Phút</h3>
            <p className="text-[var(--text-dim)] mb-6">Để lại thông tin, chuyên viên của chúng tôi sẽ liên hệ tư vấn và báo giá chi tiết ngay lập tức.</p>
            <div className="w-16 h-[2px] bg-[var(--accent)] mb-8"></div>
            <div className="flex items-center gap-4 text-[var(--text-main)] font-bold">
              <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-full flex items-center justify-center text-[var(--accent)]">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-sm text-[var(--text-dim)] font-normal">Gọi ngay hotline</div>
                <div className="text-xl text-[var(--accent)]">{settings.contactPhone}</div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="0901 234 567" className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Sản phẩm cần in</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]">
                    <option>-- Chọn --</option>
                    <option>Hộp cứng</option>
                    <option>Túi giấy</option>
                    <option>Hộp sóng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Số lượng dự kiến</label>
                  <select className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]">
                    <option>-- Chọn --</option>
                    <option>500 - 1.000</option>
                    <option>1.000 - 5.000</option>
                    <option>&gt; 5.000</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-dim)] mb-1">Ghi chú thêm</label>
                <textarea placeholder="Mô tả yêu cầu chi tiết (kích thước, chất liệu...)" rows={3} className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"></textarea>
              </div>
              <button type="button" className="w-full bg-[var(--accent)] text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2 mt-2">
                GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-[var(--text-dim)] mt-2">Cam kết bảo mật thông tin - Phản hồi trong 5 phút</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
