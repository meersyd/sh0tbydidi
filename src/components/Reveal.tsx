import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "../utils/format";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`mb-3 text-[11px] font-medium tracking-[0.22em] uppercase ${
            light ? "text-cream/55" : "text-mute"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-serif text-4xl leading-[1.1] tracking-tight md:text-5xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${light ? "text-cream/70" : "text-mute"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
