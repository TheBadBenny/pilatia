"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-cream text-ink transition-colors hover:border-sage"
      >
        {open ? (
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
        ) : (
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
              d="M4 7h16M4 12h16M4 17h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {open && (
        <div className="fixed inset-0 top-[65px] z-40 animate-fade-in bg-cream/95 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-8">
            <MobileLink href="/precios/">Precios</MobileLink>
            <MobileLink href="/metodologia/">Metodología</MobileLink>
            <MobileLink href="/sobre/">Sobre</MobileLink>
            <div className="mt-6 border-t border-line pt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                Por barrio
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                <BarrioLink slug="salamanca">Salamanca</BarrioLink>
                <BarrioLink slug="chamberi">Chamberí</BarrioLink>
                <BarrioLink slug="malasana">Malasaña</BarrioLink>
                <BarrioLink slug="chamartin">Chamartín</BarrioLink>
                <BarrioLink slug="retiro">Retiro</BarrioLink>
                <BarrioLink slug="centro">Centro</BarrioLink>
                <BarrioLink slug="chueca">Chueca</BarrioLink>
                <BarrioLink slug="la-latina">La Latina</BarrioLink>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl px-4 py-3 font-display text-2xl text-ink transition-colors hover:bg-sand"
    >
      {children}
    </Link>
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
        className="text-sm text-ink transition-colors hover:text-sage"
      >
        {children}
      </Link>
    </li>
  );
}
