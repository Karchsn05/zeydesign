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
    title: "Kisiye ozel, sakin ve ozenli tekstil detaylari.",
    body: "ZeyDesign, gundelik kullanima da hediye etmeye de uygun butik urunleri temiz bir cizgiyle hazirlar.",
    ctaLabel: "Urunleri Incele",
    ctaHref: "/urunler",
    sortOrder: 0,
    visible: true,
    payload: section("hero", {
      content: {
        eyebrow: "Samimi Atolye",
        title: "Kisiye ozel, sakin ve ozenli tekstil detaylari.",
        body: "ZeyDesign, gundelik kullanima da hediye etmeye de uygun butik urunleri temiz bir cizgiyle hazirlar.",
        highlight: "Butik uretim, ozenli detay",
        caption: "Nakislardan hediyelik setlere uzanan secili koleksiyon",
      },
      items: [
        { id: "stat-1", label: "Uretim", value: "Butik ve ozenli" },
        { id: "stat-2", label: "Secim", value: "Kisiye ozel detaylar" },
        { id: "stat-3", label: "Iletisim", value: "WhatsApp ile hizli teyit" },
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
    body: "Mutfak tekstilinden ozel siparislere kadar tum secimleri tek koleksiyonda bulabilirsin.",
    sortOrder: 1,
    visible: true,
    payload: section("category-grid", {
      content: {
        eyebrow: "Kategori Omurgasi",
        title: "Koleksiyonun ana gruplari",
        body: "Mutfak tekstilinden ozel siparislere kadar tum secimleri tek koleksiyonda bulabilirsin.",
      },
    }),
  },
  {
    page: "home",
    key: "home-products",
    label: "Featured Products",
    eyebrow: "One Cikanlar",
    title: "Siparise hizla donusen secimler",
    body: "En sevilen urunler; secenek, renk ve kisisellestirme detaylariyla birlikte kolayca secilir.",
    sortOrder: 2,
    visible: true,
    payload: section("featured-products", {
      content: {
        eyebrow: "One Cikanlar",
        title: "Siparise hizla donusen secimler",
        body: "En sevilen urunler; secenek, renk ve kisisellestirme detaylariyla birlikte kolayca secilir.",
      },
    }),
  },
  {
    page: "home",
    key: "home-promise",
    label: "Promise Cards",
    eyebrow: "Neden ZeyDesign",
    title: "Sadeligi kadar hissi de guclu bir siparis deneyimi",
    body: "Her urunde anlasilir secenekler, net iletisim ve ozenli uretim hissi on planda tutulur.",
    sortOrder: 3,
    visible: true,
    payload: section("promise-cards", {
      content: {
        eyebrow: "Neden ZeyDesign",
        title: "Sadeligi kadar hissi de guclu bir siparis deneyimi",
        body: "Her urunde anlasilir secenekler, net iletisim ve ozenli uretim hissi on planda tutulur.",
      },
      items: [
        { id: "card-1", title: "Ozenli secim", body: "Koleksiyon, gundelik kullanimla hediye hissini ayni yerde toplar." },
        { id: "card-2", title: "Net iletisim", body: "Siparis oncesi ve sonrasi sorular kolayca yanitlanir." },
        { id: "card-3", title: "Sakin tasarim", body: "Abartisiz ama karakterli bir vitrin deneyimi sunulur." },
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
        { id: "step-3", label: "Adim 3", title: "Siparisi birak", body: "Talebin kayda alinir, teyit ve detaylar WhatsApp ile netlestirilir." },
      ],
    }),
  },
  {
    page: "home",
    key: "home-cta",
    label: "CTA Band",
    eyebrow: "Son Cagri",
    title: "Referans gorselin varsa siparis sonrasinda bize gonder.",
    body: "Ozel bir fikir ya da ornek gorsel paylasmak istersen siparis sonrasi bize WhatsApp uzerinden kolayca iletebilirsin.",
    ctaLabel: "Iletisime Gec",
    ctaHref: "/iletisim",
    sortOrder: 5,
    visible: true,
    payload: section("cta-band", {
      content: {
        eyebrow: "Son Cagri",
        title: "Referans gorselin varsa siparis sonrasinda bize gonder.",
        body: "Ozel bir fikir ya da ornek gorsel paylasmak istersen siparis sonrasi bize WhatsApp uzerinden kolayca iletebilirsin.",
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
    body: "Her urunde gosteri yerine karakter, hiz yerine ozen ve gereksiz kalabalik yerine temiz detay aranir.",
    sortOrder: 0,
    visible: true,
    payload: section("rich-text", {
      content: {
        eyebrow: "Atolye Hikayesi",
        title: "ZeyDesign, sade ama karakterli urunler icin kuruldu.",
        body: "Her urunde gosteri yerine karakter, hiz yerine ozen ve gereksiz kalabalik yerine temiz detay aranir.",
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
    body: "Urun secimi, ozel istekler ya da siparis detaylari icin bize formdan ya da WhatsApp uzerinden kolayca ulasabilirsin.",
    sortOrder: 0,
    visible: true,
    payload: section("cta-band", {
      content: {
        eyebrow: "Iletisime Gec",
        title: "Siparis oncesi de siparis sonrasinda da yazabilirsin.",
        body: "Urun secimi, ozel istekler ya da siparis detaylari icin bize formdan ya da WhatsApp uzerinden kolayca ulasabilirsin.",
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
        { id: "faq-2", question: "Kisellestirme nasil calisiyor?", answer: "Secenekler yaptigin tercihlere gore guncellenir ve toplam tutar buna gore sekillenir." },
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
