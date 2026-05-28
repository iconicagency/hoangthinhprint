import { getPageMetadata } from '../lib/seo';
export async function generateMetadata() {
  return getPageMetadata('san-pham', {
    title: 'Sản Phẩm In Ấn Bao Bì',
    description: 'Danh mục sản phẩm in ấn bao bì: hộp cứng, túi giấy, hộp carton, tem nhãn decal.',
  });
}
