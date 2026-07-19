"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, PackageCheck, Truck, MapPin, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

type Result = {
  ref: string;
  from: string;
  to: string;
  eta: string;
};

export function Tracking() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || loading) return;
    setLoading(true);
    setResult(null);
    // Démo front — branchez ici votre API de suivi réelle.
    setTimeout(() => {
      setResult({
        ref: value.trim().toUpperCase(),
        from: "Casablanca",
        to: "Marrakech",
        eta: "Aujourd'hui, avant 18h00",
      });
      setLoading(false);
    }, 900);
  };

  return (
    <section id="suivi" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Suivi en direct"
          title="Où est mon colis ?"
          subtitle="Saisissez votre numéro de suivi pour connaître l'état de votre expédition en un instant."
        />

        <div className="mx-auto mt-12 max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-card sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4">
              <Search className="h-5 w-5 shrink-0 text-brand-500" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ex. OPL-2026-48213-MA"
                aria-label="Numéro de suivi"
                className="w-full bg-transparent py-4 font-mono text-sm text-ink outline-none placeholder:text-ink-muted"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0 py-4" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Suivre
            </button>
          </form>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.ref}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="card mt-5 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-ink-muted">
                      Référence
                    </p>
                    <p className="font-mono font-semibold text-ink">{result.ref}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-600">
                    En transit
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between gap-2">
                  {[
                    { icon: PackageCheck, label: result.from, done: true },
                    { icon: Truck, label: "En route", done: true },
                    { icon: MapPin, label: result.to, done: false },
                  ].map((s, i, arr) => (
                    <div key={i} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-full ${
                            s.done ? "bg-brand-600 text-white" : "border-2 border-dashed border-brand-300 text-brand-400"
                          }`}
                        >
                          <s.icon className="h-4 w-4" />
                        </span>
                        <span className="text-xs font-medium text-ink-soft">
                          {s.label}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="mx-1 h-0.5 flex-1 rounded bg-gradient-to-r from-brand-500 to-brand-100" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-brand-50/70 px-4 py-3 text-sm text-brand-800">
                  <span className="font-semibold">Livraison estimée :</span>{" "}
                  {result.eta}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
