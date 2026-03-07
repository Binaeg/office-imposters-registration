'use client';

import Image from 'next/image';
import Container from './Container';

export default function Hero() {
  function scrollToSignup() {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="bg-[#233D4D] py-24 text-center">
      <Container>
        <div className="mb-6 flex justify-center">
          <Image
            src="/header.jpeg"
            alt="Office Imposter"
            width={480}
            height={160}
            priority
            className="max-w-xs sm:max-w-md object-contain drop-shadow-lg"
          />
        </div>
        <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-white sm:text-xl">
          Wer schleicht sich durchs Büro? Finde den Imposter unter deinen Kollegen –
          das soziale Deduktionsspiel für dein Team.
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
