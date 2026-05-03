import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";
import { BLOG_POSTS } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog · guías y comparativas de pilates y barre en Madrid",
  description:
    "Análisis honestos sobre pilates y barre en Madrid: cuánto cuesta, cómo elegir estudio, modalidades, comparativas. Datos reales verificados.",
  path: "/blog/",
});

export default function BlogIndex() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -right-24 h-[420px] w-[420px]">
          <OrganicShape variant="sage" opacity={0.22} />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:pt-16">
          <p className="animate-fade-up text-xs uppercase tracking-[0.22em] text-ink-soft">
            Blog
          </p>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-[1.05] text-ink sm:text-6xl">
            Guías honestas sobre pilates y barre en Madrid.
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-lg text-ink-soft"
            style={{ animationDelay: "100ms" }}
          >
            Análisis con datos reales: precios, modalidades, comparativas. Sin
            jerga marketinera. Pensado para que decidas mejor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              className="lift-on-hover group flex flex-col rounded-2xl border border-line bg-cream p-5"
            >
              <p className="text-xs uppercase tracking-wider text-ink-soft">
                {p.category}
              </p>
              <h2 className="mt-2 font-display text-xl text-ink transition-colors group-hover:text-sage sm:text-2xl">
                {p.title}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm text-ink-soft">
                {p.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs text-ink-soft">
                <time dateTime={p.publishedAt}>
                  {new Date(p.publishedAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span>{p.readingMinutes} min</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
