import { NextResponse } from 'next/server';

// Tăng timeout lên 60s cho Vercel Hobby plan
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.inhoangthinh.com.vn/graphql';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    const res = await fetch(wpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return NextResponse.json(
        { error: `WordPress trả về lỗi: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      console.error('GraphQL Proxy timeout sau 55s');
      return NextResponse.json(
        { error: 'WordPress phản hồi quá chậm, vui lòng thử lại.' },
        { status: 504 }
      );
    }
    console.error('Lỗi GraphQL Proxy:', error);
    return NextResponse.json(
      { error: 'Không thể kết nối tới WordPress' },
      { status: 500 }
    );
  }
}
