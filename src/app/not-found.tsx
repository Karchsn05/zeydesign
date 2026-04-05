import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--brand-primary)]">404</p>
      <h1 className="font-display text-4xl text-stone-950 sm:text-5xl">Aradığın sayfa bulunamadı.</h1>
      <p className="text-sm leading-7 text-stone-600 sm:text-base">Link değişmiş olabilir ya da aradığın içerik şu anda yayında olmayabilir.</p>
      <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-950 px-6 text-sm font-semibold text-white">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
