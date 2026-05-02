import type { Metadata } from "next";

export const SITE_NAME = "Pilatia";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pilatia.es";
export const DEFAULT_DESCRIPTION =
  "El comparador de estudios de pilates de Madrid. Precios, horarios y modalidades verificados estudio a estudio. Sin afiliaciones.";

interface BuildMetadataArgs {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage,
}: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  return {
    title,
    description: desc,
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
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
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
