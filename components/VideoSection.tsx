import Image from "next/image";
import Container from "./Container";

export default function VideoSection() {
  return (
    <section className="bg-[#1a2e3a] py-16">
      <Container>
        <h2 className="mb-10 text-center md:text-7xl text-5xl font-family-digitalt text-primary">Was ist Office Imposters?</h2>

        {/* Desktop: video right, text left. Mobile: video top, text below. */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
          {/* Video – right on desktop, top on mobile (order-1 / order-2) */}
          <div className="order-1 md:order-1 w-full max-w-70 md:max-w-70 overflow-hidden rounded-2xl shadow-2xl bg-black shrink-0">
            <video
              className="w-full"
              style={{ aspectRatio: "9/16" }}
              src="/OfficeImposterMusik.mp4"
              controls
              playsInline
              preload="metadata"
              aria-label="Office Imposter Musik Video"
            />
          </div>

          {/* Teaser text – left on desktop, below video on mobile (order-2 / order-1) */}
          <div className="order-2 md:order-2 md:flex-1 md:max-w-sm flex flex-col justify-center text-center md:text-left relative">
            <Image
              src="/coffee/coffee-stain-3.svg"
              alt="Coffee Stain"
              width={400}
              height={400}
              aria-hidden="true"
              className="absolute inset-20 md:inset-25 w-full h-full object-contain opacity-30 md:scale-150 pointer-events-none select-none"
            />
            <h3 className="mb-4 text-2xl font-extrabold text-primary">Findet den Verräter unter euch</h3>
            <p className="text-gray-300 leading-relaxed">
              Office Imposters ist eine Reallife-Adaption von Among Us im Bürosetting. Während die Mitarbeitenden versuchen, ihre Aufgaben zu erfüllen, mischen sich die Imposter unter sie, um sie von der Erfüllung der Aufgaben abzuhalten. Durch Diskussionen und Abstimmungen müssen die Spielenden herausfinden, wer die Imposter sind, bevor es zu spät ist!
            </p>
            <ul className="mt-6 space-y-2 text-gray-300 list-disc pl-5">
              <li>Verstecke deine Rolle</li>
              <li>Diskutiere &amp; überzeuge</li>
              <li>Enttarne die Imposter</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
