export type PackageId = "mini" | "signature" | "full";

export type PhotoPackage = {
  id: PackageId;
  name: string;
  duration: string;
  minPeople: number;
  maxPeople: number;
  popular?: boolean;
  description: string;
  includes: string[];
  pricing: Record<number, number>;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type UnavailableSlot = {
  date?: string;
  time: string;
};

export const siteConfig = {
  brand: "sh0tbydidi",
  logo: "/logo.png",
  tagline: "Shoot. Smile. Done.",
  title: "sh0tbydidi — Pre-Convocation Photography",
  description:
    "Simple pre-convocation photography by sh0tbydidi. Choose your session, pick a slot and let's shoot.",
  philosophy: "Simple photography. Real moments. No fuss.",

  whatsappNumber: "01123101568",
  instagramUrl: "https://instagram.com/meersyd",
  instagramHandle: "meersyd",

  nav: [
    { label: "Work", href: "#work" },
    { label: "Packages", href: "#packages" },
  ],

  hero: {
    image: "/images/gallery/IMG_9254.JPG",
    imageAlt:
      "Graduate in convocation attire stepping out of a train",
    headline: "Shoot. Smile. Done.",
    support: "Simple pre-convocation photography for the moments worth keeping.",
    secondary:
      "No complicated packages. No editing. Just you, your people, and the moment.",
  },

  gallery: [
    {
      id: "gallery-01",
      src: "/images/gallery/IMG_5554.JPG",
      alt: "Graduate in convocation attire on a wooden walkway",
    },
    {
      id: "gallery-02",
      src: "/images/gallery/IMG_5562.JPG",
      alt: "Graduate holding a convocation cap",
    },
    {
      id: "gallery-03",
      src: "/images/gallery/IMG_5569.JPG",
      alt: "Graduate raising a convocation cap",
    },
    {
      id: "gallery-04",
      src: "/images/gallery/IMG_5573.JPG",
      alt: "Graduate looking back during a pre-convocation session",
    },
    {
      id: "gallery-05",
      src: "/images/gallery/IMG_5595.JPG",
      alt: "Close portrait with a convocation cap",
    },
    {
      id: "gallery-06",
      src: "/images/gallery/IMG_5398.JPG",
      alt: "Graduate in convocation attire in front of a train",
    },
    {
      id: "gallery-07",
      src: "/images/gallery/IMG_5030.JPG",
      alt: "Graduate in blue convocation attire standing among trees",
    },
    {
      id: "gallery-08",
      src: "/images/gallery/IMG_5066.JPG",
      alt: "Graduate in blue gown standing on a garden path",
    },
    {
      id: "gallery-09",
      src: "/images/gallery/IMG_5137.JPG",
      alt: "Graduate sitting on the grass in convocation attire",
    },
    {
      id: "gallery-10",
      src: "/images/gallery/IMG_5147.JPG",
      alt: "Graduate sitting on the lawn and smiling",
    },
    {
      id: "gallery-11",
      src: "/images/gallery/IMG_5623.JPG",
      alt: "Graduate in blue convocation attire looking aside",
    },
  ] satisfies GalleryImage[],

  packages: [
    {
      id: "mini",
      name: "Mini",
      duration: "1 hour",
      minPeople: 1,
      maxPeople: 3,
      description: "A simple session for quick portraits and graduation moments.",
      includes: [
        "1 hour shooting",
        "Individual portraits",
        "Graduation poses",
        "Friends / family photos",
        "Group photos",
        "All usable original photos",
        "Straight-out-of-camera delivery",
        "No editing / retouching",
        "1 fixed location",
        "Customer provides own outfit",
      ],
      pricing: {
        1: 99,
        2: 180,
        3: 240,
      },
    },
    {
      id: "signature",
      name: "Signature",
      duration: "1.5 hours",
      minPeople: 3,
      maxPeople: 5,
      popular: true,
      description:
        "More time for a small group — portraits, candid shots and combinations.",
      includes: [
        "1.5 hour shooting",
        "Individual portraits",
        "Graduation poses",
        "Friends / family photos",
        "Group photos",
        "Candid shots",
        "More combinations and poses",
        "All usable original photos",
        "Straight-out-of-camera delivery",
        "No editing / retouching",
        "1 fixed location",
        "Customer provides own outfit",
      ],
      pricing: {
        3: 360,
        4: 440,
        5: 500,
      },
    },
    {
      id: "full",
      name: "Full",
      duration: "2 hours",
      minPeople: 5,
      maxPeople: 20,
      description: "A relaxed session for bigger groups and more combinations.",
      includes: [
        "2 hour shooting",
        "Individual portraits",
        "Graduation poses",
        "Friends / family photos",
        "Group photos",
        "Candid / lifestyle shots",
        "More combinations and poses",
        "All usable original photos",
        "Straight-out-of-camera delivery",
        "No editing / retouching",
        "1 fixed location",
        "Customer provides own outfit",
      ],
      pricing: {
        5: 675,
        6: 750,
        7: 800,
        8: 850,
      },
    },
  ] as PhotoPackage[],

  timeSlots: [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ],

  unavailableSlots: [] as UnavailableSlot[],

  availableDates: ["2026-10-23", "2026-10-24", "2026-10-25"],
  includedPeople: 8,
  extraPersonFee: 50,
  maxPeople: 20,
  bookingHorizonMonths: 12,

  photoDelivery: {
    method: "Google Drive",
    expiryDays: 10,
  },
};

export function getPackage(id: PackageId): PhotoPackage {
  const pkg = siteConfig.packages.find((item) => item.id === id);
  if (!pkg) {
    throw new Error(`Unknown package: ${id}`);
  }
  return pkg;
}

export function clampPeople(pkg: PhotoPackage, people: number) {
  return Math.min(pkg.maxPeople, Math.max(pkg.minPeople, people));
}

export function allowsExtraPeople(pkg: PhotoPackage) {
  return pkg.maxPeople > siteConfig.includedPeople;
}

export function getPackageStartingTotal(pkg: PhotoPackage) {
  return pkg.pricing[pkg.minPeople] ?? 0;
}

export function getPackagePrice(pkg: PhotoPackage, people: number) {
  if (
    people < pkg.minPeople ||
    people > pkg.maxPeople ||
    people > siteConfig.maxPeople
  ) {
    return null;
  }

  if (people <= siteConfig.includedPeople) {
    const total = pkg.pricing[people];
    if (total == null) {
      return null;
    }
    return {
      total,
      perPerson: Math.round(total / people),
      extraCount: 0,
      extraTotal: 0,
    };
  }

  const base = pkg.pricing[siteConfig.includedPeople];
  if (base == null) {
    return null;
  }

  const extraCount = people - siteConfig.includedPeople;
  const extraTotal = extraCount * siteConfig.extraPersonFee;
  const total = base + extraTotal;

  return {
    total,
    perPerson: Math.round(total / people),
    extraCount,
    extraTotal,
  };
}

export function getGroupSizeHint(packageId: PackageId, people: number) {
  if (packageId === "mini") {
    return {
      message: "Mini is 1–3 people. Signature is 3–5 if you want more time.",
      suggestedId: "signature" as PackageId,
      suggestedLabel: "Switch to Signature",
    };
  }

  if (packageId === "signature" && people >= 5) {
    return {
      message: "Bigger group? Full is from 5 people, with 2 hours.",
      suggestedId: "full" as PackageId,
      suggestedLabel: "Switch to Full",
    };
  }

  return null;
}

export function getStartingPrice() {
  return Math.min(
    ...siteConfig.packages.map((pkg) => {
      const total = getPackageStartingTotal(pkg);
      return pkg.minPeople > 0 ? total / pkg.minPeople : Infinity;
    }),
  );
}

export function isDateAvailable(iso: string) {
  return siteConfig.availableDates.includes(iso);
}

export function isSlotUnavailable(date: string, time: string) {
  return siteConfig.unavailableSlots.some((slot) => {
    if (slot.time !== time) return false;
    return !slot.date || slot.date === date;
  });
}

export function whatsappDigits() {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return digits.startsWith("0") ? `60${digits.slice(1)}` : digits;
}

export function getDeliveryNotice() {
  const { method, expiryDays } = siteConfig.photoDelivery;
  return `Photos are sent via ${method}. The link expires after ${expiryDays} days — please download all photos.`;
}
