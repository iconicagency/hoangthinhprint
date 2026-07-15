'use client';

// Section "San pham mau" dung chung cho cac trang nganh hang
// - Uu tien: posts gan TAG cua nganh hang (vd tag "tpcn-duoc-pham")
// - Fallback 1: posts moi nhat trong category san-pham
// - Fallback 2: anh ACF sampleimages cua trang
// - Fallback 3: placeholder
// → Cach dung trong WP Admin: mo bai viet san pham → o Tags go slug nganh hang
//   (tpcn-duoc-pham / my-pham-skincare / yen-sao / trang-suc-qua-tang / ecommerce) → Update

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';
import { fetchWP } from '../lib/wp';

const BY_TAG_QUERY = `
  query GetSampleProductsByTag($first: Int!, $tag: String!) {
    posts(first: $first, where: {tag: $tag, orderby: {field: DATE, order: DESC}}) {
      nodes {
        id title slug
        featuredImage { node { sourceUrl } }
        categories { nodes { slug } }
      }
    }
  }
`;

const LATEST_QUERY = `
  query GetSampleProductsLatest($first: Int!) {
    posts(first: $first, where: {categoryName: "san-pham", orderby: {field: DATE, order: DESC}}) {
      nodes {
        id title slug
        featuredImage { node { sourceUrl } }
        categories { nodes { slug } }
      }
    }
  }
`;

interface SampleProductsSectionProps {
  tag?: string;                                  // Tag slug cua nganh hang
  fallbackImages?: { sourceUrl: string }[];      // ACF sampleimages nodes
  count?: number;                                // So san pham hien thi (mac dinh 8)
}

export default function SampleProductsSection({ tag, fallbackImages, count = 8 }: SampleProductsSectionProps) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const hasImg = (p: any) => p?.featuredImage?.node?.sourceUrl;
        let nodes: any[] = [];

        // 1. Thu lay theo tag nganh hang truoc
        if (tag) {
          const tagged: any = await fetchWP(BY_TAG_QUERY, { variables: { first: count, tag } });
          nodes = (tagged?.posts?.nodes || []).filter(hasImg);
        }

        // 2. Chua co bai gan tag → lay san pham moi nhat
        if (nodes.length === 0) {
          const latest: any = await fetchWP(LATEST_QUERY, { variables: { first: count } });
          nodes = (latest?.posts?.nodes || []).filter(hasImg);
        }

        if (!cancelled) setProducts(nodes);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm mẫu:', error);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [tag, count]);

  return (
    <section className="py-24 px-8 bg-[var(--card-bg)] border-y border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-main)] mb-6">Sản phẩm mẫu</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length > 0
            ? products.map((p: any) => {
                const subCatSlug = p.categories?.nodes?.find((c: any) => c.slug !== 'san-pham')?.slug;
                return (
                  <Link
                    key={p.id}
                    href={subCatSlug ? `/san-pham?cat=${subCatSlug}` : '/san-pham'}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] group block"
                  >
                    <Image src={p.featuredImage.node.sourceUrl} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-sm font-bold line-clamp-2">{p.title}</span>
                    </div>
                  </Link>
                );
              })
            : fallbackImages && fallbackImages.length > 0
            ? fallbackImages.map((img: any, i: number) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border)] group">
                <Image src={img.sourceUrl} alt={`Mẫu ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
            ))
            : [1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden">
                <ImagePlaceholder label="Thêm sản phẩm trong WP Admin" />
              </div>
            ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/san-pham" className="inline-flex items-center gap-2 border-2 border-[var(--border)] text-[var(--text-main)] px-8 py-3 rounded-full font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors bg-[var(--bg)]">
            Xem tất cả sản phẩm <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
