import Link from "next/link";
import { OrganicShape } from "@/components/OrganicShape";
import { buildMetadata, jsonLdScript } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre Pilatia",
  description:
    "Pilatia es el comparador de estudios de pilates de Madrid. Existimos porque buscar pilates en la ciudad es lento, opaco y caro de comparar.",
  path: "/sobre/",
});

export default function SobrePage() {
  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pilatia.es/" },
      { "@type": "ListItem", position: 2, name: "Sobre", item: "https://pilatia.es/sobre/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)}
      />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-16 -right-20 h-[420px] w-[420px]">
          <OrganicShape variant="rose" opacity={0.18} />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
          <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sage">
              Inicio
            </Link>{" "}
            / <span className="text-ink">Sobre</span>
          </nav>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Pilatia.
          </h1>
          <p
            className="animate-fade-up mt-5 text-lg text-ink-soft"
            style={{ animationDelay: "80ms" }}
          >
            Existimos porque buscar pilates en Madrid es lento, opaco y caro de
            comparar. Cada estudio publica los precios distinto. Cada cadena
            tiene su matrícula. Cada barrio tiene tres “mejores” según quién
            pague mejor el SEO.
          </p>
          <p
            className="animate-fade-up mt-5 text-lg text-ink-soft"
            style={{ animationDelay: "160ms" }}
          >
            Pilatia compara los estudios en serio: precios reales, modalidades,
            tamaño de grupo, horarios. Sin afiliación, sin pago por
            posicionamiento. Cada dato lleva su fuente.
          </p>

          <div className="mt-12 grid gap-6">
            <Block
              title="Quién hay detrás"
              text="Un proyecto independiente. Lo construimos a mano y lo cuidamos a mano. Si esto crece, lo haremos sin perder la independencia que lo hace útil."
            />
            <Block
              title="Cómo nos pagamos"
              text="A medio plazo, publicidad estándar (AdSense) en slots claramente marcados, y una opción de pago para estudios que quieran enriquecer su ficha (foto, descripción, horarios actualizados automáticamente). Los precios y el ranking nunca dependen de pago."
            />
            <Block
              title="Por qué Madrid"
              text="Es donde vivimos y donde conocemos los barrios. Si funciona, llegará a otras ciudades. Pero solo si podemos garantizar la misma calidad de datos."
            />
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-cream p-6 sm:p-8">
            <h2 className="font-display text-2xl text-ink">¿Hablamos?</h2>
            <p className="mt-3 text-ink-soft">
              Para correcciones de precios, sugerencias o consultas:{" "}
              <a
                href="mailto:hola@pilatia.es"
                className="text-ink underline hover:text-sage"
              >
                hola@pilatia.es
              </a>
              .
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              Si has llegado hasta aquí buscando un estudio, gracias —{" "}
              <Link href="/precios/" className="underline hover:text-sage">
                te dejo aquí la comparativa completa
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <p className="mt-2 text-ink-soft">{text}</p>
    </div>
  );
}
