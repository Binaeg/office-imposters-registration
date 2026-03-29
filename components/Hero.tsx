"use client";

import Image from "next/image";
import Container from "./Container";

export default function Hero() {
  function scrollToSignup() {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="bg-background py-20 text-center">
      <Container>
        {/* 1. SEO Header: H1 is essential for "Teamevent Konstanz" ranking */}
        <div className="mb-4">
          <h1 className="text-sm font-bold uppercase tracking-widest text-primary md:text-base">Das ultimative Teamevent in Konstanz</h1>
        </div>

        <div className="mb-6 flex justify-center">
          <Image
            src="/OfficeImpostersBanner.webp"
            // 2. Descriptive ALT text for Image SEO
            alt="Office Imposters - Das Social Deduction Teamevent in Konstanz"
            width={1485}
            height={557}
            priority
            className="md:max-w-200 object-contain drop-shadow-lg"
          />
        </div>

        {/* 3. Updated Copy: Includes "Teambuilding" naturally */}
        <p className="mx-auto mb-10 max-w-2xl font-medium text-white text-md sm:text-lg lg:text-xl leading-relaxed">
          Wer schleicht durchs Büro? Findet die Verräter unter euch – das neue <strong>Teambuilding-Spiel in Konstanz</strong>. Erlebt das Reallife Social Deduction Game
          bei &quot;Konstanz spielt!&quot;
        </p>

        <button
          onClick={scrollToSignup}
          className="rounded-xl bg-primary hover:bg-secondary px-10 py-4 text-lg font-bold text-black hover:text-white shadow-lg transition hover:scale-105 active:scale-95"
          aria-label="Jetzt für das Teamevent in Konstanz anmelden"
        >
          Jetzt kontaktieren
        </button>
      </Container>
    </section>
  );
}
