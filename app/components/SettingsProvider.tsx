'use client';

import React, { createContext, useContext } from 'react';

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

// Default kh\u00f4ng d\u00f9ng web.archive.org n\u1eefa
const defaultSettings: SiteSettings = {
  logoUrl: null,
  logoText: 'HO\u00c0NG TH\u1ecaNH PRINT',
  contactPhone: '056.984.9999',
  contactEmail: 'inhoangthinh.hanoi@gmail.com',
  contactAddress: 'V\u0103n Ph\u00f2ng: S\u1ed1 11 ng\u00e1ch 01/01 \u0111\u01b0\u1eddng V\u00f5 Ch\u00ed C\u00f4ng, C\u1ea7u Gi\u1ea5y, H\u00e0 N\u1ed9i. X\u01b0\u1edfng: S\u1ed1 55 Ng\u00f5 163 Ph\u1ed1 C\u1ea7u C\u1ed1c, T\u00e2y M\u1ed7, T\u1eeb Li\u00eam, H\u00e0 N\u1ed9i.',
  facebookLink: 'https://www.facebook.com/intuigiayhoangthinh',
  zaloLink: 'https://zalo.me/0569849999',
  footerDescription: '\u0110\u1ed1i t\u00e1c in \u1ea5n bao b\u00ec tr\u1ecdn g\u00f3i chuy\u00ean nghi\u1ec7p. Cam k\u1ebft ch\u1ea5t l\u01b0\u1ee3ng, \u0111\u00fang ti\u1ebfn \u0111\u1ed9, gi\u00e1 g\u1ed1c t\u1ea1i x\u01b0\u1edfng.',
  heroTitle: 'Gi\u1ea3i ph\u00e1p bao b\u00ec to\u00e0n di\u1ec7n cho doanh nghi\u1ec7p',
  heroSubtitle: 'Thi\u1ebft k\u1ebf s\u00e1ng t\u1ea1o - In \u1ea5n ch\u1ea5t l\u01b0\u1ee3ng - Giao h\u00e0ng \u0111\u00fang h\u1eb9n.'
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

function buildSettings(wpData: any): SiteSettings {
  if (!wpData) return defaultSettings;
  return {
    ...defaultSettings,
    logoUrl: wpData.logo?.node?.sourceUrl || null,
    logoText: wpData.siteTitle || defaultSettings.logoText,
    contactPhone: wpData.phoneNumber || defaultSettings.contactPhone,
    contactEmail: wpData.email || defaultSettings.contactEmail,
    contactAddress: wpData.address || defaultSettings.contactAddress,
    facebookLink: wpData.facebook || defaultSettings.facebookLink,
    zaloLink: wpData.zalo
      ? `https://zalo.me/${wpData.zalo.replace(/\D/g, '')}`
      : defaultSettings.zaloLink,
    youtubeLink: wpData.youtube || undefined,
    footerDescription: wpData.footerDescription || defaultSettings.footerDescription,
    mapUrl: wpData.mapUrl || undefined,
    mapImage: wpData.mapImage?.node?.sourceUrl || undefined,
    copyrightText: wpData.copyrightText || undefined,
  };
}

export default function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: any;
}) {
  // D\u00f9ng data t\u1eeb server truy\u1ec1n xu\u1ed1ng \u2014 kh\u00f4ng fetch l\u1ea1i ph\u00eda client
  const settings = buildSettings(initialSettings);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
