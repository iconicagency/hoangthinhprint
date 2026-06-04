import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
            printingServices { services { servicetitle } }
            whyChooseUs {
              whyList {
                icon { node { sourceUrl } }
                title
                desc
              }
            }
            machinerysection {
              danhSachMayMoc { machinename }
            }
            factoryTourSection {
              videoUrl
            }
          }
        }`
      }),
      cache: 'no-store',
    });
    const elapsed = Date.now() - start;
    const json = await res.json();
    const page = json?.data?.page;
    
    return NextResponse.json({
      ok: !json?.errors,
      elapsed: `${elapsed}ms`,
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
