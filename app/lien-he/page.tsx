import { getPageMetadata } from '../lib/seo';
import ContactClient from './ContactClient';

export async function generateMetadata() {
  return getPageMetadata('lien-he', {
    title: 'Liên Hệ Báo Giá',
    description: 'Liên hệ In Hoàng Thịnh để nhận báo giá in ấn bao bì. Hotline: 056.984.9999',
  });
}

export default function LienHePage() {
  return <ContactClient />;
}
