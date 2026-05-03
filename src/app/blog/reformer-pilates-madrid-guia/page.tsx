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
import { formatPrice, getAllStudios } from "@/lib/studios";

const SLUG = "reformer-pilates-madrid-guia";
const meta = getPostMeta(SLUG)!;

export const metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${SLUG}/`,
});

export default function Post() {
  const reformerStudios = getAllStudios()
    .filter((s) => s.modalities.includes("reformer") && s.pricing.fromMonthly != null)
    .sort((a, b) => a.pricing.fromMonthly! - b.pricing.fromMonthly!);
  const cheapestReformer = reformerStudios[0];

  const faqs = [
    {
      q: "¿Qué es el reformer pilates?",
      a: "El reformer es la máquina más reconocible del método Pilates: una camilla deslizante con muelles de tensión ajustable, una barra para los pies y correas. La carriage (la parte deslizante) se mueve sobre raíles cuando empujas con manos o pies contra la barra. La resistencia la dan los muelles, que puedes combinar para ajustar la dificultad.",
    },
    {
      q: "¿Cuánto cuesta una clase de reformer pilates en Madrid?",
      a: cheapestReformer
        ? `Las mensualidades arrancan desde ${formatPrice(cheapestReformer.pricing.fromMonthly!)}/mes para 1 clase semanal en grupo (${cheapestReformer.name}). Las clases sueltas van de 25 a 35 €. Las privadas individuales 45-75 €/sesión. Para frecuencias altas (3-4 clases/semana), el coste por sesión puede bajar hasta 12-15 €.`
        : "Mensualidades habituales: 65-180 €/mes en grupo según frecuencia.",
    },
    {
      q: "¿Es seguro hacer reformer si tengo dolor de espalda?",
      a: "Sí, de hecho es una de las modalidades más usadas para rehabilitación de espalda. La resistencia ajustable permite trabajar con cargas muy bajas y movimientos guiados. Pero busca un estudio con instructor certificado o fisioterapeuta-pilates que adapte la práctica a tu condición específica. Cuéntales tu dolor antes de la primera clase.",
    },
    {
      q: "¿Necesito experiencia previa en pilates?",
      a: "No. Muchos estudios tienen clases de iniciación específicas para reformer. La curva de aprendizaje es de 4-6 sesiones para entender la mecánica básica (muelles, correas, posiciones). Después progresas rápido.",
    },
    {
      q: "¿Cuántas veces por semana hace falta para ver resultados?",
      a: "Con 2 clases semanales empiezas a notar mejoras de fuerza y postura en 4-6 semanas. Con 3 clases, los cambios son visibles en 6-8 semanas. La consistencia importa más que la frecuencia: mejor 2 sesiones todas las semanas durante 3 meses que 5 una semana y 0 al mes siguiente.",
    },
  ];

  return (
    <BlogLayout meta={meta} faqs={faqs} relatedPosts={getRelatedPosts(SLUG)}>
      <P>
        El reformer pilates ha pasado de ser un nicho de centros boutique a la
        modalidad más demandada en Madrid en los últimos 5 años. Si has
        buscado pilates últimamente, casi seguro has visto fotos de gente
        sobre una camilla con muelles. Esto es lo que es, cómo funciona y
        cuánto cuesta.
      </P>

      <div className="mt-8">
        <Illustration variant="reformer" />
      </div>

      <H2>Qué es exactamente</H2>
      <P>
        El reformer es la máquina central del método Pilates. La diseñó Joseph
        Pilates en Nueva York en los años 20 con la idea de poder hacer todos
        los ejercicios de su sistema con resistencia ajustable. Sus partes:
      </P>
      <UL>
        <li>
          <Strong>Frame</Strong> · estructura horizontal con dos raíles
        </li>
        <li>
          <Strong>Carriage</Strong> · plataforma deslizante donde te apoyas
        </li>
        <li>
          <Strong>Muelles</Strong> · 3-5 muelles de tensión variable que
          ofrecen la resistencia
        </li>
        <li>
          <Strong>Foot bar</Strong> · barra metálica al final donde apoyas pies
          o manos
        </li>
        <li>
          <Strong>Correas y straps</Strong> · cuerdas con asas para manos y
          pies
        </li>
        <li>
          <Strong>Cabezal regulable</Strong> · headrest reclinable
        </li>
      </UL>
      <P>
        Combinando muelles puedes pasar de una resistencia muy ligera (rehab,
        principiantes) a una alta (entrenamiento de fuerza). Esa flexibilidad
        es lo que hace al reformer útil tanto para abuelos en recuperación
        como para atletas profesionales.
      </P>

      <H2>Cómo es una clase típica</H2>
      <P>
        Una clase grupal de reformer en Madrid dura 50-60 minutos. La
        estructura habitual:
      </P>
      <UL>
        <li>
          <Strong>5-10 min</Strong> · Calentamiento sobre el carriage
          (footwork básico, respiración, conciencia de la columna)
        </li>
        <li>
          <Strong>30-40 min</Strong> · Bloques de ejercicios: piernas, core,
          brazos, espalda. Cambias de posición y de resistencia varias veces
        </li>
        <li>
          <Strong>5-10 min</Strong> · Estiramientos pasivos en la máquina y/o
          enfriamiento
        </li>
      </UL>
      <P>
        El tamaño del grupo varía mucho: de 4 personas en estudios boutique a
        12-15 en clases concurridas tipo "dynamic reformer" (modalidad más
        cardio inspirada en SoulCycle / lagree).
      </P>

      <H2>Beneficios reales · qué dice la evidencia</H2>
      <P>
        Estudios revisados por pares muestran que el reformer pilates
        consistente (2-3 veces/semana, 8-12 semanas) produce:
      </P>
      <UL>
        <li>
          Mejora del control postural y de la fuerza del core
        </li>
        <li>
          Reducción de dolor lumbar crónico (similar a fisioterapia
          convencional en muchos casos)
        </li>
        <li>
          Aumento de flexibilidad activa
        </li>
        <li>
          Mejoras en equilibrio (especialmente útil en mayores de 50)
        </li>
        <li>
          Aumento moderado de masa muscular en personas no entrenadas
        </li>
      </UL>
      <P>
        Lo que <Strong>no</Strong> es: una herramienta de pérdida de peso
        rápida ni un sustituto del entrenamiento de fuerza pesado. Es
        complemento.
      </P>

      <H2>Precios reales en Madrid · datos verificados</H2>
      <P>
        Hemos compilado los precios de {reformerStudios.length} estudios con
        reformer en Madrid (los que publican tarifas en su web oficial).
        Rango actual:
      </P>
      <UL>
        <li>
          <Strong>1 clase semanal grupal</Strong> · 65-100 €/mes
        </li>
        <li>
          <Strong>2 clases semanales</Strong> · 110-180 €/mes
        </li>
        <li>
          <Strong>3+ clases semanales</Strong> · 160-269 €/mes
        </li>
        <li>
          <Strong>Privada individual</Strong> · 45-75 €/sesión
        </li>
        <li>
          <Strong>Drop-in (clase suelta)</Strong> · 25-35 €
        </li>
        <li>
          <Strong>Clase de prueba</Strong> · gratis o 14-25 € en la mayoría
        </li>
      </UL>
      <Callout tone="info">
        <Strong>El factor frecuencia</Strong> · Si vas 2 veces por semana, tu
        coste por sesión baja a 13-22 €. Si vas 3+, hasta 12-15 €. Eso hace
        que para gente que va con regularidad, el reformer no sea tanto más
        caro que un gimnasio decente.
      </Callout>

      <H2>Top estudios con reformer en Madrid</H2>
      <P>
        Una selección variada por barrio (todos verificados, todos publican
        sus tarifas):
      </P>
      <UL>
        <li>
          <Link
            href="/estudios/pilates-zentro/"
            className="text-ink underline hover:text-sage"
          >
            Pilates Zentro
          </Link>{" "}
          · Salamanca · clásico, máquinas + suelo, grupos de 3-4
        </li>
        <li>
          <Link
            href="/estudios/temple-pilates/"
            className="text-ink underline hover:text-sage"
          >
            Temple Pilates
          </Link>{" "}
          · Centro (Gran Vía) · intro pack 59 € / 3 clases, bilingüe
        </li>
        <li>
          <Link
            href="/estudios/laghum-club-malasana/"
            className="text-ink underline hover:text-sage"
          >
            Laghum Club Malasaña
          </Link>{" "}
          · cadena boutique con 3 ubicaciones, ilimitado 145 €/mes
        </li>
        <li>
          <Link
            href="/estudios/olimpia/"
            className="text-ink underline hover:text-sage"
          >
            Olimpia
          </Link>{" "}
          · Chueca · concepto wellness con recovery integrado
        </li>
        <li>
          <Link
            href="/estudios/pilates-garbriele/"
            className="text-ink underline hover:text-sage"
          >
            Pilates Garbriele
          </Link>{" "}
          · Retiro · NCPT certificado, grupos máx. 4
        </li>
      </UL>
      <P>
        Lista completa filtrable en{" "}
        <Link
          href="/reformer-pilates-madrid/"
          className="text-ink underline hover:text-sage"
        >
          reformer pilates Madrid
        </Link>
        .
      </P>

      <H2>Decisión rápida · ¿es para ti?</H2>
      <P>El reformer es lo tuyo si...</P>
      <UL>
        <li>
          Quieres un entrenamiento de bajo impacto pero exigente
        </li>
        <li>
          Vienes con lesión, dolor de espalda o postoperatorio
        </li>
        <li>
          Te aburres con clases muy largas y monótonas (cada ejercicio cambia
          tras unas pocas reps)
        </li>
        <li>
          Tienes presupuesto medio-alto y vas a ir consistente 2+ veces por
          semana
        </li>
      </UL>
      <P>
        El reformer NO es para ti si tu objetivo es ganancia muscular pesada
        (mejor un gimnasio convencional con barra olímpica) o si solo quieres
        estirar (mejor yoga).
      </P>
    </BlogLayout>
  );
}
