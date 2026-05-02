import type { MetadataRoute } from "next";
import { getAllBarrios, getAllStudios } from "@/lib/studios";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const studios = getAllStudios();
  const barrios = getAllBarrios();
  const today = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: today, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/pilates-madrid/`, lastModified: today, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/barre-madrid/`, lastModified: today, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/reformer-pilates-madrid/`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/precios/`, lastModified: today, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/metodologia/`, lastModified: today, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/sobre/`, lastModified: today, changeFrequency: "monthly", priority: 0.5 },
  ];

  const barrioPages: MetadataRoute.Sitemap = barrios.map((b) => ({
    url: `${SITE_URL}/barrios/${b.slug}/`,
    lastModified: today,
    changeFrequency: "weekly",
    priority: b.tier === "primary" ? 0.85 : 0.6,
  }));

  const studioPages: MetadataRoute.Sitemap = studios.map((s) => ({
    url: `${SITE_URL}/estudios/${s.slug}/`,
    lastModified: new Date(s.lastVerified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...barrioPages, ...studioPages];
}
