# Pilatia

El comparador honesto de estudios de pilates en Madrid. Precios, horarios y modalidades verificados estudio a estudio. Sin afiliaciones.

→ Producción (GitHub Pages): https://thebadbenny.github.io/pilatia/

## Stack

- **Next.js 16.2** (App Router, static export)
- **React 19.2**
- **TypeScript estricto**
- **Tailwind CSS 4** (CSS-first, `@theme` directive)
- **Fraunces** (display) + **Inter** (UI) vía `next/font/google`

## Cómo correrlo

```bash
pnpm install
pnpm dev
```

Sirve en `http://localhost:3000` (o el siguiente puerto libre).

## Build estático

```bash
pnpm build
```

Genera `/out` con HTML/CSS/JS listo para cualquier hosting estático (GitHub Pages, Cloudflare Pages, S3, Netlify…).

## Variables de entorno

| Variable | Default | Cuándo usarla |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `""` | Si el sitio vive en un subpath (ej. `/pilatia` en GitHub Pages) |
| `NEXT_PUBLIC_SITE_URL` | `https://pilatia.es` | URL pública absoluta — usada en canonical, OG, sitemap, JSON-LD |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | (vacío) | Endpoint de Formspree para el formulario de waitlist. Sin él, el form simula éxito local. |

## Estructura del proyecto

```
data/
  studios.json          # 20 estudios verificados con precios y sourceUrl
  barrios.json          # 11 barrios (8 prioritarios + 3 secundarios)
  studio-coords.json    # coords aproximadas para geolocalización
docs/
  keyword-research.md   # investigación de keywords (Fase 0)
  data-sources.md       # trazabilidad de cada precio
src/app/
  layout.tsx            # header + footer + JSON-LD Organization global
  page.tsx              # home con NearMe (geolocalización)
  precios/page.tsx      # comparativa con FilterBar
  metodologia/page.tsx  # cómo verificamos los datos
  sobre/page.tsx        # misión y contacto
  barrios/[slug]/       # 11 páginas dinámicas con FAQ schema
  estudios/[slug]/      # 20 páginas dinámicas con SportsActivityLocation schema
  sitemap.ts, robots.ts # SEO técnico
  not-found.tsx         # 404 personalizada
src/components/
  Header, Footer, MobileMenu, LogoMark
  Hero indirecto en page.tsx
  StudioCard, StudioVisual, FilterBar
  NearMe (cliente, geolocalización)
  WaitlistForm (cliente, Formspree)
  PriceTable (detalle de estudio)
  OrganicShape (SVG decorativo animado)
src/lib/
  types.ts              # Studio, Barrio, Pricing, Coords
  studios.ts            # loaders + helpers (distance, formatPrice, modalityLabel…)
  seo.ts                # buildMetadata, JSON-LD builders, jsonLdScript
.github/workflows/
  deploy.yml            # CI/CD para GitHub Pages
```

## Cómo añadir o actualizar un estudio

1. Visita la web oficial del estudio. Verifica que las **tarifas estén publicadas** (si no, el estudio no entra en V1).
2. Edita `data/studios.json` añadiendo una entrada nueva al array `studios`.
3. Para cada precio, anota su `sourceUrl` (URL exacta donde lo encontraste) y `lastVerified` (fecha de hoy).
4. Añade las coordenadas aproximadas en `data/studio-coords.json` (precisión ~200 m basta para "más cercanos").
5. Asegúrate de que el `slug` está en kebab-case y sin acentos.
6. Si el estudio cubre un barrio nuevo, añade la entrada a `data/barrios.json` o ajusta los `barrios: ["..."]` del estudio.
7. Corre `pnpm build` y verifica que no haya errores de TypeScript ni de validación.
8. Documenta el cambio en `docs/data-sources.md` si excluyes algún estudio.

## Despliegue

### GitHub Pages (configurado)

Al hacer `git push origin main`, el workflow `.github/workflows/deploy.yml`:

1. Instala dependencias con pnpm.
2. Ejecuta `pnpm build` con `NEXT_PUBLIC_BASE_PATH=/pilatia` y `NEXT_PUBLIC_SITE_URL=https://thebadbenny.github.io/pilatia`.
3. Sube el contenido de `/out` como artefacto de GitHub Pages.
4. Despliega.

Para activarlo la primera vez: ve a **Settings → Pages → Source: GitHub Actions**.

### Dominio personalizado (futuro)

Cuando tengas `pilatia.es`:

1. Renombra `public/CNAME.example` a `public/CNAME` y asegúrate de que su contenido es `pilatia.es`.
2. En el DNS de pilatia.es, crea registros A apuntando a las IPs de GitHub Pages (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153).
3. En **Settings → Pages**, configura el dominio personalizado y activa "Enforce HTTPS" cuando esté disponible.
4. Quita `NEXT_PUBLIC_BASE_PATH` del workflow (el dominio personalizado sirve en la raíz, no en `/pilatia`).
5. Cambia `NEXT_PUBLIC_SITE_URL` a `https://pilatia.es`.

### Migración futura a Vercel

Cuando interese ISR, AdSense en producción o Server Actions:

1. Quita `output: "export"` de `next.config.ts`.
2. Quita `images: { unoptimized: true }` (Vercel optimiza next/image automáticamente).
3. Conecta el repo en Vercel; importa.
4. El waitlist puede dejar de usar Formspree y usar Server Actions.

Estimación de tiempo: 30 minutos.

## SEO

- `sitemap.xml` dinámico con prioridades por tipo de página
- `robots.txt` permite todo, excluye `/api/`
- JSON-LD: `Organization` (layout), `ItemList` (home y precios), `SportsActivityLocation` (estudios), `BreadcrumbList` (estudios y barrios), `FAQPage` (barrios)
- Canonical absoluto + `hreflang="es-ES"` en cada página
- OG + Twitter Card

## Esquema SQL futuro (para migración a base de datos)

Si en el futuro quieres mover los datos de JSON a Postgres/Supabase, este es el esquema sugerido:

```sql
create table barrios (
  slug text primary key,
  name text not null,
  full_name text not null,
  district text not null,
  tier text not null check (tier in ('primary', 'secondary')),
  intro text,
  approximate_coords point,
  neighbors text[]
);

create table studios (
  slug text primary key,
  name text not null,
  district text,
  street text, postal_code text, city text default 'Madrid',
  phone text, email text, website text not null,
  modalities text[],
  verticals text[],
  group_max int,
  languages text[],
  hours text,
  description text,
  highlights text[],
  coords point,
  pricing_disclosed bool default true,
  from_monthly numeric,
  last_verified date not null
);

create table studio_barrios (
  studio_slug text references studios(slug) on delete cascade,
  barrio_slug text references barrios(slug) on delete cascade,
  primary key (studio_slug, barrio_slug)
);

create table prices (
  id serial primary key,
  studio_slug text references studios(slug) on delete cascade,
  kind text not null,             -- 'monthly' | 'package' | 'dropin' | 'private' | 'trial'
  modality text,
  sessions_per_week int,
  sessions_per_month int,
  sessions int,
  price numeric not null,
  label text,
  source_url text not null,
  last_verified date not null
);
```

## AdSense (cuando llegue el momento)

El componente `<AdSlot />` aún no está incluido pero el plan es:

1. Crear `src/components/AdSlot.tsx` con dimensiones reservadas (`min-h-[280px]`) para evitar CLS.
2. Insertar dos slots: entre la fila 2 y 3 del grid de home, y al final de cada estudio.
3. Cargar el script de AdSense vía `<Script>` async en `app/layout.tsx`.
4. Marcar visualmente como "Publicidad" para cumplir con políticas de transparencia.

## Licencia y propiedad de los datos

Los datos de los estudios provienen de su web oficial. Cada precio está acreditado con su `sourceUrl`. Si eres del estudio y los datos no son correctos, escríbenos a `hola@pilatia.es` y los actualizamos en menos de 48 horas.
