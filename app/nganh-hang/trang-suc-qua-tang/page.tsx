import type { Metadata } from 'next';
import { getPageMetadata } from '../../lib/seo';
import IndustryClient from './IndustryClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nganh-hang/trang-suc-qua-tang', {
    title: 'Bao Bì Trang Sức & Quà Tặng - Hộp Cứng Ép Kim - In Hoàng Thịnh',
    description: 'Chuyên in hộp trang sức, hộp quà tặng cao cấp. Hộp cứng nam châm, lót nhung, ép kim logo. MOQ 500.',
  });
}

export default function JewelryPage() {
  return <IndustryClient />;
}
