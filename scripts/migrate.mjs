#!/usr/bin/env node
// Aplica, en orden, los archivos .sql de db/migrations contra la base de
// datos Turso configurada en TURSO_DATABASE_URL / TURSO_AUTH_TOKEN.
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

const files = (await readdir(migrationsDir)).filter((f) => f.endsWith(".sql")).sort();

for (const file of files) {
  const sql = await readFile(path.join(migrationsDir, file), "utf8");
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  console.log(`Aplicando ${file} (${statements.length} sentencias)...`);
  for (const statement of statements) {
    await client.execute(statement);
  }
}

console.log("Migraciones aplicadas correctamente.");
client.close();
