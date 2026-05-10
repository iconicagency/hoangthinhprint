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
  logoUrl: null,
  logoText: '',
  contactPhone: '',
  contactEmail: '',
  contactAddress: '',
  facebookLink: '',
  zaloLink: '',
  heroTitle: '',
  heroSubtitle: ''
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
          logoUrl: data.logo?.node?.sourceUrl || null,
          logoText: data.siteTitle || '', 
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
