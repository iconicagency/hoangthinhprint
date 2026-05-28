'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHeaderFooterSettings } from '@/app/lib/wp';

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
  zaloLink: 'https://zalo.me/0569849999',
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
      try {
        const data = await getHeaderFooterSettings();
        if (data && (data.phoneNumber || data.logo || data.siteTitle)) {
          setSettings({
            ...defaultSettings,
            logoUrl: data.logo?.node?.sourceUrl || defaultSettings.logoUrl,
            logoText: data.siteTitle || defaultSettings.logoText,
            contactPhone: data.phoneNumber || defaultSettings.contactPhone,
            contactEmail: data.email || defaultSettings.contactEmail,
            contactAddress: data.address || defaultSettings.contactAddress,
            facebookLink: data.facebook || defaultSettings.facebookLink,
            zaloLink: data.zalo ? `https://zalo.me/${data.zalo.replace(/\D/g, '')}` : defaultSettings.zaloLink,
            youtubeLink: data.youtube || undefined,
            footerDescription: data.footerDescription || defaultSettings.footerDescription,
            mapUrl: data.mapUrl || undefined,
            mapImage: data.mapImage?.node?.sourceUrl || undefined,
            copyrightText: data.copyrightText || undefined,
          });
        }
      } catch (err) {
        console.warn('Không thể tải settings từ WordPress, dùng giá trị mặc định.');
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
