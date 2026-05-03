import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { getPrimaryBarrios, getSecondaryBarrios } from "@/lib/studios";

export function Footer() {
  const primary = getPrimaryBarrios();
  const secondary = getSecondaryBarrios();

  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-sage"
            >
              <LogoMark className="text-sage" size={26} />
              <span className="font-display text-3xl">Pilatia</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              El comparador honesto de pilates y barre en Madrid. Precios y
              horarios verificados estudio a estudio. Sin afiliaciones.
            </p>
            <a
              href="mailto:hola@pilatia.es"
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline-offset-4 hover:text-sage hover:underline"
            >
              hola@pilatia.es →
            </a>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-ink-soft">
              Por modalidad
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/pilates-madrid/" className="text-ink transition-colors hover:text-sage">
                  Pilates en Madrid
                </Link>
              </li>
              <li>
                <Link href="/barre-madrid/" className="text-ink transition-colors hover:text-sage">
                  Barre en Madrid
                </Link>
              </li>
              <li>
                <Link href="/reformer-pilates-madrid/" className="text-ink transition-colors hover:text-sage">
                  Reformer pilates Madrid
                </Link>
              </li>
              <li>
                <Link href="/precios/" className="text-ink transition-colors hover:text-sage">
                  Comparativa de precios
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="text-ink transition-colors hover:text-sage">
                  Blog · guías
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-ink-soft">
              Por barrio
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {primary.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/barrios/${b.slug}/`}
                    className="text-ink transition-colors hover:text-sage"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
              {secondary.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/barrios/${b.slug}/`}
                    className="text-ink-soft transition-colors hover:text-sage"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-xs uppercase tracking-[0.18em] text-ink-soft">
              Pilatia
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link
                  href="/metodologia/"
                  className="text-ink transition-colors hover:text-sage"
                >
                  Metodología
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre/"
                  className="text-ink transition-colors hover:text-sage"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hola@pilatia.es"
                  className="text-ink transition-colors hover:text-sage"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Pilatia · Compilado a mano con datos
            verificados.
          </span>
          <span>
            Última verificación de datos:{" "}
            <time className="text-ink" dateTime="2026-05-02">
              2 de mayo de 2026
            </time>
          </span>
        </div>
      </div>
    </footer>
  );
}
