# Zeta · Principios de Inversión

Sitio estático (Astro) con los principios que comparten los inversionistas más
exitosos de la historia —Benjamin Graham, Warren Buffett, Charlie Munger, Ray
Dalio, Peter Lynch, Howard Marks y John C. Bogle— aplicados a la construcción
de un plan financiero personal, junto con un conjunto de herramientas
interactivas para ponerlos en práctica.

## Contenido

- **15 principios**, uno por página, en [`src/content/principios`](src/content/principios).
- **Herramientas interactivas** en `/herramientas`:
  - Calculadora de interés compuesto.
  - Checklist de revisión periódica del plan.
  - Definidor de objetivos financieros SMART.
  - Portafolio (en construcción, se irá ampliando).

Todo el cálculo de las herramientas ocurre en el navegador (localStorage);
no hay backend ni se envían datos a ningún servidor.

## Estructura del proyecto

```text
/
├── public/
├── src/
│   ├── components/       # Nav, Footer
│   ├── content/
│   │   └── principios/   # 15 archivos .md, uno por principio
│   ├── content.config.ts # schema de la colección "principios"
│   ├── layouts/          # Layout base
│   ├── pages/
│   │   ├── index.astro
│   │   ├── principios/   # índice + página dinámica [slug]
│   │   └── herramientas/ # hub + cada herramienta
│   └── styles/
└── package.json
```

## Comandos

Ejecutar desde la raíz del proyecto:

| Comando           | Acción                                         |
| :----------------- | :--------------------------------------------- |
| `npm install`       | Instala las dependencias                       |
| `npm run dev`       | Levanta el servidor local en `localhost:4321`  |
| `npm run build`     | Genera el sitio de producción en `./dist/`     |
| `npm run preview`   | Previsualiza el build de producción localmente |

## Agregar un nuevo principio

Crear un archivo `NN-slug.md` en `src/content/principios/` con el frontmatter:

```yaml
---
numero: 16
titulo: "Título del principio"
resumen: "Resumen de una línea."
autores: ["Nombre del inversionista"]
---
```

La página `src/pages/principios/[slug].astro` genera la ruta automáticamente
a partir del nombre del archivo.

## Licencia

MIT. Ver [LICENSE](LICENSE). Contenido educativo; no constituye asesoría
financiera individual.
