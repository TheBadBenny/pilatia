import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";
import { NearMe } from "@/components/NearMe";
import { WaitlistForm } from "@/components/WaitlistForm";
import { StudioCard } from "@/components/StudioCard";
import {
  formatPrice,
  getAllStudios,
  getPrimaryBarrios,
  priceStats,
} from "@/lib/studios";
import { buildMetadata, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Encuentra tu estudio de pilates y barre en Madrid",
  description:
    "Comparamos precios, horarios y modalidades de los estudios de pilates y barre de Madrid. Reformer, suelo, máquinas, barre. Datos verificados estudio a estudio. Sin afiliaciones.",
  path: "/",
});

export default function HomePage() {
  const studios = getAllStudios();
  const barrios = getPrimaryBarrios();
  const stats = priceStats();
  const featured = [...studios]
    .sort((a, b) => (a.pricing.fromMonthly ?? 1e9) - (b.pricing.fromMonthly ?? 1e9))
    .slice(0, 6);
  const studiosByBarrio = barrios.map((b) => ({
    barrio: b,
    count: studios.filter((s) => s.barrios.includes(b.slug)).length,
  }));

  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: featured.map((s, i) => ({
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-32 h-[520px] w-[520px] sm:h-[720px] sm:w-[720px]">
          <OrganicShape variant="sage" opacity={0.32} />
        </div>
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[380px] w-[380px]">
          <OrganicShape variant="rose" opacity={0.22} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pb-28 sm:pt-24">
          <p className="animate-fade-up text-xs uppercase tracking-[0.22em] text-ink-soft">
            Pilates y barre en Madrid
          </p>
          <h1
            className="animate-fade-up mt-4 max-w-4xl font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl md:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Encuentra tu estudio
            <br className="hidden sm:block" />
            <span className="text-sage">de pilates</span> y{" "}
            <span className="text-terra">barre</span> en Madrid.
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-xl text-lg text-ink-soft"
            style={{ animationDelay: "180ms" }}
          >
            Comparamos precios, horarios y modalidades de los mejores estudios
            de la ciudad: reformer, suelo, máquinas, barre. Datos verificados
            a mano. Sin afiliaciones.
          </p>
          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "260ms" }}
          >
            <Link
              href="/pilates-madrid/"
              className="inline-flex items-center rounded-full bg-sage px-6 py-3 text-cream transition-colors hover:bg-ink"
            >
              Pilates en Madrid
            </Link>
            <Link
              href="/barre-madrid/"
              className="inline-flex items-center rounded-full bg-terra px-6 py-3 text-cream transition-colors hover:bg-ink"
            >
              Barre en Madrid
            </Link>
            <Link
              href="#cerca-de-mi"
              className="inline-flex items-center rounded-full border border-line bg-cream/70 px-6 py-3 text-ink transition-colors hover:border-sage hover:text-sage"
            >
              Cerca de mí →
            </Link>
          </div>
          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 text-sm text-ink-soft"
            style={{ animationDelay: "340ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-sage" />
              {stats.count} estudios verificados
            </span>
            <span aria-hidden="true">·</span>
            <span>{barrios.length} barrios cubiertos</span>
            <span aria-hidden="true">·</span>
            <span>
              Desde {formatPrice(stats.min)} a {formatPrice(stats.max)}/mes
            </span>
          </div>
        </div>
      </section>

      {/* Cómo lo comparamos */}
      <section className="border-y border-line bg-sand/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Cómo lo comparamos
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
              Datos comprobados estudio a estudio.
            </h2>
          </div>
          <div className="stagger-children grid gap-6 md:grid-cols-3">
            <Pillar
              icon={<IconCheck />}
              title="Precios reales"
              text="Solo incluimos estudios cuyas tarifas están publicadas en su web oficial. Cada cifra lleva su fuente y fecha."
            />
            <Pillar
              icon={<IconCompass />}
              title="Sin afiliaciones"
              text="Ningún estudio nos paga por aparecer ni por aparecer mejor. Si descubres algo desactualizado, escríbenos."
            />
            <Pillar
              icon={<IconHeart />}
              title="Pensado para ti"
              text="Filtramos por barrio, modalidad, presupuesto y nivel para que encuentres el que encaja contigo."
            />
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            <Link href="/metodologia/" className="underline hover:text-sage">
              Lee la metodología completa →
            </Link>
          </p>
        </div>
      </section>

      {/* Cerca de mí */}
      <section id="cerca-de-mi" className="mx-auto max-w-6xl px-5 py-16">
        <NearMe />
      </section>

      {/* Barrios */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Por barrio
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Encuentra estudios cerca de ti.
            </h2>
          </div>
          <Link
            href="/precios/"
            className="hidden text-sm text-ink-soft underline hover:text-sage sm:inline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="stagger-children grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studiosByBarrio.map(({ barrio, count }) => (
            <Link
              key={barrio.slug}
              href={`/barrios/${barrio.slug}/`}
              className="lift-on-hover group rounded-2xl border border-line bg-cream p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xl text-ink transition-colors group-hover:text-sage">
                  {barrio.name}
                </span>
                <span className="text-xs text-ink-soft">
                  {count > 0
                    ? `${count} ${count === 1 ? "estudio" : "estudios"}`
                    : "Próximamente"}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-ink-soft">
                {barrio.intro.split(". ")[0]}.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Estudios destacados */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Mensualidad más asequible
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Empieza por aquí.
            </h2>
          </div>
          <Link
            href="/precios/"
            className="text-sm text-ink-soft underline hover:text-sage"
          >
            Ver los 16 →
          </Link>
        </div>
        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s) => (
            <StudioCard key={s.slug} studio={s} />
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <WaitlistForm />
      </section>
    </>
  );
}

function Pillar({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-cream p-6">
      <div className="text-sage">{icon}</div>
      <h3 className="mt-4 font-display text-xl text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{text}</p>
    </div>
  );
}

function IconCheck() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" />
      <path d="M10 16.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" />
      <path d="M21 11l-3 7-7 3 3-7 7-3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path
        d="M16 26s-9-5.5-9-12a5 5 0 019-3 5 5 0 019 3c0 6.5-9 12-9 12z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
