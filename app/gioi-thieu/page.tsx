'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, TrendingUp, Users, Award, Package, Printer, Sparkles, Shield, Settings, Box, UserCheck, ShieldCheck, Gem, Truck, Wand2, RefreshCcw, Factory, ArrowRight, Lightbulb, HeartHandshake, Handshake, MapPin, Phone, Mail } from 'lucide-react';
import { useSettings } from '../components/SettingsProvider';
import { getAboutPageData, getPageBySlug, getProjects } from '../lib/wp';

export default function About() {
  const settings = useSettings();
  const [pageData, setPageData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        let data = await getAboutPageData();
        if (!data?.cauHinhTrangGioiThieu) {
          const basicData = await getPageBySlug('gioi-thieu');
          if (basicData) data = basicData;
        }
        if (data) setPageData(data);
        const projectData = await getProjects();
        setProjects(projectData || []);
      } catch (error) {
        console.error('Loi khi tai trang gioi thieu:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const acf = pageData?.cauHinhTrangGioiThieu;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] font-sans">
      {/* Hero */}
      <section className="relative py-24 px-8 text-center overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/printingpress/1920/1080')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block border border-[var(--accent)] text-[var(--accent)] px-5 py-1.5 rounded-full text-xs mb-8 uppercase tracking-widest font-bold bg-[var(--accent)]/10">
            Về Chúng Tôi
          </div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight text-[var(--text-main)] tracking-tight">
            {acf?.heroTitle || pageData?.title || '10 Năm Kinh Nghiệm Kiến Tạo Bao Bì Đẳng Cấp'}
          </h1>
          <p className="text-[var(--text-dim)] mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            {acf?.heroSubtitle || 'In Hoàng Thịnh tự hào là đối tác in ấn bao bì trọn gói chuyên nghiệp, đồng hành cùng hơn 500+ thương hiệu lớn nhỏ trên toàn quốc.'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-8 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-[var(--border)]">
              <Image src={acf?.storyImage?.node?.sourceUrl || pageData?.featuredImage?.node?.sourceUrl || 'https://picsum.photos/seed/factory/800/1000'} alt="Xuong in Hoang Thinh" fill className="object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-[var(--bg)]/90 backdrop-blur-md border border-[var(--border)] p-6 rounded-xl">
                  <div className="text-3xl font-serif text-[var(--accent)] mb-2">10+ Năm</div>
                  <div className="text-sm text-[var(--text-dim)]">Kinh nghiệm trong ngành in ấn bao bì</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">
              {acf?.storySubtitle || 'CÂU CHUYỆN CỦA CHÚNG TÔI'}
            </div>
            <h2 className="text-4xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.storyTitle || 'Từ Xưởng In Nhỏ Đến Đối Tác Tin Cậy'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mb-8"></div>
            <div className="space-y-6 text-[var(--text-dim)] leading-relaxed">
              {acf?.storyContent ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: acf.storyContent }} />
              ) : pageData?.content ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageData.content }} />
              ) : (
                <>
                  <p>Khởi đầu từ một xưởng in quy mô nhỏ, In Hoàng Thịnh đã không ngừng nỗ lực và phát triển trong suốt 10 năm qua. Chúng tôi hiểu rằng, bao bì không chỉ là vật chứa đựng, mà còn là &quot;người phát ngôn&quot; thầm lặng cho giá trị thương hiệu của bạn.</p>
                  <p>Với phương châm <strong>&quot;Chất lượng làm nên thương hiệu&quot;</strong>, chúng tôi đầu tư mạnh mẽ vào hệ thống máy móc hiện đại, đồng bộ ngay tại xưởng.</p>
                  <p>Đặc biệt, In Hoàng Thịnh tự hào với chính sách <strong>&quot;Sai màu = In lại miễn phí&quot;</strong>, khẳng định sự tự tin tuyệt đối vào chất lượng sản phẩm.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tầm nhìn & Sứ mệnh */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">ĐỊNH HƯỚNG</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Tầm nhìn &amp; Sứ mệnh</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--bg)] p-10 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mb-6"><Target size={28} /></div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">{acf?.visionTitle || 'Tầm nhìn'}</h3>
              <p className="text-[var(--text-dim)] leading-relaxed">{acf?.visionContent || 'Trở thành xưởng in bao bì uy tín hàng đầu tại Hà Nội, được đối tác tin tưởng lựa chọn nhờ chất lượng thực sự.'}</p>
            </div>
            <div className="bg-[var(--bg)] p-10 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mb-6"><Eye size={28} /></div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">{acf?.missionTitle || 'Sứ mệnh'}</h3>
              <p className="text-[var(--text-dim)] leading-relaxed">{acf?.missionContent || 'Mang đến cho doanh nghiệp Việt giải pháp bao bì chất lượng cao với giá xưởng trực tiếp. Cam kết: sai màu in lại miễn phí, giao hàng đúng hẹn.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Con số */}
      <section className="py-24 px-8 bg-[var(--card-bg)] text-[var(--text-main)] text-center border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">NĂNG LỰC</div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">Con số nói lên tất cả</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {acf?.stats ? acf.stats.map((stat: any, i: number) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-5xl font-bold text-[var(--accent)] mb-2 mt-4">{stat.number}</div>
                <div className="text-sm text-[var(--text-dim)]">{stat.label}</div>
              </div>
            )) : (
              <>
                <div className="flex flex-col items-center"><TrendingUp size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">10+</div><div className="text-sm text-[var(--text-dim)]">Năm kinh nghiệm</div></div>
                <div className="flex flex-col items-center"><Users size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">500+</div><div className="text-sm text-[var(--text-dim)]">Doanh nghiệp đã đặt in</div></div>
                <div className="flex flex-col items-center"><Award size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">300tr</div><div className="text-sm text-[var(--text-dim)]">Đơn hàng lớn nhất (VNĐ)</div></div>
                <div className="flex flex-col items-center"><Package size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">500</div><div className="text-sm text-[var(--text-dim)]">MOQ tối thiểu (sản phẩm)</div></div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Năng lực sản xuất */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">XƯỞNG SẢN XUẤT</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.productionCapacityTitle || 'Năng lực sản xuất'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
            <p className="text-[var(--text-dim)] max-w-3xl mx-auto leading-relaxed">{acf?.productionCapacityDescription || 'Xưởng sản xuất đặt tại KCN Tân Triều, Thanh Trì, Hà Nội — trang bị đầy đủ hệ thống máy móc từ in offset, ép kim vàng, cán màng đến bế tự động và dán hộp.'}</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 mb-12 snap-x">
            {acf?.productionImages?.nodes?.length > 0 ? acf.productionImages.nodes.map((img: any, i: number) => (
              <div key={i} className="min-w-[280px] h-[280px] relative rounded-xl overflow-hidden shrink-0 snap-center">
                <Image src={img.sourceUrl} alt={`Xuong san xuat ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            )) : [1,2,3,4,5,6].map((i) => (
              <div key={i} className="min-w-[280px] h-[280px] relative rounded-xl overflow-hidden shrink-0 snap-center">
                <Image src={`https://picsum.photos/seed/factory${i}/400/400`} alt={`Xuong ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(acf?.productionFacilities || [
              { icon: 'Printer', title: 'Máy In Offset', desc: 'In 4 màu CMYK, chuẩn quốc tế.' },
              { icon: 'Sparkles', title: 'Máy Ép Kim Vàng', desc: 'Ép foil vàng, bạc, rose gold. Máy tại xưởng.' },
              { icon: 'Shield', title: 'Máy Cán Màng', desc: 'Cán mờ, cán bóng. Bảo vệ bề mặt.' },
              { icon: 'Settings', title: 'Máy Bế Tự Động', desc: 'Bế hình chính xác, không bavia.' },
              { icon: 'Box', title: 'Máy Dán Hộp', desc: 'Dán cạnh, dán đáy tự động.' },
              { icon: 'UserCheck', title: 'Khu Kiểm Tra QC', desc: 'Bảng Pantone chuẩn. Chủ xưởng kiểm tra.' }
            ]).map((feature: any, i: number) => {
              let IconComp: any = Factory;
              if (feature.icon === 'Printer') IconComp = Printer;
              if (feature.icon === 'Sparkles') IconComp = Sparkles;
              if (feature.icon === 'Shield') IconComp = Shield;
              if (feature.icon === 'Settings') IconComp = Settings;
              if (feature.icon === 'Box') IconComp = Box;
              if (feature.icon === 'UserCheck') IconComp = UserCheck;
              return (
                <div key={i} className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border)]">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center text-[var(--accent)] mb-6"><IconComp size={24} /></div>
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-3">{feature.title}</h3>
                  <p className="text-[var(--text-dim)] text-sm leading-relaxed">{feature.description || feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lợi ích */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">LỢI ÍCH</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Bạn được gì khi in ấn tại In Hoàng Thịnh?</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="space-y-6">
            {(acf?.benefits || [
              { icon: 'ShieldCheck', title: 'Chất lượng sản phẩm luôn đảm bảo', description: 'Chính chủ xưởng kiểm tra từng lô hàng. Sai màu — in lại miễn phí, không điều kiện.' },
              { icon: 'Gem', title: 'Giá thành cạnh tranh — Giá xưởng trực tiếp', description: 'Sở hữu máy in offset và máy ép kim vàng riêng — không thuê ngoài, không qua trung gian.' },
              { icon: 'Truck', title: 'Cam kết đúng tiến độ giao hàng', description: 'Toàn bộ quy trình sản xuất khép kín tại xưởng. Ship toàn quốc.' },
              { icon: 'Users', title: 'Đội ngũ tận tâm, kinh nghiệm 10 năm', description: 'Đội ngũ In Hoàng Thịnh có hơn 10 năm kinh nghiệm. Thiết kế 3D miễn phí.' },
              { icon: 'Wand2', title: 'Thiết kế miễn phí — Duyệt trước khi in', description: 'Mẫu 3D trực quan, chỉnh sửa không giới hạn. Hoàn toàn miễn phí.' }
            ]).map((benefit: any, i: number) => {
              let IconComp: any = ShieldCheck;
              if (benefit.icon === 'Gem') IconComp = Gem;
              if (benefit.icon === 'Truck') IconComp = Truck;
              if (benefit.icon === 'Users') IconComp = Users;
              if (benefit.icon === 'Wand2') IconComp = Wand2;
              return (
                <div key={i} className="bg-[var(--bg)] p-8 rounded-2xl border border-[var(--border)] flex flex-col md:flex-row gap-6 items-start shadow-sm">
                  <div className="w-14 h-14 shrink-0 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)]"><IconComp size={28} /></div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">{benefit.title}</h3>
                    <p className="text-[var(--text-dim)] leading-relaxed">{benefit.description || benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">KHÁC BIỆT</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Giá trị cốt lõi</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(acf?.coreValues || [
              { icon: 'Settings', title: 'Máy ép kim tại xưởng', description: 'Sở hữu máy in offset và máy ép kim vàng riêng. Không outsource.' },
              { icon: 'UserCheck', title: 'Chủ xưởng QC trực tiếp', description: 'Chủ xưởng kiểm tra từng lô hàng. 10 năm vẫn giữ nguyên nguyên tắc.' },
              { icon: 'RefreshCcw', title: 'Sai màu = In lại miễn phí', description: 'Cam kết bằng hợp đồng. Không đạt chuẩn màu — in lại toàn bộ.' },
              { icon: 'Factory', title: 'Xưởng riêng tại Hà Nội', description: 'Xưởng tại KCN Tân Triều, Thanh Trì, Hà Nội. MOQ từ 500 sản phẩm.' }
            ]).map((item: any, i: number) => {
              let IconComp: any = Factory;
              if (item.icon === 'Settings') IconComp = Settings;
              if (item.icon === 'UserCheck') IconComp = UserCheck;
              if (item.icon === 'RefreshCcw') IconComp = RefreshCcw;
              return (
                <div key={i} className="bg-[var(--card-bg)] p-8 rounded-2xl border border-[var(--border)] text-center hover:border-[var(--accent)]/50 transition-colors">
                  <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mx-auto mb-6"><IconComp size={28} /></div>
                  <h3 className="text-lg font-bold text-[var(--text-main)] mb-4">{item.title}</h3>
                  <p className="text-[var(--text-dim)] text-sm leading-relaxed">{item.description || item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">PORTFOLIO</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Sản phẩm thật — Đã giao cho khách hàng</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {projects.length > 0 ? projects.slice(0, 8).map((proj: any, i: number) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-[var(--border)]">
                <Image src={proj.featuredImage?.node?.sourceUrl || `https://picsum.photos/seed/portfolio${i}/400/400`} alt={proj.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <span className="text-white font-medium">{proj.title}</span>
                </div>
              </div>
            )) : [1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={`https://picsum.photos/seed/portfolio${i}/400/400`} alt={`San pham ${i}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dịch vụ */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">DỊCH VỤ</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.servicesTitle || 'Dịch vụ tiêu biểu'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(acf?.servicesList || [
              { title: 'Hộp Cứng Cao Cấp', description: 'Âm dương - Nam châm - Ngăn kéo', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv1/400/300' } } },
              { title: 'Túi Giấy In Logo', description: 'Ivory - Couche - Kraft', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv2/400/300' } } },
              { title: 'Hộp Sóng Carton', description: 'In logo brand - Ship không méo', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv3/400/300' } } },
              { title: 'Hộp Giấy', description: 'Đa kích thước - In offset', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv4/400/300' } } },
              { title: 'Tem Nhãn Decal', description: 'Tem decal - Tem bạc - Tem vỡ', image: null },
              { title: 'Thiết Kế Bao Bì', description: 'Thiết kế 3D miễn phí', image: null }
            ]).map((srv: any, i: number) => (
              <Link href="/san-pham" key={i} className="group cursor-pointer flex flex-col">
                {srv.image?.node?.sourceUrl && (
                  <div className="relative h-48 rounded-t-2xl overflow-hidden shrink-0">
                    <Image src={srv.image.node.sourceUrl} alt={srv.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className={`bg-[var(--card-bg)] p-6 border border-[var(--border)] flex items-center justify-between hover:border-[var(--accent)] transition-colors flex-1 ${srv.image?.node?.sourceUrl ? 'rounded-b-2xl border-t-0' : 'rounded-2xl'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--bg)] rounded-full flex items-center justify-center text-[var(--accent)] shadow-sm shrink-0"><ArrowRight size={18} /></div>
                    <div>
                      <h3 className="font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">{srv.title}</h3>
                      <p className="text-sm text-[var(--text-dim)]">{srv.description || srv.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cam kết */}
      <section className="py-24 px-8 bg-[var(--card-bg)] text-[var(--text-main)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">CAM KẾT</div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">{acf?.commitmentsTitle || '5 cam kết với đối tác'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {(acf?.commitmentsList || [
              { icon: 'Award', title: 'Chất lượng ưu việt', description: 'Cam kết chuẩn màu Pantone, kiểm soát chất lượng nghiêm ngặt.' },
              { icon: 'Lightbulb', title: 'Sáng tạo không giới hạn', description: 'Đội ngũ thiết kế chuyên nghiệp, cập nhật xu hướng mới nhất.' },
              { icon: 'HeartHandshake', title: 'Dịch vụ tận tâm', description: 'Tư vấn nhiệt tình từ ý tưởng đến sản phẩm hoàn thiện.' },
              { icon: 'Handshake', title: 'Đối tác đáng tin cậy', description: '10+ năm hoạt động, 500+ đối tác tin tưởng.' },
              { icon: 'Gem', title: 'Giá trị thực', description: 'Giá cạnh tranh, minh bạch trong mọi giao dịch.' }
            ]).map((item: any, i: number) => {
              let IconComp: any = Award;
              if (item.icon === 'Lightbulb') IconComp = Lightbulb;
              if (item.icon === 'HeartHandshake') IconComp = HeartHandshake;
              if (item.icon === 'Handshake') IconComp = Handshake;
              if (item.icon === 'Gem') IconComp = Gem;
              return (
                <div key={i} className="bg-[var(--bg)] p-8 rounded-2xl border border-[var(--border)] text-center hover:border-[var(--accent)] transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mx-auto mb-6"><IconComp size={24} /></div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-[var(--text-dim)] text-sm leading-relaxed">{item.description || item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-5/12">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">LIÊN HỆ</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.ctaTitle || 'Sẵn sàng hợp tác?'}</h2>
            <p className="text-[var(--text-dim)] mb-10 leading-relaxed">{acf?.ctaDescription || 'Liên hệ ngay với In Hoàng Thịnh để được tư vấn miễn phí và nhận báo giá nhanh trong 5 phút.'}</p>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0"><MapPin size={24} /></div>
                <div><div className="font-bold text-[var(--text-main)]">Địa chỉ xưởng</div><div className="text-[var(--text-dim)]">{acf?.contactAddress || settings.contactAddress}</div></div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0"><Phone size={24} /></div>
                <div><div className="font-bold text-[var(--text-main)]">Hotline</div><div className="text-[var(--accent)] font-bold">{acf?.contactHotline || settings.contactPhone}</div></div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0"><Mail size={24} /></div>
                <div><div className="font-bold text-[var(--text-main)]">Email</div><div className="text-[var(--accent)]">{acf?.contactEmail || settings.contactEmail}</div></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {acf?.contactImages?.nodes?.length > 0 ? acf.contactImages.nodes.slice(0, 3).map((img: any, i: number) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={img.sourceUrl} alt={`Contact ${i+1}`} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              )) : [1,2,3].map((i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                  <Image src={`https://picsum.photos/seed/contact${i}/200/200`} alt={`Contact ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-7/12">
            <div className="bg-[var(--card-bg)] p-10 rounded-3xl border border-[var(--border)] shadow-xl">
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-8">Gửi yêu cầu báo giá</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Họ và tên <span className="text-red-500">*</span></label><input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" /></div>
                  <div><label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số điện thoại <span className="text-red-500">*</span></label><input type="tel" placeholder="0901 234 567" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Sản phẩm cần in</label><select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"><option>-- Chọn --</option><option>Hộp cứng</option><option>Túi giấy</option><option>Hộp sóng</option></select></div>
                  <div><label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số lượng</label><select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"><option>-- Chọn --</option><option>500 - 1.000</option><option>1.000 - 5.000</option><option>&gt; 5.000</option></select></div>
                  <div><label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Ngành hàng</label><select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"><option>-- Chọn --</option><option>Mỹ phẩm</option><option>Thực phẩm</option><option>Quà tặng</option></select></div>
                </div>
                <div><label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Ghi chú thêm</label><textarea placeholder="Mô tả yêu cầu chi tiết..." rows={4} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]"></textarea></div>
                <button type="button" className="w-full bg-[var(--accent)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2">
                  GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={20} />
                </button>
                <p className="text-center text-xs text-[var(--text-dim)]">Cam kết bảo mật thông tin - Phản hồi trong 5 phút</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
