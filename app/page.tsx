import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import SignupForm from "@/components/SignupForm";
import FAQ from "@/components/FAQ";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness", // Better for local SEO than 'Event'
    name: "Office Imposters - Teamevent Konstanz",
    description: "Einzigartiges Teamevent & Teambuilding Game in Konstanz. Findet die Verräter im Reallife Social Deduction Game.",
    url: "https://office-imposters.schluesselmomente-escape-rooms.de",
    image: "https://office-imposters.schluesselmomente-escape-rooms.de/og-image.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Konstanz",
      addressRegion: "Baden-Württemberg",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.6603, // Optional: Add exact coordinates for Konstanz
      longitude: 9.1758,
    },
    openingHours: "Mo-Su 09:00-22:00", // Adjust to your actual hours
    priceRange: "$$",
    parentOrganization: {
      "@type": "Organization",
      name: "Schlüsselmomente Escape Rooms",
      url: "https://schluesselmomente-escape-rooms.de",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Pro Tip: Use an <h1> inside your Hero that contains 
         "Teamevent Konstanz" if you haven't already! 
      */}
      <Hero />
      <VideoSection />
      <SignupForm />
      <FAQ />
    </>
  );
}
