import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg)] text-[var(--text-dim)] pt-24 pb-12 px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="text-3xl font-black text-[var(--text-main)] tracking-tighter flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-sm flex items-center justify-center text-[var(--bg)] text-sm">IHT</div>
            IN HOÀNG THỊNH
          </div>
          <p className="text-sm leading-relaxed mb-6">Đối tác in ấn bao bì trọn gói chuyên nghiệp. Cam kết chất lượng, đúng tiến độ, giá gốc tại xưởng.</p>
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)] transition-colors cursor-pointer text-[var(--text-main)]">FB</div>
             <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)] transition-colors cursor-pointer text-[var(--text-main)]">YT</div>
             <div className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:border-[var(--accent)] transition-colors cursor-pointer text-[var(--text-main)]">ZL</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-[var(--text-main)] font-bold text-lg mb-6 uppercase tracking-wide">Dịch Vụ In Ấn</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Hộp Cứng Cao Cấp</li>
            <li className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Túi Giấy</li>
            <li className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Hộp Sóng Carton</li>
            <li className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Tem Nhãn Decal</li>
            <li className="hover:text-[var(--accent)] cursor-pointer flex items-center gap-2"><ArrowRight size={12}/> In Catalogue, Brochure</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--text-main)] font-bold text-lg mb-6 uppercase tracking-wide">Thông Tin Liên Hệ</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[var(--accent)] shrink-0 mt-0.5" />
              <span>Số 12, Đường số 5, KDC CityLand, Phường 10, Quận Gò Vấp, TP.HCM</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[var(--accent)] shrink-0" />
              <span>090.XXX.XXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[var(--accent)] shrink-0" />
              <span>admin@inhoangthinh.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--text-main)] font-bold text-lg mb-6 uppercase tracking-wide">Bản Đồ</h4>
          <div className="w-full h-40 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden relative">
             <Image src="https://picsum.photos/seed/map/400/300" alt="Map" fill className="object-cover opacity-50" referrerPolicy="no-referrer" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-[var(--text-main)] bg-[var(--bg)]/80 px-3 py-1 rounded border border-[var(--border)]">Xem trên Google Maps</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--border)] text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm">
        <p>&copy; 2024 In Hoàng Thịnh. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Chính sách bảo mật</span>
          <span className="hover:text-[var(--text-main)] cursor-pointer transition-colors">Điều khoản dịch vụ</span>
        </div>
      </div>
    </footer>
  );
}
