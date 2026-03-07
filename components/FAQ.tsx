'use client';

import { useState } from 'react';
import Container from './Container';

const faqs = [
  {
    question: 'Was ist Office Imposters?',
    answer:
      'Office Imposters ist ein soziales Deduktionsspiel, bei dem Spieler versuchen, den Imposter unter ihren Kollegen zu entlarven. Office Imposters ist vergleichbar mit Among Us, Werwölfe oder Blood on the Clocktower.',
  },
  {
    question: 'Was muss ich mitbringen?',
    answer:
      'Um Office Imposters spielen zu können, braucht jede*r Spieler*in ein eigenes mobiles Endgerät. Wenn das Gerät mobile Daten zur Verfügung hat, ist das super, wir werden aber auch ein WLAN zur Verfügung stellen.',
  },
  {
    question: 'Auf welchen Geräten kann ich spielen?',
    answer:
      'Um am Spiel teilnehmen zu können, braucht das Gerät Internet Zugang. Es muss keine App installiert werden, alles wird über den Browser erreichbar sein. Dementsprechend kann jedes Gerät verwendet werden.',
  },
  {
    question: 'Wie lange dauert eine Spielrunde?',
    answer:
      'Wir planen damit, dass eine Runde etwa 60 Minuten dauert. Je nachdem, wie (un-)geschickt sich die Imposter anstellen, kann eine Runde schneller oder kürzer vorbeigehen. Sollte eine Runde frühzeitig zu Ende sein, kann es sein, dass wir eine zweite Runde beginnen.',
  },
  {
    question: 'Ist das Spiel kostenlos?',
    answer:
      'Die Teilnahme bei Office Imposters bei Konstanz spielt! ist kostenlos.',
  },
  {
    question: "Für welches Alter ist das Spiel geeignet?",
    answer: "Wir empfehlen das Spiel ab einem Alter von 12 Jahren. Nach oben hin gibt es keine Altersgrenze, auch ältere Menschen haben Spaß an dem Spiel!",
  },
  {
    question: "Wo wird Office Imposters bei Konstanz spielt! stattfinden?",
    answer: "Office Imposters wird im Coworkingspace St. Johann, Brückengasse 1b, 78462 Konstanz stattfinden."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="bg-[#1a2e3a] py-20">
      <Container>
        <h2 className="mb-10 text-center text-6xl font-family-vintages text-primary">
          Häufige Fragen
        </h2>
        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface FAQItemProps {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="rounded-2xl bg-[#233D4D] shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold text-white transition hover:text-primary"
        aria-expanded={isOpen}
      >
        <span>{faq.question}</span>
        <span
          className="ml-4 text-xl text-primary transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      {/* grid-template-rows trick: animates from 0fr → 1fr smoothly */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-gray-300">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
