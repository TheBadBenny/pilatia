"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoMark } from "./LogoMark";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-cream shadow-[0_2px_10px_-3px_rgba(42,38,34,0.25)] transition-transform active:scale-95"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M4 7h16M4 12h16M4 17h16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm">Menú</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-50 flex animate-fade-in flex-col bg-cream"
        >
          {/* Top bar — same look as header */}
          <div className="border-b border-line bg-cream/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="group flex items-center gap-2 text-ink"
              >
                <LogoMark className="text-sage" />
                <span className="font-display text-2xl">Pilatia</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream text-ink transition-colors hover:border-sage"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <nav className="flex-1 overflow-y-auto overscroll-contain">
            <div className="mx-auto max-w-6xl px-5 py-8">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                Por modalidad
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <PrimaryLink href="/pilates-madrid/" accent="sage">
                  Pilates en Madrid
                </PrimaryLink>
                <PrimaryLink href="/barre-madrid/" accent="terra">
                  Barre en Madrid
                </PrimaryLink>
                <PrimaryLink href="/reformer-pilates-madrid/" accent="sage">
                  Reformer pilates Madrid
                </PrimaryLink>
                <PrimaryLink href="/precios/" accent="ink">
                  Comparativa de precios
                </PrimaryLink>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  Por barrio
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                  <BarrioLink slug="salamanca">Salamanca</BarrioLink>
                  <BarrioLink slug="chamberi">Chamberí</BarrioLink>
                  <BarrioLink slug="malasana">Malasaña</BarrioLink>
                  <BarrioLink slug="chamartin">Chamartín</BarrioLink>
                  <BarrioLink slug="retiro">Retiro</BarrioLink>
                  <BarrioLink slug="centro">Centro</BarrioLink>
                  <BarrioLink slug="chueca">Chueca</BarrioLink>
                  <BarrioLink slug="la-latina">La Latina</BarrioLink>
                  <BarrioLink slug="moncloa">Moncloa</BarrioLink>
                  <BarrioLink slug="tetuan">Tetuán</BarrioLink>
                  <BarrioLink slug="conde-duque">Conde Duque</BarrioLink>
                </ul>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                  Pilatia
                </p>
                <ul className="mt-3 flex flex-col gap-1">
                  <SecondaryLink href="/metodologia/">
                    Metodología
                  </SecondaryLink>
                  <SecondaryLink href="/sobre/">Sobre</SecondaryLink>
                  <li>
                    <a
                      href="mailto:hola@pilatia.es"
                      className="block rounded-xl px-4 py-3 text-base text-ink transition-colors hover:bg-sand"
                    >
                      hola@pilatia.es
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

function PrimaryLink({
  href,
  children,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  accent: "sage" | "terra" | "ink";
}) {
  const dotColor =
    accent === "sage"
      ? "bg-sage"
      : accent === "terra"
        ? "bg-terra"
        : "bg-ink";
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl px-4 py-4 font-display text-2xl text-ink transition-colors hover:bg-sand"
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${dotColor} opacity-70 transition-opacity group-hover:opacity-100`}
        aria-hidden="true"
      />
      <span className="flex-1">{children}</span>
      <span
        aria-hidden="true"
        className="text-ink-soft transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="block rounded-xl px-4 py-3 text-base text-ink transition-colors hover:bg-sand"
      >
        {children}
      </Link>
    </li>
  );
}

function BarrioLink({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={`/barrios/${slug}/`}
        className="block py-1 text-base text-ink transition-colors hover:text-sage"
      >
        {children}
      </Link>
    </li>
  );
}
