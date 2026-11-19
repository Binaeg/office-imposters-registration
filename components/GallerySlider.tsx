"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Container from "./Container";

const slides = [
  {
    src: "/img/Moderation_Office_Imposters.webp",
    alt: "Spielleiter moderieren eine Runde Office Imposters am Besprechungstisch",
    title: "Das Briefing",
    text: "Wir erklären euch das Spiel, losen die Imposter und verteilen die Rollen.",
  },
  {
    src: "/img/Namensschilder_Office_Imposters.webp",
    alt: "Namensschilder der Office-Imposters-Charaktere auf dem Tisch",
    title: "Eure neue Identität",
    text: "Alle schlüpfen in einen Charakter, von Birgit Bürgerlich über René Routine bis Mika Musterperson. Hier können sich alle wiederfinden.",
  },
  {
    src: "/img/Aufgabe_an_Station_Office_Imposters.webp",
    alt: "Spieler scannt Barcodes an der Aufgabenstation Wareneingang",
    title: "Aufgaben erledigen",
    text: "An echten Stationen löst ihr kleine Büro-Aufgaben und versucht das Büro zu retten. Passt auf, dass euch die Imposter nicht erwischen!",
  },
  {
    src: "/img/Aufgabenstation_Office_Imposters.webp",
    alt: "Aufgabenstation Inventur mit Knöpfen und Ziffernanzeigen",
    title: "Liebevoll gebaute Stationen",
    text: "Knöpfe, Scanner, Anzeigen: Jede Station ist ein eigenes kleines Rätsel-Gadget.",
  },
  {
    src: "/img/Abstimmung_Office_Imposters.webp",
    alt: "Gruppe diskutiert und stimmt ab, wer der Imposter ist",
    title: "Diskussion & Abstimmung",
    text: "Wer war's? Gemeinsam wird diskutiert, beschuldigt und abgestimmt. So könnt ihr Imposter enttarnen.",
  },
];

export default function GallerySlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const i = (index + slides.length) % slides.length;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setActive(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-background py-16" aria-roledescription="carousel" aria-label="Impressionen von Office Imposters">
      <Container>
        <h2 className="mb-10 text-center md:text-7xl text-4xl font-family-digitalt text-primary hyphens-auto">So läuft das Spiel</h2>

        <div className="relative">
          <div
            ref={trackRef}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                goTo(active + 1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                goTo(active - 1);
              }
            }}
            className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl shadow-2xl outline-none focus-visible:ring-4 focus-visible:ring-primary [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((slide, i) => (
              <figure
                key={slide.src}
                className="relative flex w-full shrink-0 snap-center flex-col bg-[#1a2e3a] sm:block sm:aspect-3/2"
                aria-roledescription="slide"
                aria-label={`${i + 1} von ${slides.length}`}
              >
                {/* Mobile: Bild in voller Größe, Text darunter. Ab sm: Text als Overlay. */}
                <div className="relative aspect-3/2 w-full sm:absolute sm:inset-0 sm:aspect-auto">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 1024px) 960px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex-1 px-5 py-4 text-left sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-linear-to-t sm:from-black/85 sm:via-black/50 sm:to-transparent sm:px-8 sm:pb-7 sm:pt-16">
                  <h3 className="text-xl font-extrabold text-primary sm:text-2xl">{slide.title}</h3>
                  <p className="mt-1 max-w-xl text-sm text-white sm:text-base">{slide.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Vorheriges Bild"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur transition hover:bg-primary hover:text-black sm:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Nächstes Bild"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur transition hover:bg-primary hover:text-black sm:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Bild ${i + 1}: ${slide.title}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
