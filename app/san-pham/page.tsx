import { getPageMetadata } from '../lib/seo';
import { fetchWP, getPageBySlug } from '../lib/wp';
import ProductsClient, { GALLERY_QUERY, PRODUCT_CATS_QUERY, PER_PAGE, type ProductsInitialData } from './ProductsClient';

export async function generateMetadata() {
  return getPageMetadata('san-pham', {
    title: 'Sản Phẩm In Ấn Bao Bì',
    description: 'Danh mục sản phẩm in ấn bao bì: hộp cứng, túi giấy, hộp carton, tem nhãn decal.',
  });
}

// SSR trang dau: fetch san pham + danh muc NGAY TREN SERVER (WP data da cache 60s)
// → HTML tra ve co san 24 san pham dau tien, khong con man hinh cho + fetch chain phia client.
// Client chi fetch them khi cuon xuong hoac doi danh muc.
export default async function SanPhamPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const activeCat = cat || 'tat-ca';
  const slugParam = activeCat === 'tat-ca' ? 'san-pham' : activeCat;

  const [galleryResult, catsResult, pageResult] = await Promise.allSettled([
    fetchWP(GALLERY_QUERY, { variables: { first: PER_PAGE, categorySlug: slugParam, after: null } }),
    fetchWP(PRODUCT_CATS_QUERY),
    getPageBySlug('san-pham'),
  ]);

  const galleryData = galleryResult.status === 'fulfilled' ? galleryResult.value as any : null;
  const catsData = catsResult.status === 'fulfilled' ? catsResult.value as any : null;
  const pageData = pageResult.status === 'fulfilled' ? pageResult.value : null;

  const posts = galleryData?.posts;
  const initialData: ProductsInitialData = {
    cat: activeCat,
    products: posts?.nodes || [],
    hasNextPage: !!posts?.pageInfo?.hasNextPage,
    endCursor: posts?.pageInfo?.endCursor || null,
    categories: catsData?.category?.children?.nodes || [],
    pageData,
  };

  return <ProductsClient initialData={initialData} />;
}
