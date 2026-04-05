create extension if not exists pgcrypto;

create table if not exists public.customer_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null
);

create index if not exists customer_messages_created_at_idx
on public.customer_messages (created_at desc);

create table if not exists public.order_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_code text not null unique,
  customer_name text not null,
  phone text not null,
  email text,
  city text not null,
  district text not null,
  address text not null,
  note text,
  items jsonb not null,
  subtotal numeric not null,
  grand_total numeric not null,
  status text not null default 'NEW',
  source text not null default 'cloudflare-pages'
);

create index if not exists order_requests_created_at_idx
on public.order_requests (created_at desc);

create index if not exists order_requests_status_idx
on public.order_requests (status);

alter table public.customer_messages enable row level security;
alter table public.order_requests enable row level security;

drop policy if exists "anon_insert_customer_messages" on public.customer_messages;
create policy "anon_insert_customer_messages"
on public.customer_messages
for insert
to anon
with check (true);

drop policy if exists "anon_insert_order_requests" on public.order_requests;
create policy "anon_insert_order_requests"
on public.order_requests
for insert
to anon
with check (true);
