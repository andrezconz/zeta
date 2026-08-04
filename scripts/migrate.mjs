#!/usr/bin/env node
// Aplica, en orden, los archivos .sql de db/migrations que todavía no se
// hayan corrido contra la base de datos Turso configurada en
// TURSO_DATABASE_URL / TURSO_AUTH_TOKEN. Lleva registro de lo ya aplicado
// en la tabla _migrations para no volver a correr un archivo dos veces.
// Uso: node scripts/migrate.mjs

import { createClient } from "@libsql/client";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, "..", "db", "migrations");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
  console.error("Falta TURSO_DATABASE_URL y/o TURSO_AUTH_TOKEN en el entorno.");
  process.exit(1);
}

const client = createClient({ url, authToken });

await client.execute(`
  create table if not exists _migrations (
    name text primary key,
    applied_at text not null default (datetime('now'))
  )
`);

const applied = new Set(
  (await client.execute("select name from _migrations")).rows.map((r) => String(r.name)),
);

const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();
const pending = files.filter((f) => !applied.has(f));

if (pending.length === 0) {
  console.log("No hay migraciones pendientes.");
} else {
  for (const file of pending) {
    const sql = await readFile(path.join(migrationsDir, file), "utf8");
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    console.log(`Aplicando ${file} (${statements.length} sentencias)...`);
    for (const statement of statements) {
      await client.execute(statement);
    }
    await client.execute({ sql: "insert into _migrations (name) values (?)", args: [file] });
  }
  console.log("Migraciones aplicadas correctamente.");
}

client.close();
