// ============================================================
// SEO helpers - tích hợp RankMath qua wp-graphql-rank-math
// Cài plugin: https://github.com/AxeWP/wp-graphql-rank-math/releases
// ============================================================

import { Metadata } from 'next';
import { getSeoForPage, getSeoForPost } from './wp';

const SITE_NAME = 'In Hoàng Thịnh';
const SITE_URL = 'https://inhoangthinh.com.vn';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export async function getPageMetadata(slug: string, fallback?: {
  title?: string;
  description?: string;
}): Promise<Metadata> {
  try {
    const seo = await getSeoForPage(slug);
    if (seo) {
      return buildMetadata({
        title: seo.title || seo.opengraphTitle || fallback?.title,
        description: seo.metaDesc || seo.opengraphDescription || fallback?.description,
        ogImage: seo.opengraphImage?.sourceUrl,
        canonical: seo.canonical,
        robots: seo.robots,
      });
    }
  } catch {}

  return buildMetadata({
    title: fallback?.title,
    description: fallback?.description,
  });
}

export async function getPostMetadata(slug: string, fallback?: {
  title?: string;
  description?: string;
}): Promise<Metadata> {
  try {
    const seo = await getSeoForPost(slug);
    if (seo) {
      return buildMetadata({
        title: seo.title || seo.opengraphTitle || fallback?.title,
        description: seo.metaDesc || seo.opengraphDescription || fallback?.description,
        ogImage: seo.opengraphImage?.sourceUrl,
        canonical: seo.canonical,
        robots: seo.robots,
      });
    }
  } catch {}

  return buildMetadata({
    title: fallback?.title,
    description: fallback?.description,
  });
}

function buildMetadata({ title, description, ogImage, canonical, robots }: {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  robots?: string;
}): Metadata {
  const fullTitle = title
    ? title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    : SITE_NAME;

  const metaDescription = description || 'Giải pháp in ấn bao bì trọn gói. Cam kết chất lượng, đúng tiến độ, giá gốc tại xưởng.';
  const ogImg = ogImage || DEFAULT_OG_IMAGE;

  return {
    title: fullTitle,
    description: metaDescription,
    ...(canonical && { alternates: { canonical } }),
    ...(robots && { robots }),
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical || SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: ogImg, width: 1200, height: 630, alt: fullTitle }],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [ogImg],
    },
  };
}
