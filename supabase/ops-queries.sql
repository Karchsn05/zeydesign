-- Son gelen mesajlar
select
  created_at,
  name,
  phone,
  email,
  subject,
  message
from public.customer_messages
order by created_at desc
limit 50;

-- Son gelen siparisler
select
  created_at,
  order_code,
  customer_name,
  phone,
  city,
  district,
  grand_total,
  status
from public.order_requests
order by created_at desc
limit 50;

-- Yeni siparisler
select
  created_at,
  order_code,
  customer_name,
  phone,
  grand_total
from public.order_requests
where status = 'NEW'
order by created_at desc;

-- Duruma gore adet
select
  status,
  count(*) as total
from public.order_requests
group by status
order by total desc;
