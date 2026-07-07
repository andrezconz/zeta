# Fortis

Un sistema operativo para tu patrimonio. Fortis consolida inversiones de
distintos brokers, analiza riesgo y rentabilidad, y ayuda a planear metas de
largo plazo con calma y disciplina — sin apariencia de casino.

> Lo importante no es controlar el mercado. Lo importante es controlar tus decisiones.

## Estado del proyecto

Esta es la **Fase 1**: landing page completa y un dashboard funcional con
datos simulados. Todavía no hay backend real conectado (ver
[Conectar Supabase y Prisma](#conectar-supabase-y-prisma-cuando-tengas-credenciales)).

### Módulos funcionales (Fase 1)

- **Landing** (`/`): hero, preview del dashboard, por qué Fortis, filosofía
  estoica, proceso en 5 pasos.
- **Login** (`/login`): funciona en modo demo (sin Supabase configurado, entra
  directo al dashboard) o contra Supabase Auth si defines las variables de
  entorno.
- **Resumen** (`/dashboard`): KPIs de patrimonio, rentabilidad, dividendos y
  cash; evolución vs. benchmarks; composición y objetivos activos.
- **Portafolio** (`/dashboard/portafolio`): tabla ordenable/filtrable de
  posiciones + distribución por tipo de activo y por broker.
- **Riesgo** (`/dashboard/riesgo`): volatilidad, Sharpe, Sortino, drawdown,
  beta, alpha, correlación, diversificación y VaR, con explicación en tooltip.
- **Metas** (`/dashboard/metas`): timeline de objetivos con avance, capital
  requerido y proyección.
- **Planeación** (`/dashboard/planeacion`): calculadoras de interés
  compuesto, FIRE/independencia financiera, y retiro ajustado por inflación.

### Módulos en construcción (Fase 2)

Mercados, Dividendos, Documentos, Alertas, Análisis histórico y
Configuración ya están en la navegación (con una pantalla "Próximamente"
describiendo su alcance), pendientes de implementación completa. El panel de
IA integrada descrito en el brief original también queda para esta fase.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Radix UI (primitivas propias, estilo shadcn) · Framer Motion · Recharts ·
TanStack Table · Zustand · next-themes · Prisma (schema listo) ·
Supabase (Auth + Postgres, scaffolding listo).

## Estructura del proyecto

```text
/
├── prisma/
│   └── schema.prisma        # modelo de dominio (perfiles, brokers, holdings, metas...)
├── src/
│   ├── app/
│   │   ├── page.tsx         # landing
│   │   ├── login/
│   │   └── dashboard/       # layout (sidebar+header) + un folder por módulo
│   ├── components/
│   │   ├── ui/              # primitivas (button, card, table, tabs, tooltip...)
│   │   ├── landing/         # secciones de la landing
│   │   └── dashboard/       # sidebar, header, kpi-card, allocation-chart...
│   ├── lib/
│   │   ├── data/mock-data.ts  # datos simulados realistas
│   │   ├── supabase/          # cliente browser/server (requiere env vars)
│   │   └── prisma.ts
│   └── store/ui-store.ts    # estado global (Zustand): sidebar, panel de IA
└── package.json
```

## Comandos

| Comando           | Acción                                         |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala dependencias (corre `prisma generate`) |
| `npm run dev`       | Servidor local en `localhost:4321`             |
| `npm run build`     | Build de producción                            |
| `npm run lint`      | ESLint                                         |
| `npm run db:push`   | Sincroniza el schema de Prisma con la base de datos |
| `npm run db:studio` | Abre Prisma Studio                             |

## Conectar Supabase y Prisma (cuando tengas credenciales)

El dashboard funciona hoy con datos simulados
(`src/lib/data/mock-data.ts`) para que la UI sea completamente navegable sin
depender de infraestructura externa. Para conectar datos reales:

1. Crea un proyecto en [supabase.com](https://supabase.com) (o usa uno existente).
2. Copia `.env.local.example` a `.env.local`.
3. Completa las variables directamente en `.env.local` (no las compartas en
   chats ni las subas a git — el archivo ya está en `.gitignore`):
   - `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
   - `DATABASE_URL` (pooler, puerto 6543) y `DIRECT_URL` (directa, puerto 5432) (Project Settings → Database).
4. Corre `npm run db:push` para crear las tablas definidas en `prisma/schema.prisma`.
5. Reemplaza las lecturas de `src/lib/data/mock-data.ts` por consultas a
   Prisma/Supabase módulo por módulo.

Mientras estas variables no existan, `/login` opera en modo demo y el resto
de la app sigue mostrando datos simulados.

## Licencia

MIT. Ver [LICENSE](LICENSE). Contenido educativo; no constituye asesoría
financiera individual.
