"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { company } from "@/lib/content";

export function CTA() {
  return (
    <section id="contact" className="pb-24 md:pb-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-ink px-8 py-16 text-center md:px-16 md:py-20"
        >
          {/* glow */}
          <div className="pointer-events-none absolute inset-0 opacity-80 [background:radial-gradient(50%_60%_at_50%_0%,rgba(47,128,255,.4),transparent_60%),radial-gradient(40%_50%_at_90%_100%,rgba(21,94,240,.35),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl md:leading-[1.1]">
              Prêt à accélérer votre logistique ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Obtenez un devis personnalisé sous 24h et découvrez combien
              Opalo peut vous faire gagner en temps et en fiabilité.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${company.email}`}
                className="btn bg-white px-6 py-3.5 text-base text-ink hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Demander un devis
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`tel:${company.phoneHref}`}
                className="btn border border-white/20 bg-white/5 px-6 py-3.5 text-base text-white backdrop-blur hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {company.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
