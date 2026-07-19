"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { nav, company } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-[72px]">
          <a href="#top" aria-label={company.name}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principale">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${company.phoneHref}`}
              className="btn-ghost"
              aria-label="Appeler Opalo Logistique"
            >
              <Phone className="h-4 w-4" />
              {company.phone}
            </a>
            <a href="#tarifs" className="btn-primary">
              Obtenir un devis
            </a>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x lg:hidden"
          >
            <div className="mt-2 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-card">
              <nav className="flex flex-col" aria-label="Mobile">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-medium text-ink-soft hover:bg-brand-50 hover:text-brand-700"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-2 grid gap-2 border-t border-slate-100 pt-3">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="btn-ghost w-full"
                  onClick={() => setOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </a>
                <a
                  href="#tarifs"
                  className="btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  Obtenir un devis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
