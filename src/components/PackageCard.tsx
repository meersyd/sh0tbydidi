import { Check } from "lucide-react";
import type { PhotoPackage } from "../config/siteConfig";
import {
  allowsExtraPeople,
  clampPeople,
  getGroupSizeHint,
  getPackagePrice,
  getPackageStartingTotal,
  siteConfig,
} from "../config/siteConfig";
import { formatPrice } from "../utils/format";
import { PeopleSelector } from "./PeopleSelector";

type PackageCardProps = {
  pkg: PhotoPackage;
  people: number;
  selected: boolean;
  onSelect: () => void;
  onPeopleChange: (people: number) => void;
  onBook: (people: number) => void;
};

export function PackageCard({
  pkg,
  people,
  selected,
  onSelect,
  onPeopleChange,
  onBook,
}: PackageCardProps) {
  const count = clampPeople(pkg, people);
  const price = getPackagePrice(pkg, count);
  const starting = getPackageStartingTotal(pkg);
  const startingPerPerson = Math.round(starting / pkg.minPeople);
  const hint = getGroupSizeHint(pkg.id, count);

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-paper p-6 transition-colors ${
        selected ? "border-ink" : "border-line hover:border-ink/30"
      } ${pkg.popular ? "md:scale-[1.02]" : ""}`}
    >
      {pkg.popular ? (
        <p className="absolute -top-3 left-6 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cream uppercase">
          Most Popular
        </p>
      ) : null}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-2xl font-semibold tracking-tight">{pkg.name}</h3>
        <p className="text-sm text-mute">{pkg.duration}</p>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mute">{pkg.description}</p>

      <div className="mt-6">
        <p className="text-xs tracking-[0.16em] text-mute uppercase">From</p>
        <p className="mt-1 font-serif text-4xl tracking-tight">
          {formatPrice(startingPerPerson)}
          <span className="ml-1 font-sans text-sm text-mute">/person</span>
        </p>
      </div>

      <div className="mt-6">
        <PeopleSelector
          value={count}
          min={pkg.minPeople}
          max={pkg.maxPeople}
          onChange={(next) => {
            onSelect();
            onPeopleChange(next);
          }}
        />
        <p className="mt-3 text-sm text-mute">
          {allowsExtraPeople(pkg)
            ? `${pkg.minPeople}–${siteConfig.includedPeople} included. Extra people from 9 onwards ${formatPrice(siteConfig.extraPersonFee)} each.`
            : `${pkg.minPeople}–${pkg.maxPeople} people.`}
        </p>
      </div>

      {price ? (
        <div className="mt-5 rounded-xl border border-line bg-cream px-4 py-3">
          <p className="text-sm text-mute">
            {count} {count === 1 ? "person" : "people"}
            {price.extraCount > 0
              ? ` · ${price.extraCount} extra (${formatPrice(siteConfig.extraPersonFee)} each)`
              : ""}
          </p>
          <p className="mt-1 text-xl font-semibold tracking-tight">
            {formatPrice(price.total)} total
          </p>
          <p className="text-sm text-mute">{formatPrice(price.perPerson)}/person</p>
          {hint && pkg.id !== "mini" ? (
            <p className="mt-2 text-sm leading-relaxed text-mute">{hint.message}</p>
          ) : null}
        </div>
      ) : null}

      <ul className="mt-6 flex flex-col gap-2 text-sm text-ink/80">
        {pkg.includes.slice(0, 7).map((item) => (
          <li key={item} className="flex gap-2">
            <Check size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-mute" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`mt-8 w-full ${selected ? "btn-primary" : "btn-secondary"}`}
        onClick={() => {
          onSelect();
          onBook(count);
        }}
      >
        Select Package
      </button>
    </article>
  );
}
