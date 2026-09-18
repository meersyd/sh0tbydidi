import { scrollToId } from "../utils/format";

export function FinalCTA() {
  return (
    <section className="px-5 pb-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-ink px-6 py-16 text-center text-cream md:px-16 md:py-24">
        <p className="text-[11px] font-medium tracking-[0.22em] text-cream/50 uppercase">
          Ready when you are
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight md:text-6xl">
          Got the fit? Let's shoot.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-cream/70 md:text-lg">
          Bring your people. Put on the gown. I'll handle the camera.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" className="btn-on-dark" onClick={() => scrollToId("book")}>
            Book a Session
          </button>
          <button
            type="button"
            className="btn-on-dark-outline"
            onClick={() => scrollToId("work")}
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
}
