import { trustedBy } from "@/lib/content";

export function TrustedBy() {
  const items = [...trustedBy, ...trustedBy];
  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <div className="container-x">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Ils nous font confiance au quotidien
        </p>
      </div>
      <div className="group relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused]">
          {items.map((name, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-xl font-bold text-slate-400 transition-colors hover:text-brand-600"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
