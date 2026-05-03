export type BlogAccent = "sage" | "terra" | "rose";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  readingMinutes: number;
  accent: BlogAccent;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "cuanto-cuesta-pilates-madrid",
    title: "Cuánto cuesta el pilates en Madrid en 2026 · datos reales",
    description:
      "Comparativa real de precios de pilates en Madrid con datos verificados de 29 estudios: mensualidades, bonos, drop-in, privadas. Suelo vs máquinas vs barre.",
    excerpt:
      "Mensualidades desde 52 €/mes hasta 745 €/mes. Te explicamos qué pagas en cada modalidad y por qué hay tanta diferencia entre estudios.",
    publishedAt: "2026-05-03",
    category: "Precios",
    readingMinutes: 8,
    accent: "sage",
  },
  {
    slug: "pilates-suelo-vs-maquinas",
    title: "Pilates suelo vs máquinas · cuál elegir según tus objetivos",
    description:
      "Guía honesta para decidir entre pilates suelo (mat) y máquinas (reformer, cadillac). Diferencias reales, precio, para quién es cada uno y cuándo combinar ambos.",
    excerpt:
      "El suelo es la base del método y cuesta menos. Las máquinas progresan más rápido y son mejores para rehabilitación. Te ayudamos a decidir.",
    publishedAt: "2026-05-03",
    category: "Guías",
    readingMinutes: 7,
    accent: "rose",
  },
  {
    slug: "elegir-primer-estudio-pilates-madrid",
    title: "Cómo elegir tu primer estudio de pilates en Madrid · checklist",
    description:
      "Checklist completa para principiantes: 7 cosas que mirar antes de elegir tu primer estudio de pilates en Madrid. Presupuesto, modalidad, tamaño grupo, clase de prueba.",
    excerpt:
      "Antes de pagar tu primera mensualidad, repasa estos 7 puntos. Te ahorrarás meses en un estudio que no te encaja.",
    publishedAt: "2026-05-03",
    category: "Guías",
    readingMinutes: 9,
    accent: "sage",
  },
  {
    slug: "reformer-pilates-madrid-guia",
    title: "Reformer pilates en Madrid · qué es, cómo funciona, cuánto cuesta",
    description:
      "Todo sobre el reformer pilates en Madrid: qué es la máquina, cómo es una clase, beneficios reales, precios y dónde practicarlo. 18 estudios verificados.",
    excerpt:
      "La máquina más reconocible del método Pilates. Cama deslizante con muelles, cientos de ejercicios, resistencia ajustable y clase de 50 minutos sin impacto.",
    publishedAt: "2026-05-03",
    category: "Modalidades",
    readingMinutes: 8,
    accent: "sage",
  },
  {
    slug: "barre-vs-pilates-diferencias",
    title: "Barre vs pilates · diferencias, beneficios y cuál te conviene",
    description:
      "Diferencias reales entre barre y pilates: qué son, qué músculos trabajan, cuál es más cardiovascular, cuál cuesta más. Estudios y precios verificados en Madrid.",
    excerpt:
      "Comparten origen pero son disciplinas distintas. El barre es más cardio y rítmico; el pilates más control y precisión. Te ayudamos a elegir.",
    publishedAt: "2026-05-03",
    category: "Comparativas",
    readingMinutes: 7,
    accent: "terra",
  },
];

export function getPostMeta(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, n = 3): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, n);
}
