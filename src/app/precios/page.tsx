import Link from "next/link";
import { FilterBar } from "@/components/FilterBar";
import {
  formatPrice,
  getAllStudios,
  getPrimaryBarrios,
  priceStats,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Precios de pilates en Madrid · Comparativa de 16 estudios",
  description:
    "Comparativa real de precios de pilates en Madrid: mensualidades desde 52€ hasta 520€/mes según frecuencia y modalidad. Datos verificados estudio a estudio.",
  path: "/precios/",
});

export default function PreciosPage() {
  const studios = getAllStudios();
  const barrios = getPrimaryBarrios();
  const stats = priceStats();

  const cheapest = [...studios]
    .filter((s) => s.pricing.fromMonthly != null)
    .sort((a, b) => a.pricing.fromMonthly! - b.pricing.fromMonthly!)[0];

  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Precios de estudios de pilates en Madrid",
    itemListElement: studios.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://pilatia.es/estudios/${s.slug}/`,
      name: s.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(itemListLD)}
      />
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:pt-16">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">
              Inicio
            </Link>{" "}
            / <span className="text-ink">Precios</span>
          </nav>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Precios de pilates en Madrid.
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-lg text-ink-soft"
            style={{ animationDelay: "100ms" }}
          >
            Comparativa real de los {stats.count} estudios cuyos precios están
            publicados en su web oficial. Mensualidades desde{" "}
            <strong className="text-ink">{formatPrice(stats.min)}</strong> hasta{" "}
            <strong className="text-ink">{formatPrice(stats.max)}</strong>/mes,
            mediana de <strong className="text-ink">{formatPrice(stats.median)}</strong>.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat title="Más barato" value={cheapest ? cheapest.name : "—"} sub={cheapest ? `${formatPrice(cheapest.pricing.fromMonthly!)}/mes` : ""} />
          <Stat title="Mediana mensual" value={formatPrice(stats.median)} sub="todos los planes de inicio" />
          <Stat title="Total verificados" value={String(stats.count)} sub="con precios públicos" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <FilterBar studios={studios} barrios={barrios} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-2xl border border-line bg-sand/60 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Cómo leer estos precios
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">
            Lo que tiene que saber antes de elegir.
          </h3>
          <ul className="mt-5 grid gap-4 text-sm text-ink-soft sm:grid-cols-2">
            <li>
              <strong className="text-ink">El precio “desde” es 1 clase semanal.</strong> Casi
              todos los estudios tienen escalado por frecuencia: el precio por
              sesión baja cuanto más asistes.
            </li>
            <li>
              <strong className="text-ink">Suelo y máquinas son distintos.</strong> Las clases
              de máquinas (reformer / cadillac) suelen costar 30-50% más que
              las de suelo.
            </li>
            <li>
              <strong className="text-ink">Cuidado con la matrícula.</strong> Algunas cadenas
              cobran matrícula de inicio (Laghum: 39,99 €). Lo destacamos en la
              ficha del estudio.
            </li>
            <li>
              <strong className="text-ink">Privadas vs grupos.</strong> Las clases privadas
              cuestan entre 45-75 €. Los programas individuales premium (Élite
              Pilates) llegan a 520-745 €/mes.
            </li>
          </ul>
          <p className="mt-5 text-xs text-ink-soft">
            <Link href="/metodologia/" className="underline hover:text-sage">
              Cómo verificamos cada precio →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function Stat({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-5">
      <div className="text-xs uppercase tracking-wider text-ink-soft">
        {title}
      </div>
      <div className="mt-2 font-display text-2xl text-ink">{value}</div>
      <div className="mt-1 text-xs text-ink-soft">{sub}</div>
    </div>
  );
}
