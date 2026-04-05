# ZeyDesign

ZeyDesign icin hazirlanan hafif ve canliya uygun vitrin surumu.

## Stack

- Next.js 16
- static export
- Cloudflare Pages hedefi
- Supabase insert tabanli mesaj ve siparis kaydi
- localStorage tabanli sepet

## Baslangic

```bash
npm install
npm run lint
npm run build
```

Build ciktisi `out/` altina uretilir.

## Gerekli Ortam Degiskenleri

`.env.example` icindeki alanlari doldur:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Onemli Notlar

- Bu proje bilincli olarak `next build --webpack` kullanir.
- Sebep, mevcut klasor yolundaki Unicode karakterlerin Next 16 Turbopack ile panic uretebilmesidir.
- Canli admin panel yoktur.
- Katalog ve icerik `src/data/*` dosyalarindan beslenir.
- Supabase yazimi basarisiz olursa kullaniciya WhatsApp fallback akisi sunulur.

## Dokumanlar

- `docs/cloudflare-pages-deploy.md`
- `docs/free-hosting-notlari.md`
- `docs/free-donusum-ozeti.md`
- `docs/go-live-checklist.md`
- `docs/supabase-ops.md`
