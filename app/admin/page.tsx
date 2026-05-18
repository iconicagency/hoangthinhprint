'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [settings, setSettings] = useState({
    logoText: 'IHT',
    contactPhone: '090.XXX.XXXX',
    contactEmail: 'admin@inhoangthinh.com',
    contactAddress: 'Số 12, Đường số 5, KDC CityLand, Phường 10, Quận Gò Vấp, TP.HCM',
    facebookLink: '#',
    zaloLink: '#',
    heroTitle: 'Giải pháp bao bì toàn diện cho doanh nghiệp',
    heroSubtitle: 'Thiết kế sáng tạo - In ấn chất lượng - Giao hàng đúng hẹn. Đối tác tin cậy của hơn 500+ thương hiệu.'
  });

  const fetchSettings = async () => {
    try {
      if (!db) return;
      const docRef = doc(db, 'settings', 'general');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data() as any);
      }
    } catch (err: any) {
      console.error("Error fetching settings:", err);
      setError('Không thể tải dữ liệu. Bạn có thể không có quyền truy cập.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchSettings();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError('');
    setLoggingIn(true);
    console.log("Handle Login Fired");
    try {
      if (!auth) {
        throw new Error('Firebase Auth chưa được khởi tạo. Vui lòng kiểm tra lại cấu hình.');
      }
      const provider = new GoogleAuthProvider();
      console.log("Calling signInWithPopup...");
      await signInWithPopup(auth, provider);
      console.log("SignIn Successful");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === 'auth/unauthorized-domain') {
        setError('Tên miền này chưa được cấp quyền (Authorized domains) trong Firebase Console.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Trình duyệt đã chặn cửa sổ đăng nhập. Vui lòng cho phép popup cho trang web này.');
      } else {
        setError('Đăng nhập thất bại: ' + (err.message || 'Lỗi không xác định'));
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
       setError('Database not initialized on client');
       return;
    }
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      await setDoc(doc(db, 'settings', 'general'), settings);
      setSuccess('Đã lưu cài đặt thành công!');
    } catch (err: any) {
      console.error("Save error:", err);
      setError('Lỗi khi lưu: ' + (err.message || 'Không có quyền truy cập'));
    } finally {
      setSaving(false);
    }
  };

  const importFromArchive = () => {
    const archiveSettings = {
      logoUrl: 'https://web.archive.org/web/20250221200414im_/https://hoangthinhprint.com.vn/wp-content/uploads/2024/03/new-logo-e1710236077492.png',
      logoText: 'HOÀNG THỊNH PRINT',
      contactPhone: '056.984.9999',
      contactEmail: 'inhoangthinh.hanoi@gmail.com',
      contactAddress: 'Văn Phòng: Số 11 ngách 01/01 đường Võ Chí Công, Cầu Giấy, Hà Nội. Xưởng: Số 55 Ngõ 163 Phố Cầu Cốc, Tây Mỗ, Từ Liêm, Hà Nội.',
      facebookLink: 'https://www.facebook.com/intuigiayhoangthinh',
      zaloLink: '0569849999',
      footerDescription: 'Đối tác in ấn bao bì trọn gói chuyên nghiệp. Cam kết chất lượng, đúng tiến độ, giá gốc tại xưởng. Hoàng Thịnh Print - In ấn mọi lúc mọi nơi.',
      heroTitle: 'Giải pháp bao bì toàn diện cho doanh nghiệp',
      heroSubtitle: 'Thiết kế sáng tạo - In ấn chất lượng - Giao hàng đúng hẹn. Đối tác tin cậy của hơn 500+ thương hiệu.'
    };
    setSettings(archiveSettings);
    setSuccess('Đã tải dữ liệu từ Archive.org vào biểu mẫu. Nhấn "Lưu thay đổi" để xác nhận lưu vào CMS.');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="bg-[var(--card-bg)] p-8 md:p-10 rounded-3xl border border-[var(--border)] shadow-sm">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-[var(--border)]">
              <h1 className="text-3xl font-bold text-[var(--text-main)]">Quản trị Website</h1>
              <div className="flex items-center gap-4">
                {user && (
                    <button 
                      type="button"
                      onClick={importFromArchive}
                      className="text-sm bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors font-bold border border-amber-200 flex items-center gap-2"
                    >
                      📥 Nhập từ Archive.org
                    </button>
                )}
                {user && (
                  <button onClick={handleLogout} className="text-sm text-[var(--text-dim)] hover:text-red-500 transition-colors">
                    Đăng xuất ({user.email})
                  </button>
                )}
              </div>
            </div>

          {error && <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">{error}</div>}
          {success && <div className="p-4 mb-6 bg-green-50 text-green-600 rounded-lg text-sm border border-green-100">{success}</div>}

          {!user ? (
            <div className="text-center py-12">
              <p className="text-[var(--text-dim)] mb-6">Vui lòng đăng nhập bằng tài khoản Admin để chỉnh sửa nội dung.</p>
              <button 
                onClick={handleLogin}
                disabled={loggingIn}
                className="bg-[var(--accent)] text-[var(--bg)] font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {loggingIn ? 'Đang mở cửa sổ đăng nhập...' : 'Đăng nhập với Google'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[var(--text-main)]">Cài đặt chung</h2>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Logo Text (Chữ trên Logo)</label>
                  <input 
                    type="text" 
                    name="logoText"
                    value={settings.logoText} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Số điện thoại (Hotline)</label>
                    <input 
                      type="text" 
                      name="contactPhone"
                      value={settings.contactPhone} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Email liên hệ</label>
                    <input 
                      type="email" 
                      name="contactEmail"
                      value={settings.contactEmail} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Địa chỉ văn phòng</label>
                  <input 
                    type="text" 
                    name="contactAddress"
                    value={settings.contactAddress} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Link Facebook</label>
                    <input 
                      type="text" 
                      name="facebookLink"
                      value={settings.facebookLink} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Link Zalo</label>
                    <input 
                      type="text" 
                      name="zaloLink"
                      value={settings.zaloLink} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-[var(--border)]">
                <h2 className="text-xl font-bold text-[var(--text-main)]">Trang chủ (Hero Section)</h2>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Tiêu đề chính</label>
                  <input 
                    type="text" 
                    name="heroTitle"
                    value={settings.heroTitle} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--text-dim)] mb-2">Mô tả phụ</label>
                  <textarea 
                    name="heroSubtitle"
                    value={settings.heroSubtitle} 
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] bg-[var(--bg)] text-[var(--text-main)]" 
                  ></textarea>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)]">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full md:w-auto bg-[var(--accent)] text-[var(--bg)] font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
