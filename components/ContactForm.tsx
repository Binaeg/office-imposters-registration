"use client";

import { useState, FormEvent } from "react";
import Container from "./Container";
import { SLOT_DATES, SLOT_TIMES, formatSlotDate, type SlotDate, type SlotTime } from "@/lib/slots";
import Image from "next/image";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  marketing_opt_in: boolean;
  slot_date: SlotDate | "";
  slot_time: SlotTime | "";
}

export default function SignupForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    marketing_opt_in: false,
    slot_date: "",
    slot_time: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const timeSlotId = form.slot_date && form.slot_time ? `${form.slot_date}T${form.slot_time}` : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "", marketing_opt_in: false, slot_date: "", slot_time: "" });
      } else {
        const data = await response.json();
        setErrorMessage(data.error ?? "Ein Fehler ist aufgetreten");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Verbindungsfehler. Bitte versuche es erneut.");
      setStatus("error");
    }
  }

  return (
    <section id="signup" className="bg-[#233D4D] py-20 relative overflow-hidden">
      <Image
        src="/coffee/coffee-stain-5.svg"
        alt="Coffee Stain"
        aria-hidden="true"
        width={500}
        height={500}
        className="absolute md:left-50 top-1/2 -translate-y-1/2 w-72 md:w-96 opacity-40 pointer-events-none select-none"
      />
      <Container>
        <h2 className="mb-8 text-center md:text-7xl text-4xl font-family-digitalt text-primary hyphens-auto">Jetzt Kontakt aufnehmen</h2>
        <h3 className="mb-8 text-center md:text-2xl text-4xl hyphens-auto">
          Du hast Office Imposters bei 'Konstanz spielt!' ausprobiert? Oder möchtest du mehr über das Spiel erfahren?
        </h3>
        <h3 className="mb-8 text-center md:text-2xl text-4xl hyphens-auto font-bold">Dann kontaktiere uns!</h3>

        {status === "success" ? (
          <div className="mx-auto max-w-md rounded-2xl bg-[#1a2e3a] p-8 text-center shadow-xl">
            <p className="text-2xl font-bold text-primary">Nachricht erfolgreich verschickt!</p>
            <p className="mt-3 text-white">
              Vielen Dank für deine Nachricht. Wir melden uns so schnell wie möglich bei dir! In der Zwischenzeit kannst du gerne unsere FAQ durchstöbern.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-2xl bg-white/10 backdrop-blur border border-white/30 p-8 shadow-xl" noValidate>
            {/* Name */}
            <div className="mb-5">
              <label htmlFor="name" className="mb-1 block font-semibold text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border-2 border-transparent bg-[#233D4D] px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-primary"
                placeholder="Dein Name"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="mb-1 block font-semibold text-white">
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border-2 border-transparent bg-[#233D4D] px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-primary"
                placeholder="deine@email.de"
              />
            </div>

            {/* Telefon */}
            <div className="mb-5">
              <label htmlFor="phone" className="mb-1 block font-semibold text-white">
                Telefon (optional)
              </label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border-2 border-transparent bg-[#233D4D] px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-primary"
                placeholder="+49 170 1234567"
              />
            </div>

            {/* Nachricht */}
            <div className="mb-5">
              <label htmlFor="message" className="mb-1 block font-semibold text-white">
                Nachricht
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border-2 border-transparent bg-[#233D4D] px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-primary"
                placeholder="Deine Nachricht"
              />
            </div>

            {/* Marketing Opt-in */}
            <div className="mb-6 flex items-start gap-3">
              <input
                id="marketing_opt_in"
                type="checkbox"
                checked={form.marketing_opt_in}
                onChange={(e) => setForm({ ...form, marketing_opt_in: e.target.checked })}
                className="mt-1 h-4 w-4 accent-primary"
              />
              <label htmlFor="marketing_opt_in" className="text-sm text-gray-300">
                Ich möchte Neuigkeiten und Updates zu Office Imposters per E-Mail erhalten.
              </label>
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="mb-4 rounded-lg bg-red-800 px-4 py-2 text-sm text-white" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-primary px-6 py-3 font-bold text-black shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Wird gesendet..." : "Nachricht senden"}
            </button>
          </form>
        )}
      </Container>
    </section>
  );
}
