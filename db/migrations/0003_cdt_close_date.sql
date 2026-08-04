-- Agrega la fecha de cierre (vencimiento) de un CDT, para calcular el
-- plazo real a partir de fecha_apertura -> fecha_cierre en vez de pedir
-- el número de días a mano (propenso a error).
alter table holdings add column close_date text;
