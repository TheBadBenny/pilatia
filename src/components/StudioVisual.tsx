import { OrganicShape } from "./OrganicShape";
import type { Studio } from "@/lib/types";

const VARIANT_BY_INDEX = ["sage", "rose", "terra"] as const;

function pickVariant(slug: string): (typeof VARIANT_BY_INDEX)[number] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return VARIANT_BY_INDEX[Math.abs(hash) % VARIANT_BY_INDEX.length];
}

interface StudioVisualProps {
  studio: Studio;
  size?: "sm" | "md" | "lg";
}

export function StudioVisual({ studio, size = "md" }: StudioVisualProps) {
  const variant = pickVariant(studio.slug);
  const heightClass =
    size === "sm" ? "h-32" : size === "lg" ? "h-56" : "h-44";
  return (
    <div
      className={`relative ${heightClass} overflow-hidden rounded-t-2xl bg-sand`}
    >
      <div className="absolute -top-10 -right-10 h-56 w-56 sm:h-72 sm:w-72">
        <OrganicShape variant={variant} opacity={0.32} />
      </div>
      <div className="absolute bottom-4 left-5 right-5">
        <p className="font-display text-2xl text-ink-soft sm:text-3xl">
          {studio.name}
        </p>
      </div>
    </div>
  );
}
