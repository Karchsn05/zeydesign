# Cloudflare Pages Deploy Rehberi

Bu rehber `codex-free` klasorunu Cloudflare Pages ve Supabase ile yayinlamak icindir.

## 1. Supabase Projesi

1. Yeni bir Supabase projesi ac.
2. SQL Editor icinde `supabase/free-schema.sql` dosyasinin icerigini calistir.
3. Proje ayarlarindan su iki degeri al:
   - `Project URL`
   - `anon public key`

## 2. Ortam Degiskenleri

Cloudflare Pages tarafinda su env degerlerini tanimla:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Ornek:

```env
NEXT_PUBLIC_SITE_URL=https://zeydesign.online
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

## 3. Build Ayari

- Framework preset: `Next.js`
- Build command: `npm run build`
- Build output directory: `out`

Bu projede build script bilerek `next build --webpack` kullanir. Sebep, mevcut klasor yolundaki Unicode karakterlerin Next 16 Turbopack tarafinda panic uretebilmesidir.

## 4. Yayin Sonrasi Kontrol

Yayin sonrasi su sayfalari ac:

- `/`
- `/urunler/`
- `/urunler/nakisli-mutfak-havlusu-takimi/`
- `/iletisim/`
- `/sepet/`
- `/odeme/`

Sonra iki veri akisini test et:

1. Iletisim formundan deneme kaydi birak
2. Sepete urun ekleyip siparis birak

Supabase tablolarinda su kayitlar dusmeli:

- `customer_messages`
- `order_requests`

## 5. Bilincli Sinirlar

- Canli admin panel yok
- Public siparis sorgulama yok
- Anon referans gorsel upload yok
- Katalog guncellemesi repo duzenlemesiyle yapilir

## 6. Tavsiye Edilen Sonraki Adimlar

- Cloudflare custom domain bagla
- Supabase tablo gorunumlerini admin kullanimi icin hazirla
- Iletisim ve siparis formlarinda ek abuse korumasi istenirse Turnstile veya edge function katmani ekle
