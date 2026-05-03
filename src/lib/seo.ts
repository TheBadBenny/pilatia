import type { Metadata } from "next";

export const SITE_NAME = "Pilatia";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pilatia.es";
export const DEFAULT_DESCRIPTION =
  "El comparador honesto de estudios de pilates y barre en Madrid. Precios, horarios y modalidades verificados estudio a estudio. Reformer, máquinas, suelo, barre. Sin afiliaciones.";

export const DEFAULT_KEYWORDS = [
  "pilates Madrid",
  "barre Madrid",
  "barre pilates Madrid",
  "reformer pilates Madrid",
  "estudios pilates Madrid",
  "clases pilates Madrid",
  "comparador pilates",
  "precios pilates Madrid",
];

interface BuildMetadataArgs {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage,
  keywords,
}: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const imageUrl = ogImage ?? `${SITE_URL}/og-image.png`;
  return {
    title,
    description: desc,
    keywords: keywords ?? DEFAULT_KEYWORDS,
    alternates: {
      canonical: url,
      languages: { "es-ES": url },
    },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: "es_ES",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imageUrl],
    },
  };
}

export function buildOrganizationLD() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "es-ES",
    areaServed: { "@type": "City", name: "Madrid" },
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/apple-icon.png`,
      width: 180,
      height: 180,
    },
    image: `${SITE_URL}/og-image.png`,
  };
}

export function buildBreadcrumbLD(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
