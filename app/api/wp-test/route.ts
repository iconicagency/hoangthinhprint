import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = 'https://cms.inhoangthinh.com.vn/graphql';
  
  try {
    // Test query FULL giống getHomePageData()
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
    
    if (!res.ok) {
      return NextResponse.json({ ok: false, status: res.status, elapsed: `${elapsed}ms` });
    }
    
    const json = await res.json();
    const page = json?.data?.page;
    
    return NextResponse.json({
      ok: true,
      elapsed: `${elapsed}ms`,
      hasErrors: !!json?.errors,
      services: page?.printingServices?.services?.length ?? 'null',
      steps: page?.workingProcess?.steps?.length ?? 'null',
      machines: page?.machinerysection?.machines?.length ?? 'null',
      clients: page?.clientsSection?.clients?.length ?? 'null',
      testimonials: page?.testimonials?.length ?? 'null',
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message });
  }
}
