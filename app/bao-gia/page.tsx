import { getPageMetadata } from '../lib/seo';
import PricingClient from './PricingClient';

export async function generateMetadata() {
  return getPageMetadata('bao-gia', {
    title: 'Bảng Giá In Ấn Bao Bì',
    description: 'Bảng giá tham khảo hộp cứng, túi giấy, hộp carton, tem nhãn. Liên hệ nhận báo giá chính xác.',
  });
}

export default function BaoGiaPage() {
  return <PricingClient />;
}
