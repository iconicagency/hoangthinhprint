import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = 'https://cms.inhoangthinh.com.vn/graphql';
  
  try {
    const start = Date.now();
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          page(id: "trang-chu", idType: URI) {
            workingProcess { tagline title steps { steptitle } }
            printingServices { tagline tieuD services { servicetitle } }
            whyChooseUs { whyTagline whyTitle whyList { icon title desc } }
            machinerysection { tagline title danhSachMayMoc { machinename } }
            clientsSection { tagline title clients { clientname } }
            factoryTourSection { tagline title videoUrl coverImage { node { sourceUrl } } }
          }
        }`
      }),
      cache: 'no-store',
    });
    const elapsed = Date.now() - start;
    const json = await res.json();
    const page = json?.data?.page;
    
    return NextResponse.json({
      ok: true,
      elapsed: `${elapsed}ms`,
      hasErrors: !!json?.errors,
      errors: json?.errors ?? null,
      services: page?.printingServices?.services?.length ?? 'null',
      whyList: page?.whyChooseUs?.whyList?.length ?? 'null',
      machines: page?.machinerysection?.danhSachMayMoc?.length ?? 'null',
      videoUrl: page?.factoryTourSection?.videoUrl ?? 'null',
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message });
  }
}
