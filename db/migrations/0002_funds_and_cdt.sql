-- Agrega el tipo de activo CDT y los campos necesarios para modelar
-- Fondos de inversión (rentabilidad por periodo, no precio de mercado) y
-- CDT (monto, plazo y tasa efectiva anual).
--
-- SQLite no permite alterar un CHECK constraint existente, así que se
-- recrea la tabla holdings con el nuevo conjunto de valores permitidos
-- para "type" y las columnas nuevas.

create table holdings_new (
  id                text primary key,
  broker_account_id text not null references broker_accounts(id) on delete cascade,
  asset             text not null,
  ticker            text not null,
  type              text not null check (type in ('ETF', 'Acciones', 'Bonos', 'Fondos', 'Crypto', 'Cash', 'CDT')),
  currency          text not null check (currency in ('COP', 'USD')),
  quantity          real not null default 0,
  avg_cost          real not null default 0,
  current_price     real not null default 0,
  dividend_yield    real not null default 0,
  -- Específicos de Fondos: monto invertido y rentabilidad informada por periodo.
  invested_amount   real,
  monthly_return    real,
  semester_return   real,
  annual_return     real,
  -- Específicos de CDT: plazo, tasa efectiva anual y fecha de apertura.
  term_days         integer,
  effective_annual_rate real,
  start_date        text,
  updated_at        text not null default (datetime('now'))
);

insert into holdings_new
  (id, broker_account_id, asset, ticker, type, currency, quantity, avg_cost, current_price, dividend_yield, updated_at)
select id, broker_account_id, asset, ticker, type, currency, quantity, avg_cost, current_price, dividend_yield, updated_at
from holdings;

drop table holdings;
alter table holdings_new rename to holdings;

create index if not exists holdings_broker_account_id_idx on holdings (broker_account_id);
