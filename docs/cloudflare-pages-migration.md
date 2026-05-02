# Migración a Cloudflare Pages

Este documento te lleva paso a paso por la migración de GitHub Pages a Cloudflare Pages. Tiempo total estimado: 30-40 minutos de tu trabajo + 4-24h de propagación DNS.

## Por qué migrar

| | GitHub Pages (actual) | Cloudflare Pages |
|---|---|---|
| TTFB en España | 37-359ms | 20-50ms consistente |
| HTTP/3 / QUIC | ❌ | ✅ |
| Brotli max compression | Parcial | ✅ |
| Edge POPs | ~80 (Fastly) | 330+ |
| Bandwidth gratis | Soft 100GB/mes | Ilimitado |
| Build minutes gratis | Ilimitado | 500/mes |
| Image optimization | ❌ | ✅ Polish |

## Pre-requisitos

- ✅ Cuenta en Cloudflare (la que ya usas para Web Analytics)
- ✅ Acceso al repo TheBadBenny/pilatia
- ✅ Acceso al panel de GoDaddy de pilatia.es

## Fase 1 — Conectar repo a Cloudflare Pages (5 min)

1. Ve a https://dash.cloudflare.com → **Workers & Pages**
2. Click **Create application** → tab **Pages** → **Connect to Git**
3. Click **Connect GitHub** → autoriza el "Cloudflare Workers & Pages" GitHub App
4. Selecciona el repo **TheBadBenny/pilatia**
5. Configuración del build:
   - **Project name**: `pilatia`
   - **Production branch**: `main`
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `pnpm install --frozen-lockfile && pnpm build`
   - **Build output directory**: `out`
   - **Root directory**: (vacío)
6. **Environment variables (Production)** — añade estas dos:
   - `NEXT_PUBLIC_SITE_URL` = `https://pilatia.es`
   - `NEXT_PUBLIC_CF_BEACON_TOKEN` = `011162f699d043a0ba71ff46d0ec1354`
   - **NO añadas `NEXT_PUBLIC_BASE_PATH`** (queremos servir en raíz)
7. Click **Save and Deploy**

Cloudflare empieza a construir. Tarda 2-4 minutos. Cuando termine te da una URL tipo `https://pilatia.pages.dev`.

**Test inmediato**: abre `https://pilatia.pages.dev` y verifica que la home, /precios, /barrios/salamanca, etc. funcionan. No mires todavía pilatia.es — sigue apuntando a GitHub Pages.

## Fase 2 — Mover DNS a Cloudflare (10 min + propagación)

Para usar pilatia.es como dominio personalizado en Cloudflare Pages, tu DNS tiene que estar en Cloudflare (CNAME flattening en apex).

### En Cloudflare:

1. Dashboard → **Add a Site** → escribe `pilatia.es` → **Continue**
2. Elige plan **Free** → **Continue**
3. Cloudflare escanea tus DNS actuales en GoDaddy y los importa automáticamente:
   - Verás los 4 A records de GitHub Pages (185.199.108-111.153)
   - Verás el CNAME `www` → thebadbenny.github.io
   - Click **Continue**
4. Cloudflare te muestra **2 nameservers**, ejemplo:
   ```
   art.ns.cloudflare.com
   nora.ns.cloudflare.com
   ```
   *(Los tuyos serán distintos — apúntatelos exactamente.)*

### En GoDaddy:

5. Login en GoDaddy → **My Products** → click en **pilatia.es** → **DNS**
6. Busca la sección **Nameservers** (a veces "Servidores de nombres")
7. Click **Change** o **Edit** → elige **Custom / Personalizado**
8. Borra `ns61.domaincontrol.com` y `ns62.domaincontrol.com`
9. Pega los 2 nameservers que te dio Cloudflare
10. Save

### Esperar:

Vuelve a Cloudflare. En la página de pilatia.es verás un mensaje "Pending Nameserver Update". Cloudflare comprueba cada hora. Cuando lo detecten te llega un email "Cloudflare is now protecting pilatia.es". Suele tardar 1-4h, máximo 24h.

## Fase 3 — Conectar pilatia.es a Cloudflare Pages (2 min, después de propagación)

Una vez Cloudflare gestione tu DNS:

1. Vuelve a **Workers & Pages** → click en el proyecto **pilatia**
2. Tab **Custom domains** → **Set up a custom domain**
3. Escribe `pilatia.es` → **Continue**
4. Cloudflare añade un CNAME automáticamente al DNS y verifica
5. SSL cert se aprovisiona en 1-5 minutos
6. Repite para `www.pilatia.es` (te creará redirect a apex)

Cuando ambos estén verdes, **pilatia.es ya sirve desde Cloudflare Pages**.

## Fase 4 — Limpiar GitHub Pages (1 min)

GitHub Pages sigue activo en `thebadbenny.github.io/pilatia/` pero ya no responde por pilatia.es. Puedes:

**Opción A — Dejarlo activo** (recomendado al principio): sirve de backup. Ningún problema.

**Opción B — Apagarlo del todo**:
- En GitHub repo → Settings → Pages → desactiva "GitHub Actions" como source
- O: borra el archivo `.github/workflows/deploy.yml` del repo

## Verificación post-migración

```bash
# 1. DNS apunta a Cloudflare
dig pilatia.es +short
# Debería devolver IPs de Cloudflare (172.x.x.x rango), no 185.199.108-111.x

# 2. HTTP/3 activo (Cloudflare lo activa por defecto)
curl -sI https://pilatia.es/ | grep -i "alt-svc"
# Debería tener: alt-svc: h3=":443"; ma=86400

# 3. Servidor es Cloudflare
curl -sI https://pilatia.es/ | grep -i "server"
# Server: cloudflare

# 4. TTFB mejorado
curl -o /dev/null -w "TTFB: %{time_starttransfer}s\n" https://pilatia.es/
# Debería bajar de ~200ms (cold) a ~30-50ms
```

## Rollback (si algo sale mal)

Si pilatia.es se cae durante la transición:

1. Ve a GoDaddy → DNS → Nameservers → cambia de vuelta a "Default" (`ns61/ns62.domaincontrol.com`)
2. Tarda 1-4h en revertir
3. GitHub Pages vuelve a servir pilatia.es

## Configuraciones automáticas en este repo

Ya están listas para Cloudflare Pages:

- `next.config.ts` — `basePath` se desactiva automáticamente cuando `NEXT_PUBLIC_BASE_PATH` está vacío
- `public/_headers` — cache aggressive para `/_next/static/`, security headers (HSTS, X-Frame-Options, etc.), CSP-friendly defaults
- Build command estándar: `pnpm install --frozen-lockfile && pnpm build`

No tienes que tocar código.

## Mejoras que vendrán automáticamente con Cloudflare Pages

- **HTTP/3 / QUIC** activado · ahorra ~50-100ms en primera conexión, sobre todo en mobile
- **Brotli max** · 10-15% menos peso en HTML/CSS/JS comparado con GitHub Pages
- **Anycast routing** · cada visitante llega al POP más cercano (Madrid o Barcelona para España)
- **Auto Edge cache** · TTL respetando los `_headers` que dejé configurado
- **Web Analytics integrado** · ya está activo, sigue funcionando igual
