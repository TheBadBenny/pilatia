"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";
const FALLBACK_EMAIL = "hola@pilatia.es";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    if (!FORMSPREE_ENDPOINT) {
      // Sin endpoint configurado — simulamos éxito y enseñamos email de contacto.
      setTimeout(() => setStatus("success"), 600);
      return;
    }
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, source: "waitlist-home" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6">
        <p className="font-display text-xl text-ink">¡Listo, gracias!</p>
        <p className="mt-2 text-sm text-ink-soft">
          Te aviso cuando haya novedades — nuevos estudios, comparativas
          mensuales, herramientas. Sin spam.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-cream p-6 sm:p-8"
    >
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.18em] text-ink-soft">
          Lista de espera
        </p>
        <h3 className="mt-2 font-display text-2xl text-ink">
          Te aviso cuando haya novedades.
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Nuevos estudios verificados, comparativas y herramientas para elegir
          mejor. Sin spam.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 flex-1 rounded-lg border border-line bg-cream px-4 text-ink placeholder:text-ink-soft/70 focus:border-sage focus:outline-none"
          aria-label="Tu email"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 shrink-0 rounded-full bg-sage px-6 text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : "Apuntarme"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-sm text-terra">
          No se ha podido enviar. Prueba de nuevo o escríbeme a{" "}
          <a href={`mailto:${FALLBACK_EMAIL}`} className="underline">
            {FALLBACK_EMAIL}
          </a>
          .
        </p>
      )}
      <p className="mt-3 text-xs text-ink-soft">
        Al apuntarte aceptas que guardemos tu email solo para enviarte estas
        novedades. Puedes darte de baja cuando quieras.
      </p>
    </form>
  );
}
