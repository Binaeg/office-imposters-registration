"use client";

import { useState } from "react";
import Container from "./Container";
import Image from "next/image";

const faqs = [
  {
    question: "Was ist Office Imposters?",
    answer:
      "Office Imposters ist ein spannendes Teambuilding Spiel in Konstanz – eine Reallife Adaption von Among Us. Alle Mitarbeitenden haben Aufgaben im Unternehmen zu erfüllen. Allerdings sind auch einige Imposter unterwegs, die versuchen, das Unternehmen zu sabotieren. Sobald Imposter eine*n Mitarbeitenden ausscahlten, kann ein Notfallmeeting einberufen werden. In diesem Meeting kommen alle zusammen und versuchen herauszufinden, wer ein Imposter sein könnte. Durch Abstimmung können Imposter enttarnt und so das Unternehmen gerettet werden.",
  },
  {
    question: "Was braucht man um mitspielen zu können?",
    answer:
      "Für dieses Spiel benötigen alle Spielenden ein eigenes, aufgeladenes mobiles Endgerät. Außerdem brauchen alle Spielenden einen Internetzugang. Sollte vor Ort kein WLAN verfügbar sein, können wir ggf. ein eigenes Netzwerk aufbauen.",
  },
  {
    question: "Warum brauche ich ein mobiles Endgerät?",
    answer:
      "Der Großteil des Spiels findet im echten Leben (Reallife) statt. Das mobile Endgerät wird lediglich benötigt, um die geheimen Rollen und Aufgaben anzuzeigen. Es unterstützt den Spielprozess, ohne dass das Teamevent rein digital wird.",
  },
  {
    question: "Wie lange dauert eine Runde Office Imposters?",
    answer:
      "Wir planen für dieses Spiel etwa 60-90 Minuten pro Runde ein. Es hängt ein wenig davon ab, wie viele Personen mitspielen. Runden, mit 15 Personen gehen schneller als Runden mit 30 Personen.",
  },
  {
    question: "Was kostet Office Imposters?",
    answer:
      "Eine genaue Preisgestaltung haben wir nicht, das hängt von der Anfahrt, der Anzahl der Runden und den Mitspielenden Personen ab. Eine grobe Richtlinie sind 40€/Person. Oft machen wir Pauschalpreise, die im einzelnen abgesprochen werden.",
  },
  {
    question: "Wo kann ich Office Imposters spielen?",
    answer:
      "Office Imposters ist ein mobiles Teamevent, das heißt wir kommen zu euch ins Unternehmen, in die Schule oder auch jeden anderen Ort, den ihr uns vorschlagt. Die Räumlichkeiten sollten etwas verwinkelt sein, mehrere Räume sind aber auch geeignet. Außerdem braucht es einen Meeting Raum, in dem alle Mitarbeitenden einen Platz an einem 'Runden Tisch' Platz finden. Gerne können wir in einem kurzen Telefonat klären, was es genau braucht.",
  },
  {
    question: "Ab wann kann ich Office Imposters buchen?",
    answer:
      "Aktuell sind wir noch in der Entwicklung, der erste Prototyp steht. Die Rückmeldungen bei 'Konstanz spielt!' waren so gut, dass wir das Produkt auf jeden Fall fertig entwickeln. Wir planen, bis zum Sommer so weit zu sein, dass es spielbar ist. Schreibt uns einfach an mit euren Anforderungen, dann können wir euch genauere Infos geben.",
  },
  {
    question: "Wie viele Personen können mitspielen?",
    answer:
      "Office Imposters können wir mit bis zu 40 Personen spielen. Praxiserprobt ist es mit 35 Personen, deshalb sind wir zuversichtlich, dass es auch mit 40 Personen klappt!",
  },
  {
    question: "Ab wie vielen Personen kann man Office Imposters spielen?",
    answer: `Wir haben uns entschieden, Office Imposters ab 15 Personen anzubieten. Weniger Personen ergeben aus spieldynamischer Sicht keinen Sinn. Wenn ihr ein Teamevent für weniger Personen sucht, schaut euch gerne unseren Escape Room <a href="https://schluesselmomente-escape-rooms.de/" class="text-primary hover:underline" target="_blank">'Die Suche nach dem heiligen Gral'</a> an.`,
  },
  {
    question: "Ist Office Imposters für alle Altersgruppen geeignet?",
    answer:
      "Office Imposters ist fast altersunabhängig. Es macht tatsächlich keinen Unterschied, ob ihr alle in einer Altersgruppe seid oder bunt gemischt. Es können im gleichen Spiel Familien mit ihren Kindern mitspielen aber auch Erwachsene. In solchen Konstellationen entstehen oft besonders lustige Momente im Notfallmeeting. Das Spiel ist also auch geeignet, wenn ihr es als Sommerfest oder Weihnachtsfeier den Familien eurer Kolleg*innen spielen möchtet.",
  },
  {
    question: "Wir haben weitere Fragen, wie erreichen wir euch?",
    answer: `Ihr erreicht uns auf allen gängigen Kanälen. Entweder ihr nutzt das Kontaktformular von oben. Alternativ könnt ihr auch direkt eine E-Mail an uns schreiben. Oder aber ihr ruft uns an. Die Kontaktdaten findet ihr <a href="https://schluesselmomente-escape-rooms.de/kontakt/" class="text-primary hover:underline" target="_blank" ">hier</a>.`,
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
          <div className="px-6 pb-5 text-gray-300" dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </div>
      </div>
    </div>
  );
}
