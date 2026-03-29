import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";

export default function Home() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: "Office Imposters - Teamevent Konstanz",
    description: "Mobiles Reallife Social Deduction Game für Teambuilding in Konstanz.",
    url: "https://office-imposters.schluesselmomente-escape-rooms.de",
    logo: "https://office-imposters.schluesselmomente-escape-rooms.de/icon.png",
    image: "https://office-imposters.schluesselmomente-escape-rooms.de/og-image.png",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
        streetAddress: "St.-Gebhard-Str. 5a",
        addressLocality: "Konstanz",
        postalCode: "78467",
        addressCountry: "DE",
    },
  };

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Office Imposters @ Konstanz spielt!",
    description: "Testet das neue Reallife Social Deduction Game Office Imposters!",
    startDate: "2026-03-28T10:00:00+01:00",
    endDate: "2026-03-29T18:00:00+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Coworkingspace St. Johann",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Brückengasse 1b",
        addressLocality: "Konstanz",
        postalCode: "78462",
        addressCountry: "DE",
      },
    },
    offers: {
      "@type": "Offer",
      url: "https://office-imposters.schluesselmomente-escape-rooms.de",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    organizer: {
      "@type": "Organization",
      name: "Schlüsselmomente Escape Rooms",
    },
  };

  return (
    <>
      {/* Wir geben beide Schemas aus – Google verknüpft diese */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([businessSchema, eventSchema]) }} />
      <Hero />
      <VideoSection />
      <ContactForm />
      <FAQ />
    </>
  );
}
