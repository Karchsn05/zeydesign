# Supabase Heartbeat

Bu repo, Supabase projesinin uzun sure bosta kalip pause olma riskini azaltmak icin gunluk bir keepalive workflow'u icerir.

Dosya:

- `.github/workflows/supabase-heartbeat.yml`

Davranis:

- Her gun bir kez calisir.
- `customer_messages` tablosuna `__heartbeat__` konulu hafif bir kayit ekler.
- `workflow_dispatch` ile GitHub Actions ekranindan elle de tetiklenebilir.

Notlar:

- Kullanilan publishable key zaten public oldugu icin workflow icinde sakinca olmadan kullanilabilir.
- Heartbeat satirlari gercek mesajlarla karismasin diye `subject = '__heartbeat__'` olarak yazilir.
- Istersen eski heartbeat kayitlarini temizlemek icin `supabase/ops-queries.sql` icindeki temizleme sorgusunu calistirabilirsin.
