import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";
import { StudioCard } from "@/components/StudioCard";
import {
  formatPrice,
  fromMonthlyLabel,
  getAllStudios,
  getPrimaryBarrios,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Barre en Madrid: estudios comparados con precios reales",
  description:
    "Comparativa real de estudios de barre en Madrid: precios, ubicaciones y horarios verificados. Casa Barré, Boutique Barre, esBarré, Barrelatte y más. Sin afiliaciones.",
  path: "/barre-madrid/",
});

export default function BarreMadridPage() {
  const studios = getAllStudios().filter((s) => s.modalities.includes("barre"));
  const barrios = getPrimaryBarrios();
  const sortedByPrice = [...studios].sort(
    (a, b) =>
      (a.pricing.fromMonthly ?? Infinity) - (b.pricing.fromMonthly ?? Infinity)
  );
  const cheapest = sortedByPrice.find((s) => s.pricing.fromMonthly != null);

  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Estudios de barre en Madrid",
    itemListElement: studios.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/estudios/${s.slug}/`,
      name: s.name,
    })),
  };

  const faqItems = [
    {
      q: "¿Qué es el barre y en qué se diferencia del pilates?",
      a: "El barre es una disciplina que mezcla técnica de ballet (con barra), ejercicios de fuerza inspirados en pilates y trabajo cardiovascular en pulsos cortos. A diferencia del pilates, suele incluir más cardio y trabajo de tonificación con repeticiones rápidas. Comparte con el pilates el énfasis en el control y el trabajo del core.",
    },
    {
      q: "¿Cuánto cuesta una clase de barre en Madrid?",
      a: cheapest
        ? `Una clase suelta de barre en Madrid suele costar entre 22 y 25€. Las membresías mensuales arrancan desde ${fromMonthlyLabel(cheapest)} (${cheapest.name}) en planes de pocas clases al mes y suben hasta 145-155€/mes para acceso ilimitado.`
        : "Las membresías mensuales suelen ir de 64€ a 155€ según frecuencia y estudio.",
    },
    {
      q: "¿Hay clases de barre para hombres en Madrid?",
      a: "Sí, la mayoría de los estudios admiten todos los géneros. Algunos como esBarré son específicos para mujeres; otros como Casa Barré, Boutique Barre, Barrelatte o GONG aceptan público mixto. En la ficha de cada estudio lo indicamos cuando aplica.",
    },
    {
      q: "¿Cuál es el estudio de barre más barato de Madrid?",
      a: cheapest
        ? `${cheapest.name} con mensualidad desde ${fromMonthlyLabel(cheapest)}. Datos verificados en su web oficial el ${new Date(cheapest.lastVerified).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}.`
        : "Próximamente publicaremos comparativa por precio.",
    },
    {
      q: "¿Qué barrios de Madrid tienen más estudios de barre?",
      a: `Salamanca y Chamberí concentran la mayoría de los estudios de barre verificados (Casa Barré ×2, Boutique Barre, esBarré ×2, Barrelatte, GONG). Chamartín y Retiro tienen una opción cada uno.`,
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
      { "@type": "ListItem", position: 2, name: "Barre Madrid", item: `${SITE_URL}/barre-madrid/` },
    ],
  };

  // Studios grouped by barrio for cross-linking
  const byBarrio: Record<string, number> = {};
  for (const s of studios) {
    for (const b of s.barrios) byBarrio[b] = (byBarrio[b] ?? 0) + 1;
  }
  const barriosWithBarre = barrios
    .filter((b) => byBarrio[b.slug])
    .map((b) => ({ ...b, count: byBarrio[b.slug] }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(itemListLD)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLD)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)}
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-[520px] w-[520px]">
          <OrganicShape variant="terra" opacity={0.22} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:pt-16">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">Inicio</Link> /{" "}
            <span className="text-ink">Barre en Madrid</span>
          </nav>
          <p className="animate-fade-up mt-3 text-xs uppercase tracking-[0.22em] text-ink-soft">
            {studios.length} estudios verificados
          </p>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Barre en <span className="text-terra">Madrid</span>.
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-lg text-ink-soft"
            style={{ animationDelay: "100ms" }}
          >
            La comparativa real de los {studios.length} estudios de barre con
            precios públicos en Madrid. Membresías desde{" "}
            <strong className="text-ink">
              {cheapest ? formatPrice(cheapest.pricing.fromMonthly!) : "—"}/mes
            </strong>{" "}
            hasta 155€/mes ilimitado.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-12">
        <div className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink">¿Qué es el barre?</h2>
          <p className="mt-3 text-ink-soft">
            El barre es una disciplina que combina técnica de ballet (con
            barra), ejercicios de fuerza inspirados en pilates y trabajo
            cardiovascular en pulsos cortos. Las clases duran 50-60 minutos y se
            adaptan a todos los niveles. Aporta tonificación, postura,
            flexibilidad y resistencia sin impacto en las articulaciones.
          </p>
          <p className="mt-3 text-ink-soft">
            En Madrid el barre se ha consolidado en los últimos 5-6 años, con
            estudios boutique en Salamanca, Chamberí y Chamartín. Algunos como{" "}
            <Link
              href="/estudios/casa-barre-ayala/"
              className="text-ink underline hover:text-sage"
            >
              Casa Barré
            </Link>{" "}
            o{" "}
            <Link
              href="/estudios/boutique-barre-madrid/"
              className="text-ink underline hover:text-sage"
            >
              Boutique Barre
            </Link>{" "}
            son referencias del nicho. Otros como{" "}
            <Link
              href="/estudios/barrelatte/"
              className="text-ink underline hover:text-sage"
            >
              Barrelatte
            </Link>{" "}
            (inaugurado en 2024) o{" "}
            <Link
              href="/estudios/esbarre-lopez-de-hoyos/"
              className="text-ink underline hover:text-sage"
            >
              esBarré
            </Link>{" "}
            son aperturas recientes que están redefiniendo la categoría.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Ordenados por precio · más asequibles arriba
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Los {studios.length} estudios de barre verificados.
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
            Barre en Madrid: lo que la gente nos pregunta.
          </h2>
          <div className="mt-8 divide-y divide-line">
            {faqItems.map((item, i) => (
              <details key={i} className="group py-5" open={i === 0}>
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

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
          Por barrio
        </p>
        <h2 className="mt-2 font-display text-3xl text-ink">
          Barre por barrios de Madrid.
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {barriosWithBarre.map((b) => (
            <Link
              key={b.slug}
              href={`/barrios/${b.slug}/`}
              className="lift-on-hover rounded-2xl border border-line bg-cream px-5 py-4"
            >
              <div className="font-display text-lg text-ink">{b.name}</div>
              <div className="mt-1 text-xs text-ink-soft">
                {b.count} {b.count === 1 ? "estudio" : "estudios"} de barre
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-soft">
          ¿Buscas pilates clásico?{" "}
          <Link href="/pilates-madrid/" className="underline hover:text-sage">
            Mira la comparativa de pilates en Madrid →
          </Link>
        </p>
      </section>
    </>
  );
}
