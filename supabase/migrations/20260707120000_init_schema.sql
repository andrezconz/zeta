-- Esquema inicial de Fortis: cuentas de broker, posiciones y metas.
-- Diseñado para un solo usuario: no hay tabla de perfiles ni RLS por
-- usuario. Todo el acceso pasa por el service role key desde el servidor
-- (ver src/lib/supabase/admin.ts); RLS se deja habilitado sin políticas
-- para anon/authenticated, de modo que la anon key (si algún día se usa
-- en el navegador) no pueda leer ni escribir nada.

create extension if not exists "pgcrypto";

create table if not exists broker_accounts (
  id          uuid primary key default gen_random_uuid(),
  broker      text not null,
  label       text,
  created_at  timestamptz not null default now()
);

create table if not exists holdings (
  id                uuid primary key default gen_random_uuid(),
  broker_account_id uuid not null references broker_accounts(id) on delete cascade,
  asset             text not null,
  ticker            text not null,
  type              text not null check (type in ('ETF', 'Acciones', 'Bonos', 'Fondos', 'Crypto', 'Cash')),
  currency          text not null check (currency in ('COP', 'USD')),
  quantity          numeric(20, 8) not null default 0,
  avg_cost          numeric(20, 4) not null default 0,
  current_price     numeric(20, 4) not null default 0,
  dividend_yield    numeric(6, 3) not null default 0,
  updated_at        timestamptz not null default now()
);

create index if not exists holdings_broker_account_id_idx on holdings (broker_account_id);

create table if not exists goals (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  target_amount     numeric(20, 2) not null,
  current_amount    numeric(20, 2) not null default 0,
  target_date       date not null,
  monthly_required  numeric(20, 2) not null default 0,
  created_at        timestamptz not null default now()
);

alter table broker_accounts enable row level security;
alter table holdings enable row level security;
alter table goals enable row level security;
