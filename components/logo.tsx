import { cn } from "@/lib/utils";

/**
 * Wordmark Opalo Logistique (SVG, bleu & blanc).
 * Remplacez le bloc <svg> "mark" par votre logo PNG :
 *   <img src="/logo.png" alt="Opalo Logistique" className="h-9 w-auto" />
 */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          aria-hidden="true"
        >
          {/* stylised "O" ring + delivery arrow */}
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.4" opacity="0.35" />
          <path
            d="M6 12a6 6 0 0 1 10-4.4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M16 4.5v3.2h-3.2"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[17px] font-extrabold tracking-tight",
            light ? "text-white" : "text-ink"
          )}
        >
          Opalo
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.2em]",
            light ? "text-brand-100" : "text-brand-600"
          )}
        >
          Logistique
        </span>
      </span>
    </span>
  );
}
