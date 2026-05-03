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

const SLUG = "elegir-primer-estudio-pilates-madrid";
const meta = getPostMeta(SLUG)!;

export const metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${SLUG}/`,
});

export default function Post() {
  const faqs = [
    {
      q: "¿Cuántas veces por semana debo ir al pilates al empezar?",
      a: "Empezar con 1-2 clases semanales es lo recomendable las primeras 4-6 semanas. Tu cuerpo necesita adaptarse, sobre todo si vienes de no entrenar. Después puedes subir a 2-3 si te sientes bien y los precios por sesión bajan progresivamente.",
    },
    {
      q: "¿Cuánto debería costar mi primera mensualidad?",
      a: "Para 1 clase semanal en grupo (suelo o reformer), busca un rango entre 55 y 90 €/mes. Por debajo de 50 €/mes desconfía (puede ser una clase masificada). Por encima de 100 €/mes para 1 sesión semanal en grupo solo se justifica en estudios premium con 4 personas máximo.",
    },
    {
      q: "¿Es necesario probar antes de comprometerse?",
      a: "Sí, totalmente. La mayoría de estudios en Madrid tienen clase de prueba gratuita o con descuento (10-25 €). El espacio, la energía del grupo y el estilo del instructor son factores que solo descubres yendo. No firmes nada antes de probar.",
    },
    {
      q: "¿Qué pasa si me lesiono o tengo problemas de espalda?",
      a: "Cuéntalo en la primera clase y elige un estudio con instructores certificados que adapten ejercicios. Mejor todavía si el estudio tiene fisioterapeuta-pilates en plantilla (pilates terapéutico). Pilates Garbriele, Innofisio, Sane Pilates son de los que más experiencia tienen en esto.",
    },
    {
      q: "¿Qué tamaño de grupo es razonable?",
      a: "En máquinas, máx. 4-6 personas es lo ideal porque el instructor puede corregir uno a uno. En suelo, hasta 12 puede funcionar si el espacio es grande. Por encima de 12, la calidad de la corrección se diluye. Pregunta siempre el ratio antes de inscribirte.",
    },
  ];

  return (
    <BlogLayout meta={meta} faqs={faqs} relatedPosts={getRelatedPosts(SLUG)}>
      <P>
        Elegir mal tu primer estudio te puede dejar con la sensación de que el
        pilates "no es lo tuyo" cuando en realidad solo era un mal encaje.
        Esta es una checklist práctica para que aciertes a la primera.
      </P>

      <Callout tone="tip">
        <Strong>Resumen rápido</Strong>: define presupuesto, decide modalidad
        (suelo, máquinas, mixto), elige 2-3 estudios cerca de ti, prueba clase
        gratuita en cada uno, comprométete con el que mejor sensaciones te dé.
        Tarda 2-3 semanas hacer esto bien · vale la pena.
      </Callout>

      <H2>1 · Define tu objetivo · sin esto eliges al azar</H2>
      <P>
        Tres objetivos típicos, cada uno apunta a un estudio distinto:
      </P>
      <UL>
        <li>
          <Strong>Tonificación general</Strong> → suelo en grupo, 1-2×semana,
          mensualidad asequible. Cualquier estudio decente vale.
        </li>
        <li>
          <Strong>Recuperación post-lesión</Strong> → máquinas con
          fisioterapeuta-pilates, frecuencia 2-3×semana las primeras 6-8
          semanas, después puedes bajar.
        </li>
        <li>
          <Strong>Rendimiento / fuerza / movilidad</Strong> → reformer +
          combo con privadas mensuales para corregir. Estudios con
          equipamiento completo (no solo reformer).
        </li>
      </UL>

      <H2>2 · Cuánto puedes pagar realmente</H2>
      <P>
        El precio importa porque pilates funciona si lo haces 4-12 semanas
        seguidas. No vale empezar caro y dejarlo en 3 semanas porque "no
        cuadran las cuentas". Sé honesto contigo:
      </P>
      <UL>
        <li>
          <Strong>Presupuesto mínimo</Strong>: 55-65 €/mes (1 clase suelo
          semanal). Suficiente para empezar.
        </li>
        <li>
          <Strong>Presupuesto medio</Strong>: 100-150 €/mes (2 clases
          semanales o combo mat+reformer). El sweet spot de mejora visible.
        </li>
        <li>
          <Strong>Presupuesto premium</Strong>: 200+ €/mes (3 clases o
          privadas). Solo si tienes margen y vas en serio.
        </li>
      </UL>

      <H2>3 · Localización · más importante de lo que piensas</H2>
      <P>
        El error #1 de los principiantes es elegir un estudio "porque tiene
        buena pinta" pero está a 30 min de su casa. Probabilidad de seguir 6
        meses después: 30 %.
      </P>
      <P>
        <Strong>Regla práctica</Strong>: el estudio debería estar a menos de{" "}
        <Strong>15 minutos de tu casa o trabajo</Strong>. Cuanto más cerca,
        más probabilidad de mantener la rutina los días de pereza.
      </P>
      <P>
        Si vives en Salamanca tienes la oferta más amplia de Madrid (10
        estudios verificados); en Chamberí hay 7; en barrios como La Latina o
        Chueca la oferta es más limitada. Mira tu barrio en{" "}
        <Link href="/precios/" className="text-ink underline hover:text-sage">
          la comparativa
        </Link>
        .
      </P>

      <H2>4 · Tamaño del grupo · pregunta siempre</H2>
      <P>
        En máquinas, lo razonable es máx. 4-6 personas. En suelo, hasta 8-12.
        Por encima de eso, el instructor no puede corregirte individualmente
        — y al principio las correcciones son lo que evitan lesiones.
      </P>
      <P>
        <Strong>Bandera roja</Strong>: estudios que ofrecen grupos de
        15-20+ personas en máquinas. El espacio físico no da para más de 6-8
        reformers, así que están sobre-vendiéndote o las máquinas serán
        compartidas.
      </P>

      <H2>5 · Certificación del instructor · señal de calidad</H2>
      <P>
        Los buenos estudios listan los certificados de sus instructores en su
        web. Cuando los menciones, busca:
      </P>
      <UL>
        <li>
          <Strong>NCPT</Strong> (National Certification Pilates Teacher · USA
          pero reconocido global)
        </li>
        <li>
          <Strong>Romana's Pilates</Strong> (linaje del método clásico)
        </li>
        <li>
          <Strong>Polestar Pilates</Strong> (orientación rehabilitación)
        </li>
        <li>
          <Strong>Stott / Body Control</Strong> (variantes contemporáneas
          válidas)
        </li>
      </UL>
      <P>
        Sin certificación específica, busca al menos que sean fisioterapeutas
        o titulados en ciencias del deporte. Sin nada de esto, desconfía.
      </P>

      <H2>6 · La clase de prueba · trampa común</H2>
      <P>
        La mayoría de estudios ofrecen clase de prueba (gratis, 10-25 €). Es
        OBLIGATORIO probar antes de comprometerte a una mensualidad de
        6 meses.
      </P>
      <Callout tone="warn">
        <Strong>Trampa habitual</Strong> · Algunos estudios diseñan una clase
        de prueba "comercial" suave y agradable que no representa la dinámica
        real. Si puedes, asiste a una <Strong>clase normal</Strong> (no la
        diseñada para captar). Pregunta directamente: "¿es la clase que tendré
        habitualmente o una de bienvenida?"
      </Callout>

      <H2>7 · Lo que mirar el día de la prueba</H2>
      <P>
        En la clase de prueba evalúa estas 5 cosas:
      </P>
      <UL>
        <li>
          <Strong>El espacio</Strong>: limpio, iluminado, ventilado, no
          hacinado. Una sala con 4 reformers no debería tener 8 personas.
        </li>
        <li>
          <Strong>La atención</Strong>: ¿el instructor te corrige a ti
          personalmente al menos 2-3 veces durante la clase?
        </li>
        <li>
          <Strong>El nivel</Strong>: ¿la clase está adaptada a quién entra?
          Una clase mixta donde tú no puedes seguir y otros se aburren = mal
          servicio.
        </li>
        <li>
          <Strong>La progresión</Strong>: ¿pregunta el instructor por
          lesiones, embarazos, dudas? Es la base de la prevención.
        </li>
        <li>
          <Strong>La sensación</Strong>: ¿sales con energía o frustrado?
          Confía en este feedback emocional. Importa más que el "ranking" del
          estudio.
        </li>
      </UL>

      <H2>Banderas rojas · si ves alguna, vete</H2>
      <UL>
        <li>
          Te presionan para firmar permanencia de 6 meses sin probar
        </li>
        <li>
          No te preguntan si tienes lesiones antes de empezar
        </li>
        <li>
          Las máquinas se ven gastadas o las cuerdas deshilachadas (riesgo
          real de lesión)
        </li>
        <li>
          El estudio no publica sus precios y solo te los dice en privado
          (transparencia = confianza)
        </li>
        <li>
          El instructor no corrige a nadie durante toda la clase (solo
          demuestra)
        </li>
      </UL>

      <H2>Por dónde empezar concretamente</H2>
      <P>
        Mi recomendación práctica:
      </P>
      <UL>
        <li>
          Filtra por <Link href="/precios/" className="text-ink underline hover:text-sage">tu barrio en la comparativa</Link>
        </li>
        <li>
          Selecciona 3 estudios en tu rango de precio
        </li>
        <li>
          Reserva clase de prueba en los 3 (todas suelen ser online)
        </li>
        <li>
          Apunta tus impresiones de cada uno tras la clase (mismo día)
        </li>
        <li>
          Compara y elige
        </li>
      </UL>

      <P>
        Hacer esto bien te lleva 2-3 semanas. Pero te ahorra 6 meses pagando
        una mensualidad en un estudio que no te encaja. Compensa.
      </P>
    </BlogLayout>
  );
}
