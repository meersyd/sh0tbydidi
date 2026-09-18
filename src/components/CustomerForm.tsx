import { getDeliveryNotice } from "../config/siteConfig";

type CustomerDetails = {
  name: string;
  whatsapp: string;
  instagram: string;
  notes: string;
  emails: string[];
};

type CustomerFormProps = {
  people: number;
  value: CustomerDetails;
  onChange: (value: CustomerDetails) => void;
};

export function CustomerForm({ people, value, onChange }: CustomerFormProps) {
  const field =
    "mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-mute/60 focus:border-ink";

  const setEmail = (index: number, email: string) => {
    const emails = value.emails.slice();
    emails[index] = email;
    onChange({ ...value, emails });
  };

  return (
    <div className="grid gap-5">
      <label className="block">
        <span className="text-sm font-medium">Full Name</span>
        <input
          className={field}
          type="text"
          name="name"
          autoComplete="name"
          required
          maxLength={80}
          value={value.name}
          onChange={(event) => onChange({ ...value, name: event.target.value })}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">WhatsApp Number</span>
        <input
          className={field}
          type="tel"
          name="whatsapp"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={20}
          placeholder="0123456789"
          value={value.whatsapp}
          onChange={(event) => onChange({ ...value, whatsapp: event.target.value })}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">
          Instagram Username <span className="font-normal text-mute">(optional)</span>
        </span>
        <input
          className={field}
          type="text"
          name="instagram"
          autoComplete="off"
          maxLength={40}
          placeholder="@yourhandle"
          value={value.instagram}
          onChange={(event) => onChange({ ...value, instagram: event.target.value })}
        />
      </label>

      <fieldset>
        <legend className="text-sm font-medium text-ink">Email for each person</legend>
        <p className="mt-2 text-sm leading-relaxed text-mute">{getDeliveryNotice()}</p>
        <div className="mt-4 grid gap-4">
          {Array.from({ length: people }, (_, index) => (
            <label key={index} className="block">
              <span className="text-sm font-medium">
                Person {index + 1}
                {index === 0 ? (
                  <span className="font-normal text-mute"> (you)</span>
                ) : null}
              </span>
              <input
                className={field}
                type="email"
                name={`email-${index + 1}`}
                autoComplete={index === 0 ? "email" : "off"}
                inputMode="email"
                required
                maxLength={120}
                placeholder="name@email.com"
                value={value.emails[index] ?? ""}
                onChange={(event) => setEmail(index, event.target.value)}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="text-sm font-medium">
          Additional Notes <span className="font-normal text-mute">(optional)</span>
        </span>
        <textarea
          className={`${field} min-h-28 resize-y`}
          name="notes"
          maxLength={500}
          placeholder="Anything I should know before we shoot?"
          value={value.notes}
          onChange={(event) => onChange({ ...value, notes: event.target.value })}
        />
      </label>
    </div>
  );
}

export type { CustomerDetails };
