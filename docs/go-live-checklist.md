# Go Live Checklist

## 1. Supabase

- yeni proje ac
- `supabase/free-schema.sql` calistir
- `customer_messages` ve `order_requests` tablolarinin olustugunu kontrol et
- RLS aktif oldugunu kontrol et
- `anon_insert_customer_messages` ve `anon_insert_order_requests` policy'lerinin geldigini kontrol et

## 2. Cloudflare Pages

- repo bagla
- build command: `npm run build`
- output directory: `out`
- env degerlerini gir:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## 3. Domain

- custom domain bagla
- `NEXT_PUBLIC_SITE_URL` degerini custom domain ile guncelle
- deploy'i yeniden al
- `https://alanadiniz/robots.txt` ve `https://alanadiniz/sitemap.xml` aciliyor mu kontrol et

## 4. Manuel Smoke Test

- ana sayfa aciliyor
- urunler sayfasi aciliyor
- bir urun detay sayfasi aciliyor
- configurator secimleri fiyat degistiriyor
- sepete ekleme calisiyor
- sepetten checkout'a gidiliyor
- checkout formu bos gonderimde alan hatasi veriyor
- iletisim formu bos gonderimde alan hatasi veriyor
- iletisim formundan test kaydi Supabase'a dusuyor
- siparis formundan test kaydi Supabase'a dusuyor
- siparis sonrasi basari sayfasi geliyor
- basari sayfasindaki WhatsApp ozet linki aciliyor

## 5. SEO ve Varliklar

- `og.svg` aciliyor
- `site.webmanifest` aciliyor
- ana sayfa kaynak kodunda canonical ve og tag'leri var
- `sepet`, `odeme`, `siparis-basarili` sayfalarinda noindex tag'i var

## 6. Ariza Testi

- Supabase env'lerinden birini gecici olarak bosaltinca:
  - site acilmaya devam etmeli
  - iletisim formu fallback WhatsApp linki gostermeli
  - checkout formu fallback WhatsApp linki gostermeli

## 7. Operasyon

- Supabase dashboard icinde `customer_messages` ve `order_requests` tablolarina ulas
- ilk canli kayitlari gor
- ekibin siparisleri hangi aralikta kontrol edecegini netlestir
- gerekiyorsa `order_requests.status` alanini manuel guncelleme akisini belirle
