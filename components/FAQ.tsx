"use client";

import { useState } from "react";
import Container from "./Container";
import Image from "next/image";

const faqs = [
  {
    question: "Was ist Office Imposters?",
    answer:
      "Office Imposters ist ein spannendes Teambuilding Spiel in Konstanz – eine Reallife Adaption von Social Deduction Games wie Among Us. Als Team erfüllt ihr Aufgaben und müsst die Verräter (Imposter) unter euch enttarnen. Es verbindet Strategie und Kommunikation, vergleichbar mit Mafia oder Werwölfe.",
  },
  {
    question: "Was muss ich mitbringen?",
    answer:
      "Für dieses Spiel benötigen alle Spielenden ein eigenes, aufgeladenes mobiles Endgerät. Ein WLAN-Zugang wird vor Ort zur Verfügung gestellt, mobile Daten sind jedoch ebenfalls von Vorteil.",
  },
  {
    question: "Warum brauche ich ein mobiles Endgerät?",
    answer:
      "Der Großteil des Spiels findet im echten Leben (Reallife) statt. Das mobile Endgerät wird lediglich benötigt, um die geheimen Rollen und Aufgaben anzuzeigen. Es unterstützt den Spielprozess, ohne dass das Teamevent rein digital wird.",
  },
  {
    question: "Wie lange dauert eine Runde Office Imposters?",
    answer:
      "Wir planen für dieses Spiel etwa 60 Minuten pro Runde ein. Je nach Spieldynamik kann es variieren. Sollte eine Runde frühzeitig enden, starten wir oft eine zweite Runde.",
  },
  {
    question: "Ist die Teilnahme kostenlos?",
    answer: "Ja, die Teilnahme bei Office Imposters während des Events 'Konstanz spielt!' ist komplett kostenlos.",
  },
  {
    question: "Wo findet das Teamevent während 'Konstanz spielt!' statt?",
    answer: "Das Spiel findet im Coworkingspace St. Johann, Brückengasse 1b, 78462 Konstanz statt – der ideale Ort für innovatives Teambuilding.",
  },
  {
    question: "Kann ich Office Imposters auch nach der Messe als Teamevent buchen?",
    answer:
      "Absolut! Office Imposters ist perfekt als Teamevent oder Teambuilding-Maßnahme geeignet. Es fördert die Kommunikation, das Vertrauen und den Teamgeist auf spielerische Weise. Wir bringen das Spiel gerne zu euch ins Büro oder an einen Ort eurer Wahl in Konstanz und Umgebung. Sprecht uns gerne bei der Spielemesse an oder schreibt uns eine E-Mail.",
  },
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
        alt="Kaffeefleck"
        width={500}
        height={500}
        aria-hidden="true"
        className="absolute right-0 sm:right-50 md:right-70 top-1/2 -translate-y-1/2 w-72 md:w-96 opacity-30 pointer-events-none select-none"
      />
      <Container className="relative z-10">
        {/* SEO Tip: H2 is perfect here. "Teamevent FAQ" helps crawlers */}
        <h2 className="mb-10 text-center md:text-7xl text-4xl font-family-digitalt text-primary hyphens-auto">Teamevent FAQ</h2>
        <div className="mx-auto max-w-2xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} isOpen={openIndex === index} onToggle={() => toggle(index)} />
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
        <span className="ml-4 text-xl text-primary transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
          +
        </span>
      </button>
      {/* grid-template-rows trick: animates from 0fr → 1fr smoothly */}
      <div className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-gray-300">{faq.answer}</div>
        </div>
      </div>
    </div>
  );
}
