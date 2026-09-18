import type { PackageId } from "../config/siteConfig";
import { getDeliveryNotice, getPackage, getPackagePrice, siteConfig, whatsappDigits } from "../config/siteConfig";
import { formatDisplayDate, formatPrice, formatTime, normalizeInstagram } from "./format";

export type BookingPayload = {
  packageId: PackageId;
  people: number;
  date: string;
  time: string;
  name: string;
  whatsapp: string;
  instagram: string;
  notes: string;
  emails: string[];
};

export function buildBookingMessage(payload: BookingPayload) {
  const pkg = getPackage(payload.packageId);
  const price = getPackagePrice(pkg, payload.people);
  const handle = normalizeInstagram(payload.instagram);
  const notes = payload.notes.trim();

  const lines = [
    `Hi sh0tbydidi! 📸`,
    ``,
    `I'd like to request a pre-convo photography session.`,
    ``,
    `Package: ${pkg.name}`,
    `Duration: ${pkg.duration}`,
    `People: ${payload.people}`,
  ];

  if (price && price.extraCount > 0) {
    lines.push(
      `Extra people: ${price.extraCount} × ${formatPrice(siteConfig.extraPersonFee)}`,
    );
  }

  lines.push(
    `Date: ${formatDisplayDate(payload.date)}`,
    `Time: ${formatTime(payload.time)}`,
    ``,
    `Total: ${price ? formatPrice(price.total) : "—"}`,
    `Per person: ${price ? formatPrice(price.perPerson) : "—"}`,
    ``,
    `Name: ${payload.name.trim()}`,
    `WhatsApp: ${payload.whatsapp.trim()}`,
  );

  const emails = payload.emails.map((email) => email.trim()).filter(Boolean);
  if (emails.length > 0) {
    lines.push(``, `Emails:`);
    emails.forEach((email, index) => {
      lines.push(`${index + 1}. ${email}`);
    });
  }

  if (handle) {
    lines.push(`Instagram: @${handle}`);
  }

  if (notes) {
    lines.push(``, `Notes:`, notes);
  }

  lines.push(
    ``,
    `I understand that the photos will be delivered unedited / straight out of camera.`,
    getDeliveryNotice(),
    ``,
    `Thank you!`,
  );

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string) {
  const number = whatsappDigits();
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  const url = buildWhatsAppUrl(message);
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}
