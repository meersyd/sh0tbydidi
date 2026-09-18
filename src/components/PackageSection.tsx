import { useState } from "react";
import { siteConfig, type PackageId } from "../config/siteConfig";
import { formatPrice } from "../utils/format";
import { PackageCard } from "./PackageCard";
import { Reveal, SectionHeading } from "./Reveal";

type PackageSectionProps = {
  onSelectPackage: (id: PackageId, people: number) => void;
};

export function PackageSection({ onSelectPackage }: PackageSectionProps) {
  const [selectedId, setSelectedId] = useState<PackageId>("signature");
  const [peopleByPackage, setPeopleByPackage] = useState<Record<PackageId, number>>({
    mini: 1,
    signature: 3,
    full: 5,
  });

  return (
    <section id="packages" className="scroll-mt-36 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Sessions"
            title="Pick your session."
            description={`Match the session to your group. Mini is 1–3, Signature is 3–5, Full is from 5. Extra people from 9 onwards on Full are ${formatPrice(siteConfig.extraPersonFee)} each.`}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {siteConfig.packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 80} className="h-full">
              <PackageCard
                pkg={pkg}
                selected={selectedId === pkg.id}
                people={peopleByPackage[pkg.id]}
                onSelect={() => setSelectedId(pkg.id)}
                onPeopleChange={(people) =>
                  setPeopleByPackage((current) => ({ ...current, [pkg.id]: people }))
                }
                onBook={(people) => onSelectPackage(pkg.id, people)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
