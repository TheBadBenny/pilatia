import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OrganicShape } from "@/components/OrganicShape";
import { StudioCard } from "@/components/StudioCard";
import { StudioVisual } from "@/components/StudioVisual";
import { PriceTable } from "@/components/PriceTable";
import {
  formatPrice,
  fromMonthlyLabel,
  getAllStudios,
  getBarrioBySlug,
  getStudioBySlug,
  getStudiosByBarrio,
  modalityLabel,
  verticalLabel,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript, SITE_URL } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStudios().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = getStudioBySlug(slug);
  if (!studio) return {};
  const primaryBarrio = studio.barrios[0]
    ? getBarrioBySlug(studio.barrios[0])
    : undefined;
  const title = `${studio.name} · Pilates en ${primaryBarrio?.fullName ?? "Madrid"}`;
  const description = `${studio.description.slice(0, 150)} Mensualidad desde ${fromMonthlyLabel(studio)}. Datos verificados.`;
  return buildMetadata({
    title,
    description,
    path: `/estudios/${slug}/`,
  });
}

export default async function StudioPage({ params }: Props) {
  const { slug } = await params;
  const studio = getStudioBySlug(slug);
  if (!studio) notFound();
  const primaryBarrio = studio.barrios[0]
    ? getBarrioBySlug(studio.barrios[0])
    : undefined;
  const similar = studio.barrios[0]
    ? getStudiosByBarrio(studio.barrios[0])
        .filter((s) => s.slug !== studio.slug)
        .slice(0, 3)
    : [];

  const sportsLD = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: studio.name,
    description: studio.description,
    url: studio.contact.website,
    telephone: studio.contact.phone ?? undefined,
    email: studio.contact.email ?? undefined,
    address: studio.address.street
      ? {
          "@type": "PostalAddress",
          streetAddress: studio.address.street,
          postalCode: studio.address.postalCode ?? undefined,
          addressLocality: studio.address.city,
          addressCountry: "ES",
        }
      : undefined,
    geo: studio.coords
      ? {
          "@type": "GeoCoordinates",
          latitude: studio.coords.lat,
          longitude: studio.coords.lng,
        }
      : undefined,
    priceRange:
      studio.pricing.fromMonthly != null
        ? `€${studio.pricing.fromMonthly}–€${studio.pricing.monthlyPlans?.slice(-1)[0]?.price ?? studio.pricing.fromMonthly}/mes`
        : undefined,
    sport: "Pilates",
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      ...(primaryBarrio
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: primaryBarrio.name,
              item: `${SITE_URL}/barrios/${primaryBarrio.slug}/`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: primaryBarrio ? 3 : 2,
        name: studio.name,
        item: `${SITE_URL}/estudios/${slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(sportsLD)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)}
      />

      <article>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 pt-8 sm:pt-12">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">
              Inicio
            </Link>
            {primaryBarrio && (
              <>
                {" "}/{" "}
                <Link
                  href={`/barrios/${primaryBarrio.slug}/`}
                  className="hover:text-sage"
                >
                  {primaryBarrio.name}
                </Link>
              </>
            )}{" "}
            / <span className="text-ink">{studio.name}</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <div className="overflow-hidden rounded-2xl border border-line">
              <StudioVisual studio={studio} size="lg" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {studio.barrios.map((bSlug) => {
                  const b = getBarrioBySlug(bSlug);
                  return b ? (
                    <Link
                      key={bSlug}
                      href={`/barrios/${bSlug}/`}
                      className="rounded-full bg-sand px-3 py-1 text-xs text-ink-soft transition-colors hover:bg-sage hover:text-cream"
                    >
                      {b.name}
                    </Link>
                  ) : null;
                })}
                <span
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-ink-soft"
                  title={`Última verificación: ${studio.lastVerified}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                  Verificado{" "}
                  {new Date(studio.lastVerified).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {studio.name}
              </h1>
              <p className="mt-3 text-ink-soft">{studio.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Fact
                  label="Mensualidad desde"
                  value={fromMonthlyLabel(studio)}
                />
                <Fact
                  label="Tamaño máximo"
                  value={
                    studio.groupSize.max
                      ? `${studio.groupSize.max} pers.`
                      : "—"
                  }
                />
                <Fact
                  label="Modalidades"
                  value={studio.modalities
                    .slice(0, 3)
                    .map(modalityLabel)
                    .join(" · ")}
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={studio.contact.website}
                  target="_blank"
                  rel="nofollow noopener sponsored"
                  className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-cream transition-colors hover:bg-ink"
                >
                  Visitar web del estudio
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11L11 3M11 3H5M11 3v6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                {studio.contact.phone && (
                  <a
                    href={`tel:${studio.contact.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center rounded-full border border-line bg-cream px-6 py-3 text-ink transition-colors hover:border-sage"
                  >
                    {studio.contact.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Highlights + datos */}
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft">
                Destacado
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink">
                {studio.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sage"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft">
                Dirección
              </p>
              <p className="mt-3 text-sm text-ink">
                {studio.address.street ?? "Dirección no publicada"}
                {studio.address.street && studio.address.postalCode && ", "}
                {studio.address.postalCode ?? ""}
                {studio.address.city ? ` · ${studio.address.city}` : ""}
              </p>
              {studio.address.note && (
                <p className="mt-2 text-xs text-ink-soft">
                  {studio.address.note}
                </p>
              )}
              {studio.contact.email && (
                <p className="mt-3 text-sm">
                  <a
                    href={`mailto:${studio.contact.email}`}
                    className="text-ink underline hover:text-sage"
                  >
                    {studio.contact.email}
                  </a>
                </p>
              )}
              {studio.hours && (
                <p className="mt-3 text-sm text-ink-soft">
                  <span className="text-ink-soft">Horarios:</span> {studio.hours}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-line bg-cream p-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft">
                Verticales
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {studio.verticals.length > 0 ? (
                  studio.verticals.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-line bg-cream px-3 py-1 text-xs text-ink"
                    >
                      {verticalLabel(v)}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-ink-soft">
                    Clases generales para todos los niveles.
                  </span>
                )}
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-ink-soft">
                Idiomas
              </p>
              <p className="mt-1.5 text-sm text-ink">
                {studio.languages
                  .map((l) => (l === "es" ? "Español" : l === "en" ? "Inglés" : l))
                  .join(" · ")}
              </p>
              {studio.amenities.length > 0 && (
                <>
                  <p className="mt-4 text-xs uppercase tracking-wider text-ink-soft">
                    Amenities
                  </p>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    {studio.amenities.join(" · ")}
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Precios */}
        <section className="border-y border-line bg-sand/40">
          <div className="mx-auto max-w-4xl px-5 py-14">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Tarifas verificadas
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              Precios.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-soft">
              Cifras tomadas de la web oficial del estudio. Si has visto algo
              que no cuadra,{" "}
              <a
                href={`mailto:hola@pilatia.es?subject=Precio desactualizado en ${encodeURIComponent(studio.name)}`}
                className="underline hover:text-sage"
              >
                avísanos
              </a>
              .
            </p>
            <div className="mt-8">
              <PriceTable studio={studio} />
            </div>
          </div>
        </section>

        {/* Mapa decorativo */}
        {studio.coords && (
          <section className="mx-auto max-w-6xl px-5 py-12">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Ubicación aproximada
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink">
              {studio.address.street ?? primaryBarrio?.fullName ?? "Madrid"}
            </h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-sand">
              <div className="relative aspect-[16/7] sm:aspect-[16/6]">
                <div className="absolute inset-0 opacity-40">
                  <OrganicShape variant="sage" opacity={0.4} />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream shadow-[0_4px_18px_-4px_rgba(42,38,34,0.1)]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="var(--color-sage)"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="8" r="2.2" />
                    </svg>
                  </div>
                  <p className="mt-3 font-display text-lg text-ink">
                    {primaryBarrio?.fullName ?? studio.address.city}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {studio.coords.lat.toFixed(4)}, {studio.coords.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Mapa interactivo próximamente. Mientras, te dejamos las
              coordenadas aproximadas (precisión ~200 m).
            </p>
          </section>
        )}

        {/* Estudios similares */}
        {similar.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 pb-16">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Estudios similares
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Otros estudios en {primaryBarrio?.name ?? "el barrio"}.
            </h2>
            <div className="stagger-children mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((s) => (
                <StudioCard key={s.slug} studio={s} />
              ))}
            </div>
          </section>
        )}

        {/* CTA verification */}
        <section className="mx-auto max-w-4xl px-5 pb-20">
          <div className="rounded-2xl border border-line bg-sand/60 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Trazabilidad
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink">
              ¿Eres del estudio?
            </h3>
            <p className="mt-3 text-sm text-ink-soft">
              Si los precios o datos no cuadran con tu web actual, escríbenos a{" "}
              <a
                href="mailto:hola@pilatia.es"
                className="text-ink underline hover:text-sage"
              >
                hola@pilatia.es
              </a>
              {" "}y los actualizamos en menos de 48 horas. Lee la{" "}
              <Link
                href="/metodologia/"
                className="underline hover:text-sage"
              >
                metodología completa
              </Link>{" "}
              para entender cómo verificamos.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-cream p-4">
      <div className="text-[11px] uppercase tracking-wider text-ink-soft">
        {label}
      </div>
      <div className="mt-1 font-display text-lg text-ink">{value}</div>
    </div>
  );
}
