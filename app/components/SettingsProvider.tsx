'use client';

import React, { createContext, useContext } from 'react';

export interface ContactChannel {
  label: string;
  phone: string;
}

export interface FooterMenuItem {
  label: string;
  href: string;
}

export interface FooterMenu {
  name: string;
  items: FooterMenuItem[];
}

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
  // Danh sach kenh lien he cho FloatContact widget (nhap tu WP Header Settings)
  hotlines: ContactChannel[];
  zalos: ContactChannel[];
  // Menu footer tu WP Admin → Giao dien → Menu (menu ten/slug "footer")
  footerMenu: FooterMenu | null;
}

// Default không dùng web.archive.org nữa
const defaultSettings: SiteSettings = {
  logoUrl: null,
  logoText: 'HOÀNG THỊNH PRINT',
  contactPhone: '056.984.9999',
  contactEmail: 'inhoangthinh.hanoi@gmail.com',
  contactAddress: 'Văn Phòng: Số 11 ngách 01/01 đường Võ Chí Công, Cầu Giấy, Hà Nội. Xưởng: Số 55 Ngõ 163 Phố Cầu Cốc, Tây Mỗ, Từ Liêm, Hà Nội.',
  facebookLink: 'https://www.facebook.com/intuigiayhoangthinh',
  zaloLink: 'https://zalo.me/0569849999',
  footerDescription: 'Đối tác in ấn bao bì trọn gói chuyên nghiệp. Cam kết chất lượng, đúng tiến độ, giá gốc tại xưởng.',
  heroTitle: 'Giải pháp bao bì toàn diện cho doanh nghiệp',
  heroSubtitle: 'Thiết kế sáng tạo - In ấn chất lượng - Giao hàng đúng hẹn.',
  // Fallback khi WP chua nhap danh sach hotline/zalo trong admin
  hotlines: [
    { label: 'Gọi điện thoại trực tiếp', phone: '034.349.8888' },
  ],
  zalos: [
    { label: 'Nhắn tin qua Zalo', phone: '0569.849.999' },
  ],
  footerMenu: null,
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

function buildContactList(raw: any, fallbackLabel: string): ContactChannel[] | null {
  if (!Array.isArray(raw) || !raw.length) return null;
  const list = raw
    .map((c: any) => ({ label: c?.label || fallbackLabel, phone: c?.phone || '' }))
    .filter((c: ContactChannel) => c.phone);
  return list.length ? list : null;
}

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
    hotlines: buildContactList(wpData.hotlines, 'Gọi điện thoại trực tiếp') || defaultSettings.hotlines,
    zalos: buildContactList(wpData.zalos, 'Nhắn tin qua Zalo') || defaultSettings.zalos,
    footerMenu: wpData.footerMenu?.items?.length ? wpData.footerMenu : null,
  };
}

export default function SettingsProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: any;
}) {
  // Dùng data từ server truyền xuống — không fetch lại phía client
  const settings = buildSettings(initialSettings);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}
