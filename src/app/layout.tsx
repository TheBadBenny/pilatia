import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  buildOrganizationLD,
  jsonLdScript,
} from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#faf6f1" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const websiteLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Pilatia · Pilates Madrid",
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  inLanguage: "es-ES",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · Pilates y barre en Madrid: comparador de estudios`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "pilates Madrid",
    "barre Madrid",
    "barre pilates Madrid",
    "reformer pilates Madrid",
    "estudios pilates Madrid",
    "comparador pilates Madrid",
  ],
  alternates: {
    canonical: SITE_URL,
    languages: { "es-ES": SITE_URL },
  },
  openGraph: {
    title: `${SITE_NAME} · Pilates y barre en Madrid: comparador de estudios`,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} · Pilates y barre en Madrid`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · Pilates y barre en Madrid: comparador de estudios`,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/manifest.webmanifest`,
  authors: [{ name: SITE_NAME }],
  category: "fitness",
  other: {
    "geo.region": "ES-MD",
    "geo.placename": "Madrid",
    "geo.position": "40.4168;-3.7038",
    ICBM: "40.4168, -3.7038",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-ES"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(buildOrganizationLD())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteLD)}
        />
        <Analytics />
      </body>
    </html>
  );
}
