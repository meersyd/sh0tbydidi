# sh0tbydidi

Minimalist pre-convocation photography website for **sh0tbydidi**.

Static site. No backend. Booking requests are sent through WhatsApp.

## Local development

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## Deploy to Netlify

1. Push this project to GitHub.
2. In Netlify, create a new site from that repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

`netlify.toml` already includes the SPA fallback:

```
/*    /index.html    200
```

You can also drag the `dist` folder onto Netlify's manual deploy page after running `npm run build`.

## Replace gallery images

Drop real photos here, using these exact filenames:

```
public/images/hero.webp
public/images/gallery/gallery-01.webp
public/images/gallery/gallery-02.webp
public/images/gallery/gallery-03.webp
public/images/gallery/gallery-04.webp
public/images/gallery/gallery-05.webp
public/images/gallery/gallery-06.webp
public/images/gallery/gallery-07.webp
public/images/gallery/gallery-08.webp
public/images/gallery/gallery-09.webp
public/images/gallery/gallery-10.webp
public/images/gallery/gallery-11.webp
public/images/gallery/gallery-12.webp
```

If a file is missing, the site shows an elegant placeholder instead of a broken image. Alt text and layout live in `src/config/siteConfig.ts`.

## Change pricing

Edit the `packages` array in `src/config/siteConfig.ts`.

Each package has `minPeople`, `maxPeople`, and a `pricing` object keyed by group size. Mini is 1–3, Signature is 3–5, Full is from 5 with extras from 9 onwards at `extraPersonFee` each. The UI calculates total and per-person prices from that. Do not hardcode prices in components.

## Change WhatsApp number

In `src/config/siteConfig.ts`:

```ts
whatsappNumber: "601XXXXXXXXX"
```

Use the full international format, digits only, no `+` or spaces.

## Photo delivery

Photos are sent via Google Drive. `photoDelivery.expiryDays` in `src/config/siteConfig.ts` controls the expiry copy on the booking form, review, FAQ, and WhatsApp message. The booking details step asks for one email per person.

## Change Instagram URL

In `src/config/siteConfig.ts`:

```ts
instagramUrl: "https://instagram.com/"
instagramHandle: ""
```

Replace these with the real profile when it exists.

## Unavailable time slots

Time slots are listed in `siteConfig.timeSlots`.

To block a slot, add it to `unavailableSlots`:

```ts
unavailableSlots: [
  { time: "12:00" },
  { date: "2026-10-10", time: "09:00" },
]
```

- `{ time: "12:00" }` blocks that time on every date
- `{ date: "2026-10-10", time: "09:00" }` blocks one specific slot
