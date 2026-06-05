import type { Metadata } from 'next';
import { getPageMetadata } from '../../lib/seo';
import IndustryClient from './IndustryClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nganh-hang/my-pham-skincare', {
    title: 'Bao Bì Mỹ Phẩm & Skincare - Hộp Cứng Túi Giấy Cao Cấp - In Hoàng Thịnh',
    description: 'Chuyên in bao bì cho ngành mỹ phẩm. Hộp cứng, túi giấy ivory cao cấp, ép kim vàng bạc. Thiết kế 3D miễn phí.',
  });
}

export default function CosmeticsPage() {
  return <IndustryClient />;
}
