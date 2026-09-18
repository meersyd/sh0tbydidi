import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { formatPrice } from "../utils/format";
import { Reveal, SectionHeading } from "./Reveal";

function Em({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-ink">{children}</strong>;
}

const QUESTIONS: { q: string; a: ReactNode }[] = [
  {
    q: "Are the photos edited?",
    a: "No. Photos are delivered as original, straight-out-of-camera (SOOC) images. No colour grading, retouching or additional editing is included.",
  },
  {
    q: "Can I choose the location?",
    a: (
      <>
        Yes, but the session is limited to <Em>one fixed location</Em>. Location
        details can be discussed before the booking is confirmed.
      </>
    ),
  },
  {
    q: "Can I bring friends or family?",
    a: (
      <>
        Yes! Bring your people. Mini is for <Em>1–3 people</Em>, Signature is
        for <Em>3–5 people</Em>, and Full is for <Em>5–8 people</Em>. For groups
        of <Em>9 or more</Em>, an additional{" "}
        <Em>{formatPrice(siteConfig.extraPersonFee)} per person</Em> applies.
      </>
    ),
  },
  {
    q: "Can I book more than 8 people?",
    a: (
      <>
        Yes. For groups of <Em>9 or more</Em>, an additional{" "}
        <Em>{formatPrice(siteConfig.extraPersonFee)} per person</Em> applies on
        top of the Full package. Please note that larger groups may require more
        space at the shooting location.
      </>
    ),
  },
  {
    q: "Can I change my outfit during the session?",
    a: (
      <>
        No. The session is based on <Em>one outfit per person</Em>. Please come
        ready in the outfit you want to shoot in.
      </>
    ),
  },
  {
    q: "Is my selected time automatically confirmed?",
    a: (
      <>
        No. Selecting a date and time only sends a <Em>booking request</Em>.
        Your session is confirmed only after sh0tbydidi confirms the slot
        through WhatsApp.
      </>
    ),
  },
  {
    q: "Do I need to pay a deposit?",
    a: (
      <>
        Yes. A <Em>30% booking deposit per person</Em> is required to secure
        your session. The remaining balance is payable on the day of the shoot.
      </>
    ),
  },
  {
    q: "What happens if I'm late?",
    a: "Your session will still end at the originally scheduled time. Please arrive on time so you can make the most of your session.",
  },
  {
    q: "How will I receive my photos?",
    a: (
      <>
        Photos are delivered via <Em>{siteConfig.photoDelivery.method}</Em> after
        the session. The download link will be available for{" "}
        <Em>{siteConfig.photoDelivery.expiryDays} days</Em>, so please download
        and save your photos before the link expires.
      </>
    ),
  },
  {
    q: "Do I get every photo taken?",
    a: (
      <>
        You will receive the <Em>usable original photos</Em> from your session.
        Test shots, accidental shots, blinks, duplicates and other unusable
        frames will be excluded.
      </>
    ),
  },
  {
    q: "Do I need to bring anything?",
    a: "Just bring yourself, your graduation outfit and anything you'd like included in the photos. Most importantly, come ready to have fun. 📸",
  },
  {
    q: "Can I reschedule my session?",
    a: "Rescheduling is subject to availability. Please contact sh0tbydidi as early as possible if you need to change your booking.",
  },
  {
    q: "What if the weather is bad?",
    a: "If the session is affected by bad weather, rescheduling can be discussed depending on the situation and availability.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-36 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Quick answers." />
        </Reveal>

        <div className="mt-10 divide-y divide-line border-y border-line">
          {QUESTIONS.map((item, index) => {
            const expanded = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    onClick={() => setOpen(expanded ? null : index)}
                  >
                    <span className="text-base font-medium md:text-lg">{item.q}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.75}
                      className={`shrink-0 text-mute transition-transform ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!expanded}
                  className="pb-5 text-sm leading-relaxed text-mute md:text-base"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
