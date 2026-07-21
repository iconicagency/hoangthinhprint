import { getPostBySlug, getRecentPosts } from '@/app/lib/wp';
import { getPostMetadata } from '@/app/lib/seo';
import SafeHtml from '@/app/components/SafeHtml';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return getPostMetadata(slug, {
    title: post?.title,
    description: post?.excerpt?.replace(/<[^>]*>/g, '').slice(0, 160),
  });
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, recentPosts] = await Promise.all([
    getPostBySlug(slug),
    getRecentPosts(),
  ]);

  if (!post) notFound();

  const imgUrl = post.featuredImage?.node?.sourceUrl || 'https://picsum.photos/seed/blog-detail/1200/600';
  const wordCount = post.content ? post.content.replace(/<[^>]*>/gm, '').split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  const relatedPosts = recentPosts.filter((p: any) => p.slug !== slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-white text-[var(--text-main)]">

      {/* Hero */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-slate-100">
        <Image
          src={imgUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories?.nodes?.map((cat: any) => (
              <Link
                key={cat.slug}
                href={`/blog?cat=${cat.slug}`}
                className="bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Nội dung chính */}
          <div className="lg:col-span-8">

            {/* Breadcrumb + meta */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-dim)] mb-8">
              <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[var(--accent)] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[var(--text-main)] line-clamp-1">{post.title}</span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-[var(--text-dim)] mb-8 pb-8 border-b border-[var(--border)]">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[var(--accent)]" />
                {new Date(post.date).toLocaleDateString('vi-VN')}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[var(--accent)]" />
                {readTime} phút đọc
              </span>
            </div>

            {/* Nội dung bài viết từ WordPress — sanitize chong XSS qua SafeHtml */}
            <SafeHtml
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-[var(--text-main)]
                prose-p:text-[var(--text-dim)] prose-p:leading-relaxed
                prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-sm
                prose-strong:text-[var(--text-main)]
                prose-ul:text-[var(--text-dim)] prose-ol:text-[var(--text-dim)]
                prose-blockquote:border-[var(--accent)] prose-blockquote:text-[var(--text-dim)]"
              html={post.content || '<p>Đang cập nhật nội dung...</p>'}
            />

            {/* Chia sẻ */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-4">
              <span className="font-medium text-[var(--text-main)] text-sm">Chia sẻ:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://inhoangthinh.com.vn/blog/' + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Facebook
              </a>
              <a
                href={`https://zalo.me/share/url?url=${encodeURIComponent('https://inhoangthinh.com.vn/blog/' + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-400 text-white text-sm rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Zalo
              </a>
            </div>

            {/* CTA */}
            <div className="mt-10 bg-[var(--accent)] rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-2">Cần in bao bì? Nhận báo giá miễn phí trong 5 phút</h3>
              <p className="text-white/90 text-sm mb-6">
                Liên hệ ngay với In Hoàng Thịnh để được tư vấn giải pháp bao bì phù hợp nhất.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/bao-gia"
                  className="bg-white text-[var(--accent)] px-6 py-2.5 rounded-full font-bold text-sm hover:shadow-md transition-shadow"
                >
                  Nhận báo giá
                </Link>
                <a
                  href="tel:0569849999"
                  className="flex items-center gap-2 border border-white/50 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  <Phone size={16} /> 056.984.9999
                </a>
              </div>
            </div>

            {/* Nav bài viết */}
            <div className="mt-10 pt-6 border-t border-[var(--border)] flex justify-between gap-4">
              <Link href="/blog" className="flex items-center gap-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors">
                <ArrowLeft size={16} /> Về danh sách bài viết
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">

              {/* Bài viết liên quan */}
              {relatedPosts.length > 0 && (
                <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--border)] p-6">
                  <h3 className="font-bold text-lg text-[var(--text-main)] mb-5">Bài viết liên quan</h3>
                  <div className="space-y-5">
                    {relatedPosts.map((p: any) => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="flex gap-3 group">
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          {p.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={p.featuredImage.node.sourceUrl}
                              alt={p.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[var(--text-main)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors mb-1">
                            {p.title}
                          </h4>
                          <span className="text-xs text-[var(--text-dim)]">
                            {new Date(p.date).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA sidebar */}
              <div className="bg-[var(--accent)] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Cần tư vấn?</h3>
                <p className="text-white/90 text-sm mb-4">Gọi ngay hotline để nhận báo giá miễn phí.</p>
                <a
                  href="tel:0569849999"
                  className="flex items-center gap-2 bg-white text-[var(--accent)] font-bold px-4 py-2.5 rounded-xl text-sm hover:shadow-md transition-shadow"
                >
                  <Phone size={16} /> 056.984.9999
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
