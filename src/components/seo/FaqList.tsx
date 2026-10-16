import type { FaqItem } from "@/lib/seo";

// Native <details> keeps every answer in the HTML (crawlable) with no JavaScript.
export default function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <details
          key={f.q}
          className="group rounded-2xl border border-white/10 bg-[#0e0e14]/90 px-5 py-4 open:border-[#FAB406]/30"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white">{f.q}</h3>
            <span
              aria-hidden="true"
              className="text-[#FAB406] text-xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-zinc-300">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
