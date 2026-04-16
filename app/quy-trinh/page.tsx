'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MessageSquare, PenTool, Printer, Factory, Truck, ArrowRight } from 'lucide-react';
import { useSettings } from '../components/SettingsProvider';

export default function Process() {
  const settings = useSettings();
  const steps = [
    {
      id: '01',
      title: 'Tư Vấn & Báo Giá',
      icon: MessageSquare,
      desc1: 'Bạn gửi yêu cầu, chúng tôi báo giá trong 5 phút. Tư vấn chọn chất liệu, kích thước, kỹ thuật in phù hợp.',
      desc2: `Liên hệ qua Hotline ${settings.contactPhone} hoặc Zalo. Nhân viên sẽ tư vấn chi tiết và gửi báo giá nhanh nhất.`
    },
    {
      id: '02',
      title: 'Thiết Kế',
      icon: PenTool,
      desc1: 'Thiết kế 3D miễn phí. Bạn duyệt mẫu, sửa đến khi ưng ý. Không giới hạn số lần chỉnh sửa.',
      desc2: 'Gửi logo, nội dung cần in. Đội ngũ designer tạo mẫu 3D trực quan. Duyệt qua Zalo/Email.'
    },
    {
      id: '03',
      title: 'In Mẫu Thử',
      icon: Printer,
      desc1: 'In 1 mẫu thử miễn phí. Cầm tay xem thực tế trước khi sản xuất hàng loạt.',
      desc2: 'Áp dụng cho đơn từ 500 sản phẩm. Mẫu thử giúp bạn chắc chắn 100% trước khi duyệt sản xuất.'
    },
    {
      id: '04',
      title: 'Sản Xuất',
      icon: Factory,
      desc1: 'In offset + ép kim tại xưởng. Chủ xưởng QC trực tiếp từng lô hàng. 10-15 ngày hoàn thành.',
      desc2: 'Máy in offset 4 màu, máy ép kim vàng — tất cả tại xưởng, không outsource. Chủ xưởng kiểm tra chất lượng trước khi giao.'
    },
    {
      id: '05',
      title: 'Giao Hàng',
      icon: Truck,
      desc1: 'Đóng gói cẩn thận. Giao đúng hẹn. Ship toàn quốc 63 tỉnh thành.',
      desc2: 'Free ship nội thành Hà Nội. Giao toàn quốc qua Viettel Post, GHTK. Đóng gói PE foam + thùng carton 5 lớp.'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[var(--text-main)] font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-8 bg-[var(--bg)] text-[var(--text-main)] overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/process/1920/1080')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-sm text-[var(--text-dim)] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-[var(--text-main)] font-medium">Quy trình</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">Quy trình làm việc</h1>
          <p className="text-[var(--text-dim)] text-lg max-w-2xl">
            5 bước chuẩn chuyên nghiệp — Đảm bảo chất lượng ở mọi công đoạn.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-[var(--border)] hidden md:block"></div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start group">
                {/* Icon */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-[var(--bg)] border-2 border-[var(--border)] flex items-center justify-center text-[var(--accent)] transition-colors shrink-0 shadow-sm mx-auto md:mx-0">
                  <step.icon size={32} strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left pt-2">
                  <div className="text-[var(--accent)] text-sm font-bold tracking-widest uppercase mb-2">
                    BƯỚC {step.id}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">{step.title}</h3>
                  <div className="space-y-4 text-[var(--text-dim)] leading-relaxed">
                    <p>{step.desc1}</p>
                    <p>{step.desc2}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-8 bg-[var(--card-bg)] text-[var(--text-main)] border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-tight">Bắt đầu ngay</h2>
            <p className="text-[var(--text-dim)]">Gửi yêu cầu — nhận báo giá trong 5 phút</p>
          </div>
          
          <div className="bg-[var(--bg)] p-8 md:p-10 rounded-3xl border border-[var(--border)] shadow-xl text-[var(--text-main)]">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="0901 234 567" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Email</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Tên công ty</label>
                  <input type="text" placeholder="Công ty ABC" className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Sản phẩm cần in</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]">
                    <option>-- Chọn --</option>
                    <option>Hộp cứng</option>
                    <option>Túi giấy</option>
                    <option>Hộp sóng</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số lượng dự kiến</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]">
                    <option>-- Chọn --</option>
                    <option>500 - 1.000</option>
                    <option>1.000 - 5.000</option>
                    <option>&gt; 5.000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Ngành hàng</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]">
                    <option>-- Chọn --</option>
                    <option>Mỹ phẩm</option>
                    <option>Thực phẩm</option>
                    <option>Quà tặng</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Ghi chú thêm</label>
                <textarea placeholder="Mô tả yêu cầu chi tiết..." rows={4} className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)]"></textarea>
              </div>
              <button type="button" className="w-full bg-[var(--accent)] text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[var(--accent)]/20">
                GỬI YÊU CẦU BÁO GIÁ <ArrowRight size={20} />
              </button>
              <p className="text-center text-xs text-[var(--text-dim)] mt-4">Cam kết bảo mật thông tin · Phản hồi trong 5 phút</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
