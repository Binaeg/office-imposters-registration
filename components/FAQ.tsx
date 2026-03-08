'use client';

import { useState } from 'react';
import Container from './Container';
import Image from 'next/image';

const faqs = [
  {
    question: 'Was ist Office Imposters?',
    answer:
      'Office Imposters ist eine Reallife Adaption von Among Us, also ein Social Deduction Game. Bei diesem geht es darum, Aufgaben zu erfüllen und die Imposter unter den anderen Spielenden zu enttarnen. Als Verräter geht es darum, das restliche Team zu sabotieren. Office Imposters ist vergleichbar mit Mafia, Werwölfe oder Blood on the Clocktower.',
  },
  {
    question: 'Was muss ich mitbringen?',
    answer:
      'Um Office Imposters spielen zu können, braucht alle Spielenden ein eigenes aufgeladenes mobiles Endgerät. Wenn das Gerät mobile Daten zur Verfügung hat, ist das super, wir werden aber auch ein WLAN zur Verfügung stellen.',
  },
  {
    question: 'Warum brauche ich ein mobiles Endgerät?',
    answer:
      'Der Großteil des Spiels wird im echten Leben (Reallife) stattfinden. Das mobile Endgerät wird benötigt, um die geheimen Rollen und Aufgaben der Spielenden anzuzeigen. Das mobile Endgerät unterstützt den Spielprozess, das Spiel an sich ist aber nicht digital.',
  },
  {
    question: 'Wie lange dauert eine Spielrunde?',
    answer:
      'Wir planen damit, dass eine Runde etwa 60 Minuten dauert. Je nach Spieldynamik und Rollenverteilung kann eine Runde jedoch kürzer oder länger dauern. Sollte eine Runde besonders frühzeitig zu Ende sein, kann es sein, dass wir eine zweite Runde beginnen.',
  },
  {
    question: 'Ist die Teilnahme an Office Imposters kostenlos?',
    answer:
      'Ja, die Teilnahme bei Office Imposters während \'Konstanz spielt!\' ist kostenlos.',
  },
  {
    question: "Für welches Alter ist das Spiel geeignet?",
    answer: "Wir empfehlen das Spiel ab einem Alter von 12 Jahren. Nach oben hin gibt es keine Altersgrenze, auch ältere Menschen haben Spaß an dem Spiel!",
  },
  {
    question: "Wo wird Office Imposters bei 'Konstanz spielt!' stattfinden?",
    answer: "Office Imposters wird im Coworkingspace St. Johann, Brückengasse 1b, 78462 Konstanz stattfinden."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="bg-[#1a2e3a] py-20 relative overflow-hidden">
      <Image
        src="/coffee/coffee-stain-2.svg"
        alt="Coffee Stain"
        width={500}
        height={500}
        aria-hidden="true"
        className="absolute right-0 sm:right-50 md:right-70 top-1/2 -translate-y-1/2 w-72 md:w-96 opacity-30 pointer-events-none select-none"
      />
      <Container className='relative z-10'>
        <h2 className="mb-10 text-center md:text-7xl text-4xl font-family-digitalt text-primary hyphens-auto">
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
