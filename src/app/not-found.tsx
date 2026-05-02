import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";

export const metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe.",
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-32 h-[480px] w-[480px]">
        <OrganicShape variant="sage" opacity={0.22} />
      </div>
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-[360px] w-[360px]">
        <OrganicShape variant="rose" opacity={0.18} />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 py-24 sm:py-32">
        <p className="animate-fade-up text-xs uppercase tracking-[0.22em] text-ink-soft">
          404
        </p>
        <h1 className="animate-fade-up mt-3 font-display text-4xl leading-tight text-ink sm:text-6xl">
          Esta página no existe.
        </h1>
        <p
          className="animate-fade-up mt-5 max-w-xl text-lg text-ink-soft"
          style={{ animationDelay: "100ms" }}
        >
          Quizás el enlace está roto o la página la quitamos. Probablemente
          encontrarás lo que buscas en alguno de estos sitios:
        </p>
        <div
          className="animate-fade-up mt-9 flex flex-wrap gap-3"
          style={{ animationDelay: "200ms" }}
        >
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-sage px-6 py-3 text-cream transition-colors hover:bg-ink"
          >
            Inicio
          </Link>
          <Link
            href="/precios/"
            className="inline-flex items-center rounded-full border border-line bg-cream/70 px-6 py-3 text-ink transition-colors hover:border-sage hover:text-sage"
          >
            Comparar estudios
          </Link>
          <Link
            href="/metodologia/"
            className="inline-flex items-center rounded-full border border-line bg-cream/70 px-6 py-3 text-ink transition-colors hover:border-sage hover:text-sage"
          >
            Cómo trabajamos
          </Link>
        </div>
      </div>
    </section>
  );
}
