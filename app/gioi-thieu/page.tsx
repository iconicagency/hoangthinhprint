import type { Metadata } from 'next';
import { getPageMetadata } from '../lib/seo';
import GioiThieuClient from './GioiThieuClient';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('gioi-thieu', {
    title: 'Giới Thiệu In Hoàng Thịnh - 10 Năm Kinh Nghiệm In Ấn Bao Bì',
    description: 'In Hoàng Thịnh - xưởng in bao bì chuyên nghiệp tại Hà Nội. 10 năm kinh nghiệm, máy móc hiện đại, cam kết sai màu in lại miễn phí.',
  });
}

export default function GioiThieuPage() {
  return <GioiThieuClient />;
}
