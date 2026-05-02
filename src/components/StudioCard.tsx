import Link from "next/link";
import {
  formatDistance,
  formatPrice,
  fromMonthlyLabel,
  modalityLabel,
} from "@/lib/studios";
import { getBarrioBySlug } from "@/lib/studios";
import { StudioVisual } from "./StudioVisual";
import type { Modality, Studio } from "@/lib/types";

interface StudioCardProps {
  studio: Studio;
  distanceKm?: number;
}

const MODALITY_TONE: Record<string, string> = {
  reformer: "bg-sage/15 text-ink",
  mat: "bg-rose/30 text-ink",
  barre: "bg-terra/20 text-ink",
  cadillac: "bg-sage/15 text-ink",
  tower: "bg-sage/15 text-ink",
  chair: "bg-sage/15 text-ink",
  barrel: "bg-sage/15 text-ink",
  hipopresivos: "bg-sand text-ink-soft",
};

function modalityTone(m: string): string {
  return MODALITY_TONE[m] ?? "bg-sand text-ink-soft";
}

export function StudioCard({ studio, distanceKm }: StudioCardProps) {
  const primaryBarrio = studio.barrios[0]
    ? getBarrioBySlug(studio.barrios[0])
    : undefined;
  const groupMax = studio.groupSize.max;
  const fromMonthly = studio.pricing.fromMonthly;
  const isBarre = studio.modalities.includes("barre");

  return (
    <Link
      href={`/estudios/${studio.slug}/`}
      className="lift-on-hover group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream"
      aria-label={`Ver ficha de ${studio.name}`}
    >
      <div className="relative">
        <StudioVisual studio={studio} />
        {typeof distanceKm === "number" && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-ink shadow-[0_2px_10px_-3px_rgba(42,38,34,0.15)] backdrop-blur-sm">
            {formatDistance(distanceKm)}
          </span>
        )}
        {isBarre && (
          <span className="absolute right-4 top-4 rounded-full bg-terra/90 px-3 py-1 text-xs font-medium text-cream shadow-[0_2px_10px_-3px_rgba(42,38,34,0.15)]">
            Barre
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs">
          {primaryBarrio && (
            <span className="rounded-full bg-sand px-3 py-1 text-ink-soft">
              {primaryBarrio.name}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
            verificado
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl text-ink transition-colors group-hover:text-sage">
          {studio.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
          {studio.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {studio.modalities.slice(0, 3).map((m: Modality | string) => (
            <span
              key={m}
              className={`rounded-full px-2.5 py-0.5 text-[11px] ${modalityTone(m)}`}
            >
              {modalityLabel(m)}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-ink-soft">
              {fromMonthly != null ? "Mensualidad desde" : "Drop-in desde"}
            </div>
            <div className="mt-0.5 font-display text-2xl text-ink">
              {fromMonthlyLabel(studio)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-ink-soft">
              Grupo máx.
            </div>
            <div className="mt-0.5 text-sm text-ink">
              {groupMax ?? "—"}
              {groupMax ? <span className="text-ink-soft"> pers.</span> : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PriceFormatted({ price }: { price: number }) {
  return <span>{formatPrice(price)}</span>;
}
