import type { Metadata } from 'next';
import { getPageMetadata } from '../../lib/seo';
import IndustryClient from './IndustryClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('nganh-hang/tpcn-duoc-pham', {
    title: 'Bao Bì TPCN & Dược Phẩm - Hộp Cứng Ép Kim - In Hoàng Thịnh',
    description: 'Chuyên in bao bì cho ngành TPCN & Dược phẩm. Hộp cứng ép kim vàng, chuẩn Pantone. Máy tại xưởng, MOQ 500 hộp.',
  });
}

export default function TPCNPage() {
  return <IndustryClient />;
}
