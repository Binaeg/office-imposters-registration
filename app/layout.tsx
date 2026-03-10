import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const digitalt = localFont({
  src: "../public/Digitalt.ttf",
  variable: "--font-digitalt",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://office-imposters.schluesselmomente-escape-rooms.de"),
  title: "Office Imposters",
  description: "Findet die Verräter – das Reallife Social Deduction Game bei Konstanz spielt!",
  keywords: ["Office Imposters", "Social Deduction Game", "Konstanz spielt", "Among Us Reallife", "Escape Room Konstanz"],
  authors: [{ name: "Schlüsselmomente Escape Rooms", url: "https://schluesselmomente-escape-rooms.de" }],
  creator: "Schlüsselmomente Escape Rooms",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Office Imposters",
    description: "Findet die Verräter – das Reallife Social Deduction Game bei Konstanz spielt!",
    url: "https://office-imposters.schluesselmomente-escape-rooms.de",
    siteName: "Office Imposters",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Office Imposters" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Imposters",
    description: "Findet die Verräter – das Reallife Social Deduction Game bei Konstanz spielt!",
    images: ["/og-image.png"],
  },
  verification: {
    google: "rE8WLEjXXyrZAdFACxNGuQeM-7I_3mhiLeK46cnpHa8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} ${digitalt.variable} antialiased`}>
        {children}
        <footer className="bg-[#233D4D] py-6 text-center text-sm text-gray-400">
          <div className="text-white mb-3">
            Ein Spiel von{" "}
            <a className="underline" href="https://schluesselmomente-escape-rooms.de/" target="_blank">
              Schlüsselmomente Escape Rooms
            </a>
            .
          </div>
          <div>© {new Date().getFullYear()} Schlüsselmomente Escape Rooms. Alle Rechte vorbehalten.</div>
          <div>
            <a href="https://schluesselmomente-escape-rooms.de/datenschutz/" className="hover:underline" target="_blank">
              Datenschutz
            </a>
            <a href="https://schluesselmomente-escape-rooms.de/impressum/" className="ml-4 hover:underline" target="_blank">
              Impressum
            </a>
            <a href="https://schluesselmomente-escape-rooms.de/uber-uns/" className="ml-4 hover:underline" target="_blank">
              Über uns
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
