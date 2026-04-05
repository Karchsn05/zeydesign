# Supabase Operasyon Notlari

Bu surumde canli admin panel yoktur. Gunluk operasyon Supabase dashboard uzerinden takip edilir.

## Tablolar

### `customer_messages`

- iletisim formu buraya yazar
- temel alanlar:
  - `created_at`
  - `name`
  - `phone`
  - `email`
  - `subject`
  - `message`

### `order_requests`

- checkout formu buraya yazar
- temel alanlar:
  - `created_at`
  - `order_code`
  - `customer_name`
  - `phone`
  - `city`
  - `district`
  - `address`
  - `items`
  - `subtotal`
  - `grand_total`
  - `status`

## Tavsiye Edilen Durumlar

`status` alanini manuel olarak su set ile kullan:

- `NEW`
- `CONTACTED`
- `APPROVED`
- `CLOSED`
- `CANCELLED`

## Gunluk Akis

1. `order_requests` tablosunu `created_at desc` sirala
2. yeni kayitlari kontrol et
3. WhatsApp veya telefon ile donus yap
4. gorusme sonrasi `status` guncelle
5. tamamlanan siparisleri `CLOSED` yap

## Mesaj Akisi

1. `customer_messages` tablosunu `created_at desc` sirala
2. geri donulen kayitlari kendi ic operasyon notuna aktar
3. Supabase icinde silmek yerine arsiv mantigi istenirse yeni kolon ekle

## Not

Bu proje kasitli olarak yalindir. Ileride hafif bir panel gerekirse ilk mantikli adim Supabase view + read-only dashboard katmanidir.
