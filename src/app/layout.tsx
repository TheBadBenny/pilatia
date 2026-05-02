import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  buildOrganizationLD,
  jsonLdScript,
} from "@/lib/seo";

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
      </body>
    </html>
  );
}
