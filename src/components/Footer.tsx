import { siteConfig, whatsappDigits } from "../config/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${whatsappDigits()}`;

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <p className="text-sm text-mute">© {year} All rights reserved.</p>
        <nav aria-label="Footer" className="flex items-center gap-8">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-mute transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-mute transition-colors hover:text-ink"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </footer>
  );
}
