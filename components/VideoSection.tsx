import Container from "./Container";

export default function VideoSection() {
  return (
    <section className="bg-[#1a2e3a] py-16">
      <Container>
        <h2 className="mb-10 text-center text-6xl font-family-vintages text-primary">Was ist Office Imposters?</h2>

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
          <div className="order-2 md:order-2 md:flex-1 md:max-w-sm flex flex-col justify-center text-center md:text-left">
            <h3 className="mb-4 text-2xl font-extrabold text-primary">Wer schleicht sich durchs Büro?</h3>
            <p className="text-gray-300 leading-relaxed">
              Office Imposters ist das soziale Deduktionsspiel für dein Team. Einer unter euch ist der Imposter – findet ihn, bevor er das Büro ins Chaos stürzt!
            </p>
            <ul className="mt-6 space-y-2 text-gray-300">
              <li>🕵️ Täusche deine Kollegen</li>
              <li>🗣️ Diskutiere &amp; überzeuge</li>
              <li>🎯 Enttarne den Imposter</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
