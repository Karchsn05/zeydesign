import type { ContentBlockLike } from "@/lib/landing-builder";

function section(sectionType: string, input: Record<string, unknown>) {
  return {
    version: 2,
    sectionType,
    variant: "default",
    content: {},
    items: [],
    style: {},
    cta: {},
    media: {},
    ...input,
  };
}

export const contentBlocks: ContentBlockLike[] = [
  {
    page: "home",
    key: "home-hero",
    label: "Hero",
    eyebrow: "Samimi Atolye",
    title: "Butik siparis vitrini, sade operasyon, daha az hosting yuku.",
    body: "Bu free kopya, premium his veren ama statik host uzerinde calisabilen yeni ZeyDesign vitrini olarak hazirlandi.",
    ctaLabel: "Urunleri Incele",
    ctaHref: "/urunler",
    sortOrder: 0,
    visible: true,
    payload: section("hero", {
      content: {
        eyebrow: "Samimi Atolye",
        title: "Butik siparis vitrini, sade operasyon, daha az hosting yuku.",
        body: "Bu free kopya, premium his veren ama statik host uzerinde calisabilen yeni ZeyDesign vitrini olarak hazirlandi.",
        highlight: "Statik vitrin + Supabase kayit",
        caption: "Premium gorunum, hafif mimari",
      },
      items: [
        { id: "stat-1", label: "Hosting", value: "Cloudflare Pages" },
        { id: "stat-2", label: "Veri", value: "Supabase" },
        { id: "stat-3", label: "Akis", value: "WhatsApp destekli" },
      ],
      cta: {
        label: "Urunleri Incele",
        href: "/urunler",
        secondaryLabel: "Iletisime Gec",
        secondaryHref: "/iletisim",
      },
    }),
  },
  {
    page: "home",
    key: "home-categories",
    label: "Category Grid",
    eyebrow: "Kategori Omurgasi",
    title: "Koleksiyonun ana gruplari",
    body: "Kategori grid'i sabit data ile hizli ve statik olarak yayinlanir.",
    sortOrder: 1,
    visible: true,
    payload: section("category-grid", {
      content: {
        eyebrow: "Kategori Omurgasi",
        title: "Koleksiyonun ana gruplari",
        body: "Kategori grid'i sabit data ile hizli ve statik olarak yayinlanir.",
      },
    }),
  },
  {
    page: "home",
    key: "home-products",
    label: "Featured Products",
    eyebrow: "One Cikanlar",
    title: "Siparise hizla donusen secimler",
    body: "Client-side configurator ve fiyat farki akisi bu urunlerde net gorunur.",
    sortOrder: 2,
    visible: true,
    payload: section("featured-products", {
      content: {
        eyebrow: "One Cikanlar",
        title: "Siparise hizla donusen secimler",
        body: "Client-side configurator ve fiyat farki akisi bu urunlerde net gorunur.",
      },
    }),
  },
  {
    page: "home",
    key: "home-promise",
    label: "Promise Cards",
    eyebrow: "Neden Bu Yapi",
    title: "Sifir hosting ucretine daha uygun bir urun modeli",
    body: "Canli admin yerine hizli vitrin, mini siparis DB ve net iletisim odaklandi.",
    sortOrder: 3,
    visible: true,
    payload: section("promise-cards", {
      content: {
        eyebrow: "Neden Bu Yapi",
        title: "Sifir hosting ucretine daha uygun bir urun modeli",
        body: "Canli admin yerine hizli vitrin, mini siparis DB ve net iletisim odaklandi.",
      },
      items: [
        { id: "card-1", title: "Statik hiz", body: "Katalog ve icerik build aninda olusur." },
        { id: "card-2", title: "Mini operasyon", body: "Mesaj ve siparis kayitlari Supabase'a yazar." },
        { id: "card-3", title: "Temiz UX", body: "Builder hissi landing section duzeniyle korunur." },
      ],
    }),
  },
  {
    page: "home",
    key: "home-process",
    label: "Process",
    eyebrow: "Nasil Isliyor",
    title: "Sec, kisellestir, siparisi birak",
    body: "Online odeme yok; siparis sonrasi detay teyidi WhatsApp uzerinden ilerler.",
    sortOrder: 4,
    visible: true,
    payload: section("process-steps", {
      content: {
        eyebrow: "Nasil Isliyor",
        title: "Sec, kisellestir, siparisi birak",
        body: "Online odeme yok; siparis sonrasi detay teyidi WhatsApp uzerinden ilerler.",
      },
      items: [
        { id: "step-1", label: "Adim 1", title: "Urunu sec", body: "Kategori ve urun tipini belirle." },
        { id: "step-2", label: "Adim 2", title: "Detaylari gir", body: "Yazi, renk ve secenekleri tamamla." },
        { id: "step-3", label: "Adim 3", title: "Siparisi birak", body: "Kayit Supabase'a yazilir, teyit WhatsApp ile gelir." },
      ],
    }),
  },
  {
    page: "home",
    key: "home-cta",
    label: "CTA Band",
    eyebrow: "Son Cagri",
    title: "Referans gorselin varsa siparis sonrasinda bize gonder.",
    body: "Free surumde anonim gorsel upload yok; ama siparis kaydini biraktiktan sonra referansi WhatsApp ile kolayca iletebilirsin.",
    ctaLabel: "Iletisime Gec",
    ctaHref: "/iletisim",
    sortOrder: 5,
    visible: true,
    payload: section("cta-band", {
      content: {
        eyebrow: "Son Cagri",
        title: "Referans gorselin varsa siparis sonrasinda bize gonder.",
        body: "Free surumde anonim gorsel upload yok; ama siparis kaydini biraktiktan sonra referansi WhatsApp ile kolayca iletebilirsin.",
      },
      cta: {
        label: "Iletisime Gec",
        href: "/iletisim",
      },
      items: [
        { id: "badge-1", label: "WhatsApp" },
        { id: "badge-2", label: "Manuel teyit" },
        { id: "badge-3", label: "Butik uretim" },
      ],
    }),
  },
  {
    page: "about",
    key: "about-story",
    label: "Rich Text",
    eyebrow: "Atolye Hikayesi",
    title: "ZeyDesign, sade ama karakterli urunler icin kuruldu.",
    body: "Bu sayfa da artik DB'den degil, statik section verisinden uretildigi icin daha hizli ve tasinabilir.",
    sortOrder: 0,
    visible: true,
    payload: section("rich-text", {
      content: {
        eyebrow: "Atolye Hikayesi",
        title: "ZeyDesign, sade ama karakterli urunler icin kuruldu.",
        body: "Bu sayfa da artik DB'den degil, statik section verisinden uretildigi icin daha hizli ve tasinabilir.",
        caption: "Marka tonu",
        highlight: "Butik, samimi ve net iletisimli bir siparis deneyimi.",
      },
      items: [
        { id: "value-1", title: "Ozenli iscilik", body: "Kucuk seri, temiz dikim ve dikkatli son kontrol." },
        { id: "value-2", title: "Net iletisim", body: "Siparis ve teslim mantigi bastan acik anlatilir." },
        { id: "value-3", title: "Kisiye ozel his", body: "Secenek bazli configurator urunleri daha anlamli hale getirir." },
      ],
    }),
  },
  {
    page: "contact",
    key: "contact-intro",
    label: "Contact Intro",
    eyebrow: "Iletisime Gec",
    title: "Siparis oncesi de siparis sonrasinda da yazabilirsin.",
    body: "Mesaj formu ve siparis formlari Supabase'a kayit atar. Hemen yazmak istersen WhatsApp linkleri de hazir.",
    sortOrder: 0,
    visible: true,
    payload: section("cta-band", {
      content: {
        eyebrow: "Iletisime Gec",
        title: "Siparis oncesi de siparis sonrasinda da yazabilirsin.",
        body: "Mesaj formu ve siparis formlari Supabase'a kayit atar. Hemen yazmak istersen WhatsApp linkleri de hazir.",
      },
      cta: {
        label: "Urunleri Incele",
        href: "/urunler",
      },
      items: [
        { id: "contact-1", title: "Calisma Saatleri", body: "Hafta ici 10:00 - 18:00" },
        { id: "contact-2", title: "Aktif Kanallar", body: "WhatsApp, Instagram DM, E-posta" },
      ],
    }),
  },
  {
    page: "shared",
    key: "shared-faq",
    label: "FAQ",
    eyebrow: "Merak Edilenler",
    title: "Siparis oncesi en cok sorulanlar",
    body: "Kisa ve net cevaplar ile karar vermeyi kolaylastirir.",
    sortOrder: 10,
    visible: true,
    payload: section("faq", {
      content: {
        eyebrow: "Merak Edilenler",
        title: "Siparis oncesi en cok sorulanlar",
        body: "Kisa ve net cevaplar ile karar vermeyi kolaylastirir.",
      },
      items: [
        { id: "faq-1", question: "Online odeme var mi?", answer: "Hayir. Siparis sonrasi detay teyidi manuel olarak iletilir." },
        { id: "faq-2", question: "Kisellestirme nasil calisiyor?", answer: "Alanlar ve fiyat farklari urun kartlarinda anlik olarak gorunur." },
        { id: "faq-3", question: "Referans gorsel nereye gider?", answer: "Siparis kaydi sonrasi WhatsApp uzerinden iletilir." },
      ],
    }),
  },
  {
    page: "shared",
    key: "shared-social",
    label: "Social Strip",
    eyebrow: "Baglantilar",
    title: "Aktif kanallari tek yerde topla",
    body: "Footer ve iletisim sayfasi ayni sosyal link setini kullanir.",
    sortOrder: 11,
    visible: true,
    payload: section("social-strip", {
      content: {
        eyebrow: "Baglantilar",
        title: "Aktif kanallari tek yerde topla",
        body: "Footer ve iletisim sayfasi ayni sosyal link setini kullanir.",
      },
    }),
  },
];
