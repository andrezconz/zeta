# Fortis

Un sistema operativo para tu patrimonio. Fortis consolida inversiones de
distintos brokers, analiza riesgo y rentabilidad, y ayuda a planear metas de
largo plazo con calma y disciplina — sin apariencia de casino.

> Lo importante no es controlar el mercado. Lo importante es controlar tus decisiones.

Pensado para un solo usuario: no hay registro público ni multi-tenant. El
acceso al dashboard se protege con una clave de sitio compartida (ver
[Acceso](#acceso-al-dashboard)), y los datos viven en un proyecto de Supabase
propio.

## Estado del proyecto

- **Landing** (`/`): hero, preview del dashboard, por qué Fortis, filosofía
  estoica, proceso en 5 pasos.
- **Resumen** (`/dashboard`): patrimonio, rentabilidad, dividendos proyectados
  y cash calculados desde tus posiciones reales; composición por activo;
  objetivos activos.
- **Portafolio** (`/dashboard/portafolio`): alta de cuentas de broker y
  posiciones, tabla ordenable/filtrable, distribución por tipo de activo y
  por broker — todo respaldado por Supabase.
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

## Acceso al dashboard

No hay registro ni login de usuario: en su lugar, `/dashboard/*` está
protegido por una única clave de sitio (`SITE_PASSWORD`) verificada en
`src/proxy.ts` (el middleware de Next.js). Sin esa variable definida, el
acceso queda abierto (útil en desarrollo local).

1. Define `SITE_PASSWORD` en `.env.local` (o en las env vars de Netlify).
2. Entra a `/unlock`, ingresa la clave; queda una cookie httpOnly válida por
   30 días.

Importante: esto protege las **páginas**, no la base de datos directamente.
Por eso todas las consultas a Supabase pasan por Server Components/Server
Actions usando la *service role key* (nunca se expone al navegador) — ver
siguiente sección.

## Conectar Supabase

El dashboard necesita un proyecto de Supabase real para dejar de mostrar el
aviso "Conecta Supabase para ver tus datos reales".

1. Crea un proyecto en [supabase.com](https://supabase.com) (o usa el que ya
   conectaste vía GitHub Integration).
2. Las migraciones SQL viven en `supabase/migrations/` (tablas
   `broker_accounts`, `holdings`, `goals`, con RLS habilitado y sin políticas
   para `anon`/`authenticated` — solo la *service role key* tiene acceso).
   Si usaste la integración de GitHub de Supabase, se aplican solas al hacer
   push a la rama conectada. Si no, corre `supabase db push` con la CLI.
3. Copia `.env.local.example` a `.env.local` y completa (Project Settings → API):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` — tiene acceso total e ignora RLS; **nunca**
     debe llevar el prefijo `NEXT_PUBLIC_` ni usarse fuera del servidor.
4. En Netlify (u otro hosting), agrega esas mismas variables más
   `SITE_PASSWORD` en las variables de entorno del sitio.

No hay Prisma ni ORM: las consultas usan `@supabase/supabase-js` directamente
desde `src/lib/data/*.ts` (lecturas) y `src/lib/actions/*.ts` (Server Actions
para crear/eliminar).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Radix UI (primitivas propias, estilo shadcn) · Framer Motion · Recharts ·
TanStack Table · Zustand · next-themes · Supabase (Postgres, sin Auth propio).

## Estructura del proyecto

```text
/
├── supabase/
│   └── migrations/          # SQL: broker_accounts, holdings, goals + RLS
├── src/
│   ├── proxy.ts             # gate de SITE_PASSWORD para /dashboard/*
│   ├── app/
│   │   ├── page.tsx         # landing
│   │   ├── unlock/          # formulario de clave de sitio
│   │   └── dashboard/       # layout (sidebar+header) + un folder por módulo
│   ├── components/
│   │   ├── ui/              # primitivas (button, card, table, tabs, tooltip...)
│   │   ├── landing/         # secciones de la landing
│   │   └── dashboard/       # sidebar, header, kpi-card, allocation-chart...
│   ├── lib/
│   │   ├── data/            # lecturas server-only (portfolio.ts, goals.ts)
│   │   ├── actions/          # Server Actions (mutaciones, "use server")
│   │   ├── supabase/admin.ts # cliente con service role key (solo servidor)
│   │   └── data/mock-data.ts # solo lo ilustrativo (riesgo, benchmarks)
│   └── store/ui-store.ts    # estado global (Zustand): sidebar, panel de IA
└── package.json
```

## Comandos

| Comando           | Acción                                         |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala dependencias                           |
| `npm run dev`       | Servidor local en `localhost:4321`             |
| `npm run build`     | Build de producción                            |
| `npm run lint`      | ESLint                                         |

## Licencia

MIT. Ver [LICENSE](LICENSE). Contenido educativo; no constituye asesoría
financiera individual.
