import { useState } from "react";
import { BookingFlow } from "./components/BookingFlow";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { PackageSection } from "./components/PackageSection";
import { ServicePrinciples } from "./components/ServicePrinciples";
import type { PackageId } from "./config/siteConfig";
import { scrollToId } from "./utils/format";

export default function App() {
  const [bookingPackageId, setBookingPackageId] = useState<PackageId>("signature");
  const [bookingPeople, setBookingPeople] = useState(3);
  const [bookingKey, setBookingKey] = useState(0);

  return (
    <div id="top" className="min-h-svh bg-cream">
      <Navbar />
      <main id="main">
        <Hero />
        <Gallery />
        <ServicePrinciples />
        <PackageSection
          onSelectPackage={(id, people) => {
            setBookingPackageId(id);
            setBookingPeople(people);
            setBookingKey((current) => current + 1);
            scrollToId("book");
          }}
        />
        <BookingFlow
          key={bookingKey}
          initialPackageId={bookingPackageId}
          initialPeople={bookingPeople}
        />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
