import Image from "next/image";
import Link from "next/link";

import { DecorativeSprinkles } from "@/components/site/decorative-sprinkles";
import { ProductCard } from "@/components/site/product-card";
import { SectionHeading } from "@/components/site/section-heading";
import type { CategoryRecord, ProductRecord } from "@/lib/catalog";
import type { LandingSectionRecord } from "@/lib/landing-builder";
import type { SocialLink } from "@/data/site";

type Props = {
  page: "home" | "about" | "contact";
  sections: LandingSectionRecord[];
  categories?: CategoryRecord[];
  featuredProducts?: ProductRecord[];
  socialLinks?: SocialLink[];
};

function wrapperClass(page: Props["page"]) {
  return page === "home" ? "space-y-16 pb-16 sm:space-y-20 sm:pb-20 lg:space-y-24 lg:pb-24" : "mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8";
}

function renderHero(section: LandingSectionRecord) {
  const stats = section.payload.items.filter((item) => item.label || item.value);
  return (
    <section key={section.id} className="mx-auto grid max-w-7xl gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-16">
      <div className="space-y-6">
        {section.payload.content.eyebrow ? (
          <div className="inline-flex rounded-full bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--brand-primary)] shadow-sm ring-1 ring-white/70">
            {section.payload.content.eyebrow}
          </div>
        ) : null}
        <div className="space-y-4">
          {section.payload.content.title ? <h1 className="max-w-4xl font-display text-4xl leading-[1.04] text-stone-950 sm:text-5xl lg:text-6xl">{section.payload.content.title}</h1> : null}
          {section.payload.content.body ? <p className="max-w-2xl text-base leading-8 text-stone-700 sm:text-lg">{section.payload.content.body}</p> : null}
        </div>
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          {section.payload.cta.label && section.payload.cta.href ? (
            <Link href={section.payload.cta.href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand-primary),var(--brand-primary-deep))] px-6 text-sm font-semibold text-white shadow-lg shadow-[rgba(184,91,47,0.24)] transition hover:-translate-y-0.5">
              {section.payload.cta.label}
            </Link>
          ) : null}
          {section.payload.cta.secondaryLabel && section.payload.cta.secondaryHref ? (
            <Link href={section.payload.cta.secondaryHref} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d6b797] bg-[#fff8f3] px-6 text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5">
              {section.payload.cta.secondaryLabel}
            </Link>
          ) : null}
        </div>
        {stats.length ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.id ?? item.label ?? item.value} className="glass-panel section-glow rounded-[1.75rem] border border-white/70 p-5">
                {item.value ? <p className="text-xl font-semibold text-stone-950 sm:text-2xl">{item.value}</p> : null}
                {item.label ? <p className="mt-1 text-sm text-stone-500">{item.label}</p> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="paper-card petal-dots relative overflow-hidden rounded-[2.25rem] border border-white/60 p-6 shadow-[var(--card-shadow)] sm:p-8">
        <DecorativeSprinkles />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.86),transparent_34%)]" />
        <div className="absolute -right-10 top-10 size-36 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-4 left-4 size-28 rounded-full bg-[rgba(52,91,74,0.26)] blur-2xl" />
        <div className="relative space-y-6">
          {section.payload.content.highlight ? <div className="inline-flex rounded-full bg-stone-950 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">{section.payload.content.highlight}</div> : null}
          <div className="space-y-4">
            {section.payload.content.caption ? <p className="font-display text-3xl text-stone-950 sm:text-4xl">{section.payload.content.caption}</p> : null}
            <p className="text-sm leading-7 text-stone-800 sm:text-base">Çiçekli küçük detaylar, sıcak renkler ve uğraştırmayan bir akışla ev işi samimiyetini taşıyan bir vitrin hazırlandı.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderCategoryGrid(section: LandingSectionRecord, categories: CategoryRecord[]) {
  if (!categories.length) return null;

  return (
    <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Kategoriler"} description={section.payload.content.body} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <Link key={category.id} href={`/urunler?kategori=${category.slug}`} className="glass-panel section-glow rounded-[1.75rem] border border-white/70 p-5 transition hover:-translate-y-1">
            <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white" style={{ backgroundColor: category.accentColor }}>
              {category.icon} {category.name}
            </div>
            <p className="text-sm leading-6 text-stone-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function renderFeaturedProducts(section: LandingSectionRecord, featuredProducts: ProductRecord[]) {
  if (!featuredProducts.length) return null;

  return (
    <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Öne Çıkan Ürünler"} description={section.payload.content.body} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}

function renderCards(section: LandingSectionRecord, tone: "plain" | "steps" = "plain") {
  if (!section.payload.items.length) return null;

  if (tone === "steps") {
    return (
      <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Surec"} description={section.payload.content.body} />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {section.payload.items.map((item, index) => (
            <article key={item.id ?? `${section.id}-${index}`} className="glass-panel section-glow rounded-[2rem] border border-white/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-primary)]">{item.label ?? `Adım ${index + 1}`}</p>
              {item.title ? <h3 className="mt-4 text-xl font-semibold text-stone-900">{item.title}</h3> : null}
              {item.body ? <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-panel section-glow petal-dots grid gap-8 rounded-[2.25rem] border border-white/60 p-5 sm:p-8 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Bolum"} description={section.payload.content.body} />
        <div className={`grid gap-4 ${section.payload.items.length > 3 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3"}`}>
          {section.payload.items.map((item, index) => (
            <article key={item.id ?? `${section.id}-${index}`} className="rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(244,221,214,0.55))] p-5">
              {item.label ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-primary)]">{item.label}</p> : null}
              {item.title ? <h3 className="mt-2 text-base font-semibold text-stone-900">{item.title}</h3> : null}
              {item.body ? <p className="mt-3 text-sm leading-6 text-stone-600">{item.body}</p> : null}
              {item.value ? <p className="mt-3 text-lg font-semibold text-stone-900">{item.value}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderRichText(section: LandingSectionRecord) {
  return (
    <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div className="space-y-5">
          <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Bolum"} description={section.payload.content.body} />
        </div>
        <div className="paper-card section-glow petal-dots relative rounded-[2rem] border border-white/60 p-6">
          <Image src="/doodles/flower-bloom.svg" alt="" width={80} height={80} unoptimized aria-hidden="true" className="absolute -right-6 -top-6 w-16 opacity-75 sm:w-20" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand-primary)]">{section.payload.content.caption ?? "Editoryal Alan"}</p>
          <p className="mt-4 text-base leading-8 text-stone-700">{section.payload.content.highlight ?? "Landing düzeni küçük sürprizler ve sıcak bir dil ile ilerler."}</p>
        </div>
      </div>
      {section.payload.items.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {section.payload.items.map((item, index) => (
            <article key={item.id ?? `${section.id}-${index}`} className="glass-panel rounded-[1.75rem] border border-white/70 p-5 shadow-sm">
              {item.title ? <h2 className="text-lg font-semibold text-stone-900">{item.title}</h2> : null}
              {item.body ? <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function renderFaq(section: LandingSectionRecord) {
  if (!section.payload.items.length) return null;

  return (
    <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="glass-panel section-glow rounded-[2rem] border border-white/70 p-5 sm:p-6">
        <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Sık Sorulanlar"} description={section.payload.content.body} />
        <div className="mt-8 space-y-4">
          {section.payload.items.map((item, index) => (
            <article key={item.id ?? `${section.id}-${index}`} className="rounded-[1.5rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(248,239,226,0.8))] px-4 py-4">
              {item.question ? <h3 className="text-base font-semibold text-stone-900">{item.question}</h3> : null}
              {item.answer ? <p className="mt-2 text-sm leading-7 text-stone-600">{item.answer}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderCtaBand(section: LandingSectionRecord) {
  return (
    <section key={section.id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#5c3425_0%,#345b4a_48%,#c77249_100%)] px-6 py-8 text-white shadow-[var(--card-shadow)] sm:px-8 sm:py-10">
        <Image src="/doodles/leaf-squiggle.svg" alt="" width={160} height={87} unoptimized aria-hidden="true" className="absolute -left-4 top-0 w-32 opacity-35 sm:w-40" />
        <Image src="/doodles/ladybug.svg" alt="" width={40} height={40} unoptimized aria-hidden="true" className="absolute bottom-3 right-4 w-10 opacity-80" />
        {section.payload.content.eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.32em] text-stone-400">{section.payload.content.eyebrow}</p> : null}
        <div className="relative mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            {section.payload.content.title ? <h2 className="font-display text-3xl sm:text-4xl">{section.payload.content.title}</h2> : null}
            {section.payload.content.body ? <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">{section.payload.content.body}</p> : null}
            {section.payload.items.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {section.payload.items.map((item, index) => (
                  <span key={item.id ?? `${section.id}-${index}`} className="rounded-full bg-white/10 px-3 py-1 text-sm text-stone-100">
                    {item.title ?? item.label ?? item.body}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          {section.payload.cta.label && section.payload.cta.href ? (
            <Link href={section.payload.cta.href} className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-stone-900 transition hover:-translate-y-0.5">
              {section.payload.cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function renderSocialStrip(section: LandingSectionRecord, socialLinks: SocialLink[]) {
  if (!socialLinks.length) return null;

  return (
    <section key={section.id} className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <SectionHeading eyebrow={section.payload.content.eyebrow} title={section.payload.content.title ?? "Bağlantılar"} description={section.payload.content.body} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {socialLinks.map((link) => (
          <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="glass-panel section-glow rounded-[1.75rem] border border-white/70 p-5 transition hover:-translate-y-0.5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">{link.platform}</p>
            <h2 className="mt-3 text-lg font-semibold text-stone-900">
              {link.icon} {link.displayName}
            </h2>
            <p className="mt-2 text-sm text-stone-600">{link.username ? `@${link.username}` : "Bağlantıyı aç"}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function LandingSections({ page, sections, categories = [], featuredProducts = [], socialLinks = [] }: Props) {
  return (
    <div className={wrapperClass(page)}>
      {sections.map((section) => {
        switch (section.payload.sectionType) {
          case "hero":
            return renderHero(section);
          case "category-grid":
            return renderCategoryGrid(section, categories);
          case "featured-products":
            return renderFeaturedProducts(section, featuredProducts);
          case "promise-cards":
            return renderCards(section, "plain");
          case "process-steps":
            return renderCards(section, "steps");
          case "cta-band":
            return renderCtaBand(section);
          case "faq":
            return renderFaq(section);
          case "social-strip":
            return renderSocialStrip(section, socialLinks);
          case "rich-text":
          default:
            return renderRichText(section);
        }
      })}
    </div>
  );
}
