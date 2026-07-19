"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { pricing } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Tarifs"
          title="Des offres claires, sans surprise"
          subtitle="Choisissez la formule adaptée à vos volumes. Tarifs indicatifs — un devis précis vous est établi sous 24h."
        />

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7",
                p.highlighted
                  ? "border-brand-600 bg-ink text-white shadow-glow lg:-translate-y-3"
                  : "border-slate-200 bg-white shadow-soft"
              )}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-glow">
                  <Sparkles className="h-3 w-3" /> Le plus choisi
                </span>
              )}

              <h3
                className={cn(
                  "text-lg font-bold",
                  p.highlighted ? "text-white" : "text-ink"
                )}
              >
                {p.name}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  p.highlighted ? "text-slate-300" : "text-ink-muted"
                )}
              >
                {p.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1">
                {p.price === "Sur devis" ? (
                  <span
                    className={cn(
                      "text-3xl font-extrabold",
                      p.highlighted ? "text-white" : "text-ink"
                    )}
                  >
                    Sur devis
                  </span>
                ) : (
                  <>
                    <span
                      className={cn(
                        "text-[2.75rem] font-extrabold leading-none",
                        p.highlighted ? "text-white" : "text-ink"
                      )}
                    >
                      {p.price}
                    </span>
                    <span
                      className={cn(
                        "mb-1 text-sm font-semibold",
                        p.highlighted ? "text-slate-300" : "text-ink-muted"
                      )}
                    >
                      DH {p.unit}
                    </span>
                  </>
                )}
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px]">
                    <span
                      className={cn(
                        "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                        p.highlighted
                          ? "bg-brand-500/25 text-brand-200"
                          : "bg-brand-100 text-brand-700"
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    </span>
                    <span className={p.highlighted ? "text-slate-200" : "text-ink-soft"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={cn(
                  "btn mt-8 w-full py-3.5",
                  p.highlighted
                    ? "bg-brand-600 text-white hover:bg-brand-500"
                    : "border border-slate-200 bg-white text-ink hover:border-brand-200 hover:bg-brand-50"
                )}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          Besoin d&apos;un volume spécifique ?{" "}
          <a href="#contact" className="font-semibold text-brand-600 hover:underline">
            Parlons de votre projet →
          </a>
        </p>
      </div>
    </section>
  );
}
