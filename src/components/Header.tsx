import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2 text-ink transition-colors hover:text-sage"
        >
          <LogoMark className="text-sage transition-transform group-hover:rotate-[-12deg]" />
          <span className="font-display text-2xl">Pilatia</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-ink-soft md:flex">
          <Link
            href="/precios/"
            className="transition-colors hover:text-sage"
          >
            Precios
          </Link>
          <Link
            href="/metodologia/"
            className="transition-colors hover:text-sage"
          >
            Metodología
          </Link>
          <Link href="/sobre/" className="transition-colors hover:text-sage">
            Sobre
          </Link>
          <Link
            href="/precios/"
            className="rounded-full bg-sage px-4 py-2 text-cream transition-colors hover:bg-ink"
          >
            Ver estudios
          </Link>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
