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
  title: "Office Imposters",
  description: "Ein Reallife Deduction Game bei Konstanz spielt!",
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
          <div>© {new Date().getFullYear()} Office Imposters. Alle Rechte vorbehalten.</div>
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
