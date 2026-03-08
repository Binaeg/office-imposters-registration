'use client';

import Image from 'next/image';
import Container from './Container';

export default function Hero() {
  function scrollToSignup() {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="bg-background py-24 text-center">
      <Container>
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.webp"
            alt="Office Imposter"
            width={1485}
            height={557}
            priority
            className="md:max-w-200 object-contain drop-shadow-lg"
          />
        </div>
        <p className="mx-auto mb-10 max-w-xl font-medium text-white text-md sm:text-lg lg:text-xl">
          Wer schleicht durchs Büro? Findet die Verräter unter euch –
          das Reallife Social Deduction Game bei &quot;Konstanz spielt!&quot;
        </p>
        <button
          onClick={scrollToSignup}
          className="rounded-xl bg-primary hover:bg-secondary px-8 py-4 text-lg font-bold text-black hover:text-white shadow-lg transition hover:scale-105 active:scale-95"
          aria-label="Jetzt für frühen Zugang anmelden"
        >
          Jetzt anmelden
        </button>
      </Container>
    </section>
  );
}
