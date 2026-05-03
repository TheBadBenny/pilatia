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

const SLUG = "pilates-suelo-vs-maquinas";
const meta = getPostMeta(SLUG)!;

export const metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: `/blog/${SLUG}/`,
});

export default function Post() {
  const faqs = [
    {
      q: "¿Es mejor empezar con pilates suelo o máquinas?",
      a: "El suelo (mat) es la opción clásica para empezar porque trabajas la base del método con tu propio peso. Las máquinas dan más feedback (la resistencia te corrige la postura) y son mejores si vienes con lesión o necesitas progresar rápido. Para principiantes sanos, ambas funcionan bien.",
    },
    {
      q: "¿Cuánto más cuesta el pilates con máquinas que en suelo?",
      a: "Habitualmente un 30-50 % más. Si una mensualidad de suelo cuesta 55-70 €/mes para 1×semana, la equivalente en máquinas va de 70-95 €. La diferencia se justifica por el coste del equipo: un reformer profesional cuesta 4.000-6.000 €.",
    },
    {
      q: "¿Las máquinas son mejores para rehabilitación?",
      a: "Sí, generalmente. La resistencia ajustable de los muelles permite trabajar con cargas muy bajas y movimientos guiados, lo que es ideal post-cirugía o con lesiones. Muchos centros de fisioterapia ofrecen pilates con máquinas como complemento al tratamiento.",
    },
    {
      q: "¿Puedo combinar suelo y máquinas en el mismo estudio?",
      a: "Sí, la mayoría de estudios en Madrid ofrecen ambas modalidades y muchos tienen planes mixtos (combo). Aretē, HOM, Pilates Zentro y otros tienen formatos que combinan mat + reformer en la misma cuota. Suele ser la opción más completa.",
    },
    {
      q: "¿Qué máquinas hay aparte del reformer?",
      a: "El método clásico tiene 5 aparatos principales: reformer (cama deslizante), cadillac (estructura con barras y muelles), silla (Wunda chair), barril (ladder barrel) y trapecio. Pocos estudios tienen los 5; la mayoría se centra en reformer porque es el más versátil y eficiente en espacio.",
    },
  ];

  return (
    <BlogLayout meta={meta} faqs={faqs} relatedPosts={getRelatedPosts(SLUG)}>
      <P>
        Es la primera bifurcación que tienes que decidir antes de elegir
        estudio: <Strong>¿pilates suelo o máquinas?</Strong> No son disciplinas
        rivales — son dos formatos del mismo método. Pero cada uno tiene su
        sitio, su público y su precio.
      </P>

      <P>
        Lo importante: <Strong>no hay opción universalmente mejor</Strong>.
        Depende de tu objetivo, tu nivel y tu presupuesto.
      </P>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Illustration variant="mat" />
        <Illustration variant="reformer" />
      </div>

      <H2>Pilates suelo (mat) · la base del método</H2>
      <P>
        El suelo es lo que Joseph Pilates diseñó originalmente. Una esterilla,
        tu cuerpo y unos cuantos accesorios opcionales (pelota, círculo,
        banda elástica). Trabajas con tu propio peso corporal, controlando el
        movimiento desde el centro (core) y respirando con cada repetición.
      </P>
      <P>
        Una clase típica dura 50-60 min: 5-10 min de calentamiento, 35-40 min
        de bloques de ejercicios (Hundred, Roll-up, Single Leg Stretch, Teaser
        y muchos más) y cierre con estiramientos.
      </P>
      <P>
        <Strong>Ventajas reales</Strong>:
      </P>
      <UL>
        <li>
          Es la base del método · entender suelo te hace mejor en máquinas
        </li>
        <li>
          Más barato (entre 55 y 90 €/mes para 1-2 clases semanales)
        </li>
        <li>
          Replicable en casa · una vez aprendes la técnica puedes practicar
          solo
        </li>
        <li>
          Fortalece el control corporal sin depender de equipamiento
        </li>
      </UL>
      <P>
        <Strong>Limitaciones</Strong>: si tienes lesión activa o muy poca
        fuerza, el suelo puede ser frustrante porque no hay asistencia. La
        progresión también es más lenta porque siempre trabajas con el mismo
        "peso" (el tuyo).
      </P>

      <H2>Pilates máquinas · resistencia ajustable y feedback inmediato</H2>
      <P>
        El reformer es la máquina estrella: una camilla deslizante con muelles
        de tensión variable, una barra para los pies, correas para manos y
        pies, y una headrest. Te tumbas, te arrodillas o te sientas sobre la
        carriage y empujas o tiras contra la resistencia.
      </P>
      <P>
        La gran ventaja del reformer (y del resto de máquinas: cadillac,
        silla, barril) es la <Strong>resistencia progresiva</Strong>. Empiezas
        con 1 muelle ligero y vas añadiendo según ganas fuerza. Eso permite
        cientos de variaciones de cada ejercicio.
      </P>
      <P>
        <Strong>Ventajas reales</Strong>:
      </P>
      <UL>
        <li>
          Progresión más rápida en fuerza y movilidad
        </li>
        <li>
          Mejor para rehabilitación · ajustas la carga al milímetro
        </li>
        <li>
          Feedback de la máquina te corrige la postura sin que el monitor
          te lo diga
        </li>
        <li>
          Trabaja músculos profundos que en el suelo cuestan más activar
        </li>
      </UL>
      <P>
        <Strong>Limitaciones</Strong>: cuesta 30-50 % más que el suelo. No
        puedes practicar en casa salvo que te compres un reformer (3.000-
        6.000 € los buenos). Y al principio puede abrumar — son muchos
        muelles, correas y posibilidades.
      </P>

      <H2>Tabla comparativa rápida</H2>
      <div className="mt-4 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-sand/60 text-left text-xs uppercase tracking-wider text-ink-soft">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">Suelo (mat)</th>
              <th className="px-4 py-3">Máquinas</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Precio típico</td>
              <td className="px-4 py-3 text-ink-soft">55-90 €/mes</td>
              <td className="px-4 py-3 text-ink-soft">70-180 €/mes</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Curva aprend.</td>
              <td className="px-4 py-3 text-ink-soft">Suave</td>
              <td className="px-4 py-3 text-ink-soft">Media</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Rehabilitación</td>
              <td className="px-4 py-3 text-ink-soft">Limitada</td>
              <td className="px-4 py-3 text-ink-soft">Excelente</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">En casa</td>
              <td className="px-4 py-3 text-ink-soft">Sí</td>
              <td className="px-4 py-3 text-ink-soft">No (sin equipo)</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3 font-medium text-ink">Velocidad progr.</td>
              <td className="px-4 py-3 text-ink-soft">Lenta-media</td>
              <td className="px-4 py-3 text-ink-soft">Rápida</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Para quién · resumen práctico</H2>
      <UL>
        <li>
          <Strong>Empiezas, tu cuerpo está sano</Strong> → Suelo o combo
          mat+reformer básico
        </li>
        <li>
          <Strong>Lesión activa, postoperatorio, embarazo, posparto</Strong> →
          Máquinas con instructor especialista (idealmente
          fisioterapeuta-pilates)
        </li>
        <li>
          <Strong>Quieres progresar rápido en fuerza</Strong> → Máquinas, 2-3
          veces/semana
        </li>
        <li>
          <Strong>Presupuesto ajustado</Strong> → Suelo en grupo + práctica
          guiada en casa
        </li>
        <li>
          <Strong>Te aburres rápido</Strong> → Combo · alterna suelo y
          máquinas en la misma semana
        </li>
      </UL>

      <H2>Lo mejor: combinar</H2>
      <P>
        En la práctica, los que llevan años haciendo pilates suelen mezclar
        ambas modalidades. El suelo desarrolla el control y la conciencia
        corporal; las máquinas desafían ese control con resistencia. Se
        retroalimentan.
      </P>
      <Callout tone="tip">
        <Strong>Recomendación práctica</Strong> · si dudas, busca un estudio
        que ofrezca <Strong>combos mat + reformer</Strong> en la misma
        cuota. Aretē Pilates, HOM y otros tienen este formato a precio
        intermedio (130-170 €/mes para 8 clases mixtas). Pruebas las dos
        modalidades sin comprometerte solo a una.
      </Callout>

      <P>
        Si quieres ver qué estudios ofrecen cada modalidad,{" "}
        <Link
          href="/precios/"
          className="text-ink underline hover:text-sage"
        >
          en la comparativa
        </Link>{" "}
        puedes filtrar por reformer, suelo, barre o combinar varios.
      </P>
    </BlogLayout>
  );
}
