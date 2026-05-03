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
import { Illustration } from "@/components/Illustration";

const SLUG = "barre-vs-pilates-diferencias";
const meta = getPostMeta(SLUG)!;

export const metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${SLUG}/`,
});

export default function Post() {
  const faqs = [
    {
      q: "¿Es lo mismo barre que pilates?",
      a: "No, son disciplinas distintas aunque comparten el énfasis en el control corporal. El pilates viene del método de Joseph Pilates (1920s) y se centra en core, precisión y respiración. El barre viene de la danza clásica (años 50, Lotte Berk) y mezcla ballet con fuerza y cardio. Algunas clases mezclan ambos pero no son sinónimos.",
    },
    {
      q: "¿Cuál quema más calorías?",
      a: "El barre es más cardiovascular: trabajas en pulsos cortos con la frecuencia cardíaca más alta. Una clase típica quema 300-400 kcal vs 200-300 del pilates. Pero el pilates fortalece más profundamente el core, lo que mejora postura y previene lesiones a largo plazo.",
    },
    {
      q: "¿Cuál es mejor para principiantes sin experiencia deportiva?",
      a: "Pilates suelo. La curva de aprendizaje es más suave, los ejercicios están mejor secuenciados para principiantes y hay menos componente cardiovascular. El barre puede ser intenso desde el primer día (los pulsos cansan).",
    },
    {
      q: "¿Cuál cuesta más en Madrid?",
      a: "Suelen estar en franjas similares: 60-150 €/mes para mensualidades de 1-2 clases semanales en grupo. El barre tiende a ser ligeramente más caro porque la oferta es más boutique (estudios dedicados como Casa Barré, Boutique Barre, esBarré). El pilates tiene más variedad de precios.",
    },
    {
      q: "¿Puedo combinar barre y pilates en la misma semana?",
      a: "Sí, son complementarios. Mucha gente alterna 1-2 clases de barre (cardio + tonificación) con 1-2 de pilates (control + flexibilidad). Algunos estudios como GONG Chamberí ofrecen las dos modalidades en la misma cuota.",
    },
  ];

  return (
    <BlogLayout meta={meta} faqs={faqs} relatedPosts={getRelatedPosts(SLUG)}>
      <P>
        Si has buscado clases en Madrid últimamente, te habrán salido
        resultados mezclados de barre y pilates. Tienen pinta similar, pero
        son disciplinas con orígenes distintos, énfasis distintos y, sí,
        precios distintos.
      </P>

      <P>
        Esta es la comparativa honesta para que decidas cuál te conviene · o
        si combinas ambos.
      </P>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Illustration variant="barre" />
        <Illustration variant="mat" />
      </div>

      <H2>Pilates · método Joseph Pilates (1920s)</H2>
      <P>
        Joseph Pilates lo desarrolló inicialmente como rehabilitación física,
        primero para soldados heridos en la I Guerra Mundial y después para
        bailarines en Nueva York. La idea central:{" "}
        <Strong>
          control consciente del movimiento desde el centro del cuerpo (el
          core)
        </Strong>
        , con respiración coordinada.
      </P>
      <P>
        Los principios del método: respiración, concentración, control,
        centro, precisión, fluidez. Cada repetición es lenta, controlada y
        consciente. No hay música rítmica que marque el tempo (a veces música
        de fondo, sí; pero no la dirige).
      </P>

      <H2>Barre · método Lotte Berk (años 50)</H2>
      <P>
        Lotte Berk era bailarina alemana exiliada en Londres. Tras una lesión
        de espalda en 1959, mezcló los ejercicios de calentamiento de ballet
        con tablas de yoga y ejercicios terapéuticos diseñados con su
        ortopedista. El resultado: una clase de tonificación intensa con
        barra de ballet como herramienta de apoyo.
      </P>
      <P>
        El método se popularizó en EEUU en los 90 (Burr Leonard) y se ha
        extendido en España en los últimos 5-7 años. La música marca el ritmo
        — los pulsos rápidos al ritmo del beat son característicos. Cada
        ejercicio se hace 30-60 segundos a alta intensidad.
      </P>

      <H2>Diferencias clave · tabla rápida</H2>
      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-sand/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">Pilates</th>
              <th className="px-4 py-3">Barre</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Origen</td>
              <td className="px-4 py-3 text-ink-soft">Método rehab + dance (1920s)</td>
              <td className="px-4 py-3 text-ink-soft">Ballet + Lotte Berk (1959)</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Énfasis</td>
              <td className="px-4 py-3 text-ink-soft">Control + core + precisión</td>
              <td className="px-4 py-3 text-ink-soft">Tonificación + cardio + ritmo</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Tempo</td>
              <td className="px-4 py-3 text-ink-soft">Lento, controlado</td>
              <td className="px-4 py-3 text-ink-soft">Rápido, pulsos cortos</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Música</td>
              <td className="px-4 py-3 text-ink-soft">Fondo (no rítmica)</td>
              <td className="px-4 py-3 text-ink-soft">Marca el tempo</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Calorías/clase</td>
              <td className="px-4 py-3 text-ink-soft">200-300 kcal</td>
              <td className="px-4 py-3 text-ink-soft">300-450 kcal</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Curva aprend.</td>
              <td className="px-4 py-3 text-ink-soft">Suave</td>
              <td className="px-4 py-3 text-ink-soft">Media (intenso desde día 1)</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Equipamiento</td>
              <td className="px-4 py-3 text-ink-soft">Esterilla / reformer / cadillac</td>
              <td className="px-4 py-3 text-ink-soft">Barra + bandas + pelotas</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Rehab</td>
              <td className="px-4 py-3 text-ink-soft">Excelente (sobre todo máquinas)</td>
              <td className="px-4 py-3 text-ink-soft">Limitada</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Para quién es cada uno</H2>
      <P>
        <Strong>Pilates te encaja si...</Strong>
      </P>
      <UL>
        <li>
          Vienes con lesión o dolor de espalda y buscas rehabilitación
        </li>
        <li>
          Quieres mejorar postura y conciencia corporal
        </li>
        <li>
          Disfrutas con movimientos lentos y precisos
        </li>
        <li>
          Eres principiante absoluto y necesitas progresión gradual
        </li>
        <li>
          Buscas algo que puedas hacer también en casa (suelo)
        </li>
      </UL>
      <P>
        <Strong>Barre te encaja si...</Strong>
      </P>
      <UL>
        <li>
          Quieres tonificar visiblemente piernas y glúteos en pocas semanas
        </li>
        <li>
          Te motivan las clases con música y energía grupal
        </li>
        <li>
          Buscas un componente cardiovascular además de fuerza
        </li>
        <li>
          Tienes background en danza o lo encuentras atractivo
        </li>
        <li>
          Te aburren los movimientos lentos del pilates
        </li>
      </UL>

      <H2>Precios reales en Madrid · ambos</H2>
      <P>Rangos actuales en estudios verificados:</P>
      <UL>
        <li>
          <Strong>Pilates suelo</Strong> · 55-90 €/mes (1×semana)
        </li>
        <li>
          <Strong>Pilates máquinas</Strong> · 65-180 €/mes (1-2×semana)
        </li>
        <li>
          <Strong>Barre</Strong> · 60-145 €/mes (1×semana hasta ilimitado)
        </li>
      </UL>
      <P>
        Las cifras son similares. La diferencia está en el formato:{" "}
        <Strong>el barre tiene más oferta de "ilimitado" tipo abono</Strong>{" "}
        (Casa Barré: 145 €/mes ilimitado · Barrelatte: 139 €/mes ilimitado),
        mientras que el pilates suele venderse por frecuencia mensual fija.
      </P>

      <H2>Estudios destacados de cada uno</H2>
      <P>
        <Strong>Pilates clásico (más estudios disponibles)</Strong>:
      </P>
      <UL>
        <li>
          <Link
            href="/estudios/pilates-zentro/"
            className="text-ink underline hover:text-sage"
          >
            Pilates Zentro
          </Link>{" "}
          · Salamanca · método clásico, grupos máx. 4
        </li>
        <li>
          <Link
            href="/estudios/feel-fit-pilates-madrid/"
            className="text-ink underline hover:text-sage"
          >
            Feel Fit Madrid
          </Link>{" "}
          · Salamanca · Romana's Pilates (linaje original)
        </li>
        <li>
          <Link
            href="/estudios/temple-pilates/"
            className="text-ink underline hover:text-sage"
          >
            Temple Pilates
          </Link>{" "}
          · Centro · reformer, intro 59 €/3 clases
        </li>
      </UL>
      <P>
        <Strong>Barre dedicado</Strong>:
      </P>
      <UL>
        <li>
          <Link
            href="/estudios/casa-barre-ayala/"
            className="text-ink underline hover:text-sage"
          >
            Casa Barré
          </Link>{" "}
          · cadena con 4 ubicaciones, plan ilimitado a 145 €/mes
        </li>
        <li>
          <Link
            href="/estudios/esbarre-lopez-de-hoyos/"
            className="text-ink underline hover:text-sage"
          >
            esBarré
          </Link>{" "}
          · solo mujeres, 2 ubicaciones (Salamanca + Trafalgar)
        </li>
        <li>
          <Link
            href="/estudios/barrelatte/"
            className="text-ink underline hover:text-sage"
          >
            Barrelatte
          </Link>{" "}
          · Chamberí, concepto multifuncional con cafetería matcha
        </li>
        <li>
          <Link
            href="/estudios/boutique-barre-madrid/"
            className="text-ink underline hover:text-sage"
          >
            Boutique Barre
          </Link>{" "}
          · Goya, pack de bienvenida 39 €/3 clases
        </li>
      </UL>

      <Callout tone="tip">
        <Strong>Recomendación práctica</Strong> · si dudas, prueba ambos. La
        mayoría de estudios tienen clase de prueba gratuita o low-cost (10-15
        €). Vete a una de pilates suelo y otra de barre la misma semana, y
        decide en función de cómo te sientes después de cada una. Tu cuerpo
        te dice cuál encaja.
      </Callout>

      <P>
        Si quieres ver toda la oferta filtrable, las dos modalidades están en{" "}
        <Link
          href="/precios/"
          className="text-ink underline hover:text-sage"
        >
          la comparativa con filtro de modalidad
        </Link>
        . O directo:{" "}
        <Link
          href="/pilates-madrid/"
          className="text-ink underline hover:text-sage"
        >
          pilates en Madrid
        </Link>
        {" · "}
        <Link
          href="/barre-madrid/"
          className="text-ink underline hover:text-sage"
        >
          barre en Madrid
        </Link>
        .
      </P>
    </BlogLayout>
  );
}
