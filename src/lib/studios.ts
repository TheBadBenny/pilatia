import studiosData from "../../data/studios.json";
import barriosData from "../../data/barrios.json";
import coordsData from "../../data/studio-coords.json";
import imagesData from "../../data/studio-images.json";
import type {
  Barrio,
  BarriosFile,
  Coords,
  Studio,
  StudioImage,
  StudiosFile,
} from "./types";

const studiosFile = studiosData as StudiosFile;
const barriosFile = barriosData as BarriosFile;
const coordsByslug = (coordsData as { coords: Record<string, Coords> }).coords;
const imagesBySlug = (
  imagesData as { images: Record<string, StudioImage> }
).images;

const STUDIOS: Studio[] = studiosFile.studios.map((s) => ({
  ...s,
  coords: coordsByslug[s.slug],
  image: imagesBySlug[s.slug],
}));

export function getAllStudios(): Studio[] {
  return STUDIOS;
}

export function getStudioBySlug(slug: string): Studio | undefined {
  return STUDIOS.find((s) => s.slug === slug);
}

export function getAllBarrios(): Barrio[] {
  return barriosFile.barrios;
}

export function getPrimaryBarrios(): Barrio[] {
  return barriosFile.barrios.filter((b) => b.tier === "primary");
}

export function getSecondaryBarrios(): Barrio[] {
  return barriosFile.barrios.filter((b) => b.tier === "secondary");
}

export function getBarrioBySlug(slug: string): Barrio | undefined {
  return barriosFile.barrios.find((b) => b.slug === slug);
}

export function getStudiosByBarrio(barrioSlug: string): Studio[] {
  return STUDIOS.filter((s) => s.barrios.includes(barrioSlug));
}

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);
}

export function fromMonthlyLabel(studio: Studio): string {
  if (studio.pricing.fromMonthly == null) {
    if (studio.pricing.dropIn) {
      return `${formatPrice(studio.pricing.dropIn.price)}/clase`;
    }
    return "consultar";
  }
  return `${formatPrice(studio.pricing.fromMonthly)}/mes`;
}

export function modalityLabel(m: string): string {
  const labels: Record<string, string> = {
    reformer: "Reformer",
    mat: "Suelo",
    barre: "Barre",
    cadillac: "Cadillac",
    tower: "Torre",
    chair: "Silla",
    barrel: "Barril",
    hipopresivos: "Hipopresivos",
    mixed: "Mixto",
  };
  return labels[m] ?? m;
}

export function verticalLabel(v: string): string {
  const labels: Record<string, string> = {
    embarazadas: "Embarazadas",
    posparto: "Posparto",
    principiantes: "Principiantes",
    terapeutico: "Terapéutico",
    infantil: "Infantil",
    senior: "Senior",
    recovery: "Recovery",
    wellness: "Wellness",
    "suelo-pelvico": "Suelo pélvico",
  };
  return labels[v] ?? v;
}

export function distanceKm(a: Coords, b: Coords): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export interface NearbyResult {
  studio: Studio;
  distanceKm: number;
}

export function findNearestStudios(
  userCoords: Coords,
  limit = 3,
  options: { mustHaveMonthly?: boolean } = {}
): NearbyResult[] {
  const candidates = STUDIOS.filter((s) => s.coords);
  const scored = candidates.map((s) => ({
    studio: s,
    distanceKm: distanceKm(userCoords, s.coords!),
  }));
  scored.sort((a, b) => a.distanceKm - b.distanceKm);
  if (options.mustHaveMonthly) {
    return scored
      .filter((x) => x.studio.pricing.fromMonthly != null)
      .slice(0, limit);
  }
  return scored.slice(0, limit);
}

export function findBestNearby(
  userCoords: Coords,
  limit = 3
): NearbyResult[] {
  const candidates = STUDIOS.filter(
    (s) => s.coords && s.pricing.fromMonthly != null
  );
  const scored = candidates.map((s) => ({
    studio: s,
    distanceKm: distanceKm(userCoords, s.coords!),
    fromMonthly: s.pricing.fromMonthly!,
  }));
  if (scored.length === 0) return [];
  const maxDist = Math.max(...scored.map((x) => x.distanceKm));
  const maxPrice = Math.max(...scored.map((x) => x.fromMonthly));
  const ranked = scored
    .map((x) => ({
      ...x,
      score: 0.5 * (x.distanceKm / maxDist) + 0.5 * (x.fromMonthly / maxPrice),
    }))
    .sort((a, b) => a.score - b.score);
  return ranked.slice(0, limit).map(({ studio, distanceKm }) => ({
    studio,
    distanceKm,
  }));
}

export function priceStats(): {
  min: number;
  max: number;
  median: number;
  count: number;
} {
  const prices = STUDIOS.map((s) => s.pricing.fromMonthly).filter(
    (p): p is number => typeof p === "number" && p > 0
  );
  if (prices.length === 0) return { min: 0, max: 0, median: 0, count: 0 };
  const sorted = [...prices].sort((a, b) => a - b);
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: sorted[Math.floor(sorted.length / 2)],
    count: prices.length,
  };
}
