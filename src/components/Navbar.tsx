import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { scrollToId } from "../utils/format";
import { BrandMark } from "./BrandMark";
import { AnnouncementBar } from "./AnnouncementBar";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.body.style.overflow = "";
    const id = href.replace("#", "");
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line/80 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent bg-cream/0"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          aria-label={siteConfig.brand}
          className="relative z-20 block h-11 w-44 shrink-0 md:w-56"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            });
          }}
        >
          <BrandMark className="absolute top-1/2 left-0 h-44 w-44 -translate-y-1/2 md:h-56 md:w-56" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-mute transition-colors hover:text-ink"
              onClick={(event) => {
                event.preventDefault();
                go(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
          <button type="button" className="btn-primary" onClick={() => go("#book")}>
            Book a Session
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line bg-cream px-5 py-8 md:hidden"
        >
          <div className="flex flex-col gap-6">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-serif text-4xl text-ink"
                onClick={(event) => {
                  event.preventDefault();
                  go(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              className="btn-primary mt-4 w-full"
              onClick={() => go("#book")}
            >
              Book a Session
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
