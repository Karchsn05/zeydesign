# ZeyDesign Free Hosting Notlari

Bu proje `Cloudflare Pages + Supabase` hedefiyle statik export olarak hazirlandi.

## Mimari

- Hosting: Cloudflare Pages
- Render modeli: `next build --webpack` ile static export
- Veri: Supabase
- Admin panel: canli web admin yok
- Katalog ve icerik: repo icindeki statik data dosyalari
- Mesaj ve siparis: Supabase insert
- Form korumasi: istemci tarafli honeypot ve kisa tekrar gonderim kilidi
- Ariza fallback'i: Supabase env eksikse veya insert hatasi olursa kullanici WhatsApp ozetiyle akisa devam edebilir

## Gerekli Env

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## Deploy Notlari

Cloudflare Pages build ayarlari:

- Build command: `npm run build`
- Build output directory: `out`
- Not: Bu klasor Unicode karakter iceren bir path altinda oldugu icin build script bilincli olarak `--webpack` kullanir. Next 16 Turbopack bu path ile panic verebilir.

## Supabase Kurulumu

- SQL kurulum dosyasi: `supabase/free-schema.sql`
- `customer_messages` ve `order_requests` tablolari olusur
- temel index'ler olusur
- RLS aciktir
- Anon kullanici icin sadece `insert` izni tanimlanir

## Sinirlar

- Public order lookup yok
- Anon image upload yok
- Icerik ve urun guncelleme repo duzenlemesi ile yapilir
