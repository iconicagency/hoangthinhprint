'use client';

import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Target, Eye, TrendingUp, Users, Award, Package, Printer, Sparkles, Shield, Settings, Box, UserCheck, ShieldCheck, Gem, Truck, Wand2, RefreshCcw, Factory, ArrowRight, Lightbulb, HeartHandshake, Handshake, MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 text-center overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/printingpress/1920/1080')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block border border-[var(--accent)] text-[var(--accent)] px-5 py-1.5 rounded-full text-xs mb-8 uppercase tracking-widest font-bold bg-[var(--accent)]/10">
            Về Chúng Tôi
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight text-[var(--text-main)] tracking-tight">
            17 Năm Kinh Nghiệm<br/>Kiến Tạo Bao Bì Đẳng Cấp
          </h1>
          <p className="text-[var(--text-dim)] mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            In Hoàng Thịnh tự hào là đối tác in ấn bao bì trọn gói chuyên nghiệp, đồng hành cùng hơn 500+ thương hiệu lớn nhỏ trên toàn quốc.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-8 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-[var(--border)]">
              <Image src="https://picsum.photos/seed/factory/800/1000" alt="Xưởng in Hoàng Thịnh" fill className="object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-[var(--bg)]/90 backdrop-blur-md border border-[var(--border)] p-6 rounded-xl">
                  <div className="text-3xl font-serif text-[var(--accent)] mb-2">17+ Năm</div>
                  <div className="text-sm text-[var(--text-dim)]">Kinh nghiệm trong ngành in ấn bao bì</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </div>
            <h2 className="text-4xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Từ Xưởng In Nhỏ Đến Đối Tác Tin Cậy</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mb-8"></div>
            <div className="space-y-6 text-[var(--text-dim)] leading-relaxed">
              <p>
                Khởi đầu từ một xưởng in quy mô nhỏ, In Hoàng Thịnh đã không ngừng nỗ lực và phát triển trong suốt 17 năm qua. Chúng tôi hiểu rằng, bao bì không chỉ là vật chứa đựng, mà còn là &quot;người phát ngôn&quot; thầm lặng cho giá trị thương hiệu của bạn.
              </p>
              <p>
                Với phương châm <strong>&quot;Chất lượng làm nên thương hiệu&quot;</strong>, chúng tôi đầu tư mạnh mẽ vào hệ thống máy móc hiện đại, đồng bộ ngay tại xưởng. Từ máy in Offset 4 màu chuẩn quốc tế, máy ép kim, bế tự động đến máy dán hộp, tất cả đều được vận hành bởi đội ngũ thợ lành nghề.
              </p>
              <p>
                Đặc biệt, In Hoàng Thịnh tự hào với chính sách <strong>&quot;Sai màu = In lại miễn phí&quot;</strong>, khẳng định sự tự tin tuyệt đối vào chất lượng sản phẩm và cam kết mang lại sự an tâm cao nhất cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Tầm nhìn & Sứ mệnh */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              ĐỊNH HƯỚNG
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Tầm nhìn &amp; Sứ mệnh</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tầm nhìn */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Tầm nhìn</h3>
              <p className="text-slate-600 leading-relaxed">
                Trở thành xưởng in bao bì uy tín hàng đầu tại Hà Nội, được đối tác tin tưởng lựa chọn nhờ chất lượng thực sự — không phải lời hứa suông. Phát triển bền vững dựa trên năng lực sản xuất thật, máy móc tại xưởng và cam kết bằng hành động.
              </p>
            </div>

            {/* Sứ mệnh */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mb-6">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Sứ mệnh</h3>
              <p className="text-slate-600 leading-relaxed">
                Mang đến cho doanh nghiệp Việt giải pháp bao bì chất lượng cao với giá xưởng trực tiếp. Đặt khách hàng là trung tâm — tư vấn tận tâm, thiết kế miễn phí, sản xuất chỉn chu. Cam kết: sai màu in lại miễn phí, giao hàng đúng hẹn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Con số nói lên tất cả */}
      <section className="py-24 px-8 bg-[#111827] text-white text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              NĂNG LỰC
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">Con số nói lên tất cả</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center">
              <TrendingUp size={32} className="text-[var(--accent)] mb-6" />
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">17+</div>
              <div className="text-sm text-slate-300">Năm kinh nghiệm</div>
            </div>
            <div className="flex flex-col items-center">
              <Users size={32} className="text-[var(--accent)] mb-6" />
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">500+</div>
              <div className="text-sm text-slate-300">Doanh nghiệp đã đặt in</div>
            </div>
            <div className="flex flex-col items-center">
              <Award size={32} className="text-[var(--accent)] mb-6" />
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">300tr</div>
              <div className="text-sm text-slate-300">Đơn hàng lớn nhất (VNĐ)</div>
            </div>
            <div className="flex flex-col items-center">
              <Package size={32} className="text-[var(--accent)] mb-6" />
              <div className="text-5xl font-bold text-[var(--accent)] mb-2">500</div>
              <div className="text-sm text-slate-300">MOQ tối thiểu (sản phẩm)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Năng lực sản xuất */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              XƯỞNG SẢN XUẤT
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Năng lực sản xuất</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
            <p className="text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Xưởng sản xuất đặt tại KCN Tân Triều, Thanh Trì, Hà Nội — trang bị đầy đủ hệ thống máy móc từ in offset, ép kim vàng, cán màng đến bế tự động và dán hộp. Toàn bộ quy trình sản xuất khép kín ngay tại xưởng.
            </p>
          </div>

          {/* Image Gallery */}
          <div className="flex gap-4 overflow-x-auto pb-6 mb-12 snap-x scrollbar-hide">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="min-w-[280px] h-[280px] relative rounded-xl overflow-hidden shrink-0 snap-center">
                <Image src={`https://picsum.photos/seed/factory${i}/400/400`} alt={`Xưởng sản xuất ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Printer, title: 'Máy In Offset', desc: 'In 4 màu CMYK, chuẩn quốc tế. Công suất cao, màu sắc sắc nét.' },
              { icon: Sparkles, title: 'Máy Ép Kim Vàng', desc: 'Ép foil vàng, bạc, rose gold. Máy tại xưởng — không outsource.' },
              { icon: Shield, title: 'Máy Cán Màng', desc: 'Cán mờ, cán bóng. Bảo vệ bề mặt, tăng độ sang trọng cho sản phẩm.' },
              { icon: Settings, title: 'Máy Bế Tự Động', desc: 'Bế hình chính xác. Đường cắt sắc nét, không bavia.' },
              { icon: Box, title: 'Máy Dán Hộp', desc: 'Dán cạnh, dán đáy tự động. Năng suất cao, đều đẹp.' },
              { icon: UserCheck, title: 'Khu Kiểm Tra QC', desc: 'Bàn QC chuyên dụng. Bảng Pantone chuẩn. Chủ xưởng kiểm tra trực tiếp.' }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Lợi ích */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              LỢI ÍCH
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Bạn được gì khi in ấn tại In Hoàng Thịnh?</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="space-y-6">
            {[
              { icon: ShieldCheck, title: 'Chất lượng sản phẩm luôn đảm bảo', desc: 'Nguyên liệu được kiểm duyệt chặt chẽ trước khi đưa vào sản xuất. Chính chủ xưởng kiểm tra từng lô hàng trước khi giao. Cam kết bằng hợp đồng: sai màu — in lại miễn phí, không điều kiện.' },
              { icon: Gem, title: 'Giá thành cạnh tranh — Giá xưởng trực tiếp', desc: 'Sở hữu máy in offset và máy ép kim vàng riêng — không thuê ngoài, không qua trung gian. Chi phí sản xuất được tối ưu, khách hàng hưởng giá xưởng trực tiếp.' },
              { icon: Truck, title: 'Cam kết đúng tiến độ giao hàng', desc: 'Toàn bộ quy trình sản xuất khép kín tại xưởng — từ in, ép kim, cán màng đến bế và dán hộp. Không phụ thuộc bên ngoài, chủ động hoàn toàn về tiến độ. Ship toàn quốc.' },
              { icon: Users, title: 'Đội ngũ tận tâm, kinh nghiệm 17 năm', desc: 'Từ tư vấn, thiết kế đến sản xuất — đội ngũ In Hoàng Thịnh có hơn 17 năm kinh nghiệm trong ngành in bao bì. Thiết kế 3D miễn phí, duyệt mẫu trước khi in.' },
              { icon: Wand2, title: 'Thiết kế miễn phí — Duyệt trước khi in', desc: 'Đội ngũ thiết kế tạo mẫu 3D trực quan, khách hàng duyệt mẫu cho đến khi ưng ý. Không giới hạn số lần chỉnh sửa. Hoàn toàn miễn phí.' }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6 items-start shadow-sm">
                <div className="w-14 h-14 shrink-0 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)]">
                  <benefit.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Khác biệt - Giá trị cốt lõi */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              KHÁC BIỆT
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Giá trị cốt lõi</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Settings, title: 'Máy ép kim tại xưởng', desc: 'Sở hữu máy in offset và máy ép kim vàng riêng. Không thuê ngoài, không outsource.' },
              { icon: UserCheck, title: 'Chủ xưởng QC trực tiếp', desc: 'Chính chủ xưởng kiểm tra từng lô hàng trước khi giao. 17 năm vẫn giữ nguyên nguyên tắc.' },
              { icon: RefreshCcw, title: 'Sai màu = In lại miễn phí', desc: 'Cam kết bằng hợp đồng. Không đạt chuẩn màu — in lại toàn bộ, miễn phí.' },
              { icon: Factory, title: 'Xưởng riêng tại Hà Nội', desc: 'Xưởng sản xuất tại KCN Tân Triều, Thanh Trì, Hà Nội. Đáp ứng đơn từ 500 sản phẩm.' }
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:border-[var(--accent)]/50 transition-colors">
                <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Portfolio */}
      <section className="py-24 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              PORTFOLIO
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Sản phẩm thật — Đã giao cho khách hàng</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={`https://picsum.photos/seed/portfolio${i}/400/400`} alt={`Sản phẩm ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Dịch vụ */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              DỊCH VỤ
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Dịch vụ tiêu biểu</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Hộp Cứng Cao Cấp', desc: 'Âm dương - Nam châm - Ngăn kéo', img: 'https://picsum.photos/seed/srv1/400/300' },
              { title: 'Túi Giấy In Logo', desc: 'Ivory - Couche - Kraft', img: 'https://picsum.photos/seed/srv2/400/300' },
              { title: 'Hộp Sóng Carton', desc: 'In logo brand - Ship không méo', img: 'https://picsum.photos/seed/srv3/400/300' },
              { title: 'Hộp Giấy', desc: 'Đa kích thước - In offset', img: 'https://picsum.photos/seed/srv4/400/300' },
              { title: 'Tem Nhãn Decal', desc: 'Tem decal - Tem bạc - Tem vỡ', img: null },
              { title: 'Thiết Kế Bao Bì', desc: 'Thiết kế 3D miễn phí', img: null }
            ].map((srv, i) => (
              <div key={i} className="group cursor-pointer flex flex-col">
                {srv.img && (
                  <div className="relative h-48 rounded-t-2xl overflow-hidden shrink-0">
                    <Image src={srv.img} alt={srv.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className={`bg-slate-50 p-6 border border-slate-100 flex items-center justify-between hover:border-[var(--accent)] transition-colors flex-1 ${srv.img ? 'rounded-b-2xl border-t-0' : 'rounded-2xl'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[var(--accent)] shadow-sm shrink-0">
                      <ArrowRight size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-[var(--accent)] transition-colors">{srv.title}</h3>
                      <p className="text-sm text-slate-500">{srv.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Cam kết */}
      <section className="py-24 px-8 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              CAM KẾT
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">5 cam kết với đối tác</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { icon: Award, title: 'Chất lượng ưu việt', desc: 'Cam kết chuẩn màu Pantone, kiểm soát chất lượng nghiêm ngặt từng công đoạn.' },
              { icon: Lightbulb, title: 'Sáng tạo không giới hạn', desc: 'Đội ngũ thiết kế chuyên nghiệp, luôn cập nhật xu hướng mới nhất.' },
              { icon: HeartHandshake, title: 'Dịch vụ tận tâm', desc: 'Tư vấn nhiệt tình từ ý tưởng đến sản phẩm hoàn thiện.' },
              { icon: Handshake, title: 'Đối tác đáng tin cậy', desc: '17+ năm hoạt động, 500+ đối tác tin tưởng trên toàn quốc.' },
              { icon: Gem, title: 'Giá trị thực', desc: 'Giá cạnh tranh, không phát sinh chi phí, minh bạch trong mọi giao dịch.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#1f2937] p-8 rounded-2xl border border-slate-700 text-center hover:border-[var(--accent)] transition-colors">
                <div className="w-12 h-12 bg-[#374151] rounded-full flex items-center justify-center text-[var(--accent)] mx-auto mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Liên hệ */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-5/12">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              LIÊN HỆ
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight">Sẵn sàng hợp tác?</h2>
            <p className="text-slate-600 mb-10 leading-relaxed">
              Liên hệ ngay với In Hoàng Thịnh để được tư vấn miễn phí và nhận báo giá nhanh trong 5 phút. Chúng tôi sẵn sàng phục vụ mọi nhu cầu in bao bì — từ 500 sản phẩm trở lên.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Địa chỉ xưởng</div>
                  <div className="text-slate-600">KCN Tân Triều, Thanh Trì, Hà Nội</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Hotline</div>
                  <div className="text-[var(--accent)] font-bold">090.XXX.XXXX</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Email</div>
                  <div className="text-[var(--accent)]">admin@inhoangthinh.com</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image src="https://picsum.photos/seed/contact1/200/200" alt="Contact 1" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image src="https://picsum.photos/seed/contact2/200/200" alt="Contact 2" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image src="https://picsum.photos/seed/contact3/200/200" alt="Contact 3" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

          <div className="lg:w-7/12">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Gửi yêu cầu báo giá</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                    <input type="tel" placeholder="0901 234 567" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tên công ty</label>
                    <input type="text" placeholder="Công ty ABC" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Sản phẩm cần in</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white">
                      <option>-- Chọn --</option>
                      <option>Hộp cứng</option>
                      <option>Túi giấy</option>
                      <option>Hộp sóng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số lượng dự kiến</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white">
                      <option>-- Chọn --</option>
                      <option>500 - 1.000</option>
                      <option>1.000 - 5.000</option>
                      <option>&gt; 5.000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ngành hàng</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-white">
                      <option>-- Chọn --</option>
                      <option>Mỹ phẩm</option>
                      <option>Thực phẩm</option>
                      <option>Quà tặng</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Ghi chú thêm</label>
                  <textarea placeholder="Mô tả yêu cầu chi tiết..." rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"></textarea>
                </div>
                <button type="button" className="w-full bg-[#d9381e] text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors uppercase tracking-wide flex items-center justify-center gap-2">
                  GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={20} />
                </button>
                <p className="text-center text-xs text-slate-500 mt-4">Cam kết bảo mật thông tin - Phản hồi trong 5 phút</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
