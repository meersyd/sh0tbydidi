import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "../config/siteConfig";
import { Photo } from "./Photo";

type LightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  const image = images[index];

  onCloseRef.current = onClose;
  onPrevRef.current = onPrev;
  onNextRef.current = onNext;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowLeft") onPrevRef.current();
      if (event.key === "ArrowRight") onNextRef.current();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);

  if (!image) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream"
        aria-label="Close image viewer"
        onClick={onClose}
      >
        <X size={18} strokeWidth={1.75} />
      </button>

      <button
        type="button"
        className="absolute top-1/2 left-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream sm:inline-flex"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
      >
        <ChevronLeft size={20} strokeWidth={1.75} />
      </button>

      <figure
        className="relative w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Photo
          src={image.src}
          alt={image.alt}
          variant={index}
          loading="eager"
          className="mx-auto max-h-[78vh] w-full max-w-lg rounded-xl"
          imgClassName="max-h-[78vh] object-contain object-center"
          fit="contain"
        />
        <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-cream/70">
          <span>{image.alt}</span>
          <span>
            {index + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        className="absolute top-1/2 right-3 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream sm:inline-flex"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight size={20} strokeWidth={1.75} />
      </button>

      <div className="absolute bottom-5 flex gap-3 sm:hidden">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream"
          aria-label="Previous image"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream"
          aria-label="Next image"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
