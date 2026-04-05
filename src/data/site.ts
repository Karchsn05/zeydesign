export type SocialLink = {
  id: string;
  platform: string;
  displayName: string;
  url: string;
  username: string | null;
  icon: string | null;
  active: boolean;
  showInFooter: boolean;
  showInContact: boolean;
};

export type SiteConfig = {
  brandName: string;
  tagline: string;
  announcement: string;
  phone: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  city: string;
  instagramHref: string;
  shopierHref: string;
  footerDescription: string;
};

export const siteConfig: SiteConfig = {
  brandName: "ZeyDesign",
  tagline: "Butik nakis ve tekstil koleksiyonlari",
  announcement: "Kisiye ozel siparislerde termin secime gore degisebilir.",
  phone: "+90 535 575 33 36",
  whatsapp: "+90 535 575 33 36",
  whatsappHref: "https://wa.me/905355753336",
  email: "info@zeydesign.online",
  city: "Istanbul",
  instagramHref: "https://www.instagram.com/_zey_design_/",
  shopierHref: "https://www.shopier.com/lifsepeti",
  footerDescription: "Butik nakis ve ozenli dikim urunlerinde sade, kullanisli ve samimi bir cizgi kuruyoruz.",
};

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    platform: "instagram",
    displayName: "Instagram",
    url: "https://www.instagram.com/_zey_design_/",
    username: "_zey_design_",
    icon: "IG",
    active: true,
    showInFooter: true,
    showInContact: true,
  },
  {
    id: "whatsapp",
    platform: "whatsapp",
    displayName: "WhatsApp",
    url: "https://wa.me/905355753336",
    username: null,
    icon: "WA",
    active: true,
    showInFooter: true,
    showInContact: true,
  },
  {
    id: "shopier",
    platform: "shopier",
    displayName: "Shopier",
    url: "https://www.shopier.com/lifsepeti",
    username: null,
    icon: "SH",
    active: true,
    showInFooter: true,
    showInContact: true,
  },
];
