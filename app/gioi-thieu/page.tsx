'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, TrendingUp, Users, Award, Package, Printer, Sparkles, Shield, Settings, Box, UserCheck, ShieldCheck, Gem, Truck, Wand2, RefreshCcw, Factory, ArrowRight, Lightbulb, HeartHandshake, Handshake, MapPin, Phone, Mail } from 'lucide-react';
import { useSettings } from '../components/SettingsProvider';
import ContactForm from '../components/ContactForm';
import { getAboutPageData, getPageBySlug, getProjects } from '../lib/wp';

export default function About() {
  const settings = useSettings();
  const [pageData, setPageData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

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
          <div className="inline-block border border-[var(--accent)] text-[var(--accent)] px-5 py-1.5 rounded-full text-xs mb-8 uppercase tracking-widest font-bold bg-[var(--accent)]/10">Ve Chung Toi</div>
          <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight text-[var(--text-main)] tracking-tight">
            {acf?.heroTitle || pageData?.title || '10 Nam Kinh Nghiem Kien Tao Bao Bi Dang Cap'}
          </h1>
          <p className="text-[var(--text-dim)] mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            {acf?.heroSubtitle || 'In Hoang Thinh tu hao la doi tac in an bao bi trong goi chuyen nghiep, dong hanh cung hon 500+ thuong hieu.'}
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
                  <div className="text-3xl font-serif text-[var(--accent)] mb-2">10+ Nam</div>
                  <div className="text-sm text-[var(--text-dim)]">Kinh nghiem trong nganh in an bao bi</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{acf?.storySubtitle || 'CAU CHUYEN CUA CHUNG TOI'}</div>
            <h2 className="text-4xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.storyTitle || 'Tu Xuong In Nho Den Doi Tac Tin Cay'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mb-8"></div>
            <div className="space-y-6 text-[var(--text-dim)] leading-relaxed">
              {acf?.storyContent ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: acf.storyContent }} />
              ) : pageData?.content ? (
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: pageData.content }} />
              ) : (
                <>
                  <p>Khoi dau tu mot xuong in quy mo nho, In Hoang Thinh da khong ngung no luc va phat trien trong suot 10 nam qua.</p>
                  <p>Voi phuong cham <strong>&quot;Chat luong lam nen thuong hieu&quot;</strong>, chung toi dau tu manh me vao he thong may moc hien dai, dong bo ngay tai xuong.</p>
                  <p>Dac biet, In Hoang Thinh tu hao voi chinh sach <strong>&quot;Sai mau = In lai mien phi&quot;</strong>.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tam nhin & Su menh */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">DINH HUONG</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Tam nhin &amp; Su menh</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--bg)] p-10 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mb-6"><Target size={28} /></div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">{acf?.visionTitle || 'Tam nhin'}</h3>
              <p className="text-[var(--text-dim)] leading-relaxed">{acf?.visionContent || 'Tro thanh xuong in bao bi uy tin hang dau tai Ha Noi.'}</p>
            </div>
            <div className="bg-[var(--bg)] p-10 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-14 h-14 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] mb-6"><Eye size={28} /></div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">{acf?.missionTitle || 'Su menh'}</h3>
              <p className="text-[var(--text-dim)] leading-relaxed">{acf?.missionContent || 'Mang den giai phap bao bi chat luong cao voi gia xuong truc tiep. Cam ket: sai mau in lai mien phi.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Con so */}
      <section className="py-24 px-8 bg-[var(--card-bg)] text-[var(--text-main)] text-center border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">NANG LUC</div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">Con so noi len tat ca</h2>
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
                <div className="flex flex-col items-center"><TrendingUp size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">10+</div><div className="text-sm text-[var(--text-dim)]">Nam kinh nghiem</div></div>
                <div className="flex flex-col items-center"><Users size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">500+</div><div className="text-sm text-[var(--text-dim)]">Doanh nghiep da dat in</div></div>
                <div className="flex flex-col items-center"><Award size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">300tr</div><div className="text-sm text-[var(--text-dim)]">Don hang lon nhat (VND)</div></div>
                <div className="flex flex-col items-center"><Package size={32} className="text-[var(--accent)] mb-6" /><div className="text-5xl font-bold text-[var(--accent)] mb-2">500</div><div className="text-sm text-[var(--text-dim)]">MOQ toi thieu (san pham)</div></div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Nang luc san xuat */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">XUONG SAN XUAT</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.productionCapacityTitle || 'Nang luc san xuat'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto mb-8"></div>
            <p className="text-[var(--text-dim)] max-w-3xl mx-auto leading-relaxed">{acf?.productionCapacityDescription || 'Xuong san xuat dat tai KCN Tan Trieu, Thanh Tri, Ha Noi.'}</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-6 mb-12 snap-x">
            {acf?.productionImages?.nodes?.length > 0 ? acf.productionImages.nodes.map((img: any, i: number) => (
              <div key={i} className="min-w-[280px] h-[280px] relative rounded-xl overflow-hidden shrink-0 snap-center">
                <Image src={img.sourceUrl} alt={`Xuong ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            )) : [1,2,3,4,5,6].map((i) => (
              <div key={i} className="min-w-[280px] h-[280px] relative rounded-xl overflow-hidden shrink-0 snap-center">
                <Image src={`https://picsum.photos/seed/factory${i}/400/400`} alt={`Xuong ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(acf?.productionFacilities || [
              { icon: 'Printer', title: 'May In Offset', desc: 'In 4 mau CMYK, chuan quoc te.' },
              { icon: 'Sparkles', title: 'May Ep Kim Vang', desc: 'Ep foil vang, bac, rose gold. May tai xuong.' },
              { icon: 'Shield', title: 'May Can Mang', desc: 'Can mo, can bong. Bao ve be mat.' },
              { icon: 'Settings', title: 'May Be Tu Dong', desc: 'Be hinh chinh xac, khong bavia.' },
              { icon: 'Box', title: 'May Dan Hop', desc: 'Dan canh, dan day tu dong.' },
              { icon: 'UserCheck', title: 'Khu Kiem Tra QC', desc: 'Bang Pantone chuan. Chu xuong kiem tra.' }
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

      {/* Loi ich */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">LOI ICH</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Ban duoc gi khi in an tai In Hoang Thinh?</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="space-y-6">
            {(acf?.benefits || [
              { icon: 'ShieldCheck', title: 'Chat luong san pham luon dam bao', description: 'Sai mau — in lai mien phi, khong dieu kien.' },
              { icon: 'Gem', title: 'Gia thanh canh tranh — Gia xuong truc tiep', description: 'So huu may in offset va may ep kim vang rieng.' },
              { icon: 'Truck', title: 'Cam ket dung tien do giao hang', description: 'Toan bo quy trinh san xuat khep kin tai xuong.' },
              { icon: 'Users', title: 'Doi ngu tan tam, kinh nghiem 10 nam', description: 'Thiet ke 3D mien phi, duyet mau truoc khi in.' },
              { icon: 'Wand2', title: 'Thiet ke mien phi — Duyet truoc khi in', description: 'Mau 3D truc quan, chinh sua khong gioi han.' }
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

      {/* Gia tri cot loi */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">KHAC BIET</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">Gia tri cot loi</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(acf?.coreValues || [
              { icon: 'Settings', title: 'May ep kim tai xuong', description: 'So huu may in offset va may ep kim vang rieng.' },
              { icon: 'UserCheck', title: 'Chu xuong QC truc tiep', description: 'Chu xuong kiem tra tung lo hang. 10 nam nguyen tac.' },
              { icon: 'RefreshCcw', title: 'Sai mau = In lai mien phi', description: 'Cam ket bang hop dong. Khong dat chuan mau — in lai.' },
              { icon: 'Factory', title: 'Xuong rieng tai Ha Noi', description: 'Xuong tai KCN Tan Trieu, Thanh Tri. MOQ 500 san pham.' }
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
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">San pham that — Da giao cho khach hang</h2>
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

      {/* Dich vu */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">DICH VU</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.servicesTitle || 'Dich vu tieu bieu'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(acf?.servicesList || [
              { title: 'Hop Cung Cao Cap', description: 'Am duong - Nam cham - Ngan keo', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv1/400/300' } } },
              { title: 'Tui Giay In Logo', description: 'Ivory - Couche - Kraft', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv2/400/300' } } },
              { title: 'Hop Song Carton', description: 'In logo brand - Ship khong meo', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv3/400/300' } } },
              { title: 'Hop Giay', description: 'Da kich thuoc - In offset', image: { node: { sourceUrl: 'https://picsum.photos/seed/srv4/400/300' } } },
              { title: 'Tem Nhan Decal', description: 'Tem decal - Tem bac - Tem vo', image: null },
              { title: 'Thiet Ke Bao Bi', description: 'Thiet ke 3D mien phi', image: null }
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

      {/* Cam ket */}
      <section className="py-24 px-8 bg-[var(--card-bg)] text-[var(--text-main)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">CAM KET</div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 tracking-tight">{acf?.commitmentsTitle || '5 cam ket voi doi tac'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {(acf?.commitmentsList || [
              { icon: 'Award', title: 'Chat luong uu viet', description: 'Cam ket chuan mau Pantone, kiem soat chat luong nghiem ngat.' },
              { icon: 'Lightbulb', title: 'Sang tao khong gioi han', description: 'Doi ngu thiet ke chuyen nghiep, cap nhat xu huong moi nhat.' },
              { icon: 'HeartHandshake', title: 'Dich vu tan tam', description: 'Tu van nhiet tinh tu y tuong den san pham hoan thien.' },
              { icon: 'Handshake', title: 'Doi tac dang tin cay', description: '10+ nam hoat dong, 500+ doi tac tin tuong.' },
              { icon: 'Gem', title: 'Gia tri thuc', description: 'Gia canh tranh, minh bach trong moi giao dich.' }
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

      {/* Lien he */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-5/12">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">LIEN HE</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{acf?.ctaTitle || 'San sang hop tac?'}</h2>
            <p className="text-[var(--text-dim)] mb-10 leading-relaxed">{acf?.ctaDescription || 'Lien he ngay voi In Hoang Thinh de duoc tu van mien phi va nhan bao gia nhanh trong 5 phut.'}</p>
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center text-[var(--accent)] shrink-0"><MapPin size={24} /></div>
                <div><div className="font-bold text-[var(--text-main)]">Dia chi xuong</div><div className="text-[var(--text-dim)]">{acf?.contactAddress || settings.contactAddress}</div></div>
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
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-8">Gui yeu cau bao gia</h3>
              <ContactForm showCompany={true} showIndustry={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
