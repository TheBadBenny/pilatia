import Link from "next/link";
import { buildMetadata, jsonLdScript } from "@/lib/seo";
import { getAllStudios } from "@/lib/studios";

export const metadata = buildMetadata({
  title: "Metodología · Cómo verificamos los precios",
  description:
    "Explicamos paso a paso cómo verificamos los precios y datos de cada estudio de pilates en Madrid. Sin afiliaciones, con trazabilidad.",
  path: "/metodologia/",
});

export default function MetodologiaPage() {
  const studios = getAllStudios();
  const lastDate = new Date(
    Math.max(...studios.map((s) => +new Date(s.lastVerified)))
  );

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://pilatia.es/" },
      { "@type": "ListItem", position: 2, name: "Metodología", item: "https://pilatia.es/metodologia/" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbLD)}
      />
      <section className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
        <nav className="text-xs text-ink-soft" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-sage">
            Inicio
          </Link>{" "}
          / <span className="text-ink">Metodología</span>
        </nav>
        <h1 className="animate-fade-up mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Cómo verificamos los precios.
        </h1>
        <p
          className="animate-fade-up mt-5 text-lg text-ink-soft"
          style={{ animationDelay: "80ms" }}
        >
          Pilatia existe porque buscar pilates en Madrid es complicado: cada
          estudio publica de manera distinta, los agregadores cobran comisión y
          los precios se mueven. Esta página explica cómo trabajamos los
          datos.
        </p>

        <div className="mt-12 space-y-12">
          <Step
            n="1"
            title="Buscamos en la web oficial del estudio"
            text="No scrapeamos ClassPass, Yelp ni Google Maps. Solo entramos a la web del estudio (la que viene del propio dominio) y leemos su tarifario público. Si no publican precios, no aparecen aquí."
          />
          <Step
            n="2"
            title="Anotamos cada precio con su fuente"
            text="Cada cifra del comparador lleva un campo sourceUrl con el enlace exacto donde la encontramos. Esto sirve si un estudio nos pide retirar o corregir algo: tenemos la prueba."
          />
          <Step
            n="3"
            title="Marcamos la fecha de verificación"
            text={`Cada estudio tiene una fecha de "última verificación". Comprobamos cada precio al menos cada 6 meses, y antes si el estudio nos avisa de un cambio. La verificación más reciente es del ${lastDate.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}.`}
          />
          <Step
            n="4"
            title="Excluimos lo que no se puede comprobar"
            text="Si un estudio sólo publica sus precios en una imagen o PDF que no podemos extraer como texto, queda fuera. Si los precios están en su área de cliente con login, queda fuera. Sin trampa."
          />
          <Step
            n="5"
            title="Sin afiliación, sin comisiones"
            text="Ningún estudio nos paga por aparecer ni por aparecer mejor. No hay enlaces de afiliado. La monetización futura será publicidad estándar (AdSense) con el slot claramente marcado, o reclamaciones de ficha de pago opcional para estudios que quieran añadir foto/contenido."
          />
        </div>

        <div className="mt-16 rounded-2xl border border-sage/40 bg-sage/8 p-6 sm:p-8">
          <h3 className="font-display text-2xl text-ink">
            ¿Eres un estudio y quieres corregir algo?
          </h3>
          <p className="mt-3 text-sm text-ink-soft">
            Escríbenos a{" "}
            <a
              href="mailto:hola@pilatia.es"
              className="text-ink underline hover:text-sage"
            >
              hola@pilatia.es
            </a>{" "}
            con la URL de tu tarifario actualizado y lo cambiamos en menos de 48
            horas. Si quieres ampliar tu ficha (foto, descripción, horarios),
            pronto habrá un formulario para ello.
          </p>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl text-ink">
            Lo que <em>no</em> hacemos.
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-ink-soft">
            <li>
              <strong className="text-ink">No inventamos precios.</strong> Si no
              está publicado, no lo escribimos.
            </li>
            <li>
              <strong className="text-ink">No copiamos a la competencia.</strong>{" "}
              No mostramos datos de ClassPass, Yelp ni similares — sólo de la
              web oficial del estudio.
            </li>
            <li>
              <strong className="text-ink">No vendemos tu email.</strong> Si te
              apuntas a la lista, sólo te escribimos para novedades del
              proyecto.
            </li>
            <li>
              <strong className="text-ink">No usamos cookies de tracking.</strong>{" "}
              Sólo lo estrictamente necesario para que funcione el sitio.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5">
      <div className="font-display text-3xl text-sage" aria-hidden="true">
        {n}
      </div>
      <div>
        <h2 className="font-display text-2xl text-ink">{title}</h2>
        <p className="mt-2 text-ink-soft">{text}</p>
      </div>
    </div>
  );
}
