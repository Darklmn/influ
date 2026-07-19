"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  PackageCheck,
  Truck,
  MapPin,
  CheckCircle2,
  Search,
} from "lucide-react";
import { company, stats } from "@/lib/content";

const ease = [0.21, 0.6, 0.35, 1] as const;

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_30%,transparent_75%)]" />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              Livraison suivie en temps réel
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="mt-5 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl md:text-6xl"
            >
              La logistique qui fait{" "}
              <span className="text-gradient">avancer</span> votre business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              {company.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.19, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#tarifs" className="btn-primary text-base">
                Obtenir un devis gratuit
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#services" className="btn-ghost text-base">
                Découvrir nos services
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted"
            >
              {["Sans engagement", "Devis sous 24h", "Assurance incluse"].map(
                (t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-600" />
                    {t}
                  </li>
                )
              )}
            </motion.ul>
          </div>

          {/* Right — tracking card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand-100/60 to-transparent blur-2xl" />

            <div className="card relative overflow-hidden p-5 sm:p-6">
              {/* top bar */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
                    <PackageCheck className="h-4 w-4" />
                  </span>
                  Suivi d&apos;expédition
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  En transit
                </span>
              </div>

              {/* fake search */}
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-sm text-ink-muted">
                <Search className="h-4 w-4 text-brand-500" />
                <span className="font-mono tracking-tight text-ink-soft">
                  OPL-2026-48213-MA
                </span>
              </div>

              {/* timeline */}
              <ol className="mt-5 space-y-4">
                {[
                  { icon: PackageCheck, label: "Colis pris en charge", time: "08:12", done: true },
                  { icon: Truck, label: "En cours d'acheminement", time: "11:47", done: true },
                  { icon: MapPin, label: "Livraison estimée aujourd'hui", time: "17:30", done: false },
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="relative flex flex-col items-center">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-full ${
                          s.done
                            ? "bg-brand-600 text-white"
                            : "border-2 border-dashed border-brand-300 bg-white text-brand-400"
                        }`}
                      >
                        <s.icon className="h-4 w-4" />
                      </span>
                      {i < 2 && (
                        <span className="mt-1 h-6 w-0.5 rounded bg-brand-100" />
                      )}
                    </div>
                    <div className="flex flex-1 items-center justify-between pt-1.5">
                      <span
                        className={`text-sm font-medium ${
                          s.done ? "text-ink" : "text-ink-muted"
                        }`}
                      >
                        {s.label}
                      </span>
                      <span className="font-mono text-xs text-ink-muted">
                        {s.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* progress */}
              <div className="mt-5 rounded-2xl bg-brand-50/70 p-4">
                <div className="flex items-center justify-between text-xs font-medium text-brand-800">
                  <span>Casablanca</span>
                  <span>Rabat</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "72%" }}
                    transition={{ duration: 1.4, delay: 0.7, ease }}
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
                  />
                </div>
              </div>
            </div>

            {/* floating badge */}
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 -top-4 hidden rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-card sm:block"
            >
              <p className="text-2xl font-extrabold text-ink">99,4%</p>
              <p className="text-xs text-ink-muted">livrés à l&apos;heure</p>
            </motion.div>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 md:mt-20 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-7 text-center">
              <p className="text-3xl font-extrabold text-ink md:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
