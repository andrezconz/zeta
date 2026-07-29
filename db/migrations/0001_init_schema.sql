-- Esquema inicial de Fortis en Turso (SQLite/libSQL).
-- Sin tabla de perfiles ni RLS: la app es de un solo usuario y toda consulta
-- pasa por el servidor con el auth token de Turso (ver src/lib/db/client.ts),
-- que nunca se expone al navegador. Los ids se generan en la aplicación
-- (crypto.randomUUID()) e insertan como texto.

create table if not exists broker_accounts (
  id         text primary key,
  broker     text not null,
  label      text,
  created_at text not null default (datetime('now'))
);

create table if not exists holdings (
  id                text primary key,
  broker_account_id text not null references broker_accounts(id) on delete cascade,
  asset             text not null,
  ticker            text not null,
  type              text not null check (type in ('ETF', 'Acciones', 'Bonos', 'Fondos', 'Crypto', 'Cash')),
  currency          text not null check (currency in ('COP', 'USD')),
  quantity          real not null default 0,
  avg_cost          real not null default 0,
  current_price     real not null default 0,
  dividend_yield    real not null default 0,
  updated_at        text not null default (datetime('now'))
);

create index if not exists holdings_broker_account_id_idx on holdings (broker_account_id);

create table if not exists goals (
  id               text primary key,
  name             text not null,
  target_amount    real not null,
  current_amount   real not null default 0,
  target_date      text not null,
  monthly_required real not null default 0,
  created_at       text not null default (datetime('now'))
);

create table if not exists cash_transactions (
  id               text primary key,
  kind             text not null check (kind in ('ingreso', 'gasto')),
  category         text not null,
  description      text,
  amount           real not null check (amount >= 0),
  transaction_date text not null,
  created_at       text not null default (datetime('now'))
);

create index if not exists cash_transactions_date_idx on cash_transactions (transaction_date);
create index if not exists cash_transactions_kind_idx on cash_transactions (kind);
