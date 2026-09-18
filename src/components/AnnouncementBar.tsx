import { scrollToId } from "../utils/format";

const MESSAGE = (
  <span className="inline-flex items-center gap-x-3 whitespace-nowrap">
    <span>🎓</span>
    <strong className="font-semibold tracking-[0.08em]">
      3 DAYS ONLY — 23–25 OCTOBER 2026
    </strong>
    <span aria-hidden className="text-cream/40">
      ·
    </span>
    <span>
      Pre-convo sessions are available{" "}
      <strong className="font-semibold">during gown collection week only</strong>.
      Limited slots available —{" "}
      <strong className="font-semibold">book yours before it&apos;s gone!</strong>
    </span>
  </span>
);

export function AnnouncementBar() {
  const copies = [0, 1, 2, 3];

  return (
    <button
      type="button"
      className="announce-bar relative z-30 block w-full overflow-hidden bg-ink py-2.5 text-cream"
      aria-label="3 days only, 23 to 25 October 2026. Pre-convo sessions during gown collection week. Book a session."
      onClick={() => scrollToId("book")}
    >
      <span className="sr-only">
        3 days only — 23–25 October 2026. Pre-convo sessions are available during
        gown collection week only. Limited slots available. Click to book.
      </span>
      <span className="announce-track" aria-hidden="true">
        {copies.map((copy) => (
          <span
            key={copy}
            className="inline-flex items-center px-8 text-[11px] tracking-wide uppercase md:text-xs"
          >
            {MESSAGE}
          </span>
        ))}
      </span>
      <span className="announce-static mx-auto hidden max-w-3xl px-5 text-center text-[11px] leading-relaxed tracking-wide uppercase md:text-xs">
        🎓 <strong>3 DAYS ONLY — 23–25 OCTOBER 2026</strong>
        <span className="mx-2 text-cream/40">·</span>
        Pre-convo sessions are available{" "}
        <strong>during gown collection week only</strong>. Limited slots —{" "}
        <strong>book yours before it&apos;s gone!</strong>
      </span>
    </button>
  );
}
