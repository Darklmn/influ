"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/content";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { BarChart3, TrendingUp } from "lucide-react";

export function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden bg-ink py-24 md:py-32">
      {/* glow bg */}
      <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(50%_50%_at_20%_0%,rgba(47,128,255,.35),transparent_60%),radial-gradient(40%_40%_at_100%_100%,rgba(21,94,240,.28),transparent_60%)]" />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* left copy + dashboard */}
          <div>
            <span className="eyebrow border-white/10 bg-white/10 text-brand-100">
              Plateforme Opalo
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
              Le contrôle total sur votre supply chain
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-300">
              Un tableau de bord unique pour piloter vos expéditions,
              anticiper les retards et mesurer votre performance en direct.
            </p>

            {/* mini dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <BarChart3 className="h-4 w-4 text-brand-300" />
                  Volume expédié
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                  <TrendingUp className="h-3 w-3" /> +24%
                </span>
              </div>
              <div className="mt-5 flex h-28 items-end gap-2">
                {[40, 55, 48, 70, 62, 85, 78, 96].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.06 }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600 to-brand-300"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* right — feature grid */}
          <SectionHeading
            className="sr-only"
            title="Fonctionnalités"
            center={false}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-brand-400/40 hover:bg-white/[0.07]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-200">
                  <Icon name={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
