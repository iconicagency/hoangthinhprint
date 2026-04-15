'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

interface SiteSettings {
  logoText: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  facebookLink: string;
  zaloLink: string;
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
    const docRef = doc(db, 'settings', 'general');
    
    // Listen for real-time updates
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...defaultSettings, ...(docSnap.data() as SiteSettings) });
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
