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
    eyebrow: "Samimi Atölye",
    title: "Kişiye özel, sakin ve özenli tekstil detayları.",
    body: "ZeyDesign, gündelik kullanıma da hediye etmeye de uygun butik ürünleri temiz bir çizgiyle hazırlar.",
    ctaLabel: "Ürünleri İncele",
    ctaHref: "/urunler",
    sortOrder: 0,
    visible: true,
    payload: section("hero", {
      content: {
        eyebrow: "Samimi Atölye",
        title: "Kişiye özel, sakin ve özenli tekstil detayları.",
        body: "ZeyDesign, gündelik kullanıma da hediye etmeye de uygun butik ürünleri temiz bir çizgiyle hazırlar.",
        highlight: "Butik üretim, özenli detay",
        caption: "Nakışlardan hediyelik setlere uzanan seçili koleksiyon",
      },
      items: [
        { id: "stat-1", label: "Üretim", value: "Butik ve özenli" },
        { id: "stat-2", label: "Seçim", value: "Kişiye özel detaylar" },
        { id: "stat-3", label: "İletişim", value: "WhatsApp ile hızlı teyit" },
      ],
      cta: {
        label: "Ürünleri İncele",
        href: "/urunler",
        secondaryLabel: "İletişime Geç",
        secondaryHref: "/iletisim",
      },
    }),
  },
  {
    page: "home",
    key: "home-categories",
    label: "Category Grid",
    eyebrow: "Kategori Omurgası",
    title: "Koleksiyonun ana grupları",
    body: "Mutfak tekstilinden özel siparişlere kadar tüm seçimleri tek koleksiyonda bulabilirsin.",
    sortOrder: 1,
    visible: true,
    payload: section("category-grid", {
      content: {
        eyebrow: "Kategori Omurgası",
        title: "Koleksiyonun ana grupları",
        body: "Mutfak tekstilinden özel siparişlere kadar tüm seçimleri tek koleksiyonda bulabilirsin.",
      },
    }),
  },
  {
    page: "home",
    key: "home-products",
    label: "Featured Products",
    eyebrow: "Öne Çıkanlar",
    title: "Siparişe hızla dönüşen seçimler",
    body: "En sevilen ürünler; seçenek, renk ve kişiselleştirme detaylarıyla birlikte kolayca seçilir.",
    sortOrder: 2,
    visible: true,
    payload: section("featured-products", {
      content: {
        eyebrow: "Öne Çıkanlar",
        title: "Siparişe hızla dönüşen seçimler",
        body: "En sevilen ürünler; seçenek, renk ve kişiselleştirme detaylarıyla birlikte kolayca seçilir.",
      },
    }),
  },
  {
    page: "home",
    key: "home-promise",
    label: "Promise Cards",
    eyebrow: "Neden ZeyDesign",
    title: "Sadeliği kadar hissi de güçlü bir sipariş deneyimi",
    body: "Her üründe anlaşılır seçenekler, net iletişim ve özenli üretim hissi ön planda tutulur.",
    sortOrder: 3,
    visible: true,
    payload: section("promise-cards", {
      content: {
        eyebrow: "Neden ZeyDesign",
        title: "Sadeliği kadar hissi de güçlü bir sipariş deneyimi",
        body: "Her üründe anlaşılır seçenekler, net iletişim ve özenli üretim hissi ön planda tutulur.",
      },
      items: [
        { id: "card-1", title: "Özenli seçim", body: "Koleksiyon, gündelik kullanımla hediye hissini aynı yerde toplar." },
        { id: "card-2", title: "Net iletişim", body: "Sipariş öncesi ve sonrası sorular kolayca yanıtlanır." },
        { id: "card-3", title: "Sakin tasarım", body: "Abartısız ama karakterli bir vitrin deneyimi sunulur." },
      ],
    }),
  },
  {
    page: "home",
    key: "home-process",
    label: "Process",
    eyebrow: "Nasıl İşliyor",
    title: "Seç, kişiselleştir, siparişi bırak",
    body: "Online ödeme yok; sipariş sonrası detay teyidi WhatsApp üzerinden ilerler.",
    sortOrder: 4,
    visible: true,
    payload: section("process-steps", {
      content: {
        eyebrow: "Nasıl İşliyor",
        title: "Seç, kişiselleştir, siparişi bırak",
        body: "Online ödeme yok; sipariş sonrası detay teyidi WhatsApp üzerinden ilerler.",
      },
      items: [
        { id: "step-1", label: "Adım 1", title: "Ürünü seç", body: "Kategori ve ürün tipini belirle." },
        { id: "step-2", label: "Adım 2", title: "Detayları gir", body: "Yazı, renk ve seçenekleri tamamla." },
        { id: "step-3", label: "Adım 3", title: "Siparişi bırak", body: "Talebin kayda alınır, teyit ve detaylar WhatsApp ile netleştirilir." },
      ],
    }),
  },
  {
    page: "home",
    key: "home-cta",
    label: "CTA Band",
    eyebrow: "Son Çağrı",
    title: "Referans görselin varsa sipariş sonrasında bize gönder.",
    body: "Özel bir fikir ya da örnek görsel paylaşmak istersen sipariş sonrası bize WhatsApp üzerinden kolayca iletebilirsin.",
    ctaLabel: "İletişime Geç",
    ctaHref: "/iletisim",
    sortOrder: 5,
    visible: true,
    payload: section("cta-band", {
      content: {
        eyebrow: "Son Çağrı",
        title: "Referans görselin varsa sipariş sonrasında bize gönder.",
        body: "Özel bir fikir ya da örnek görsel paylaşmak istersen sipariş sonrası bize WhatsApp üzerinden kolayca iletebilirsin.",
      },
      cta: {
        label: "İletişime Geç",
        href: "/iletisim",
      },
      items: [
        { id: "badge-1", label: "WhatsApp" },
        { id: "badge-2", label: "Manuel teyit" },
        { id: "badge-3", label: "Butik üretim" },
      ],
    }),
  },
  {
    page: "about",
    key: "about-story",
    label: "Rich Text",
    eyebrow: "Atölye Hikâyesi",
    title: "ZeyDesign, sade ama karakterli ürünler için kuruldu.",
    body: "Her üründe gösteri yerine karakter, hız yerine özen ve gereksiz kalabalık yerine temiz detay aranır.",
    sortOrder: 0,
    visible: true,
    payload: section("rich-text", {
      content: {
        eyebrow: "Atölye Hikâyesi",
        title: "ZeyDesign, sade ama karakterli ürünler için kuruldu.",
        body: "Her üründe gösteri yerine karakter, hız yerine özen ve gereksiz kalabalık yerine temiz detay aranır.",
        caption: "Marka tonu",
        highlight: "Butik, samimi ve net iletişimli bir sipariş deneyimi.",
      },
      items: [
        { id: "value-1", title: "Özenli işçilik", body: "Küçük seri, temiz dikim ve dikkatli son kontrol." },
        { id: "value-2", title: "Net iletişim", body: "Sipariş ve teslim mantığı baştan açık anlatılır." },
        { id: "value-3", title: "Kişiye özel his", body: "Seçenek bazlı kişiselleştirmeler ürünü daha anlamlı hale getirir." },
      ],
    }),
  },
  {
    page: "contact",
    key: "contact-intro",
    label: "Contact Intro",
    eyebrow: "İletişime Geç",
    title: "Sipariş öncesi de sipariş sonrasında da yazabilirsin.",
    body: "Ürün seçimi, özel istekler ya da sipariş detayları için bize formdan ya da WhatsApp üzerinden kolayca ulaşabilirsin.",
    sortOrder: 0,
    visible: true,
    payload: section("cta-band", {
      content: {
        eyebrow: "İletişime Geç",
        title: "Sipariş öncesi de sipariş sonrasında da yazabilirsin.",
        body: "Ürün seçimi, özel istekler ya da sipariş detayları için bize formdan ya da WhatsApp üzerinden kolayca ulaşabilirsin.",
      },
      cta: {
        label: "Ürünleri İncele",
        href: "/urunler",
      },
      items: [
        { id: "contact-1", title: "Çalışma Saatleri", body: "Hafta içi 10:00 - 18:00" },
        { id: "contact-2", title: "Aktif Kanallar", body: "WhatsApp, Instagram DM, E-posta" },
      ],
    }),
  },
  {
    page: "shared",
    key: "shared-faq",
    label: "FAQ",
    eyebrow: "Merak Edilenler",
    title: "Sipariş öncesi en çok sorulanlar",
    body: "Kısa ve net cevaplar ile karar vermeyi kolaylaştırır.",
    sortOrder: 10,
    visible: true,
    payload: section("faq", {
      content: {
        eyebrow: "Merak Edilenler",
        title: "Sipariş öncesi en çok sorulanlar",
        body: "Kısa ve net cevaplar ile karar vermeyi kolaylaştırır.",
      },
      items: [
        { id: "faq-1", question: "Online ödeme var mı?", answer: "Hayır. Sipariş sonrası detay teyidi manuel olarak iletilir." },
        { id: "faq-2", question: "Kişiselleştirme nasıl çalışıyor?", answer: "Seçenekler yaptığın tercihlere göre güncellenir ve toplam tutar buna göre şekillenir." },
        { id: "faq-3", question: "Referans görsel nereye gider?", answer: "Sipariş kaydı sonrası WhatsApp üzerinden iletilir." },
      ],
    }),
  },
  {
    page: "shared",
    key: "shared-social",
    label: "Social Strip",
    eyebrow: "Bağlantılar",
    title: "Aktif kanalları tek yerde topla",
    body: "Footer ve iletişim sayfası aynı sosyal link setini kullanır.",
    sortOrder: 11,
    visible: true,
    payload: section("social-strip", {
      content: {
        eyebrow: "Bağlantılar",
        title: "Aktif kanalları tek yerde topla",
        body: "Footer ve iletişim sayfası aynı sosyal link setini kullanır.",
      },
    }),
  },
];
