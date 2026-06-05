import type { Metadata } from 'next';
import { getPageMetadata } from '../lib/seo';
import { getNganhHangPageData } from '../lib/wp';
import NganhHangClient from './NganhHangClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nganh-hang', {
    title: 'Ngành Hàng - Giải Pháp Bao Bì Chuyên Biệt - In Hoàng Thịnh',
    description: 'Giải pháp bao bì chuyên biệt cho TPCN, Mỹ phẩm, Yến sào, Trang sức, Ecommerce. Hộp cứng, túi giấy cao cấp, ép kim tại xưởng.',
  });
}

const defaultIndustries = [
  { title: 'TPCN & Dược phẩm', description: 'Hộp giấy, hộp cứng cao cấp bảo vệ sản phẩm, tăng độ tin cậy cho thương hiệu.', icon: 'Package', link: '/nganh-hang/tpcn-duoc-pham', img: 'https://picsum.photos/seed/pharma/600/400' },
  { title: 'Mỹ phẩm & Skincare', description: 'Bao bì sang trọng, ép kim, cán mờ tôn lên vẻ đẹp của sản phẩm làm đẹp.', icon: 'Sparkles', link: '/nganh-hang/my-pham-skincare', img: 'https://picsum.photos/seed/cosmetic/600/400' },
  { title: 'Yến sào', description: 'Hộp cứng lót nhung, thiết kế truyền thống kết hợp hiện đại, xứng tầm sản vật quý.', icon: 'Heart', link: '/nganh-hang/yen-sao', img: 'https://picsum.photos/seed/yensao/600/400' },
  { title: 'Trang sức & Quà tặng', description: 'Hộp cứng nhỏ gọn, tinh xảo, đóng mở nam châm tạo trải nghiệm unboxing đẳng cấp.', icon: 'Gift', link: '/nganh-hang/trang-suc-qua-tang', img: 'https://picsum.photos/seed/jewelry/600/400' },
  { title: 'Ecommerce', description: 'Hộp sóng in logo, chắc chắn, bảo vệ hàng hóa trong vận chuyển với chi phí tối ưu.', icon: 'ShoppingCart', link: '/nganh-hang/ecommerce', img: 'https://picsum.photos/seed/ecommerce/600/400' },
];

export default async function NganhHangPage() {
  // Server Component: fetch trực tiếp, không qua proxy
  const pageData = await getNganhHangPageData();
  const acf = pageData?.cauHinhTrangNganhHang;

  // danhsachnganhhang la field name dung theo GraphQL schema
  const industries = acf?.danhsachnganhhang?.length > 0
    ? acf.danhsachnganhhang
    : defaultIndustries;

  return <NganhHangClient pageData={pageData} industries={industries} />;
}
