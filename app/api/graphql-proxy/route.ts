import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "https://cms.inhoangthinh.com.vn/graphql";

    const res = await fetch(wpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `WordPress trả về lỗi: ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Lỗi GraphQL Proxy:", error);
    return NextResponse.json(
      { error: "Không thể kết nối tới WordPress (Lỗi mạng hoặc SSL)" },
      { status: 500 }
    );
  }
}
