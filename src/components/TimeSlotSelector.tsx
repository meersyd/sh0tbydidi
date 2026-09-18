import { siteConfig, isSlotUnavailable } from "../config/siteConfig";
import { formatTime } from "../utils/format";

type TimeSlotSelectorProps = {
  date: string;
  value: string;
  onChange: (time: string) => void;
};

export function TimeSlotSelector({ date, value, onChange }: TimeSlotSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-4 text-lg font-semibold tracking-tight">Pick a time</legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {siteConfig.timeSlots.map((time) => {
          const unavailable = !date || isSlotUnavailable(date, time);
          const selected = value === time;
          return (
            <button
              key={time}
              type="button"
              disabled={unavailable}
              aria-pressed={selected}
              onClick={() => onChange(time)}
              className={`min-h-12 rounded-full border px-3 text-sm font-medium transition-colors ${
                selected
                  ? "border-ink bg-ink text-cream"
                  : "border-line bg-paper text-ink hover:border-ink/40"
              } disabled:cursor-not-allowed disabled:bg-sand/60 disabled:text-mute/50 disabled:line-through`}
            >
              {formatTime(time)}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-mute">
        This is a preferred slot. We’ll confirm availability on WhatsApp.
      </p>
    </fieldset>
  );
}
