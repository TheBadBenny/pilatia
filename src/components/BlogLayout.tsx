import Link from "next/link";
import { OrganicShape } from "./OrganicShape";
import type { BlogPostMeta } from "@/lib/blog";
import { jsonLdScript, SITE_URL } from "@/lib/seo";

interface BlogLayoutProps {
  meta: BlogPostMeta;
  faqs: Array<{ q: string; a: string }>;
  relatedPosts: BlogPostMeta[];
  children: React.ReactNode;
}

export function BlogLayout({
  meta,
  faqs,
  relatedPosts,
  children,
}: BlogLayoutProps) {
  const articleLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    inLanguage: "es-ES",
    datePublished: meta.publishedAt,
    dateModified: meta.publishedAt,
    author: {
      "@type": "Organization",
      name: "Pilatia",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Pilatia",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/apple-icon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${meta.slug}/`,
    },
    image: `${SITE_URL}/og-image.png`,
    articleSection: meta.category,
  };

  const faqLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `${SITE_URL}/blog/${meta.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(articleLD)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqLD)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)}
      />

      <article>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-16 -right-20 h-[420px] w-[420px]">
            <OrganicShape variant={meta.accent} opacity={0.22} />
          </div>
          <div className="relative mx-auto max-w-3xl px-5 pb-10 pt-12 sm:pt-16">
            <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-sage">
                Inicio
              </Link>{" "}
              /{" "}
              <Link href="/blog/" className="hover:text-sage">
                Blog
              </Link>{" "}
              / <span className="text-ink">{meta.category}</span>
            </nav>
            <p className="animate-fade-up mt-3 text-xs uppercase tracking-[0.22em] text-ink-soft">
              {meta.category}
            </p>
            <h1 className="animate-fade-up mt-3 font-display text-3xl leading-tight text-ink sm:text-5xl md:text-6xl">
              {meta.title}
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-2xl text-lg text-ink-soft"
              style={{ animationDelay: "100ms" }}
            >
              {meta.excerpt}
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
              <time dateTime={meta.publishedAt}>
                {new Date(meta.publishedAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{meta.readingMinutes} min de lectura</span>
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-3xl px-5 pb-14">
          <div className="prose-pilatia">{children}</div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="border-t border-line bg-sand/40">
            <div className="mx-auto max-w-3xl px-5 py-14">
              <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
                Preguntas frecuentes
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink">
                Lo que la gente nos pregunta sobre esto.
              </h2>
              <div className="mt-8 divide-y divide-line">
                {faqs.map((item, i) => (
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
        )}

        {/* Related */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Sigue leyendo
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              Más artículos del blog.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}/`}
                  className="lift-on-hover block rounded-2xl border border-line bg-cream p-5"
                >
                  <p className="text-xs uppercase tracking-wider text-ink-soft">
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-soft">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 pb-20">
          <div className="rounded-2xl border border-sage/40 bg-sage/8 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              ¿Buscando un estudio?
            </p>
            <h3 className="mt-2 font-display text-2xl text-ink">
              Compara los 29 estudios verificados.
            </h3>
            <p className="mt-3 text-sm text-ink-soft">
              Filtros por barrio y modalidad · precios reales con su fuente · sin
              afiliaciones.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/precios/"
                className="inline-flex items-center rounded-full bg-sage px-6 py-3 text-cream transition-colors hover:bg-ink"
              >
                Ver comparativa
              </Link>
              <Link
                href="/pilates-madrid/"
                className="inline-flex items-center rounded-full border border-line bg-cream px-6 py-3 text-ink transition-colors hover:border-sage"
              >
                Pilates en Madrid
              </Link>
              <Link
                href="/barre-madrid/"
                className="inline-flex items-center rounded-full border border-line bg-cream px-6 py-3 text-ink transition-colors hover:border-sage"
              >
                Barre en Madrid
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="mt-12 font-display text-2xl text-ink sm:text-3xl"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 font-display text-xl text-ink">{children}</h3>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-base leading-relaxed text-ink-soft">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 space-y-2 text-ink-soft [&_li]:relative [&_li]:pl-5 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-sage">
      {children}
    </ul>
  );
}

export function Callout({
  children,
  tone = "info",
}: {
  children: React.ReactNode;
  tone?: "info" | "tip" | "warn";
}) {
  const styles =
    tone === "warn"
      ? "border-terra/40 bg-terra/10"
      : tone === "tip"
        ? "border-sage/40 bg-sage/8"
        : "border-line bg-sand/60";
  return (
    <div className={`mt-6 rounded-2xl border ${styles} p-5 text-sm text-ink`}>
      {children}
    </div>
  );
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="text-ink">{children}</strong>;
}
