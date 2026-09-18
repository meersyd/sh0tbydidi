import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "../config/siteConfig";
import { siteConfig } from "../config/siteConfig";
import { Lightbox } from "./Lightbox";
import { Photo } from "./Photo";
import { Reveal, SectionHeading } from "./Reveal";

function WorkFrame({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: () => void;
}) {
  const [ratio, setRatio] = useState(2 / 3);

  return (
    <button
      type="button"
      className="relative h-[min(22rem,46svh)] w-auto shrink-0 snap-center overflow-hidden rounded-2xl bg-cream md:h-[min(26rem,52svh)]"
      style={{ aspectRatio: `${ratio}` }}
      aria-label={`Open image: ${image.alt}`}
      onClick={onOpen}
    >
      <Photo
        src={image.src}
        alt={image.alt}
        variant={index + 1}
        loading={index < 2 ? "eager" : "lazy"}
        sizes="(min-width: 768px) 28vw, 70vw"
        fit="contain"
        className="h-full w-full bg-cream"
        onReady={({ width, height }) => {
          if (width > 0 && height > 0) setRatio(width / height);
        }}
      />
    </button>
  );
}

export function Gallery() {
  const images = siteConfig.gallery;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const scrollByDir = (dir: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({
      left: dir * Math.round(node.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  const image = active != null ? images[active] : null;

  return (
    <section id="work" className="scroll-mt-36 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Work"
            title="Recent Stories"
            description="A few moments from previous shoots."
          />
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:gap-4 md:px-8"
            role="region"
            aria-label="Recent work"
          >
            {images.map((slide, index) => (
              <WorkFrame
                key={slide.id}
                image={slide}
                index={index}
                onOpen={() => setActive(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="absolute top-1/2 left-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-cream/85 text-ink backdrop-blur-md md:inline-flex lg:left-6"
            aria-label="Previous photos"
            onClick={() => scrollByDir(-1)}
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-3 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-cream/85 text-ink backdrop-blur-md md:inline-flex lg:right-6"
            aria-label="Next photos"
            onClick={() => scrollByDir(1)}
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </Reveal>

      {active != null && image ? (
        <Lightbox
          images={images}
          index={active}
          onClose={() => setActive(null)}
          onPrev={() =>
            setActive((current) =>
              current == null ? 0 : (current - 1 + images.length) % images.length,
            )
          }
          onNext={() =>
            setActive((current) =>
              current == null ? 0 : (current + 1) % images.length,
            )
          }
        />
      ) : null}
    </section>
  );
}
