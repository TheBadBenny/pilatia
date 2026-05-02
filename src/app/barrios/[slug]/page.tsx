import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OrganicShape } from "@/components/OrganicShape";
import { StudioCard } from "@/components/StudioCard";
import {
  formatPrice,
  fromMonthlyLabel,
  getAllBarrios,
  getBarrioBySlug,
  getStudiosByBarrio,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript, SITE_URL } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBarrios().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const barrio = getBarrioBySlug(slug);
  if (!barrio) return {};
  const studios = getStudiosByBarrio(slug);
  const title =
    studios.length > 0
      ? `Pilates en ${barrio.fullName} (Madrid): ${studios.length} ${studios.length === 1 ? "estudio comparado" : "estudios comparados"}`
      : `Pilates en ${barrio.fullName} (Madrid)`;
  const description =
    studios.length > 0
      ? `Compara los ${studios.length} estudios de pilates en ${barrio.fullName} con precios reales, horarios y modalidades. Datos verificados estudio a estudio.`
      : `Estamos completando la cobertura de ${barrio.fullName}. Mientras, mira los estudios cercanos en barrios vecinos.`;
  return buildMetadata({
    title,
    description,
    path: `/barrios/${slug}/`,
  });
}

export default async function BarrioPage({ params }: Props) {
  const { slug } = await params;
  const barrio = getBarrioBySlug(slug);
  if (!barrio) notFound();
  const studios = getStudiosByBarrio(slug);
  const allBarrios = getAllBarrios();
  const neighbors = barrio.neighbors
    .map((nslug) => allBarrios.find((b) => b.slug === nslug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const cheapestInBarrio = [...studios]
    .filter((s) => s.pricing.fromMonthly != null)
    .sort((a, b) => a.pricing.fromMonthly! - b.pricing.fromMonthly!)[0];

  const reformerStudios = studios.filter((s) =>
    s.modalities.includes("reformer")
  );

  const faqItems = [
    {
      q: `¿Cuánto cuesta una clase de pilates en ${barrio.fullName}?`,
      a: cheapestInBarrio
        ? `En ${barrio.fullName} hemos verificado mensualidades desde ${fromMonthlyLabel(cheapestInBarrio)} (${cheapestInBarrio.name}, 1 clase semanal). El precio sube con la frecuencia y la modalidad: las clases de máquinas (reformer) suelen costar 30-50% más que las de suelo.`
        : `Aún no hemos verificado precios en ${barrio.fullName}. Mira los estudios en barrios vecinos para tener una referencia.`,
    },
    {
      q: `¿Cuál es el estudio de pilates más asequible en ${barrio.fullName}?`,
      a: cheapestInBarrio
        ? `${cheapestInBarrio.name}, con mensualidad desde ${fromMonthlyLabel(cheapestInBarrio)}. Datos verificados según su web oficial el ${new Date(cheapestInBarrio.lastVerified).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}.`
        : `Estamos compilando datos. Mientras, te recomendamos mirar barrios vecinos.`,
    },
    {
      q: `¿Hay estudios con reformer en ${barrio.fullName}?`,
      a:
        reformerStudios.length > 0
          ? `Sí, hemos verificado ${reformerStudios.length} ${reformerStudios.length === 1 ? "estudio" : "estudios"} con reformer en ${barrio.fullName}: ${reformerStudios.slice(0, 3).map((s) => s.name).join(", ")}.`
          : `No tenemos verificados estudios con reformer en ${barrio.fullName} de momento. Mira barrios cercanos donde sí hay disponibilidad.`,
    },
    {
      q: `¿Cómo elijo entre los estudios de ${barrio.fullName}?`,
      a: `Filtra por presupuesto y por modalidad (reformer, suelo, barre). Mira el tamaño máximo de grupo: 4-5 personas implica más atención individual. Comprueba si hay clase de prueba gratuita o de pago — varios estudios en Madrid la ofrecen gratis para nuevos clientes.`,
    },
    {
      q: `¿Dónde hay otros estudios cerca de ${barrio.fullName}?`,
      a: `${barrio.fullName} limita con ${neighbors.map((n) => n.name).join(", ")}. Si no encuentras lo que buscas aquí, esos barrios suelen estar a menos de 15 minutos andando o 1 parada de metro.`,
    },
  ];

  const faqLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Barrios", item: `${SITE_URL}/precios/` },
      {
        "@type": "ListItem",
        position: 3,
        name: barrio.name,
        item: `${SITE_URL}/barrios/${slug}/`,
      },
    ],
  };

  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Estudios de pilates en ${barrio.fullName}`,
    itemListElement: studios.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/estudios/${s.slug}/`,
      name: s.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLD)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)}
      />
      {studios.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(itemListLD)}
        />
      )}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-12 -right-20 h-[420px] w-[420px]">
          <OrganicShape variant="sage" opacity={0.22} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:pt-16">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/precios/" className="hover:text-sage">
              Barrios
            </Link>{" "}
            / <span className="text-ink">{barrio.name}</span>
          </nav>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Pilates en {barrio.fullName}.
          </h1>
          <p
            className="animate-fade-up mt-3 text-lg text-ink-soft"
            style={{ animationDelay: "80ms" }}
          >
            {studios.length > 0
              ? `${studios.length} ${studios.length === 1 ? "estudio comparado" : "estudios comparados"} con datos verificados`
              : "Estamos compilando datos verificados de este barrio."}
            {cheapestInBarrio && (
              <>
                {" "}· desde{" "}
                <strong className="text-ink">
                  {formatPrice(cheapestInBarrio.pricing.fromMonthly!)}/mes
                </strong>
              </>
            )}
          </p>
        </div>
      </section>

      {/* Intro del barrio */}
      <section className="mx-auto max-w-3xl px-5 pb-12">
        <div className="animate-fade-up rounded-2xl border border-line bg-cream p-6 sm:p-8">
          <p className="text-base text-ink-soft sm:text-lg">{barrio.intro}</p>
          {barrio.disambiguationNote && (
            <p className="mt-4 rounded-lg border border-line bg-sand/60 p-4 text-sm text-ink-soft">
              <strong className="text-ink">Nota:</strong>{" "}
              {barrio.disambiguationNote}
            </p>
          )}
        </div>
      </section>

      {/* Estudios */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        {studios.length > 0 ? (
          <>
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                Estudios verificados
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink">
                {studios.length === 1
                  ? "El estudio que tenemos verificado"
                  : `Los ${studios.length} estudios verificados`}{" "}
                en {barrio.name}.
              </h2>
            </div>
            <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {studios.map((s) => (
                <StudioCard key={s.slug} studio={s} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-line bg-cream p-8 sm:p-12">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Aún no tenemos estudios verificados aquí.
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Solo incluimos estudios cuyos precios están publicados en su web
              oficial. Estamos compilando los datos de {barrio.fullName} y
              esperamos cubrirlo pronto. Mientras, te dejamos los barrios
              cercanos:
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {neighbors.map((n) => (
                <Link
                  key={n.slug}
                  href={`/barrios/${n.slug}/`}
                  className="rounded-full border border-line bg-cream px-4 py-2 text-sm text-ink transition-colors hover:border-sage hover:text-sage"
                >
                  {n.name} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-sand/40">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Preguntas frecuentes
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            Pilates en {barrio.name}: lo que más nos preguntan.
          </h2>
          <div className="mt-8 divide-y divide-line">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group py-5"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-ink">
                  <span className="font-display text-lg sm:text-xl">
                    {item.q}
                  </span>
                  <span className="mt-1.5 shrink-0 text-ink-soft transition-transform group-open:rotate-45">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path
                        d="M8 3v10M3 8h10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Barrios vecinos */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
          Cerca de {barrio.name}
        </p>
        <h2 className="mt-2 font-display text-3xl text-ink">
          Barrios vecinos.
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {neighbors.map((n) => (
            <Link
              key={n.slug}
              href={`/barrios/${n.slug}/`}
              className="lift-on-hover rounded-2xl border border-line bg-cream px-5 py-4"
            >
              <div className="font-display text-lg text-ink">{n.name}</div>
              <div className="mt-1 text-xs text-ink-soft">
                {getStudiosByBarrio(n.slug).length}{" "}
                {getStudiosByBarrio(n.slug).length === 1
                  ? "estudio"
                  : "estudios"}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
