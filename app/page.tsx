import Hero from '@/components/Hero';
import VideoSection from '@/components/VideoSection';
import SignupForm from '@/components/SignupForm';
import FAQ from '@/components/FAQ';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Office Imposters",
    description: "Findet die Verräter – das Reallife Social Deduction Game bei Konstanz spielt!",
    organizer: {
      "@type": "Organization",
      name: "Schlüsselmomente Escape Rooms",
      url: "https://schluesselmomente-escape-rooms.de",
    },
    url: "https://office-imposters.schluesselmomente-escape-rooms.de",
    image: "https://office-imposters.schluesselmomente-escape-rooms.de/og-image.png",
    location: {
      "@type": "Place",
      name: "Konstanz spielt!",
      address: { "@type": "PostalAddress", addressLocality: "Konstanz", addressCountry: "DE" },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <VideoSection />
      <SignupForm />
      <FAQ />
    </main>
  );
}
