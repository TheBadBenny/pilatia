import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";
import { StudioCard } from "@/components/StudioCard";
import {
  formatPrice,
  fromMonthlyLabel,
  getAllStudios,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reformer pilates en Madrid: estudios y precios verificados",
  description:
    "Comparamos los estudios de reformer pilates en Madrid: precios reales, ubicaciones, tamaño de grupo y horarios. De 65€/mes a 745€/mes. Datos verificados.",
  path: "/reformer-pilates-madrid/",
});

export default function ReformerMadridPage() {
  const studios = getAllStudios().filter((s) =>
    s.modalities.includes("reformer")
  );
  const sortedByPrice = [...studios]
    .filter((s) => s.pricing.fromMonthly != null)
    .sort((a, b) => a.pricing.fromMonthly! - b.pricing.fromMonthly!);
  const cheapest = sortedByPrice[0];
  const hasDropIn = studios.filter((s) => s.pricing.dropIn).length;

  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Estudios de reformer pilates en Madrid",
    itemListElement: studios.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/estudios/${s.slug}/`,
      name: s.name,
    })),
  };

  const faqItems = [
    {
      q: "¿Qué es el reformer pilates?",
      a: "El reformer es la máquina más reconocible del método Pilates: una camilla deslizante con muelles de tensión ajustable, una barra para los pies y correas. Permite trabajar con resistencia variable en cientos de ejercicios distintos, mejorando fuerza, control postural y movilidad sin impacto.",
    },
    {
      q: "¿Cuánto cuesta una clase de reformer pilates en Madrid?",
      a: cheapest
        ? `Las mensualidades de reformer en Madrid arrancan en ${fromMonthlyLabel(cheapest)} (${cheapest.name}, 1 clase semanal en grupo) y suben hasta 200€+/mes para 4 clases semanales. Las clases sueltas suelen costar 25-35€. Las privadas individuales 45-75€ por sesión.`
        : "Mensualidades habituales: 65-180€/mes en grupo según frecuencia.",
    },
    {
      q: "¿Cuál es el estudio de reformer más asequible en Madrid?",
      a: cheapest
        ? `${cheapest.name}, con mensualidad desde ${fromMonthlyLabel(cheapest)}. Datos verificados en su web oficial el ${new Date(cheapest.lastVerified).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}.`
        : "Próximamente publicamos comparativa.",
    },
    {
      q: "¿Hay drop-in (clase suelta) de reformer pilates en Madrid?",
      a: `Sí, ${hasDropIn} de los estudios verificados ofrecen clases sueltas (drop-in) entre 25 y 35€. Es la mejor manera de probar antes de comprometerte a una mensualidad.`,
    },
    {
      q: "¿Hay reformer cerca de mí en Madrid?",
      a: "Tenemos reformer cubierto en Salamanca, Chamberí, Malasaña, Chamartín, Retiro, Centro, Chueca y Moncloa. La home de Pilatia tiene un buscador por ubicación que te muestra los más cercanos a ti.",
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
      { "@type": "ListItem", position: 2, name: "Pilates Madrid", item: `${SITE_URL}/pilates-madrid/` },
      { "@type": "ListItem", position: 3, name: "Reformer pilates Madrid", item: `${SITE_URL}/reformer-pilates-madrid/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(itemListLD)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqLD)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)} />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-32 h-[480px] w-[480px]">
          <OrganicShape variant="sage" opacity={0.25} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:pt-16">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">Inicio</Link> /{" "}
            <Link href="/pilates-madrid/" className="hover:text-sage">Pilates Madrid</Link> /{" "}
            <span className="text-ink">Reformer</span>
          </nav>
          <p className="animate-fade-up mt-3 text-xs uppercase tracking-[0.22em] text-ink-soft">
            {studios.length} estudios verificados con reformer
          </p>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Reformer pilates en <span className="text-sage">Madrid</span>.
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-lg text-ink-soft"
            style={{ animationDelay: "100ms" }}
          >
            Estudios con máquinas reformer comparados con precios públicos.
            Mensualidades desde{" "}
            <strong className="text-ink">
              {cheapest ? formatPrice(cheapest.pricing.fromMonthly!) : "—"}/mes
            </strong>{" "}
            (1 clase/semana en grupo). Drop-in disponible en {hasDropIn} estudios.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Ordenados por precio · más asequibles arriba
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Los {sortedByPrice.length} estudios con reformer y precio público.
          </h2>
        </div>
        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedByPrice.map((s) => (
            <StudioCard key={s.slug} studio={s} />
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-sand/40">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Preguntas frecuentes
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            Reformer pilates en Madrid.
          </h2>
          <div className="mt-8 divide-y divide-line">
            {faqItems.map((item, i) => (
              <details key={i} className="group py-5" open={i === 0}>
                <summary className="flex cursor-pointer items-start justify-between gap-4 text-ink">
                  <span className="font-display text-lg sm:text-xl">{item.q}</span>
                  <span className="mt-1.5 shrink-0 text-ink-soft transition-transform group-open:rotate-45">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M8 3v10M3 8h10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-ink-soft">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
