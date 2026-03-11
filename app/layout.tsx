import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-font-mono", subsets: ["latin"], display: "swap" });
const digitalt = localFont({ src: "../public/Digitalt.ttf", variable: "--font-digitalt", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#233D4D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://office-imposters.schluesselmomente-escape-rooms.de"),
  // Leading with the target keywords for maximum SEO impact
  title: "Teamevent Konstanz | Teambuilding & Social Deduction | Office Imposters",
  description:
    "Das ultimative Teamevent in Konstanz: Office Imposters! Stärken Sie Ihr Teambuilding mit unserem Reallife Social Deduction Game. Jetzt für Firmen & Gruppen anfragen.",
  keywords: [
    "Teamevent Konstanz",
    "Teambuilding Konstanz",
    "Firmenevent Konstanz",
    "Betriebsausflug Konstanz",
    "Office Imposters",
    "Social Deduction Game Reallife",
    "Escape Room Konstanz Alternative",
  ],
  authors: [{ name: "Schlüsselmomente Escape Rooms", url: "https://schluesselmomente-escape-rooms.de" }],
  openGraph: {
    title: "Teamevent & Teambuilding in Konstanz | Office Imposters",
    description: "Suchen Sie ein besonderes Teamevent in Konstanz? Entlarven Sie die Verräter bei Office Imposters – Spaß, Strategie und echtes Teambuilding.",
    url: "https://office-imposters.schluesselmomente-escape-rooms.de",
    siteName: "Office Imposters - Schlüsselmomente",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Teamevent Konstanz Office Imposters" }],
  },
  icons: {
    icon: [
      { url: "/android-chrome-512x512.png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teamevent Konstanz | Office Imposters",
    description: "Das neue Highlight für Teambuilding in Konstanz. Wer ist der Imposter?",
    images: ["/og-image.png"],
  },
  verification: {
    google: "rE8WLEjXXyrZAdFACxNGuQeM-7I_3mhiLeK46cnpHa8",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${digitalt.variable} antialiased min-h-screen flex flex-col`}>
        {/* We removed the <main> here because it's already inside your Home component */}
        {children}
        <footer className="bg-[#233D4D] py-8 text-center text-sm text-gray-400">
          <div className="container mx-auto px-4">
            <div className="text-white mb-4">
              Ein besonderes{" "}
              <Link href="/" className="hover:text-white underline">
                Teamevent in Konstanz
              </Link>{" "}
              von{" "}
              <Link href="https://schluesselmomente-escape-rooms.de/" className="underline hover:text-gray-200" target="_blank" rel="noopener">
                Schlüsselmomente Escape Rooms
              </Link>
            </div>
            <div className="mb-4">© {new Date().getFullYear()} Schlüsselmomente. Alle Rechte vorbehalten.</div>
            <nav className="flex justify-center gap-6">
              <Link href="https://schluesselmomente-escape-rooms.de/impressum/" className="hover:text-white" target="_blank" rel="noopener">
                Impressum
              </Link>
              <Link href="https://schluesselmomente-escape-rooms.de/datenschutz/" className="hover:text-white" target="_blank" rel="noopener">
                Datenschutz
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
