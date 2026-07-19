"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/content";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nos services"
          title="Une chaîne logistique complète, de A à Z"
          subtitle="Du premier au dernier kilomètre, Opalo orchestre l'ensemble de vos flux avec une exigence de service constante."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.21, 0.6, 0.35, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                {s.desc}
              </p>

              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-100 text-brand-700">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
