import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = 'https://cms.inhoangthinh.com.vn/graphql';
  
  try {
    const start = Date.now();
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{ page(id: "trang-chu", idType: URI) { printingServices { services { servicetitle } } cauHinhTrangChu { stats { number label } } } }`
      }),
      cache: 'no-store',
    });
    const elapsed = Date.now() - start;
    
    if (!res.ok) {
      return NextResponse.json({ ok: false, status: res.status, elapsed });
    }
    
    const json = await res.json();
    const services = json?.data?.page?.printingServices?.services;
    const stats = json?.data?.page?.cauHinhTrangChu?.stats;
    
    return NextResponse.json({
      ok: true,
      elapsed: `${elapsed}ms`,
      servicesCount: services?.length ?? 'null',
      statsCount: stats?.length ?? 'null',
      firstService: services?.[0]?.servicetitle ?? 'null',
      firstStat: stats?.[0]?.number ?? 'null',
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message });
  }
}
