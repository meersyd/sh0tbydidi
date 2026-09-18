import { Minus, Plus } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { formatPrice } from "../utils/format";

type PeopleSelectorProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  min?: number;
};

export function PeopleSelector({
  value,
  max,
  onChange,
  min = 1,
}: PeopleSelectorProps) {
  const includedCap = Math.min(max, siteConfig.includedPeople);
  const options = Array.from(
    { length: includedCap - min + 1 },
    (_, index) => min + index,
  );
  const extraCount = Math.max(0, value - siteConfig.includedPeople);
  const canAddExtras = max > siteConfig.includedPeople;

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-ink">How many people?</legend>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Number of people">
        {options.map((count) => {
          const selected = extraCount > 0 ? count === includedCap : value === count;
          return (
            <button
              key={count}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(count)}
              className={`h-11 min-w-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                selected
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-paper text-ink hover:border-ink/40"
              }`}
            >
              {count}
            </button>
          );
        })}
      </div>
      {canAddExtras ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-cream px-4 py-3">
          <div>
            <p className="text-sm font-medium text-ink">Extra people</p>
            <p className="mt-0.5 text-xs text-mute">
              From 9 onwards, {formatPrice(siteConfig.extraPersonFee)} each
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={extraCount === 0}
              aria-label="Remove extra person"
              onClick={() => onChange(Math.max(includedCap, value - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Minus size={14} strokeWidth={2} />
            </button>
            <span className="min-w-6 text-center text-sm font-medium tabular-nums">
              {extraCount}
            </span>
            <button
              type="button"
              disabled={value < siteConfig.includedPeople || value >= max}
              aria-label="Add extra person"
              onClick={() => onChange(value + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink/40 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      ) : null}
    </fieldset>
  );
}
