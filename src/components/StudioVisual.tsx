"use client";

import { useState } from "react";
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
  const [imageError, setImageError] = useState(false);
  const variant = pickVariant(studio.slug);
  const heightClass =
    size === "sm" ? "h-32" : size === "lg" ? "h-56" : "h-44";
  const showImage = studio.image && !imageError;
  const local = studio.image?.localBasename;

  return (
    <div
      className={`relative ${heightClass} overflow-hidden rounded-t-2xl bg-sand`}
    >
      <div className="absolute -top-10 -right-10 h-56 w-56 sm:h-72 sm:w-72">
        <OrganicShape variant={variant} opacity={0.32} />
      </div>
      {showImage ? (
        <>
          {local ? (
            // Self-hosted optimized: webp + jpg fallback, responsive srcset
            <picture>
              <source
                type="image/webp"
                srcSet={`/img/studios/${local}-320.webp 320w, /img/studios/${local}-640.webp 640w, /img/studios/${local}-1024.webp 1024w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <img
                src={`/img/studios/${local}-640.jpg`}
                alt={`Foto de ${studio.name}`}
                loading="lazy"
                decoding="async"
                width={640}
                height={384}
                onError={() => setImageError(true)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
          ) : (
            // Fallback: hot-link directo (estudios sin imagen optimizada todavía)
            <img
              src={studio.image!.url}
              alt={`Foto de ${studio.name} (${studio.image!.credit})`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Subtle gradient at the bottom for legibility */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          <span className="absolute bottom-2 right-3 rounded-full bg-cream/90 px-2 py-0.5 text-[10px] text-ink-soft backdrop-blur-sm">
            Foto: {studio.image!.credit}
          </span>
        </>
      ) : (
        <div className="absolute bottom-4 left-5 right-5">
          <p className="font-display text-2xl text-ink-soft sm:text-3xl">
            {studio.name}
          </p>
        </div>
      )}
    </div>
  );
}
