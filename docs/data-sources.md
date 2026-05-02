# Fuentes de datos — `data/studios.json`
**Fecha de compilación:** 2026-05-02
**Política:** sólo precios publicados en la web oficial de cada estudio. No se ha scrapeado ClassPass, Google Maps, Yelp ni ningún agregador. Cada precio del JSON lleva su `sourceUrl` y `lastVerified`.

---

## 1. Resumen

- **Estudios incluidos:** 16
- **Estudios revisados:** 30
- **Excluidos por no publicar precios en web:** 14 (ver §3)
- **Cobertura por barrio:** ver §2

---

## 2. Cobertura de barrios prioritarios

El brief pide ≥2 estudios por cada uno de los 8 barrios prioritarios. Estado actual:

| Barrio | Estudios | Estado |
|---|---|---|
| Salamanca | 6 (Pilates Zentro, Pinar Pilates, Élite Pilates, Feel Fit, Pilates Evidence, HOM) | ✅ Sobrecubierto |
| Chamberí | 3 (Centro Maná, City Pilates, Laghum Chamberí) | ✅ |
| Malasaña | 2 (Laghum Malasaña, Aretē) | ✅ |
| Chamartín | 2 (Full Pilates, Zenit) + 1 secundario (Pinar Pilates en CP 28006 borde Chamartín) | ✅ |
| **Centro** | **1 (Nature Pilates)** | ⚠️ Hueco |
| **Retiro** | **1 (Pilates Garbriele)** | ⚠️ Hueco |
| **Chueca** | **1 (Olimpia)** | ⚠️ Hueco |
| **La Latina** | **0** | ❌ Sin cobertura |

Barrios secundarios (no obligatorios en V1):

| Barrio | Estudios |
|---|---|
| Conde Duque | 1 (Aretē, secundario) |
| Tetuán | 1 (Olimpia segunda ubicación, Calle Orense 69) |
| Moncloa | 0 |

### Por qué hay huecos

He revisado todos los estudios de pilates que aparecieron en la investigación de keywords (Fase 0) y un puñado adicional referenciado por terceros. **El mercado madrileño de pilates no publica precios en su web por norma**: muchos estudios obligan al usuario a llamar/escribir para obtener tarifas. La regla que el usuario fijó ("si no muestra precios en web, EXCLUIR") deja fuera a la mayoría.

Los barrios donde el problema es más severo son **Centro, Retiro, Chueca y especialmente La Latina**, donde la mayoría de los centros encontrados son clínicas de fisioterapia que ofrecen pilates como servicio adicional sin tarifas públicas.

### Opciones para resolver

A elección del usuario; recomendación al final:

1. **Aceptar V1 con coverage incompleto.** Ship 16 estudios, mostrar honestamente "Próximamente" en barrios sin cobertura suficiente. No mentimos al visitante.
2. **Llamar/escribir a estudios para que nos manden tarifa** y publicarla con su consentimiento explícito (mejor para relaciones futuras y SEO de marca, pero requiere outreach manual fuera del alcance actual).
3. **Loosenar la regla "precios en web"** — incluir estudios con tarifas obtenidas de capturas de pantalla en sus tarifarios offline (PDFs, mailings). **No recomendado** porque rompe la trazabilidad y la promesa de neutralidad.
4. **Esperar** a que los estudios manden datos vía nuestro futuro formulario de "actualiza tu ficha" (Fase 6+).

**Recomendación**: opción **1** para V1. Construir confianza con honestidad. En la página `/barrios/la-latina` decir "estamos compilando datos de estudios verificados en este barrio — entretanto, mira los más cercanos en Centro y Retiro". Esto también es bueno para SEO long-tail (la página existe y es útil) y para AdSense (transparencia).

---

## 3. Estudios excluidos del JSON inicial (precios no publicados)

Se ha visitado la web oficial de cada uno y NO publican precios. Quedan en backlog para revisitar tras outreach.

| Estudio | Barrio | URL revisada |
|---|---|---|
| Pilates Lab | Chamberí | https://www.pilateslab.es/ |
| Pilates Chamberi | Chamberí | https://www.pilateschamberi.com/ (caída ECONNREFUSED) |
| Centro Kinet | Chamberí | https://centrokinet.es/pilates-chamberi/ |
| 2D Pilates Madrid | Malasaña | https://www.pilatesmalasanamadrid.com/ |
| Pura Vida Pilates | Malasaña | https://puravidapilates.es/centro-de-pilates-en-malasana/ |
| Mind Body Wellness | Chamartín | https://www.mindbodywellness.es/ |
| Maison Pilates | Centro | https://www.maisonpilatesmadrid.com/ |
| Sense Studio | Centro | https://www.sensepilatesmadrid.es/ |
| Temple Pilates | Centro (Gran Vía) | https://templepilates.es/ |
| DAN'S | Centro/Salamanca | https://www.dans.es/clases/reformer-pilates |
| Alma Pilates | Centro/Latina (28012) | https://www.almapilates.es/ |
| Pilates Movement Studio | Argüelles | https://pilatesmadridcentro.es/ |
| Danann Pilates | Argüelles | https://danannpilates.com/ |
| Anima Fisioterapia | Lavapiés | https://animafisioterapia.com/ |
| Centro Physios / Kora Physios | Chueca | https://www.centrophysios.com/ |
| Narvaez Fisios | Retiro | https://www.narvaezfisios.com/pilates-retiro-madrid/ |
| Fisioesfera | La Latina | https://www.fisioesfera.es/tarifas (precios sólo en imagen, no extraíbles) |
| Relevium | La Latina | https://relevium.es/pilates/ |
| Vivepilates Madrid | Salamanca/Retiro | https://vivepilatesmadrid.com/ |
| SBBOX | Ciudad Lineal (fuera de scope) | https://www.sbbox.es/pilates-maquinas-madrid/ |
| MasterPilates | Sin dirección publicada | https://masterpilates.center/clases-presenciales/ |
| Core Pilates Energy Center | Ávila (fuera) | http://corepilatesenergycenter.com/ |
| Pilates Body Soul Almirante | Chueca | 404 |
| Xano Pilates & Yoga | — | 404 |

---

## 4. Mapa de fuentes (estudios incluidos)

Cada precio del JSON tiene su `sourceUrl` apuntando a la URL exacta donde se obtuvo. Resumen:

| Estudio | URL principal de tarifas |
|---|---|
| Pilates Zentro | https://www.pilateszentro.es/clases-de-pilates-en-madrid |
| Pinar Pilates | https://pinarpilates.com/precios/ |
| Élite Pilates | https://elitepilates.net/programas/ |
| Feel Fit Pilates Madrid | https://feelfitmadrid.com/horarios-y-precios/ |
| Pilates Evidence Madrid | https://www.pilatesevidence.com/centros/pilates-evidence-madrid/tarifas-pilates-evidence-madrid/ |
| HOM | https://www.hommadrid.com/precios |
| Centro Maná | https://centromana.es/pilates-chamberi/ |
| City Pilates | https://city-pilates.com/precios |
| Laghum Club Chamberí | https://laghumclub.com/centros/centro-pilates-maquinas-chamberi/ |
| Laghum Club Malasaña | https://laghumclub.com/centros/centro-pilates-maquinas-malasana/ |
| Aretē Pilates Estudio | https://estudioarete.com/precios/ |
| Full Pilates Madrid | https://chamartin.fullpilatesmadrid.es/#tarifas |
| Zenit Chamartín | https://zenitchamartin.com/pilates/ |
| Pilates Garbriele | https://pilatesgarbriele.com/precio-pilates-madrid/ |
| Nature Pilates | https://www.naturepilates.es/ |
| Olimpia | https://www.olimpiatwc.com/ |

---

## 5. Notas de calidad y cosas a revisar antes del lanzamiento

- **Pinar Pilates** está en CP 28006 (norte de Salamanca / borde con Chamartín-El Viso). En el JSON aparece en ambos `barrios: ["salamanca", "chamartin"]`. Revisar geo-mapeo final con criterio editorial.
- **Élite Pilates** sí está en Salamanca (CP 28001, Recoletos). Sus precios son significativamente más altos que la mediana (520€/mes 8 sesiones) porque es un servicio premium con sesiones individuales — no un estudio grupal estándar. En la UI considerar avisar "premium individual" para no sesgar la mediana del barrio.
- **HOM** publica sólo planes mixtos (mat + reformer combinados) sin opción individual de mat/reformer puro — refleja eso en el filtro de modalidad.
- **Olimpia** sólo publica drop-in y trial; las memberships mensuales no aparecen en su web. En el JSON `fromMonthly` es `null` y se muestra solo el precio drop-in. La UI debe manejar este caso gracilmente.
- **Aretē** está en CP 28015 (Universidad/Conde Duque). En el JSON aparece en `barrios: ["malasana", "conde-duque"]` con Malasaña como primario por proximidad y SEO.
- **Laghum Club** es una cadena con 2 ubicaciones en Madrid (Chamberí y Malasaña). Las tratamos como **dos fichas separadas** en la JSON para que cada una cubra su barrio en el sitemap y filtros.
- **Pilates Estudio** (CP 28022, Ciudad Lineal) tiene precios públicos pero está fuera de los barrios prioritarios. Excluido del V1 inicial pero revisitar cuando expandamos cobertura.

---

## 6. Proceso de actualización (post-lanzamiento)

Cada precio debe revisitarse cada 6 meses como mínimo (o antes si un estudio nos avisa de cambio). Procedimiento:

1. Visitar `sourceUrl` de cada precio.
2. Comparar el valor del JSON con el de la web. Si hay desviación, actualizar.
3. Actualizar `lastVerified` a la fecha de la revisión.
4. Si el estudio dejó de publicar precios → marcar `pricing.disclosed: false` y excluir de listados.
5. Si un estudio nuevo publica precios → añadir al JSON con sus respectivos `sourceUrl` y `lastVerified`.

Este proceso debería automatizarse parcialmente con un script en Fase 6+ que compare versiones (y avise de cambios cuando los hubiera).
