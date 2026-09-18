export function formatPrice(amount: number) {
  return `RM${amount}`;
}

export function formatTime(hhmm: string) {
  const [hourStr, minute = "00"] = hhmm.split(":");
  const hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${suffix}`;
}

export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function formatDisplayDate(iso: string) {
  return parseISODate(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, count: number) {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function isPastDate(iso: string) {
  return iso < toISODate(startOfToday());
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidPhone(value: string) {
  return digitsOnly(value).length >= 8;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function resizeList(list: string[], length: number) {
  const next = list.slice(0, length);
  while (next.length < length) next.push("");
  return next;
}

export function normalizeInstagram(value: string) {
  return value.trim().replace(/^@+/, "");
}
