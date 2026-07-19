# Opalo Logistique — Frontend

Landing page premium pour **Opalo Logistique** (transport & logistique).
Bleu & blanc, animations fluides, 100% responsive.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** · **Framer Motion** · **lucide-react**
- Build 100% statique · SEO (OpenGraph, sitemap, robots) · Accessible

## Démarrer en local

```bash
npm install
npm run dev        # développement → http://localhost:3000
```

Pour la version optimisée (production) :

```bash
npm run build
npm run start      # → http://localhost:3000
```

## Personnaliser (aucune connaissance technique requise)

Tout le contenu est centralisé dans **`lib/content.ts`** :

| À modifier | Emplacement |
| --- | --- |
| Nom, téléphone, email, adresse | `company` |
| Services & descriptions | `services` |
| **Tarifs / prix** | `pricing` |
| Statistiques (chiffres clés) | `stats` |
| Logos clients | `trustedBy` |
| Avis clients | `testimonials` |
| Questions FAQ | `faqs` |

### Remplacer le logo par votre PNG

1. Placez votre fichier dans `public/logo.png`
2. Dans `components/logo.tsx`, remplacez le bloc `<svg>` par :
   ```tsx
   <img src="/logo.png" alt="Opalo Logistique" className="h-9 w-auto" />
   ```

### Changer la couleur de marque

Dans `tailwind.config.ts`, ajustez la palette `brand` (bleu par défaut).

## Structure

```
app/            → layout, page, SEO (robots, sitemap)
components/
  site/         → Header, Hero, Services, Solutions, Tracking,
                  Process, Pricing, Testimonials, FAQ, CTA, Footer
  logo, icon, reveal, section-heading  → primitives réutilisables
lib/
  content.ts    → 🔧 tout le contenu éditable (textes, prix)
  utils.ts      → helper cn()
```

> ℹ️ Les tarifs et statistiques sont **indicatifs** — remplacez-les par
> les données réelles de votre site.
