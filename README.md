# Fortis

Un sistema operativo para tu patrimonio y tus finanzas del día a día.
Fortis consolida inversiones de distintos brokers, tus ingresos y gastos
personales, y ayuda a planear metas de largo plazo con calma y disciplina —
sin apariencia de casino.

> Lo importante no es controlar el mercado. Lo importante es controlar tus decisiones.

Pensado para un solo usuario: no hay registro público, login ni multi-tenant
— el dashboard es de acceso abierto (sin contraseña) y los datos viven en tu
propia base de datos en [Turso](https://turso.tech) (SQLite serverless).

**Nota de seguridad**: al no tener autenticación, cualquiera que conozca la
URL de despliegue puede ver y editar tus datos financieros. Es una decisión
consciente para simplificar el uso personal; si en algún momento quieres
restringir el acceso, se puede volver a agregar una capa de autenticación.

## Estado del proyecto

- **Landing** (`/`): hero, preview del dashboard, por qué Fortis, filosofía
  estoica, proceso en 5 pasos.
- **Resumen** (`/dashboard`): patrimonio neto total (inversiones + efectivo
  personal acumulado), KPIs de inversión, composición por activo, finanzas
  del mes y objetivos activos — todo calculado desde tus datos reales.
- **Portafolio** (`/dashboard/portafolio`): alta de cuentas de broker y
  posiciones, tabla ordenable/filtrable, distribución por tipo de activo y
  por broker.
- **Finanzas** (`/dashboard/finanzas`): registro de ingresos y gastos
  personales (servicios, mercado, compras, pagos extraordinarios, etc.),
  totales del mes y desglose de gastos por categoría.
- **Metas** (`/dashboard/metas`): alta de metas, timeline con avance, capital
  requerido y proyección.
- **Riesgo** (`/dashboard/riesgo`): panel de volatilidad, Sharpe, Sortino,
  drawdown, beta, alpha, correlación, diversificación y VaR. **Ilustrativo**:
  calcularlos de verdad requiere un histórico de precios diarios que todavía
  no capturamos.
- **Planeación** (`/dashboard/planeacion`): calculadoras de interés
  compuesto, FIRE/independencia financiera (usa tu patrimonio real) y retiro
  ajustado por inflación.
- **Mercados, Dividendos, Documentos, Alertas, Análisis, Configuración**:
  navegables con pantalla "Próximamente" describiendo su alcance — pendientes
  de esta fase.

## Conectar Turso

El dashboard necesita una base de datos real para dejar de mostrar el aviso
"Conecta tu base de datos para ver tus datos reales".

1. Crea una cuenta gratuita en [turso.tech](https://turso.tech) y una base de
   datos (desde el dashboard web, o con la CLI: `turso db create fortis`).
2. Copia `.env.local.example` a `.env.local` y completa:
   - `TURSO_DATABASE_URL` — con la CLI: `turso db show fortis --url`.
   - `TURSO_AUTH_TOKEN` — con la CLI: `turso db tokens create fortis`. Da
     acceso total a la base; **nunca** debe llevar el prefijo `NEXT_PUBLIC_`
     ni usarse fuera del servidor.
3. Aplica el esquema: `npm run db:migrate` (ejecuta en orden los archivos de
   `db/migrations/`).
4. En Netlify (u otro hosting), agrega esas mismas dos variables en las
   variables de entorno del sitio, y corre `npm run db:migrate` una vez
   apuntando a esa misma base (o hazlo localmente antes del primer deploy,
   ya que es la misma base de datos).

No hay Prisma ni proveedor de backend con API propia: las consultas usan
`@libsql/client` directamente desde `src/lib/data/*.ts` (lecturas) y
`src/lib/actions/*.ts` (Server Actions para crear/eliminar, con
`crypto.randomUUID()` para los ids). Como no hay autenticación de usuario,
todas las consultas usan el auth token desde el servidor; el navegador nunca
habla con la base de datos directamente.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Radix UI (primitivas propias, estilo shadcn) · Framer Motion · Recharts ·
TanStack Table · Zustand · next-themes · Turso (SQLite serverless, vía
`@libsql/client`).

## Estructura del proyecto

```text
/
├── db/
│   └── migrations/          # SQL: broker_accounts, holdings, goals, cash_transactions
├── scripts/
│   └── migrate.mjs          # aplica db/migrations/*.sql contra Turso
├── src/
│   ├── app/
│   │   ├── page.tsx         # landing
│   │   └── dashboard/       # layout (sidebar+header) + un folder por módulo
│   ├── components/
│   │   ├── ui/              # primitivas (button, card, table, tabs, tooltip...)
│   │   ├── landing/         # secciones de la landing
│   │   └── dashboard/       # sidebar, header, kpi-card, allocation-chart...
│   ├── lib/
│   │   ├── data/             # lecturas server-only (portfolio.ts, goals.ts, finances.ts)
│   │   ├── actions/           # Server Actions (mutaciones, "use server")
│   │   ├── db/client.ts       # cliente Turso (solo servidor)
│   │   └── data/mock-data.ts  # solo lo ilustrativo (riesgo, benchmarks)
│   └── store/ui-store.ts    # estado global (Zustand): sidebar, panel de IA
└── package.json
```

## Comandos

| Comando            | Acción                                          |
| :------------------ | :----------------------------------------------- |
| `npm install`        | Instala dependencias                             |
| `npm run dev`        | Servidor local en `localhost:4321`               |
| `npm run build`      | Build de producción                              |
| `npm run lint`       | ESLint                                           |
| `npm run db:migrate` | Aplica `db/migrations/*.sql` contra Turso        |

## Licencia

MIT. Ver [LICENSE](LICENSE). Contenido educativo; no constituye asesoría
financiera individual.
