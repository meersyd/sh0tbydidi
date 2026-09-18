import { siteConfig } from "../config/siteConfig";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Pick",
    copy: "Choose your package and group size.",
  },
  {
    n: "02",
    title: "Slot",
    copy: "Choose your preferred date and time.",
  },
  {
    n: "03",
    title: "Shoot",
    copy: "Show up at the agreed location and let's shoot.",
  },
  {
    n: "04",
    title: "Receive",
    copy: `Photos are sent via ${siteConfig.photoDelivery.method}. Download all of them — the link expires after ${siteConfig.photoDelivery.expiryDays} days.`,
  },
];

export function HowItWorks() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-mute uppercase">
            Process
          </p>
          <h2 className="font-serif text-4xl tracking-tight md:text-5xl">How it works</h2>
          <p className="mt-4 text-lg text-mute">That's it. No complicated process.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <Reveal key={item.n} delay={index * 70}>
              <article>
                <p className="font-serif text-3xl text-ink/30">{item.n}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute md:text-base">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
