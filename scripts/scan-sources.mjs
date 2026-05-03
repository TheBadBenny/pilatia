#!/usr/bin/env node
// Daily scan: comprueba si las URLs de las que extraemos los precios
// han cambiado desde la última verificación. NO modifica data/studios.json.
// Genera GitHub issues con los cambios detectados para revisión manual.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const STUDIOS_PATH = "data/studios.json";
const HASHES_PATH = "data/sources-hashes.json";
const PENDING_ISSUES_PATH = ".scan-pending-issues.json";

const studios = JSON.parse(readFileSync(STUDIOS_PATH, "utf8"));
const previousHashes = existsSync(HASHES_PATH)
  ? JSON.parse(readFileSync(HASHES_PATH, "utf8"))
  : {};

// Recolecta todas las URLs únicas que verificamos en data/studios.json
const urls = new Set();
for (const s of studios.studios) {
  if (s.contact?.website) urls.add(s.contact.website);
  const p = s.pricing ?? {};
  for (const plan of p.monthlyPlans ?? []) {
    if (plan.sourceUrl) urls.add(plan.sourceUrl);
  }
  for (const pkg of p.packages ?? []) {
    if (pkg.sourceUrl) urls.add(pkg.sourceUrl);
  }
  if (p.dropIn?.sourceUrl) urls.add(p.dropIn.sourceUrl);
  if (p.dropInMat?.sourceUrl) urls.add(p.dropInMat.sourceUrl);
  if (p.private?.sourceUrl) urls.add(p.private.sourceUrl);
  for (const d of p.duos ?? []) {
    if (d.sourceUrl) urls.add(d.sourceUrl);
  }
  if (p.trial?.sourceUrl) urls.add(p.trial.sourceUrl);
  for (const v of p.verticalPlans ?? []) {
    if (v.sourceUrl) urls.add(v.sourceUrl);
  }
  for (const e of p.extras ?? []) {
    if (e.sourceUrl) urls.add(e.sourceUrl);
  }
}

const sortedUrls = [...urls].sort();
console.log(`Scanning ${sortedUrls.length} unique URLs...`);

const userAgent =
  "Mozilla/5.0 (compatible; PilatiaBot/1.0; +https://pilatia.es/metodologia/)";

// Limpia el HTML para que el hash sea estable: quita scripts, styles,
// comments, head, noscript y todas las etiquetas HTML — sólo texto plano.
function stripDynamic(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<head[\s\S]*?<\/head>/i, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

const nextHashes = { ...previousHashes };
const issues = [];
const stats = { unchanged: 0, changed: 0, new: 0, errors: 0 };

for (const url of sortedUrls) {
  let host = url;
  try {
    host = new URL(url).hostname;
  } catch {
    /* keep raw */
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": userAgent,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      issues.push({
        title: `[scan] URL caída ${res.status}: ${host}`,
        body: [
          `**URL**: ${url}`,
          `**Status**: ${res.status} ${res.statusText}`,
          `**Fecha**: ${new Date().toISOString()}`,
          ``,
          `Revisar manualmente. Si la URL ha cambiado de ruta, actualizar \`data/studios.json\`. Si el estudio cerró, marcar la entrada como \`pricing.disclosed: false\`.`,
        ].join("\n"),
        labels: ["data-quality", "auto-scan"],
      });
      stats.errors++;
      continue;
    }

    const html = await res.text();
    const text = stripDynamic(html);
    const hash = createHash("sha256").update(text).digest("hex").slice(0, 16);
    const prevHash = previousHashes[url];

    nextHashes[url] = hash;

    if (!prevHash) {
      console.log(`  NEW   ${host} → ${hash}`);
      stats.new++;
    } else if (prevHash !== hash) {
      console.log(`  DIFF  ${host}: ${prevHash} → ${hash}`);
      issues.push({
        title: `[scan] Cambio detectado: ${host}`,
        body: [
          `**URL**: ${url}`,
          `**Hash anterior**: \`${prevHash}\``,
          `**Hash actual**: \`${hash}\``,
          `**Fecha**: ${new Date().toISOString()}`,
          ``,
          `Algo cambió en el contenido textual de esta página desde la última verificación.`,
          ``,
          `**Acción**:`,
          `1. Abre la URL y compara con los datos en \`data/studios.json\`.`,
          `2. Si los **precios** cambiaron → actualiza el JSON y \`lastVerified\`.`,
          `3. Si solo cambió **layout/copy** sin tocar precios → cierra esta issue (el hash ya está actualizado para la próxima ronda).`,
          ``,
          `Generada automáticamente por \`scripts/scan-sources.mjs\` · ejecutado vía workflow \`daily-scan.yml\`.`,
        ].join("\n"),
        labels: ["data-quality", "auto-scan"],
      });
      stats.changed++;
    } else {
      stats.unchanged++;
    }
  } catch (err) {
    console.log(`  ERR   ${host}: ${err.message}`);
    issues.push({
      title: `[scan] Error de fetch: ${host}`,
      body: [
        `**URL**: ${url}`,
        `**Error**: \`${err.message}\``,
        `**Fecha**: ${new Date().toISOString()}`,
        ``,
        `Posibles causas: timeout, DNS error, certificado SSL caducado, bloqueo del bot, sitio temporalmente caído.`,
        ``,
        `Si persiste varios días, considerar marcar la URL como obsoleta o cambiar a otra del mismo estudio.`,
      ].join("\n"),
      labels: ["data-quality", "auto-scan"],
    });
    stats.errors++;
  }
}

console.log(
  `\nStats: ${stats.unchanged} unchanged · ${stats.changed} changed · ${stats.new} new · ${stats.errors} errors`
);
console.log(`Pending issues to create: ${issues.length}`);

// Guarda hashes ordenados alfabéticamente para diffs estables
const sortedHashes = Object.fromEntries(
  Object.entries(nextHashes).sort(([a], [b]) => a.localeCompare(b))
);
writeFileSync(HASHES_PATH, JSON.stringify(sortedHashes, null, 2) + "\n");
writeFileSync(PENDING_ISSUES_PATH, JSON.stringify(issues, null, 2));

console.log(`Wrote ${HASHES_PATH} and ${PENDING_ISSUES_PATH}`);
