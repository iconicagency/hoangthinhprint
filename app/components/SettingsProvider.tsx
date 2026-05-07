'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHeaderFooterSettings } from '@/app/lib/wp';

interface SiteSettings {
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
  logoText: 'IHT',
  contactPhone: '090.XXX.XXXX',
  contactEmail: 'admin@inhoangthinh.com',
  contactAddress: 'Số 12, Đường số 5, KDC CityLand, Phường 10, Quận Gò Vấp, TP.HCM',
  facebookLink: '#',
  zaloLink: '#',
  heroTitle: 'Giải pháp bao bì toàn diện cho doanh nghiệp',
  heroSubtitle: 'Thiết kế sáng tạo - In ấn chất lượng - Giao hàng đúng hẹn. Đối tác tin cậy của hơn 500+ thương hiệu.'
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    async function loadSettings() {
      const data = await getHeaderFooterSettings();
      console.log('DEBUG: Settings data from wp:', data);
      if (data) {
        setSettings({
          ...defaultSettings,
          logoText: 'IHT', 
          contactPhone: data.phoneNumber || defaultSettings.contactPhone,
          contactEmail: data.email || defaultSettings.contactEmail,
          contactAddress: data.address || defaultSettings.contactAddress,
          facebookLink: data.facebook || defaultSettings.facebookLink,
          zaloLink: data.zalo || defaultSettings.zaloLink,
          youtubeLink: data.youtube,
          footerDescription: data.footerDescription,
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
