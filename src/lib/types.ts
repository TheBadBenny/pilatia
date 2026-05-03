export type Modality =
  | "reformer"
  | "mat"
  | "barre"
  | "cadillac"
  | "tower"
  | "chair"
  | "barrel"
  | "hipopresivos";

export type Vertical =
  | "embarazadas"
  | "posparto"
  | "principiantes"
  | "terapeutico"
  | "infantil"
  | "senior"
  | "recovery"
  | "wellness"
  | "suelo-pelvico";

export interface Coords {
  lat: number;
  lng: number;
}

export interface Address {
  street: string | null;
  postalCode: string | null;
  city: string;
  note?: string;
}

export interface Contact {
  phone?: string | null;
  email?: string | null;
  website: string;
  instagram?: string | null;
}

export interface MonthlyPlan {
  modality: Modality | "mixed";
  sessionsPerWeek?: number;
  sessionsPerMonth?: number | null;
  price: number;
  label: string;
  sourceUrl: string;
  lastVerified: string;
  note?: string;
}

export interface PricePackage {
  sessions: number;
  price: number;
  label?: string;
  validityDays?: number;
  sourceUrl: string;
  lastVerified: string;
}

export interface DropIn {
  modality: Modality | "mixed";
  price: number;
  label?: string;
  sourceUrl: string;
  lastVerified: string;
}

export interface TrialOffer {
  type: "gratuita" | "paga" | "descuento" | "obligatoria" | "info";
  price?: number;
  details: string;
  sourceUrl: string;
  lastVerified: string;
}

export interface PrivatePricing {
  single?: number;
  fourPack?: number;
  fivePack?: number;
  eightPack?: number;
  tenPack?: number;
  twelvePack?: number;
  label?: string;
  sourceUrl: string;
  lastVerified: string;
  note?: string;
}

export interface VerticalPlan {
  vertical: Vertical;
  sessionsPerWeek?: number;
  price: number;
  sourceUrl: string;
  lastVerified: string;
}

export interface ExtraPrice {
  name: string;
  price: number;
  sourceUrl: string;
  lastVerified: string;
}

export interface Pricing {
  disclosed: boolean;
  fromMonthly: number | null;
  monthlyPlans?: MonthlyPlan[];
  monthlyPlansNote?: string;
  packages?: PricePackage[];
  dropIn?: DropIn;
  dropInMat?: DropIn;
  private?: PrivatePricing;
  duos?: PrivatePricing[];
  trial?: TrialOffer;
  verticalPlans?: VerticalPlan[];
  extras?: ExtraPrice[];
  notes?: string;
}

export interface GroupSize {
  max?: number | null;
  note?: string;
}

export interface StudioImage {
  url: string;
  credit: string;
  /**
   * If present, basename for self-hosted optimized images at
   * /img/studios/{localBasename}-{320,640,1024}.webp + 640.jpg fallback.
   * The component will prefer local over hot-linked.
   */
  localBasename?: string;
}

export interface Studio {
  slug: string;
  name: string;
  barrios: string[];
  district: string;
  address: Address;
  contact: Contact;
  modalities: Modality[];
  verticals: Vertical[];
  groupSize: GroupSize;
  languages: string[];
  amenities: string[];
  hours: string;
  pricing: Pricing;
  highlights: string[];
  description: string;
  rating?: { source: string; score: number; count: number };
  lastVerified: string;
  coords?: Coords;
  image?: StudioImage;
}

export interface StudiosFile {
  version: string;
  lastBuilt: string;
  currency: string;
  studios: Studio[];
}

export type BarrioTier = "primary" | "secondary";

export interface Barrio {
  slug: string;
  name: string;
  fullName: string;
  displayLabel: string;
  district: string;
  subBarrios: string[];
  neighbors: string[];
  approximateCoords: Coords;
  tier: BarrioTier;
  intro: string;
  disambiguationNote: string | null;
}

export interface BarriosFile {
  version: string;
  lastBuilt: string;
  barrios: Barrio[];
}
