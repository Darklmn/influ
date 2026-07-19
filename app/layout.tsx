import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { company } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const url = "https://www.opalologistique.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: `${company.name} — Transport & Logistique sur mesure`,
    template: `%s · ${company.name}`,
  },
  description: company.description,
  keywords: [
    "logistique",
    "transport",
    "fret maritime",
    "fret aérien",
    "entreposage",
    "e-commerce",
    "dernier kilomètre",
    "Maroc",
    "Casablanca",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url,
    siteName: company.name,
    title: `${company.name} — Transport & Logistique sur mesure`,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} — Transport & Logistique`,
    description: company.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#155ef0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
