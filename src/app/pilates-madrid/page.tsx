import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";
import { StudioCard } from "@/components/StudioCard";
import { Illustration } from "@/components/Illustration";
import {
  formatPrice,
  getAllStudios,
  getPrimaryBarrios,
  priceStats,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pilates en Madrid: comparador de estudios con precios reales",
  description:
    "Compara los mejores estudios de pilates en Madrid: precios, modalidades (reformer, suelo, máquinas), barrios y horarios. Datos verificados estudio a estudio. Sin afiliaciones.",
  path: "/pilates-madrid/",
});

export default function PilatesMadridPage() {
  const studios = getAllStudios();
  const stats = priceStats();
  const reformer = studios.filter((s) => s.modalities.includes("reformer"));
  const mat = studios.filter((s) => s.modalities.includes("mat"));
  const barre = studios.filter((s) => s.modalities.includes("barre"));
  const sortedByPrice = [...studios]
    .filter((s) => s.pricing.fromMonthly != null)
    .sort((a, b) => a.pricing.fromMonthly! - b.pricing.fromMonthly!);
  const top = sortedByPrice.slice(0, 12);
  const barrios = getPrimaryBarrios();

  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Estudios de pilates en Madrid",
    itemListElement: studios.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/estudios/${s.slug}/`,
      name: s.name,
    })),
  };

  const faqItems = [
    {
      q: "¿Cuánto cuesta el pilates en Madrid en 2026?",
      a: `Las mensualidades de pilates en Madrid van desde ${formatPrice(stats.min)} (1 clase semanal de máquinas o suelo) hasta ${formatPrice(stats.max)} (programas privados premium). La mediana entre los ${stats.count} estudios verificados es ${formatPrice(stats.median)}/mes. Las clases sueltas suelen ir de 24€ a 35€.`,
    },
    {
      q: "¿Pilates suelo o máquinas: cuál es mejor?",
      a: "Depende de tu objetivo. El pilates suelo (mat) es el clásico Joseph Pilates, perfecto para iniciarte y trabajar control corporal con tu propio peso. El pilates máquinas (reformer, cadillac, silla) usa resistencia ajustable que permite progresar más rápido en fuerza y rehabilitación. La mayoría de estudios ofrecen ambos.",
    },
    {
      q: "¿Cuántos estudios de pilates hay en Madrid?",
      a: `En esta comparativa tenemos ${studios.length} estudios verificados con precios públicos en su web oficial. ${reformer.length} ofrecen reformer, ${mat.length} ofrecen suelo y ${barre.length} ofrecen también barre.`,
    },
    {
      q: "¿Qué barrio de Madrid concentra más estudios de pilates?",
      a: "Salamanca con diferencia, seguido de Chamberí. Ambos barrios concentran la mayoría de la oferta boutique. Chamartín, Centro y Retiro completan el cinturón principal. Malasaña y Conde Duque tienen una oferta más reducida pero con identidad propia.",
    },
    {
      q: "¿Hay pilates barato en Madrid?",
      a: `Sí: hay opciones desde ${formatPrice(stats.min)}/mes para 1 clase semanal de pilates suelo. Las clases de máquinas en grupos arrancan en torno a 65-75€/mes. Para clases individuales privadas, los precios suben significativamente (45-75€ por sesión, hasta 745€/mes en programas premium).`,
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
    ],
  };

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
          <OrganicShape variant="sage" opacity={0.28} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:pt-16">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">Inicio</Link> /{" "}
            <span className="text-ink">Pilates Madrid</span>
          </nav>
          <p className="animate-fade-up mt-3 text-xs uppercase tracking-[0.22em] text-ink-soft">
            {studios.length} estudios comparados · {reformer.length} con reformer
          </p>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-6xl md:text-7xl">
            Pilates en <span className="text-sage">Madrid</span>.
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-lg text-ink-soft"
            style={{ animationDelay: "100ms" }}
          >
            La comparativa real y verificada de pilates en Madrid. Mensualidades
            desde <strong className="text-ink">{formatPrice(stats.min)}</strong>{" "}
            hasta <strong className="text-ink">{formatPrice(stats.max)}</strong>
            /mes, mediana de{" "}
            <strong className="text-ink">{formatPrice(stats.median)}</strong>.
            Sin afiliaciones.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat title="Reformer / máquinas" value={String(reformer.length)} sub="estudios verificados" />
          <Stat title="Pilates suelo (mat)" value={String(mat.length)} sub="estudios verificados" />
          <Stat title="Barre" value={String(barre.length)} sub="estudios verificados" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Las 3 modalidades en Madrid
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            En qué se diferencian.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <ModalityCard
            illustration={<Illustration variant="reformer" />}
            title="Reformer · máquinas"
            range="65 € – 200 €+/mes"
            text="La camilla deslizante con muelles de resistencia ajustable. Permite progresar rápido en fuerza y rehabilitación. Cuesta 30-50 % más que el suelo."
            link="/reformer-pilates-madrid/"
            linkLabel="Ver estudios con reformer →"
          />
          <ModalityCard
            illustration={<Illustration variant="mat" />}
            title="Suelo · mat"
            range="55 € – 90 €/mes"
            text="El clásico Joseph Pilates sobre esterilla. Trabajas con tu peso corporal y accesorios mínimos (pelota, banda, círculo). Es la base del método."
            link="/precios/"
            linkLabel="Estudios con pilates suelo →"
          />
          <ModalityCard
            illustration={<Illustration variant="barre" />}
            title="Barre"
            range="64 € – 155 €/mes"
            text="Mezcla técnica de ballet (con barra), ejercicios de fuerza y trabajo cardio en pulsos cortos. Tonificación y postura sin impacto."
            link="/barre-madrid/"
            linkLabel="Ver estudios de barre →"
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-12">
        <div className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink">
            ¿Cómo elegir entre pilates suelo y máquinas en Madrid?
          </h2>
          <p className="mt-3 text-ink-soft">
            En Madrid casi todos los estudios ofrecen ambas modalidades, pero
            con tarifas distintas. El{" "}
            <strong className="text-ink">pilates suelo</strong> (mat) trabaja
            con tu peso corporal y accesorios mínimos: es la base del método y
            cuesta entre 55-90€/mes para 1-2 clases semanales. El{" "}
            <strong className="text-ink">pilates máquinas</strong> (reformer,
            cadillac, silla) usa resistencia ajustable y cuesta entre 65-180€/mes
            según frecuencia. Para principiantes recomendamos empezar con suelo
            o con un estudio que combine ambas; para rehabilitación, las
            máquinas son más versátiles.
          </p>
          <p className="mt-3 text-ink-soft">
            ¿Buscas barre?{" "}
            <Link href="/barre-madrid/" className="text-ink underline hover:text-sage">
              Mira la comparativa de barre en Madrid →
            </Link>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Top 12 por mensualidad más asequible
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Los más asequibles primero.
          </h2>
        </div>
        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((s) => (
            <StudioCard key={s.slug} studio={s} />
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-soft">
          <Link href="/precios/" className="underline hover:text-sage">
            Ver los {studios.length} estudios con filtros →
          </Link>
        </p>
      </section>

      <section className="border-t border-line bg-sand/40">
        <div className="mx-auto max-w-3xl px-5 py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Preguntas frecuentes
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            Pilates en Madrid: lo que más nos preguntan.
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
          Pilates por barrio
        </p>
        <h2 className="mt-2 font-display text-3xl text-ink">
          Encuentra estudios en tu barrio.
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {barrios.map((b) => {
            const count = studios.filter((s) => s.barrios.includes(b.slug)).length;
            return (
              <Link
                key={b.slug}
                href={`/barrios/${b.slug}/`}
                className="lift-on-hover rounded-2xl border border-line bg-cream px-5 py-4"
              >
                <div className="font-display text-lg text-ink">{b.name}</div>
                <div className="mt-1 text-xs text-ink-soft">
                  {count > 0 ? `${count} ${count === 1 ? "estudio" : "estudios"}` : "Próximamente"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Stat({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-5">
      <div className="text-xs uppercase tracking-wider text-ink-soft">
        {title}
      </div>
      <div className="mt-2 font-display text-3xl text-ink">{value}</div>
      <div className="mt-1 text-xs text-ink-soft">{sub}</div>
    </div>
  );
}

function ModalityCard({
  illustration,
  title,
  range,
  text,
  link,
  linkLabel,
}: {
  illustration: React.ReactNode;
  title: string;
  range: string;
  text: string;
  link: string;
  linkLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-cream">
      {illustration}
      <div className="p-5">
        <h3 className="font-display text-xl text-ink">{title}</h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
          {range}
        </p>
        <p className="mt-3 text-sm text-ink-soft">{text}</p>
        <Link
          href={link}
          className="mt-4 inline-flex text-sm text-ink underline-offset-4 hover:text-sage hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}
