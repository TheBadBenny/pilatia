"use client";

import { useState } from "react";
import { findBestNearby, type NearbyResult } from "@/lib/studios";
import { StudioCard } from "./StudioCard";

type Status = "idle" | "loading" | "success" | "denied" | "unavailable" | "error";

interface NearMeProps {
  initialMessage?: string;
}

export function NearMe({}: NearMeProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<NearbyResult[]>([]);

  const findNearby = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const best = findBestNearby(userCoords, 3);
        setResults(best);
        setStatus("success");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
        } else {
          setStatus("error");
        }
      },
      { timeout: 10000, maximumAge: 60000, enableHighAccuracy: false }
    );
  };

  return (
    <div className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
            Cerca de ti
          </p>
          <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
            Te enseño los mejores estudios cerca de ti.
          </h2>
          <p className="mt-3 text-sm text-ink-soft">
            Usamos tu ubicación para ordenar los estudios por proximidad y
            precio. No se guarda nada — sólo se usa una vez para esta búsqueda.
          </p>
        </div>
        <div className="shrink-0">
          {status !== "success" && (
            <button
              type="button"
              onClick={findNearby}
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-cream" />
                  Buscando…
                </>
              ) : (
                <>Encontrar cerca de mí</>
              )}
            </button>
          )}
          {status === "success" && (
            <button
              type="button"
              onClick={findNearby}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3 text-ink transition-colors hover:border-sage"
            >
              Volver a buscar
            </button>
          )}
        </div>
      </div>

      {status === "denied" && (
        <p className="mt-6 rounded-lg border border-line bg-sand/60 p-4 text-sm text-ink-soft">
          Has denegado el permiso de ubicación. Puedes seguir explorando por
          barrio en el footer o más abajo.
        </p>
      )}
      {status === "error" && (
        <p className="mt-6 rounded-lg border border-line bg-sand/60 p-4 text-sm text-ink-soft">
          No hemos podido obtener tu ubicación. Prueba de nuevo o explora por
          barrio.
        </p>
      )}
      {status === "unavailable" && (
        <p className="mt-6 rounded-lg border border-line bg-sand/60 p-4 text-sm text-ink-soft">
          Tu navegador no soporta geolocalización. Explora los estudios por
          barrio.
        </p>
      )}

      {status === "success" && results.length > 0 && (
        <div className="mt-8">
          <p className="mb-4 text-sm text-ink-soft">
            Top 3 estudios optimizando proximidad y precio:
          </p>
          <div className="stagger-children grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => (
              <StudioCard
                key={r.studio.slug}
                studio={r.studio}
                distanceKm={r.distanceKm}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
