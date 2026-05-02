import Script from "next/script";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function Analytics() {
  return (
    <>
      {/* Plausible (privacy-first, no cookies, GDPR-compliant) */}
      {PLAUSIBLE_DOMAIN && (
        <Script
          strategy="afterInteractive"
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.outbound-links.js"
        />
      )}

      {/* Cloudflare Web Analytics (privacy-first, free, no cookies) */}
      {CF_BEACON_TOKEN && (
        <Script
          id="cf-web-analytics"
          strategy="afterInteractive"
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
        />
      )}

      {/* Google Analytics 4 — requires cookie consent banner in EU.
          Solo se carga si NEXT_PUBLIC_GA_MEASUREMENT_ID está definido.
          Recomendamos Plausible/Cloudflare para evitar el banner. */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
