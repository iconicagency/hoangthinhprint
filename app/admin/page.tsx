'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const fetchSettings = async () => {
    try {
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

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error("Login error:", err);
      setError('Đăng nhập thất bại.');
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-[var(--text-main)] font-sans">
      <Header />

      <section className="py-24 px-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900">Quản trị Website</h1>
            {user && (
              <button onClick={handleLogout} className="text-sm text-slate-500 hover:text-red-500 transition-colors">
                Đăng xuất ({user.email})
              </button>
            )}
          </div>

          {!user ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-6">Vui lòng đăng nhập bằng tài khoản Admin để chỉnh sửa nội dung.</p>
              <button 
                onClick={handleLogin}
                className="bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors"
              >
                Đăng nhập với Google
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">
              {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
              {success && <div className="p-4 bg-green-50 text-green-600 rounded-lg text-sm">{success}</div>}

              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Cài đặt chung</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Logo Text (Chữ trên Logo)</label>
                  <input 
                    type="text" 
                    name="logoText"
                    value={settings.logoText} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại (Hotline)</label>
                    <input 
                      type="text" 
                      name="contactPhone"
                      value={settings.contactPhone} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email liên hệ</label>
                    <input 
                      type="email" 
                      name="contactEmail"
                      value={settings.contactEmail} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Địa chỉ văn phòng</label>
                  <input 
                    type="text" 
                    name="contactAddress"
                    value={settings.contactAddress} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Link Facebook</label>
                    <input 
                      type="text" 
                      name="facebookLink"
                      value={settings.facebookLink} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Link Zalo</label>
                    <input 
                      type="text" 
                      name="zaloLink"
                      value={settings.zaloLink} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Trang chủ (Hero Section)</h2>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tiêu đề chính</label>
                  <input 
                    type="text" 
                    name="heroTitle"
                    value={settings.heroTitle} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mô tả phụ</label>
                  <textarea 
                    name="heroSubtitle"
                    value={settings.heroSubtitle} 
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]" 
                  ></textarea>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full md:w-auto bg-[var(--accent)] text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
