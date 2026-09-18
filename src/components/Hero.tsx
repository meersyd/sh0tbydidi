import { siteConfig, getStartingPrice } from "../config/siteConfig";
import { formatPrice, scrollToId } from "../utils/format";
import { Photo } from "./Photo";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-32 pb-16 md:px-8 md:pt-36 md:pb-24">
      <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="order-2 animate-fade-up lg:order-1 lg:col-span-5 lg:pb-6">
          <p className="mb-5 text-[11px] font-medium tracking-[0.22em] text-mute uppercase">
            Pre-convocation photography
          </p>
          <h1 className="font-serif text-[3.15rem] leading-[0.92] tracking-tight text-ink sm:text-6xl lg:text-[5.15rem]">
            <span className="block">Shoot.</span>
            <span className="block">Smile.</span>
            <span className="block">Done.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            {siteConfig.hero.support}
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-mute">
            {siteConfig.hero.secondary}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => scrollToId("work")}
            >
              View My Work
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToId("book")}
            >
              Book a Session
            </button>
          </div>
          <p className="mt-6 text-sm text-mute">
            Starting from {formatPrice(getStartingPrice())}/person
          </p>
        </div>

        <div
          className="order-1 animate-fade-up lg:order-2 lg:col-span-7"
          style={{ animationDelay: "80ms" }}
        >
          <Photo
            src={siteConfig.hero.image}
            alt={siteConfig.hero.imageAlt}
            variant={0}
            loading="eager"
            fetchPriority="high"
            fit="contain"
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="mx-auto aspect-[1751/2976] h-[min(62svh,36rem)] w-auto max-w-full rounded-2xl bg-cream md:h-[min(70svh,42rem)] lg:h-[min(76svh,46rem)]"
            imgClassName="motion-safe:transition-transform motion-safe:duration-700"
          />
        </div>
      </div>
    </section>
  );
}
