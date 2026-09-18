import { Reveal, SectionHeading } from "./Reveal";

const PRINCIPLES = [
  {
    n: "01",
    title: "One Location",
    copy: "Shoot at one fixed location. No location hopping.",
  },
  {
    n: "02",
    title: "Your Outfit",
    copy: "Come in your own graduation outfit. No outfit changes are allowed during the shoot.",
  },
  {
    n: "03",
    title: "No Editing",
    copy: "Photos are delivered straight out of camera. No retouching or colour grading.",
  },
  {
    n: "04",
    title: "Just Moments",
    copy: "Individual portraits, friends, family, group shots and candid moments.",
  },
];

export function ServicePrinciples() {
  return (
    <section id="about" className="scroll-mt-36 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="The idea"
            title="Keep it simple."
            description="You show up. We shoot. You get the photos."
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
            sh0tbydidi is built for graduates who want a straightforward
            pre-convocation photoshoot without complicated packages, outfit
            changes or hours of post-production.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {PRINCIPLES.map((item, index) => (
            <Reveal key={item.n} delay={index * 60}>
              <article className="h-full bg-cream p-6 md:p-8">
                <p className="font-serif text-3xl text-ink/30">{item.n}</p>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-mute md:text-base">
                  {item.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
