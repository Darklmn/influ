import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.opalologistique.com";
  return [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/#services`, priority: 0.8 },
    { url: `${base}/#tarifs`, priority: 0.8 },
    { url: `${base}/#suivi`, priority: 0.7 },
  ];
}
