import Image from 'next/image';
import Link from 'next/link';
import {
  Star, Play, CheckCircle2, Clock, ThumbsUp, ShieldCheck, ArrowRight, Quote,
  Package, Layout, Printer, Layers, Settings, Truck, Search, PenTool, Lightbulb, Zap, Award, Users, Heart
} from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

import PromoPopup from './components/PromoPopup';
import HeroSlider from './components/HeroSlider';
import WPRecentPosts from './components/WPRecentPosts';
import WPProjects from './components/WPProjects';
import QuoteForm from './components/QuoteForm';
import ServiceLightbox from './components/ServiceLightbox';
import { homeConfig } from './lib/config';
import { getHomePageData, getAboveFoldData } from './lib/wp';
import { getPageMetadata } from './lib/seo';
import ClientLogoSlider from './components/ClientLogoSlider';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('trang-chu', {
    title: 'In Hoang Thinh — Giai Phap Bao Bi Toan Dien',
    description: 'Xuong in bao bi Ha Noi. Hop cung, tui giay, hop carton, tem nhan.',
  });
}

const pageData = {
  services: [
    { title: 'In Hop Cung Chuyen Nghiep', desc: 'Hop cung cao cap · Ep kim · Dong gay sang trong', price: 'Lien he', img: 'box1' },
    { title: 'In Tui Giay', desc: 'Tui giay cao cap Ivory · Couche · Kraft', price: 'Lien he', img: 'bag1' },
    { title: 'Bao Bi My Pham', desc: 'Bao ve tinh chat · Ep kim cao cap', price: 'Lien he', img: 'cosmetic1' },
    { title: 'Bao Bi Duoc Pham', desc: 'Bao quan thuoc · Chuan y te', price: 'Lien he', img: 'health1' },
    { title: 'In Sach - So Tay', desc: 'Bia cung · Bia mem · Dong gay', price: 'Lien he', img: 'book1' },
    { title: 'In Nhan - Tem Decal', desc: 'Tem decal · Tem vo · Kraft', price: 'Lien he', img: 'label1' },
    { title: 'Bao Bi Nong San', desc: 'Chuan xuat khau · Do ben cao', price: 'Lien he', img: 'farm1' },
    { title: 'Thiet Ke Do Hoa', desc: 'Cap nhat xu huong thiet ke', price: 'Lien he', img: 'design1' },
  ],
  features: [
    { icon: Clock, title: 'May Ep Kim Tai Xuong', desc: 'In va ep kim ngay trong cung xuong. Khong gui ngoai, khong outsource.' },
    { icon: ShieldCheck, title: 'Chu Xuong QC Truc Tiep', desc: 'Chinh chu xuong kiem tra tung lo hang truoc khi giao.' },
    { icon: CheckCircle2, title: 'Sai Mau = In Lai Mien Phi', desc: 'Cam ket bang hop dong. Khong dat yeu cau ve mau sac — in lai toan bo, mien phi.' },
    { icon: ThumbsUp, title: 'MOQ 500 — Nhan Don Vua', desc: 'Xuong lon tu choi don nho. In Hoang Thinh nhan tu 500 san pham.' }
  ],
  process: [
    { step: '01', title: 'Tiep nhan' }, { step: '02', title: 'Tu van & Bao gia' },
    { step: '03', title: 'Thiet ke 3D' }, { step: '04', title: 'In mau test' },
    { step: '05', title: 'Ky hop dong' }, { step: '06', title: 'San xuat hang loat' },
    { step: '07', title: 'Kiem tra QC' }, { step: '08', title: 'Giao hang' },
  ],
  machines: [
    { title: 'May In Offset', desc: 'In 4 mau CMYK, chuan quoc te.', img: 'machine1' },
    { title: 'May Ep Kim Vang', desc: 'Ep foil vang, bac, rose gold.', img: 'machine2' },
    { title: 'May Can Mang', desc: 'Can mo, can bong.', img: 'machine3' },
    { title: 'May Be Tu Dong', desc: 'Be hinh chinh xac.', img: 'machine4' },
    { title: 'May Dan Hop', desc: 'Dan canh, dan day tu dong.', img: 'machine5' },
    { title: 'Khu Kiem Tra QC', desc: 'Bang Pantone chuan.', img: 'machine6' }
  ]
};

const iconMap: Record<string, any> = {
  'Clock': Clock, 'ShieldCheck': ShieldCheck, 'CheckCircle2': CheckCircle2,
  'ThumbsUp': ThumbsUp, 'Package': Package, 'Layout': Layout, 'Printer': Printer,
  'Layers': Layers, 'Settings': Settings, 'Truck': Truck, 'Search': Search,
  'PenTool': PenTool, 'Lightbulb': Lightbulb, 'Zap': Zap, 'Award': Award,
  'Users': Users, 'Heart': Heart,
};

export default async function Home() {
  const [aboveResult, homeResult] = await Promise.allSettled([
    getAboveFoldData(),
    getHomePageData(),
  ]);

  const aboveFold = aboveResult.status === 'fulfilled' ? aboveResult.value as any : null;
  const wpHomeData = homeResult.status === 'fulfilled' ? homeResult.value as any : null;

  const finalStats = (aboveFold?.stats?.length ? aboveFold.stats : wpHomeData?.stats?.length ? wpHomeData.stats : homeConfig.stats);
  const videosList: any[] = wpHomeData?.factoryTour?.videosList?.length ? wpHomeData.factoryTour.videosList : [];
  const factoryTourData = wpHomeData?.factoryTour;

  const finalPartners = wpHomeData?.clients?.list?.length
    ? wpHomeData.clients.list
    : homeConfig.partners.map((name: string) => ({ name, logo: null }));

  const finalServices = wpHomeData?.printingServices?.services?.length
    ? wpHomeData.printingServices.services.map((s: any, i: number) => ({
        title: s.title, desc: s.desc, price: 'Lien he',
        img: s.img || `https://picsum.photos/seed/service-${i}/400/300`,
      }))
    : pageData.services;

  const finalFeatures = wpHomeData?.whyChooseUs?.features?.length
    ? wpHomeData.whyChooseUs.features.map((f: any) => ({
        icon: iconMap[f.iconName] || Star, title: f.title, desc: f.desc,
      }))
    : pageData.features;

  const finalProcess = wpHomeData?.workingProcess?.steps?.length
    ? wpHomeData.workingProcess.steps.map((s: any) => ({
        step: s.step, title: s.title, desc: s.desc,
      }))
    : pageData.process;

  const finalMachines = wpHomeData?.machinery?.machines?.length
    ? wpHomeData.machinery.machines.map((m: any, i: number) => ({
        title: m.title, desc: m.desc,
        img: m.img || `https://picsum.photos/seed/machine-${i+10}/300/200`,
      }))
    : pageData.machines;

  const finalTestimonials = wpHomeData?.testimonials?.length
    ? wpHomeData.testimonials.map((t: any, i: number) => ({
        content: t.content, author: t.author, position: t.position,
        rating: t.rating || 5, img: `https://picsum.photos/seed/user${i+1}/100/100`,
      }))
    : [
        { content: "Chat luong hop cung ep kim rat tot. Giao hang dung hen.", author: "Nguyen Van A", position: "Giam doc Marketing - Cong ty ABC", rating: 5, img: "https://picsum.photos/seed/user1/100/100" },
        { content: "Doi ngu tu van nhiet tinh, gia thanh canh tranh.", author: "Tran Thi B", position: "Quan ly thu mua - Tap doan G-Group", rating: 5, img: "https://picsum.photos/seed/user2/100/100" },
        { content: "San pham in mau test rat nhanh.", author: "Le Van C", position: "CEO - Startup PASHANCHA", rating: 5, img: "https://picsum.photos/seed/user3/100/100" },
      ];

  const clientsSectionData = wpHomeData?.clients;
  const printingServicesData = wpHomeData?.printingServices;
  const whyChooseUsData = wpHomeData?.whyChooseUs;
  const workingProcessData = wpHomeData?.workingProcess;
  const machinerySectionData = wpHomeData?.machinery;

  return (
    <div className="bg-[var(--bg)] text-[var(--text-main)] font-sans">
      <PromoPopup />
      <HeroSlider dynamicHero={aboveFold} />

      {/* Stats */}
      <section className="bg-[var(--card-bg)] py-12 border border-[var(--border)] shadow-xl relative z-20 mx-4 md:mx-12 rounded-xl -mt-[36px]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--border)]">
          {finalStats.map((stat: any, i: number) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black text-[var(--accent)] mb-2">
                {stat.number}{stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </div>
              <div className="text-sm text-[var(--text-dim)] font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dich Vu In An */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{printingServicesData?.tagline || 'DICH VU IN AN'}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{printingServicesData?.title || 'DICH VU IN AN CHUYEN NGHIEP'}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <ServiceLightbox services={finalServices} />
      </section>

      {/* Quy Trinh */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{workingProcessData?.tagline || 'QUY TRINH LAM VIEC'}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{workingProcessData?.title || 'QUY TRINH LAM VIEC'}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
            {finalProcess.map((item: any, i: number) => (
              <div key={i} className="relative group">
                <div className="w-16 h-16 mx-auto bg-[var(--card-bg)] rounded-full flex items-center justify-center border-2 border-[var(--border)] group-hover:border-[var(--accent)] text-[var(--accent)] font-black text-xl mb-4 relative z-10 transition-colors">
                  {item.step}
                </div>
                {i < finalProcess.length - 1 && <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-[var(--border)] -z-0"></div>}
                <h3 className="font-bold text-sm text-[var(--text-main)] mb-1">{item.title}</h3>
                {item.desc && <p className="text-[10px] text-[var(--text-dim)] leading-tight px-1">{item.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">DU AN TIEU BIEU</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">SAN PHAM DA THUC HIEN</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <WPProjects />
        <div className="text-center mt-12">
          <Link href="/du-an" className="inline-block border-2 border-[var(--border)] text-[var(--text-main)] px-8 py-3.5 rounded font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--card-bg)]">Xem tat ca du an</Link>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{clientsSectionData?.tagline || 'DOI TAC'}</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{clientsSectionData?.title || 'KHACH HANG CUA CHUNG TOI'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
        </div>
        <div className="w-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
          <ClientLogoSlider partners={finalPartners} />
        </div>
      </section>

      {/* Machinery */}
      <section className="py-20 px-8 bg-[var(--card-bg)] border-y border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{machinerySectionData?.tagline || 'NANG LUC SAN XUAT'}</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-4 tracking-tight">{machinerySectionData?.title || 'MAY MOC & CONG NGHE'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {finalMachines.map((machine: any, i: number) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="relative h-40 rounded-xl overflow-hidden border border-[var(--border)] group">
                  <Image src={(machine.img && machine.img.startsWith('http')) ? machine.img : `https://picsum.photos/seed/machine${i+10}/300/200`} alt={machine.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-3"><span className="text-white font-bold text-xs drop-shadow-md">{machine.title}</span></div>
                </div>
                <div className="bg-[var(--bg)] border border-[var(--border)] rounded-xl p-5 text-center hover:border-[var(--accent)] transition-colors flex-1 flex flex-col justify-center shadow-sm">
                  <p className="text-xs text-[var(--text-dim)] leading-relaxed">{machine.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{whyChooseUsData?.tagline || 'LY DO CHON CHUNG TOI'}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{whyChooseUsData?.title || 'TAI SAO CHON IN HOANG THINH?'}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {finalFeatures.map((item: any, i: number) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-2xl bg-[var(--card-bg)] flex items-center justify-center text-[var(--accent)] mb-6 border border-[var(--border)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] transition-colors duration-300 shadow-sm">
                <item.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-xl text-[var(--text-main)] mb-4">{item.title}</h3>
              <p className="text-base text-[var(--text-dim)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{factoryTourData?.tagline || 'VIDEO GIOI THIEU'}</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{factoryTourData?.title || 'THAM QUAN XUONG IN'}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
          {videosList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videosList.map((v: any, i: number) => (
                <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
                  className="group block bg-[var(--bg)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-lg transition-all">
                  <div className="relative aspect-video overflow-hidden bg-slate-800">
                    {v.cover ? (
                      <Image src={v.cover} alt={v.title || 'Video'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center">
                          <Play size={32} fill="white" className="text-white ml-1" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-[var(--accent)]/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={28} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[var(--text-main)] mb-1 line-clamp-2">{v.title || 'Video gioi thieu'}</h3>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[var(--bg)] rounded-2xl border border-[var(--border)]">
              <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={36} className="text-[var(--accent)] ml-1" />
              </div>
              <p className="text-[var(--text-dim)] text-sm max-w-md mx-auto">{factoryTourData?.description || homeConfig.videoSection.description}</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-8 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">Tin tuc</div>
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] tracking-tight">BAI VIET MOI NHAT</h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex border-b-2 border-transparent hover:border-[var(--accent)] text-[var(--text-dim)] hover:text-[var(--text-main)] font-medium pb-1 transition-colors">Xem tat ca bai viet</Link>
          </div>
          <WPRecentPosts />
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-24 pb-44 px-8 bg-[var(--card-bg)] border-t border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">KHACH HANG NOI GI</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">DANH GIA TU DOI TAC</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {finalTestimonials.map((t: any, i: number) => (
            <div key={i} className="bg-[var(--bg)] p-8 rounded-2xl shadow-sm border border-[var(--border)] relative">
              <Quote size={40} className="text-[var(--border)] absolute top-6 right-6" />
              <div className="flex text-[var(--accent)] mb-6">{[...Array(t.rating)].map((_, index) => (<Star key={index} size={18} fill="currentColor" />))}</div>
              <p className="text-[var(--text-dim)] mb-8 leading-relaxed relative z-10">&quot;{t.content}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--border)] rounded-full overflow-hidden relative">
                  <Image src={t.img} alt={t.author} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-main)]">{t.author}</h4>
                  <p className="text-xs text-[var(--text-dim)]">{t.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Form */}
      <section className="relative z-20 -mt-32 px-4 mb-24">
        <div className="max-w-5xl mx-auto bg-[var(--card-bg)] rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-10 border border-[var(--border)]">
          <div className="md:w-1/2">
            <h3 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-4 tracking-tight">Nhan Bao Gia Trong 5 Phut</h3>
            <p className="text-[var(--text-dim)] mb-6">De lai thong tin, chuyen vien se lien he tu van va bao gia chi tiet ngay lap tuc.</p>
            <div className="w-16 h-[2px] bg-[var(--accent)]"></div>
          </div>
          <div className="md:w-1/2 w-full">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
