'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHeaderFooterSettings } from '@/app/lib/wp';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SiteSettings {
  logoUrl: string | null;
  logoText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  facebookLink: string;
  zaloLink: string;
  youtubeLink?: string;
  footerDescription?: string;
  mapUrl?: string;
  mapImage?: string;
  copyrightText?: string;
  heroTitle: string;
  heroSubtitle: string;
}

const defaultSettings: SiteSettings = {
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

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    async function loadSettings() {
      // 1. Try Firebase first
      try {
        if (db) {
          const docRef = doc(db, 'settings', 'general');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fbData = docSnap.data() as any;
            setSettings({
              ...defaultSettings,
              ...fbData
            });
            console.log('DEBUG: Settings loaded from Firebase');
            return; // Exit if found in Firebase
          }
        }
      } catch (err) {
        console.error('Error loading settings from Firebase:', err);
      }

      // 2. Fallback to WP
      const data = await getHeaderFooterSettings();
      console.log('DEBUG: Settings data from wp:', data);
      if (data) {
        setSettings({
          ...defaultSettings,
          logoUrl: data.logo?.node?.sourceUrl || defaultSettings.logoUrl,
          logoText: data.siteTitle || defaultSettings.logoText, 
          contactPhone: data.phoneNumber || defaultSettings.contactPhone,
          contactEmail: data.email || defaultSettings.contactEmail,
          contactAddress: data.address || defaultSettings.contactAddress,
          facebookLink: data.facebook || defaultSettings.facebookLink,
          zaloLink: data.zalo || defaultSettings.zaloLink,
          youtubeLink: data.youtube,
          footerDescription: data.footerDescription || defaultSettings.footerDescription,
          mapUrl: data.mapUrl,
          mapImage: data.mapImage?.node?.sourceUrl,
          copyrightText: data.copyrightText,
        });
      }
    }
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
