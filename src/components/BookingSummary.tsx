import type { PackageId } from "../config/siteConfig";
import { getDeliveryNotice, getPackage, getPackagePrice, siteConfig } from "../config/siteConfig";
import { formatDisplayDate, formatPrice, formatTime, normalizeInstagram } from "../utils/format";
import type { CustomerDetails } from "./CustomerForm";

type BookingSummaryProps = {
  packageId: PackageId;
  people: number;
  date: string;
  time: string;
  customer: CustomerDetails;
  understandsUnedited: boolean;
  understandsDelivery: boolean;
  onToggleUnderstand: (value: boolean) => void;
  onToggleDelivery: (value: boolean) => void;
};

export function BookingSummary({
  packageId,
  people,
  date,
  time,
  customer,
  understandsUnedited,
  understandsDelivery,
  onToggleUnderstand,
  onToggleDelivery,
}: BookingSummaryProps) {
  const pkg = getPackage(packageId);
  const price = getPackagePrice(pkg, people);
  const handle = normalizeInstagram(customer.instagram);

  const rows = [
    ["Package", pkg.name],
    ["People", String(people)],
  ];

  if (price && price.extraCount > 0) {
    rows.push([
      "Extra people",
      `${price.extraCount} × ${formatPrice(siteConfig.extraPersonFee)}`,
    ]);
  }

  rows.push(
    ["Date", date ? formatDisplayDate(date) : "—"],
    ["Time", time ? formatTime(time) : "—"],
    ["Total", price ? formatPrice(price.total) : "—"],
    ["Per person", price ? formatPrice(price.perPerson) : "—"],
    ["Customer name", customer.name || "—"],
    ["WhatsApp", customer.whatsapp || "—"],
  );

  customer.emails.forEach((email, index) => {
    const trimmed = email.trim();
    if (trimmed) {
      rows.push([`Person ${index + 1} email`, trimmed]);
    }
  });

  if (handle) {
    rows.push(["Instagram", `@${handle}`]);
  }

  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight">Your Session</h3>
      <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-6 px-5 py-3.5">
            <dt className="text-sm text-mute">{label}</dt>
            <dd className="text-right text-sm font-medium">{value}</dd>
          </div>
        ))}
      </dl>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-ink"
          checked={understandsUnedited}
          onChange={(event) => onToggleUnderstand(event.target.checked)}
        />
        <span>
          I understand that the photos are delivered unedited / straight out of camera.
        </span>
      </label>

      <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-ink"
          checked={understandsDelivery}
          onChange={(event) => onToggleDelivery(event.target.checked)}
        />
        <span>{getDeliveryNotice()}</span>
      </label>
    </div>
  );
}
