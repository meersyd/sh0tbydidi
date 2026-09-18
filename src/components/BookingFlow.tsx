import { useEffect, useMemo, useState } from "react";
import {
  allowsExtraPeople,
  clampPeople,
  getGroupSizeHint,
  getPackage,
  getPackagePrice,
  getPackageStartingTotal,
  isDateAvailable,
  siteConfig,
  type PackageId,
} from "../config/siteConfig";
import { formatPrice, isValidEmail, isValidPhone, resizeList } from "../utils/format";
import { buildBookingMessage, openWhatsApp } from "../utils/whatsapp";
import { BookingSummary } from "./BookingSummary";
import { CustomerForm, type CustomerDetails } from "./CustomerForm";
import { DateSelector } from "./DateSelector";
import { PeopleSelector } from "./PeopleSelector";
import { TimeSlotSelector } from "./TimeSlotSelector";

const STEPS = [
  { n: 1, label: "Package" },
  { n: 2, label: "People" },
  { n: 3, label: "Date" },
  { n: 4, label: "Time" },
  { n: 5, label: "Details" },
  { n: 6, label: "Review" },
] as const;

type BookingFlowProps = {
  initialPackageId: PackageId;
  initialPeople: number;
};

export function BookingFlow({ initialPackageId, initialPeople }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageId>(initialPackageId);
  const [selectedPeople, setSelectedPeople] = useState(initialPeople);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customer, setCustomer] = useState<CustomerDetails>({
    name: "",
    whatsapp: "",
    instagram: "",
    notes: "",
    emails: resizeList([], initialPeople),
  });
  const [understandsUnedited, setUnderstandsUnedited] = useState(false);
  const [understandsDelivery, setUnderstandsDelivery] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const pkg = getPackage(selectedPackage);
  const people = clampPeople(pkg, selectedPeople);
  const price = getPackagePrice(pkg, people);
  const hint = getGroupSizeHint(selectedPackage, people);

  useEffect(() => {
    const next = clampPeople(pkg, selectedPeople);
    if (next !== selectedPeople) {
      setSelectedPeople(next);
    }
  }, [pkg, selectedPeople]);

  useEffect(() => {
    setCustomer((current) => {
      const emails = resizeList(current.emails, people);
      if (emails.length === current.emails.length) return current;
      return { ...current, emails };
    });
  }, [people]);

  const validate = (current: number) => {
    if (current === 1 && !selectedPackage) return "Pick a package to continue.";
    if (current === 2 && (people < pkg.minPeople || people > pkg.maxPeople)) {
      return "Select how many people are coming.";
    }
    if (current === 3 && !isDateAvailable(selectedDate)) return "Choose an available date.";
    if (current === 4 && !selectedTime) return "Pick a time slot.";
    if (current === 5 && !customer.name.trim()) return "Enter your name.";
    if (current === 5 && !isValidPhone(customer.whatsapp)) {
      return "Enter a valid WhatsApp number.";
    }
    if (current === 5) {
      const invalidIndex = Array.from({ length: people }, (_, index) => index).find(
        (index) => !isValidEmail(customer.emails[index] ?? ""),
      );
      if (invalidIndex != null) {
        return `Enter a valid email for person ${invalidIndex + 1}.`;
      }
    }
    if (current === 6 && !understandsUnedited) {
      return "Please confirm you understand photos are delivered unedited.";
    }
    if (current === 6 && !understandsDelivery) {
      return "Please confirm you will download the photos before the Google Drive link expires.";
    }
    return "";
  };

  const goNext = () => {
    const message = validate(step);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, STEPS.length));
  };

  const goBack = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const requestBooking = () => {
    const message = validate(6);
    if (message) {
      setError(message);
      return;
    }
    openWhatsApp(
      buildBookingMessage({
        packageId: selectedPackage,
        people,
        date: selectedDate,
        time: selectedTime,
        name: customer.name,
        whatsapp: customer.whatsapp,
        instagram: customer.instagram,
        notes: customer.notes,
        emails: customer.emails,
      }),
    );
    setSubmitted(true);
  };

  const reset = () => {
    setStep(1);
    setSelectedDate("");
    setSelectedTime("");
    setCustomer({
      name: "",
      whatsapp: "",
      instagram: "",
      notes: "",
      emails: resizeList([], people),
    });
    setUnderstandsUnedited(false);
    setUnderstandsDelivery(false);
    setError("");
    setSubmitted(false);
  };

  const preview = useMemo(() => {
    if (!price) return "";
    return `${formatPrice(price.total)} total · ${formatPrice(price.perPerson)}/person`;
  }, [price]);

  return (
    <section id="book" className="scroll-mt-36 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-mute uppercase">
          Booking request
        </p>
        <h2 className="font-serif text-4xl tracking-tight md:text-5xl">Book your session.</h2>
        <p className="mt-4 text-base leading-relaxed text-mute md:text-lg">
          Pick a package, choose your preferred slot, and send your booking request.
        </p>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-line bg-paper px-6 py-10 text-center">
            <p className="font-serif text-3xl">Your booking request is ready.</p>
            <p className="mt-3 text-mute">We'll confirm your slot through WhatsApp.</p>
            <button type="button" className="btn-secondary mt-8" onClick={reset}>
              Send another request
            </button>
          </div>
        ) : (
          <div className="mt-10">
            <ol className="mb-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {STEPS.map((item) => {
                const current = item.n === step;
                const done = item.n < step;
                return (
                  <li key={item.n}>
                    <button
                      type="button"
                      className={`w-full rounded-full border px-2 py-2 text-left sm:text-center ${
                        current
                          ? "border-ink bg-ink text-cream"
                          : done
                            ? "border-line bg-paper text-ink"
                            : "border-transparent text-mute"
                      }`}
                      aria-current={current ? "step" : undefined}
                      disabled={item.n > step}
                      onClick={() => {
                        if (item.n < step) {
                          setError("");
                          setStep(item.n);
                        }
                      }}
                    >
                      <span className="block text-[10px] tracking-[0.14em] uppercase">
                        {String(item.n).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div key={step} className="rounded-2xl border border-line bg-paper p-5 md:p-8 motion-safe:animate-fade-up">
              {step === 1 ? (
                <div className="grid gap-3">
                  {siteConfig.packages.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selectedPackage === item.id}
                      onClick={() => {
                        setSelectedPackage(item.id);
                        setSelectedPeople((current) => clampPeople(item, current));
                        setError("");
                      }}
                      className={`rounded-2xl border px-5 py-4 text-left transition-colors ${
                        selectedPackage === item.id
                          ? "border-ink bg-cream"
                          : "border-line hover:border-ink/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="mt-1 text-sm text-mute">
                            {allowsExtraPeople(item)
                              ? `${item.duration} · from ${item.minPeople} people`
                              : `${item.duration} · ${item.minPeople}–${item.maxPeople} people`}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          from {formatPrice(getPackageStartingTotal(item))}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}

              {step === 2 ? (
                <div>
                  <p className="mb-6 text-sm text-mute">
                    {allowsExtraPeople(pkg)
                      ? `From ${pkg.minPeople} people. Extra people from 9 onwards are ${formatPrice(siteConfig.extraPersonFee)} each.`
                      : `${pkg.name} is ${pkg.minPeople}–${pkg.maxPeople} people.`}
                  </p>
                  <PeopleSelector
                    value={people}
                    min={pkg.minPeople}
                    max={pkg.maxPeople}
                    onChange={(next) => {
                      setSelectedPeople(next);
                      setError("");
                    }}
                  />
                  {price ? (
                    <div className="mt-6">
                      <p className="font-serif text-4xl">
                        {formatPrice(price.total)} total
                      </p>
                      <p className="mt-1 text-mute">{formatPrice(price.perPerson)}/person</p>
                      {price.extraCount > 0 ? (
                        <p className="mt-2 text-sm text-mute">
                          {price.extraCount} extra {price.extraCount === 1 ? "person" : "people"} ×{" "}
                          {formatPrice(siteConfig.extraPersonFee)}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  {hint ? (
                    <div className="mt-5 rounded-xl border border-line bg-cream px-4 py-3">
                      <p className="text-sm leading-relaxed text-mute">{hint.message}</p>
                      <button
                        type="button"
                        className="mt-2 text-sm font-medium underline underline-offset-4"
                        onClick={() => {
                          setSelectedPackage(hint.suggestedId);
                          setError("");
                        }}
                      >
                        {hint.suggestedLabel}
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {step === 3 ? (
                <DateSelector
                  value={selectedDate}
                  onChange={(iso) => {
                    setSelectedDate(iso);
                    setSelectedTime("");
                    setError("");
                  }}
                />
              ) : null}

              {step === 4 ? (
                <TimeSlotSelector
                  date={selectedDate}
                  value={selectedTime}
                  onChange={(time) => {
                    setSelectedTime(time);
                    setError("");
                  }}
                />
              ) : null}

              {step === 5 ? (
                <CustomerForm
                  people={people}
                  value={customer}
                  onChange={(next) => {
                    setCustomer(next);
                    setError("");
                  }}
                />
              ) : null}

              {step === 6 ? (
                <BookingSummary
                  packageId={selectedPackage}
                  people={people}
                  date={selectedDate}
                  time={selectedTime}
                  customer={customer}
                  understandsUnedited={understandsUnedited}
                  understandsDelivery={understandsDelivery}
                  onToggleUnderstand={(next) => {
                    setUnderstandsUnedited(next);
                    setError("");
                  }}
                  onToggleDelivery={(next) => {
                    setUnderstandsDelivery(next);
                    setError("");
                  }}
                />
              ) : null}

              {error ? (
                <p className="mt-5 text-sm text-red-800" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={goBack}
                  disabled={step === 1}
                >
                  Back
                </button>
                {step < 6 ? (
                  <button type="button" className="btn-primary" onClick={goNext}>
                    Continue
                  </button>
                ) : (
                  <button type="button" className="btn-primary" onClick={requestBooking}>
                    Request Booking via WhatsApp
                  </button>
                )}
              </div>
            </div>

            {price && step < 6 ? (
              <p className="mt-4 text-sm text-mute">
                {pkg.name} · {people} {people === 1 ? "person" : "people"} · {preview}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
