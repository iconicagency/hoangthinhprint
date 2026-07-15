import Image from 'next/image';
import Link from 'next/link';
import {
  Star, Play, Clock, ThumbsUp, ShieldCheck, ArrowRight, Quote,
  Package, Layout, Printer, Layers, Settings, Truck, Search, PenTool, Lightbulb, Zap, Award, Users, Heart, CheckCircle2
} from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

import HeroSlider from './components/HeroSlider';
import WPRecentPosts from './components/WPRecentPosts';
import WPProjects from './components/WPProjects';
import QuoteForm from './components/QuoteForm';
import ServiceLightbox from './components/ServiceLightbox';
import { homeConfig } from './lib/config';
import { getHomePageData, getAboveFoldData } from './lib/wp';
import { getPageMetadata } from './lib/seo';
import ClientLogoSlider from './components/ClientLogoSlider';
import { VI } from './lib/vi';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('trang-chu', {
    title: VI.seoTitle,
    description: VI.seoDesc,
  });
}

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
  // Chi hien section "Tham quan xuong" khi WP THUC SU co video hoac mo ta.
  // Xoa het data trong ACF → section tu an hoan toan (khong con fallback cung).
  const showFactoryTour = videosList.length > 0 || !!factoryTourData?.description;

  const finalPartners = wpHomeData?.clients?.list?.length
    ? wpHomeData.clients.list
    : homeConfig.partners.map((name: string) => ({ name, logo: null }));

  const finalServices = wpHomeData?.printingServices?.services?.length
    ? wpHomeData.printingServices.services.map((s: any, i: number) => ({
        title: s.title, desc: s.desc,
        // Neu co servicecontact tu WP thi hien thi thay cho chu "Lien he"
        price: VI.lienHe,
        contact: s.contact || null,
        link: s.link || null,
        img: s.img || `https://picsum.photos/seed/service-${i}/400/300`,
      }))
    : [
        { title: VI.s1Title, desc: VI.s1Desc, price: VI.lienHe, img: 'box1' },
        { title: VI.s2Title, desc: VI.s2Desc, price: VI.lienHe, img: 'bag1' },
        { title: VI.s3Title, desc: VI.s3Desc, price: VI.lienHe, img: 'cosmetic1' },
        { title: VI.s4Title, desc: VI.s4Desc, price: VI.lienHe, img: 'health1' },
        { title: VI.s5Title, desc: VI.s5Desc, price: VI.lienHe, img: 'book1' },
        { title: VI.s6Title, desc: VI.s6Desc, price: VI.lienHe, img: 'label1' },
        { title: VI.s7Title, desc: VI.s7Desc, price: VI.lienHe, img: 'farm1' },
        { title: VI.s8Title, desc: VI.s8Desc, price: VI.lienHe, img: 'design1' },
      ];

  const finalFeatures = wpHomeData?.whyChooseUs?.features?.length
    ? wpHomeData.whyChooseUs.features.map((f: any) => ({
        icon: iconMap[f.iconName] || Star, title: f.title, desc: f.desc,
      }))
    : [
        { icon: Clock, title: VI.f1Title, desc: VI.f1Desc },
        { icon: ShieldCheck, title: VI.f2Title, desc: VI.f2Desc },
        { icon: CheckCircle2, title: VI.f3Title, desc: VI.f3Desc },
        { icon: ThumbsUp, title: VI.f4Title, desc: VI.f4Desc },
      ];

  const finalProcess = wpHomeData?.workingProcess?.steps?.length
    ? wpHomeData.workingProcess.steps.map((s: any) => ({ step: s.step, title: s.title, desc: s.desc }))
    : [
        { step: '01', title: VI.p1 }, { step: '02', title: VI.p2 },
        { step: '03', title: VI.p3 }, { step: '04', title: VI.p4 },
        { step: '05', title: VI.p5 }, { step: '06', title: VI.p6 },
        { step: '07', title: VI.p7 }, { step: '08', title: VI.p8 },
      ];

  const finalMachines = wpHomeData?.machinery?.machines?.length
    ? wpHomeData.machinery.machines.map((m: any, i: number) => ({
        title: m.title, desc: m.desc,
        img: m.img || `https://picsum.photos/seed/machine-${i+10}/300/200`,
      }))
    : [
        { title: VI.m1, desc: VI.m1d, img: 'machine1' },
        { title: VI.m2, desc: VI.m2d, img: 'machine2' },
        { title: VI.m3, desc: VI.m3d, img: 'machine3' },
        { title: VI.m4, desc: VI.m4d, img: 'machine4' },
        { title: VI.m5, desc: VI.m5d, img: 'machine5' },
        { title: VI.m6, desc: VI.m6d, img: 'machine6' },
      ];

  const finalTestimonials = wpHomeData?.testimonials?.length
    ? wpHomeData.testimonials.map((t: any, i: number) => ({
        content: t.content, author: t.author, position: t.position,
        rating: t.rating || 5, img: `https://picsum.photos/seed/user${i+1}/100/100`,
      }))
    : [
        { content: VI.t1c, author: VI.t1a, position: VI.t1p, rating: 5, img: 'https://picsum.photos/seed/user1/100/100' },
        { content: VI.t2c, author: VI.t2a, position: VI.t2p, rating: 5, img: 'https://picsum.photos/seed/user2/100/100' },
        { content: VI.t3c, author: VI.t3a, position: VI.t3p, rating: 5, img: 'https://picsum.photos/seed/user3/100/100' },
      ];

  const clientsSectionData = wpHomeData?.clients;
  const printingServicesData = wpHomeData?.printingServices;
  const whyChooseUsData = wpHomeData?.whyChooseUs;
  const workingProcessData = wpHomeData?.workingProcess;
  const machinerySectionData = wpHomeData?.machinery;

  return (
    <div className="bg-[var(--bg)] text-[var(--text-main)] font-sans">
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
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{VI.dichVu}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{printingServicesData?.title || VI.dichVuTitle}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <ServiceLightbox services={finalServices} />
      </section>

      {/* Quy Trinh */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{VI.quyTrinh}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{VI.quyTrinh}</h2>
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

      {/* San Pham Da Thuc Hien */}
      <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{VI.duAnTieuBieu}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{VI.sanPhamDaThucHien}</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <WPProjects />
        <div className="text-center mt-12">
          <Link href="/du-an" className="inline-block border-2 border-[var(--border)] text-[var(--text-main)] px-8 py-3.5 rounded font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--card-bg)]">{VI.xemTatCaDuAn}</Link>
        </div>
      </section>

      {/* Khach Hang */}
      <section className="py-24 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{clientsSectionData?.tagline || VI.doiTac}</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{clientsSectionData?.title || VI.khachHangCuaChungToi}</h2>
            <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
          </div>
        </div>
        <div className="w-full relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none"></div>
          <ClientLogoSlider partners={finalPartners} />
        </div>
      </section>

      {/* May Moc Cong Nghe */}
      <section className="py-20 px-8 bg-[var(--card-bg)] border-y border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{machinerySectionData?.tagline || VI.nangLucSanXuat}</div>
            <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-4 tracking-tight">{machinerySectionData?.title || VI.mayMocCongNghe}</h2>
            <p className="text-[var(--text-dim)] mb-6">{VI.chatLuongHangDau}</p>
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

      {/* Tai Sao Chon */}
      <section className="py-24 px-8 bg-[var(--bg)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{whyChooseUsData?.tagline || VI.lyDoChon}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{whyChooseUsData?.title || VI.taiSaoChon}</h2>
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

      {/* Video / Tham quan xuong — CHI hien khi WP co video hoac mo ta */}
      {showFactoryTour && (
        <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{factoryTourData?.tagline || VI.videoGioiThieu}</div>
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{factoryTourData?.title || VI.thamQuanXuong}</h2>
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
                      <h3 className="font-bold text-[var(--text-main)] mb-1 line-clamp-2">{v.title || VI.videoGioiThieu}</h3>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[var(--bg)] rounded-2xl border border-[var(--border)]">
                <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play size={36} className="text-[var(--accent)] ml-1" />
                </div>
                <p className="text-[var(--text-dim)] text-sm max-w-md mx-auto">{factoryTourData?.description}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Blog */}
      <section className="py-24 px-8 bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{VI.tinTuc}</div>
              <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] tracking-tight">{VI.baiVietMoiNhat}</h2>
            </div>
            <Link href="/blog" className="hidden md:inline-flex border-b-2 border-transparent hover:border-[var(--accent)] text-[var(--text-dim)] hover:text-[var(--text-main)] font-medium pb-1 transition-colors">{VI.xemTatCaBaiViet}</Link>
          </div>
          <WPRecentPosts />
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-24 pb-44 px-8 bg-[var(--card-bg)] border-t border-[var(--border)]">
        <div className="text-center mb-16">
          <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-4">{VI.khachHangNoiGi}</div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--text-main)] mb-6 tracking-tight">{VI.danhGiaTuDoiTac}</h2>
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
            <h3 className="text-3xl md:text-4xl font-serif text-[var(--text-main)] mb-4 tracking-tight">{VI.nhanBaoGia}</h3>
            <p className="text-[var(--text-dim)] mb-6">{VI.nhanBaoGiaDesc}</p>
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
