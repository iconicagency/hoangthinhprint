import { getPageMetadata } from '../lib/seo';
import BlogClient from './BlogClient';

export async function generateMetadata() {
  return getPageMetadata('blog', {
    title: 'Blog — Kiến Thức Bao Bì & In Ấn',
    description: 'Cập nhật xu hướng bao bì và kiến thức in ấn cho doanh nghiệp.',
  });
}

export default function BlogPage() {
  return <BlogClient />;
}
