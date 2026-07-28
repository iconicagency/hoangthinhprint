import { NextResponse } from 'next/server';

// Tăng timeout lên 60s cho Vercel Hobby plan
export const maxDuration = 60;

// Cac origin duoc phep goi proxy — chan website khac loi dung proxy de tan cong WP
const ALLOWED_ORIGINS = [
  'https://inhoangthinh.com.vn',
  'https://www.inhoangthinh.com.vn',
];

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin') || '';
  const referer = request.headers.get('referer') || '';
  // Request same-origin/server-side co the khong gui Origin — cho phep
  if (!origin && !referer) return true;
  const src = origin || referer;
  if (ALLOWED_ORIGINS.some(o => src.startsWith(o))) return true;
  // Cho phep moi truong dev/preview
  if (src.startsWith('http://localhost') || src.includes('.vercel.app')) return true;
  return false;
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Origin không được phép' }, { status: 403 });
    }

    const raw = await request.text();
    // Query cua site chi vai KB — body qua lon la dau hieu lam dung
    if (raw.length > 20000) {
      return NextResponse.json({ error: 'Request quá lớn' }, { status: 413 });
    }

    let body: any;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'Body không hợp lệ' }, { status: 400 });
    }

    const query = String(body?.query || '');
    if (!query.trim()) {
      return NextResponse.json({ error: 'Thiếu query' }, { status: 400 });
    }
    // Chan introspection — khong de lo schema WP ra ngoai qua proxy
    if (/\b__schema\b|\b__type\b/.test(query)) {
      return NextResponse.json({ error: 'Introspection không được phép' }, { status: 403 });
    }
    // Site chi doc du lieu — chan moi mutation qua proxy
    if (/^\s*mutation\b/i.test(query)) {
      return NextResponse.json({ error: 'Mutation không được phép' }, { status: 403 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://cms.inhoangthinh.com.vn/graphql';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000);

    // CACHE 120s trong Next Data Cache (key = URL + body):
    // cung mot query + variables → khach sau lay tu cache Vercel (vai ms)
    // thay vi cho WordPress xu ly lai (co the vai giay).
    // Site chi co query doc du lieu (mutation da bi chan o tren) nen cache an toan.
    const res = await fetch(wpUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: body?.variables }),
      next: { revalidate: 120 },
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
