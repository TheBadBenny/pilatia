"use client";

import { useMemo, useState } from "react";
import {
  fromMonthlyLabel,
  modalityLabel,
} from "@/lib/studios";
import type { Barrio, Modality, Studio } from "@/lib/types";
import { StudioCard } from "./StudioCard";

interface FilterBarProps {
  studios: Studio[];
  barrios: Barrio[];
  initialBarrio?: string;
}

const MODALITY_OPTIONS: Modality[] = ["reformer", "mat", "barre"];
type SortKey = "price-asc" | "price-desc" | "name";

export function FilterBar({ studios, barrios, initialBarrio }: FilterBarProps) {
  const [selectedBarrios, setSelectedBarrios] = useState<string[]>(
    initialBarrio ? [initialBarrio] : []
  );
  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const [sort, setSort] = useState<SortKey>("price-asc");

  const filtered = useMemo(() => {
    let list = studios;
    if (selectedBarrios.length > 0) {
      list = list.filter((s) =>
        s.barrios.some((b) => selectedBarrios.includes(b))
      );
    }
    if (selectedModalities.length > 0) {
      list = list.filter((s) =>
        selectedModalities.some((m) => s.modalities.includes(m))
      );
    }
    if (sort === "price-asc") {
      list = [...list].sort(
        (a, b) =>
          (a.pricing.fromMonthly ?? Infinity) -
          (b.pricing.fromMonthly ?? Infinity)
      );
    } else if (sort === "price-desc") {
      list = [...list].sort(
        (a, b) =>
          (b.pricing.fromMonthly ?? -1) - (a.pricing.fromMonthly ?? -1)
      );
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [studios, selectedBarrios, selectedModalities, sort]);

  function toggleBarrio(slug: string) {
    setSelectedBarrios((cur) =>
      cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]
    );
  }
  function toggleModality(m: Modality) {
    setSelectedModalities((cur) =>
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]
    );
  }

  const activeCount = selectedBarrios.length + selectedModalities.length;

  return (
    <div>
      <div className="rounded-2xl border border-line bg-cream p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
              Filtros
            </p>
            <h3 className="mt-1 font-display text-xl text-ink">
              {filtered.length} {filtered.length === 1 ? "estudio" : "estudios"}{" "}
              {activeCount > 0 ? "filtrados" : "verificados"}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-wider text-ink-soft">
              Ordenar
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-full border border-line bg-cream px-4 text-sm text-ink"
            >
              <option value="price-asc">Precio · asc</option>
              <option value="price-desc">Precio · desc</option>
              <option value="name">Nombre · A-Z</option>
            </select>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-ink-soft">
              Barrio
            </p>
            <div className="flex flex-wrap gap-2">
              {barrios.map((b) => {
                const active = selectedBarrios.includes(b.slug);
                return (
                  <button
                    key={b.slug}
                    type="button"
                    onClick={() => toggleBarrio(b.slug)}
                    aria-pressed={active}
                    className={`min-h-[36px] rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-sage bg-sage text-cream"
                        : "border-line bg-cream text-ink hover:border-sage"
                    }`}
                  >
                    {b.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-wider text-ink-soft">
              Modalidad
            </p>
            <div className="flex flex-wrap gap-2">
              {MODALITY_OPTIONS.map((m) => {
                const active = selectedModalities.includes(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleModality(m)}
                    aria-pressed={active}
                    className={`min-h-[36px] rounded-full border px-4 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-sage bg-sage text-cream"
                        : "border-line bg-cream text-ink hover:border-sage"
                    }`}
                  >
                    {modalityLabel(m)}
                  </button>
                );
              })}
            </div>
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setSelectedBarrios([]);
                setSelectedModalities([]);
              }}
              className="text-sm text-ink-soft underline hover:text-sage"
            >
              Borrar filtros
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-cream p-10 text-center">
          <p className="font-display text-xl text-ink">
            No hay estudios que coincidan.
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Prueba a quitar algún filtro.
          </p>
        </div>
      ) : (
        <div className="stagger-children mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <StudioCard key={s.slug} studio={s} />
          ))}
        </div>
      )}

      <p className="mt-8 text-xs text-ink-soft">
        Mostrando {filtered.length} de {studios.length} estudios. Mensualidades
        ordenadas{" "}
        {filtered[0]
          ? `desde ${fromMonthlyLabel(filtered[0])}`
          : "—"}
        .
      </p>
    </div>
  );
}
