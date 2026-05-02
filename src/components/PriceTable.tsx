import { formatPrice, modalityLabel } from "@/lib/studios";
import type { Studio } from "@/lib/types";

interface PriceTableProps {
  studio: Studio;
}

export function PriceTable({ studio }: PriceTableProps) {
  const { pricing } = studio;
  const hasMonthly = pricing.monthlyPlans && pricing.monthlyPlans.length > 0;
  const hasPackages = pricing.packages && pricing.packages.length > 0;
  const hasPrivate = !!pricing.private;
  const hasDropIn = !!pricing.dropIn || !!pricing.dropInMat;
  const hasTrial = !!pricing.trial;

  return (
    <div className="space-y-8">
      {hasMonthly && (
        <section>
          <h3 className="font-display text-xl text-ink">Mensualidades</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Suscripciones recurrentes — el precio por sesión sale más barato
            cuanto más frecuente es el plan.
          </p>
          <div className="mt-4 overflow-hidden rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead className="bg-sand/60 text-left text-xs uppercase tracking-wider text-ink-soft">
                <tr>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Modalidad</th>
                  <th className="px-4 py-3 text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {pricing.monthlyPlans!.map((plan, i) => (
                  <tr
                    key={i}
                    className="border-t border-line first:border-t-0"
                  >
                    <td className="px-4 py-3">
                      <div className="text-ink">{plan.label}</div>
                      {plan.note && (
                        <div className="mt-0.5 text-xs text-ink-soft">
                          {plan.note}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">
                      {modalityLabel(plan.modality)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-ink">
                      {formatPrice(plan.price)}
                      <span className="text-xs text-ink-soft">/mes</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {hasPackages && (
        <section>
          <h3 className="font-display text-xl text-ink">Bonos de clases</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pricing.packages!.map((pkg, i) => (
              <div
                key={i}
                className="rounded-lg border border-line bg-cream p-4"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-ink">
                    {pkg.label ?? `Bono ${pkg.sessions} clases`}
                  </span>
                  <span className="font-display text-lg text-ink">
                    {formatPrice(pkg.price)}
                  </span>
                </div>
                {pkg.validityDays && (
                  <div className="mt-1 text-xs text-ink-soft">
                    Caduca a los {pkg.validityDays} días
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {hasDropIn && (
        <section>
          <h3 className="font-display text-xl text-ink">Clases sueltas</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pricing.dropIn && (
              <div className="rounded-lg border border-line bg-cream p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-ink">
                    {pricing.dropIn.label ??
                      modalityLabel(pricing.dropIn.modality)}
                  </span>
                  <span className="font-display text-lg text-ink">
                    {formatPrice(pricing.dropIn.price)}
                  </span>
                </div>
              </div>
            )}
            {pricing.dropInMat && (
              <div className="rounded-lg border border-line bg-cream p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-ink">
                    {pricing.dropInMat.label ??
                      modalityLabel(pricing.dropInMat.modality)}
                  </span>
                  <span className="font-display text-lg text-ink">
                    {formatPrice(pricing.dropInMat.price)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {hasPrivate && (
        <section>
          <h3 className="font-display text-xl text-ink">Clases privadas</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {pricing.private!.single && (
              <PrivatePill label="Sesión" price={pricing.private!.single} />
            )}
            {pricing.private!.fourPack && (
              <PrivatePill label="Bono 4" price={pricing.private!.fourPack} />
            )}
            {pricing.private!.fivePack && (
              <PrivatePill label="Bono 5" price={pricing.private!.fivePack} />
            )}
            {pricing.private!.eightPack && (
              <PrivatePill label="Bono 8" price={pricing.private!.eightPack} />
            )}
            {pricing.private!.tenPack && (
              <PrivatePill label="Bono 10" price={pricing.private!.tenPack} />
            )}
            {pricing.private!.twelvePack && (
              <PrivatePill label="Bono 12" price={pricing.private!.twelvePack} />
            )}
          </div>
          {pricing.private!.note && (
            <p className="mt-3 text-xs text-ink-soft">{pricing.private!.note}</p>
          )}
        </section>
      )}

      {hasTrial && (
        <section className="rounded-lg border border-sage/30 bg-sage/8 p-5">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-ink-soft">
                Clase de prueba
              </p>
              <p className="mt-1 text-ink">{pricing.trial!.details}</p>
            </div>
            <p className="font-display text-xl text-ink">
              {pricing.trial!.price === 0 || pricing.trial!.type === "gratuita"
                ? "Gratis"
                : pricing.trial!.price !== undefined
                  ? formatPrice(pricing.trial!.price)
                  : "—"}
            </p>
          </div>
        </section>
      )}

      {pricing.notes && (
        <p className="text-xs text-ink-soft">Nota: {pricing.notes}</p>
      )}

      <p className="text-xs text-ink-soft">
        Última verificación de precios:{" "}
        <time dateTime={studio.lastVerified} className="text-ink">
          {new Date(studio.lastVerified).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        . Si has visto algo desactualizado,{" "}
        <a
          href={`mailto:hola@pilatia.es?subject=Precio desactualizado en ${encodeURIComponent(
            studio.name
          )}`}
          className="underline hover:text-sage"
        >
          avísanos
        </a>
        .
      </p>
    </div>
  );
}

function PrivatePill({ label, price }: { label: string; price: number }) {
  return (
    <div className="rounded-full border border-line bg-cream px-4 py-2 text-sm">
      <span className="text-ink-soft">{label}: </span>
      <span className="font-medium text-ink">{formatPrice(price)}</span>
    </div>
  );
}
