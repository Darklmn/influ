"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/content";
import { SectionHeading } from "@/components/section-heading";

export function Process() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_50%,#000,transparent)]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Notre méthode"
          title="Simple, fluide, transparent"
          subtitle="Quatre étapes pour livrer vos clients sans friction, avec une visibilité totale à chaque instant."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="relative text-center lg:text-left"
              >
                <div className="mx-auto grid h-[76px] w-[76px] place-items-center rounded-2xl border border-slate-200 bg-white text-2xl font-extrabold text-brand-600 shadow-soft lg:mx-0">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
