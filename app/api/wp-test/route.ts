import { NextResponse } from 'next/server';
import { getHomePageData } from '../../lib/wp';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const start = Date.now();
    const data = await getHomePageData();
    const elapsed = Date.now() - start;

    return NextResponse.json({
      ok: !!data,
      elapsed: `${elapsed}ms`,
      printingServices: {
        tagline: data?.printingServices?.tagline ?? 'null',
        title: data?.printingServices?.title ?? 'null',
        servicesCount: data?.printingServices?.services?.length ?? 0,
        firstImg: data?.printingServices?.services?.[0]?.img ?? 'null',
      },
      workingProcess: {
        tagline: data?.workingProcess?.tagline ?? 'null',
        title: data?.workingProcess?.title ?? 'null',
        stepsCount: data?.workingProcess?.steps?.length ?? 0,
      },
      whyChooseUs: {
        tagline: data?.whyChooseUs?.tagline ?? 'null',
        featuresCount: data?.whyChooseUs?.features?.length ?? 0,
      },
      machinery: {
        machinesCount: data?.machinery?.machines?.length ?? 0,
      },
      factoryTour: {
        videosList: data?.factoryTour?.videosList?.length ?? 0,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message });
  }
}
