import type { Metadata } from 'next';
import { getPageMetadata } from '../../lib/seo';
import IndustryClient from './IndustryClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nganh-hang/ecommerce', {
    title: 'Hộp Ship Hàng Ecommerce - In Logo Brand - In Hoàng Thịnh',
    description: 'Chuyên hộp sóng carton in logo cho Shopee, TikTok Shop. Giá từ 3.000đ/hộp, ship không méo, MOQ 500.',
  });
}

export default function EcommercePage() {
  return <IndustryClient />;
}
