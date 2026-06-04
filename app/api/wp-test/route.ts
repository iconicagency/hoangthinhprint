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
            workingProcess { tagline title steps { steptitle stepdescription } }
            printingServices { tagline tieuD services { servicetitle servicedescription serviceimage { node { sourceUrl } } } }
            whyChooseUs { whyTagline whyTitle features { iconName featureTitle featureDescription } }
            machinerysection { tagline title machines { machineName machineDescription machineImage { node { sourceUrl } } } }
            clientsSection { tagline title clients { clientname clientlogo { node { sourceUrl } } } }
            factoryTourSection { tagline title description videosList { videoTitle videoUrl coverImage { node { sourceUrl } } } }
            testimonials { content author position rating }
          }
        }`
      }),
      cache: 'no-store',
    });
    const elapsed = Date.now() - start;
    const json = await res.json();
    
    return NextResponse.json({
      ok: res.ok,
      elapsed: `${elapsed}ms`,
      errors: json?.errors ?? null,
      services: json?.data?.page?.printingServices?.services?.length ?? 'null',
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message });
  }
}
