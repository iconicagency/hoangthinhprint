import type { Metadata } from 'next';
import { getPageMetadata } from '../../lib/seo';
import IndustryClient from './IndustryClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nganh-hang/yen-sao', {
    title: 'Bao Bì Yến Sào - Hộp Cứng Ép Kim Vàng - In Hoàng Thịnh',
    description: 'Chuyên in hộp yến sào cao cấp. Hộp cứng ép kim vàng, lót nhung, thiết kế truyền thống. Xứng tầm sản vật quý.',
  });
}

export default function YenSaoPage() {
  return <IndustryClient />;
}