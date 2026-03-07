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

const vintages = localFont({
  src: "../public/Vintages.woff2",
  variable: "--font-vintages",
});

export const metadata: Metadata = {
  title: "Office Imposter – Frühen Zugang sichern",
  description: "Das soziale Deduktionsspiel für dein Büro. Melde dich jetzt für den frühen Zugang an!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vintages.variable} antialiased`}
      >
        {children}
        <footer className="bg-[#233D4D] py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Office Imposters. Alle Rechte vorbehalten.
        </footer>
      </body>
    </html>
  );
}
