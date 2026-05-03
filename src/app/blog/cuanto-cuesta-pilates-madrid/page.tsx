import Link from "next/link";
import {
  BlogLayout,
  H2,
  P,
  UL,
  Strong,
  Callout,
} from "@/components/BlogLayout";
import { getPostMeta, getRelatedPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { formatPrice, getAllStudios, priceStats } from "@/lib/studios";

const SLUG = "cuanto-cuesta-pilates-madrid";
const meta = getPostMeta(SLUG)!;

export const metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${SLUG}/`,
});

export default function Post() {
  const stats = priceStats();
  const studios = getAllStudios();
  const cheapest = [...studios]
    .filter((s) => s.pricing.fromMonthly != null)
    .sort((a, b) => a.pricing.fromMonthly! - b.pricing.fromMonthly!)
    .slice(0, 5);
  const mostExpensive = [...studios]
    .filter((s) => s.pricing.fromMonthly != null)
    .sort((a, b) => b.pricing.fromMonthly! - a.pricing.fromMonthly!)
    .slice(0, 5);

  const faqs = [
    {
      q: "¿Cuál es el precio medio de una clase de pilates en Madrid?",
      a: `Una clase suelta de pilates en Madrid suele costar entre 22 € y 35 €. Las clases en bono salen más baratas (10-18 €/sesión). En mensualidades, la mediana entre los ${stats.count} estudios verificados es ${formatPrice(stats.median)}/mes para 1 clase semanal.`,
    },
    {
      q: "¿Qué cuesta más, pilates suelo o pilates máquinas?",
      a: "Las máquinas (reformer, cadillac) cuestan habitualmente 30-50 % más que el suelo. Si una clase de suelo es 55-65 €/mes para 1×semana, una de máquinas suele ir de 65-95 €/mes. La diferencia se justifica por el coste del equipamiento (un reformer profesional cuesta 4.000-6.000 €).",
    },
    {
      q: "¿Cuál es el estudio de pilates más barato de Madrid?",
      a: cheapest[0]
        ? `${cheapest[0].name} con mensualidad desde ${formatPrice(cheapest[0].pricing.fromMonthly!)}/mes. Datos verificados en su web oficial.`
        : "Próximamente más datos.",
    },
    {
      q: "¿Por qué hay tanta diferencia de precio entre estudios?",
      a: "Tres factores explican el rango de 52 € a 745 €/mes: (1) modalidad —máquinas y privadas son más caras que grupos de suelo—, (2) tamaño del grupo —máx. 4 personas vale más que máx. 12—, y (3) método —los estudios certificados en Romana's Pilates u otros currículos de prestigio cobran más.",
    },
    {
      q: "¿Conviene clase suelta, bono o mensualidad?",
      a: "Si vas menos de 4 veces al mes, la clase suelta sale a cuenta. Si vas 4-8 veces, un bono caduca-friendly suele ser mejor. Si vas 2 o más veces por semana, la mensualidad ilimitada o por frecuencia es la opción más económica por sesión.",
    },
  ];

  return (
    <BlogLayout meta={meta} faqs={faqs} relatedPosts={getRelatedPosts(SLUG)}>
      <P>
        Es la primera pregunta que se hace cualquiera que busca pilates en
        Madrid: <Strong>¿cuánto cuesta?</Strong> Y la respuesta corta es{" "}
        <Strong>"depende"</Strong> — la respuesta larga es{" "}
        <Strong>
          de {formatPrice(stats.min)} a {formatPrice(stats.max)} al mes
        </Strong>
        , una variabilidad enorme que tiene su lógica.
      </P>

      <P>
        Hemos compilado los precios públicos de {stats.count} estudios de
        pilates y barre en Madrid (todos los que publican sus tarifas en su web
        oficial). Lo que sigue es el análisis honesto de qué pagas, en qué
        formato y por qué.
      </P>

      <H2>El rango real · de 52 € a 745 €/mes</H2>
      <P>
        La mediana de mensualidad para 1 clase semanal en grupo es{" "}
        <Strong>{formatPrice(stats.median)}/mes</Strong>. Pero la mediana
        engaña: el rango real es enorme.
      </P>
      <P>
        Los 5 estudios <Strong>más asequibles</Strong> (mensualidad para 1
        clase/semana, modalidad de entrada):
      </P>
      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-sand/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Estudio</th>
              <th className="px-4 py-3">Barrio</th>
              <th className="px-4 py-3 text-right">Desde</th>
            </tr>
          </thead>
          <tbody>
            {cheapest.map((s) => (
              <tr key={s.slug} className="border-t border-line first:border-t-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/estudios/${s.slug}/`}
                    className="text-ink hover:text-sage hover:underline"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {s.barrios[0]?.replace("-", " ")}
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink">
                  {formatPrice(s.pricing.fromMonthly!)}/mes
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <P>Y los más <Strong>premium</Strong> en el otro extremo:</P>
      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-sand/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3">Estudio</th>
              <th className="px-4 py-3">Barrio</th>
              <th className="px-4 py-3 text-right">Desde</th>
            </tr>
          </thead>
          <tbody>
            {mostExpensive.map((s) => (
              <tr key={s.slug} className="border-t border-line first:border-t-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/estudios/${s.slug}/`}
                    className="text-ink hover:text-sage hover:underline"
                  >
                    {s.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {s.barrios[0]?.replace("-", " ")}
                </td>
                <td className="px-4 py-3 text-right font-medium text-ink">
                  {formatPrice(s.pricing.fromMonthly!)}/mes
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout tone="info">
        <Strong>Cuidado con la lectura</Strong> · Los precios "premium" suelen
        ser <Strong>privados</Strong> o programas individuales, no clases en
        grupo. Élite Pilates, por ejemplo, son sesiones uno-a-uno con
        valoración integral inicial. No es comparable peso-pluma con grupos de
        4-8 personas.
      </Callout>

      <H2>Lo que de verdad estás pagando</H2>
      <P>
        El precio se descompone en cuatro factores reales. Si entiendes esto,
        comparas mucho mejor.
      </P>

      <UL>
        <li>
          <Strong>Modalidad</Strong> · Suelo (mat) más barato porque solo
          necesitas una esterilla. Máquinas (reformer, cadillac) más caro
          porque cada equipo cuesta miles de euros y se amortiza con clases
          más caras.
        </li>
        <li>
          <Strong>Tamaño del grupo</Strong> · Un estudio que pone máx. 4
          personas por clase puede cobrar más por sesión que uno con grupos
          de 8-12, pero la atención es radicalmente distinta.
        </li>
        <li>
          <Strong>Frecuencia / formato del plan</Strong> · 1 clase/semana es
          tu base. 2-3 clases/semana suelen tener descuento progresivo.
          Clases ilimitadas suelen rondar el equivalente a 4-5 clases por
          mes.
        </li>
        <li>
          <Strong>Método y certificación</Strong> · Los estudios que enseñan
          Romana's Pilates clásico, o tienen instructores certificados NCPT,
          o han sido formados en Polestar / Stott, suelen cobrar más. La
          certificación es real y la formación cuesta.
        </li>
      </UL>

      <H2>Bonos vs mensualidades · qué te conviene</H2>
      <P>
        Esta es la cuenta que casi nadie hace bien. Te la simplifico con un
        ejemplo real.
      </P>
      <Callout tone="tip">
        <Strong>Caso real</Strong> · Un estudio típico de Chamberí cobra
        65 € por 1 clase semanal mensual = 4 clases/mes a 16,25 €/clase. Si
        compras una clase suelta vale 25 €. Y un bono de 5 clases vale 90 €
        (18 €/clase, válido 90 días). La mensualidad es la opción más barata
        si vas todas las semanas. El bono solo gana si vas con menos
        frecuencia.
      </Callout>

      <H2>Trampas comunes · matrículas y mínimos</H2>
      <P>
        Algunas cadenas cobran <Strong>matrícula</Strong> al alta (Laghum
        Club: 39,99 € una vez). Otras tienen una <Strong>valoración
        inicial obligatoria</Strong> antes de la primera clase (Élite
        Pilates: 135 €; Pilates Garbriele: 40 €).
      </P>
      <P>
        No es necesariamente mala señal — la valoración inicial sirve para
        adaptar la práctica a tu cuerpo. Pero ojo a la suma total al alta:
        un estudio de 65 €/mes + 135 € de valoración = 200 € el primer mes.
      </P>

      <H2>Pilates en Madrid vs otras ciudades</H2>
      <P>
        Madrid está en línea con Barcelona en mensualidades de grupos
        (60-90 €/mes). Por debajo de Londres o París (90-120 €/mes
        equivalente) y por encima de ciudades secundarias españolas. La
        franja media es razonable para una capital europea.
      </P>

      <H2>Conclusiones · cómo decides</H2>
      <UL>
        <li>
          Si <Strong>empiezas</Strong>: elige un estudio con clase de prueba
          gratuita o low-cost. La adecuación al espacio es más importante que
          ahorrar 20 €/mes.
        </li>
        <li>
          Si <Strong>vas en serio</Strong> (3+ veces/semana): mensualidad
          ilimitada o frecuencia alta. Tu coste por sesión baja a 5-12 €.
        </li>
        <li>
          Si <Strong>buscas rehabilitación</Strong>: pilates terapéutico /
          privadas. Más caro por sesión pero adaptado a tu condición. Los
          estudios con fisioterapeutas son los indicados.
        </li>
        <li>
          Si quieres <Strong>combinar</Strong> con barre, fuerza o yoga:
          estudios multidisciplinares (GONG, HOM) tienen mejores ratios al
          combinar.
        </li>
      </UL>

      <P>
        Hemos compilado todo eso en una{" "}
        <Link
          href="/precios/"
          className="text-ink underline hover:text-sage"
        >
          comparativa con filtros por barrio, modalidad y precio
        </Link>
        . Cada estudio lleva enlace a su tarifario oficial · sin afiliaciones.
      </P>
    </BlogLayout>
  );
}
