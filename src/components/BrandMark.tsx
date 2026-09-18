import { siteConfig } from "../config/siteConfig";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "h-56 w-56" }: BrandMarkProps) {
  return (
    <img
      src={siteConfig.logo}
      alt={siteConfig.brand}
      className={`object-contain ${className}`}
    />
  );
}
