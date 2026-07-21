// SafeHtml — render noi dung HTML tu WordPress SAU KHI da loc XSS.
// Dung thay cho dangerouslySetInnerHTML tho o moi noi hien noi dung WP.
// Khong dung hook → chay duoc ca trong Server Component lan Client Component.
import { sanitizeHtml } from '../lib/sanitize';

interface SafeHtmlProps {
  html?: string | null;
  className?: string;
}

export default function SafeHtml({ html, className }: SafeHtmlProps) {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
  );
}
