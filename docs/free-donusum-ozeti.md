# ZeyDesign Free Donusum Ozeti

Bu klasor, eski `codex` klasorunden secilmis parcalar kullanilarak tam ucretsiz hosting hedefi icin yeniden kuruldu.

## Korunanlar

- premium vitrin hissi veren landing sayfalari
- urun listesi ve urun detay
- client-side configurator ve fiyat farki akisi
- localStorage tabanli sepet
- siparis birakma akisi
- iletisim formu
- Supabase'a mesaj ve siparis kaydi

## Bilincli Olarak Cikarilanlar

- canli admin panel
- Prisma ve SQLite
- tum `/api/v1/*` route'lari
- local disk upload
- public siparis sorgulama
- anonim referans gorsel yukleme
- panel tabanli builder ve urun CRUD

## Yeni Temel

- hosting: Cloudflare Pages
- build: `npm run build`
- output: `out/`
- veri: Supabase
- katalog ve icerik: `src/data/*`

## Operasyon Notu

- Katalog degisikligi panelden degil repo duzenlemesiyle yapilir.
- Supabase tarafinda sadece `insert` acik anonim yazma kurali vardir.
- Siparis sonrasi teyit WhatsApp veya manuel iletisim ile ilerler.
