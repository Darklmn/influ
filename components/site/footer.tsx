import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Facebook } from "lucide-react";
import { Logo } from "@/components/logo";
import { company, nav, services } from "@/lib/content";

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-x py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {company.baseline} Transport, entreposage et logistique
              e-commerce, partout au Maroc et à l&apos;international.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Linkedin, href: company.socials.linkedin, label: "LinkedIn" },
                { icon: Instagram, href: company.socials.instagram, label: "Instagram" },
                { icon: Facebook, href: company.socials.facebook, label: "Facebook" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-ink-soft transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Navigation</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-ink-soft transition-colors hover:text-brand-600">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Services</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {services.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-ink-soft transition-colors hover:text-brand-600">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <a href={`tel:${company.phoneHref}`} className="hover:text-brand-600">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <a href={`mailto:${company.email}`} className="hover:text-brand-600">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {company.address}
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {company.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 text-sm text-ink-muted sm:flex-row">
          <p>
            © {year} {company.name}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-600">Mentions légales</a>
            <a href="#" className="hover:text-brand-600">Confidentialité</a>
            <a href="#" className="hover:text-brand-600">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
