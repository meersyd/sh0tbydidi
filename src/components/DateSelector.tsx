import { useMemo } from "react";
import { isDateAvailable, siteConfig } from "../config/siteConfig";
import { parseISODate, startOfMonth, toISODate } from "../utils/format";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DateSelectorProps = {
  value: string;
  onChange: (iso: string) => void;
};

export function DateSelector({ value, onChange }: DateSelectorProps) {
  const monthIso = siteConfig.availableDates[0] ?? "2026-10-01";
  const view = startOfMonth(parseISODate(monthIso));
  const label = view.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const cells = useMemo(() => {
    const monthStart = startOfMonth(parseISODate(monthIso));
    const year = monthStart.getFullYear();
    const month = monthStart.getMonth();
    const first = new Date(year, month, 1);
    const offset = (first.getDay() + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const items: Array<{ iso: string; day: number } | null> = [];

    for (let i = 0; i < offset; i += 1) items.push(null);
    for (let day = 1; day <= days; day += 1) {
      items.push({
        day,
        iso: toISODate(new Date(year, month, day)),
      });
    }
    return items;
  }, [monthIso]);

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">Choose a date</h3>
        <p className="text-sm font-medium text-mute">{label}</p>
      </div>
      <p className="mb-4 text-sm text-mute">
        Gown collection week only — 23, 24 and 25 October.
      </p>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-mute">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
        {cells.map((cell, index) => {
          if (!cell) {
            return <div key={`empty-${index}`} />;
          }
          const available = isDateAvailable(cell.iso);
          const selected = value === cell.iso;
          return (
            <button
              key={cell.iso}
              type="button"
              disabled={!available}
              aria-pressed={selected}
              aria-label={
                available
                  ? `${cell.day} October 2026, available`
                  : `${cell.day} October 2026, unavailable`
              }
              onClick={() => onChange(cell.iso)}
              className={`h-11 rounded-full text-sm transition-colors ${
                selected
                  ? "bg-ink text-cream"
                  : available
                    ? "font-semibold text-ink ring-1 ring-ink/15 hover:bg-sand"
                    : "text-mute/35"
              } disabled:cursor-not-allowed disabled:hover:bg-transparent`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
