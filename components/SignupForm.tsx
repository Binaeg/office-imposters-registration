"use client";

import { useState, FormEvent } from "react";
import Container from "./Container";
import { SLOT_DATES, SLOT_TIMES, formatSlotDate, type SlotDate, type SlotTime } from "@/lib/slots";
import Image from "next/image";

interface FormState {
  name: string;
  email: string;
  people_count: string;
  marketing_opt_in: boolean;
  slot_date: SlotDate | "";
  slot_time: SlotTime | "";
}

export default function SignupForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    people_count: "1",
    marketing_opt_in: false,
    slot_date: "",
    slot_time: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const timeSlotId = form.slot_date && form.slot_time ? `${form.slot_date}T${form.slot_time}` : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!timeSlotId) {
      setErrorMessage("Bitte wähle einen Termin aus.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          people_count: Number(form.people_count),
          marketing_opt_in: form.marketing_opt_in,
          time_slot: timeSlotId,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", people_count: "1", marketing_opt_in: false, slot_date: "", slot_time: "" });
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
        <h2 className="mb-8 text-center md:text-7xl text-5xl font-family-digitalt text-primary ">Jetzt bei &quot;Konstanz spielt!&quot; ausprobieren</h2>

        {status === "success" ? (
          <div className="mx-auto max-w-md rounded-2xl bg-[#1a2e3a] p-8 text-center shadow-xl">
            <p className="text-2xl font-bold text-primary">Anmeldung erfolgreich!</p>
            <p className="mt-3 text-white">
              Vielen Dank für deine Anmeldung. Wir freuen uns darauf, dich bei &quot;Konstanz spielt!&quot; begrüßen zu dürfen. Du erhältst in Kürze eine Bestätigungs-E-Mail mit
              weiteren Informationen zum Event.
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

            {/* Anzahl Personen */}
            <div className="mb-5">
              <label htmlFor="people_count" className="mb-1 block font-semibold text-white">
                Anzahl Personen
              </label>
              <select
                id="people_count"
                value={form.people_count}
                onChange={(e) => setForm({ ...form, people_count: e.target.value })}
                className="w-full rounded-xl border-2 border-transparent bg-[#233D4D] px-4 py-3 text-white outline-none focus:border-primary"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Person" : "Personen"}
                  </option>
                ))}
              </select>
            </div>

            {/* Date selection */}
            <div className="mb-5">
              <p className="mb-2 block font-semibold text-white">Datum</p>
              <div className="grid grid-cols-2 gap-3">
                {SLOT_DATES.map((date) => {
                  const selected = form.slot_date === date;
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setForm({ ...form, slot_date: date, slot_time: "" })}
                      className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold transition hover:scale-105 ${
                        selected ? "border-primary bg-primary text-black" : "border-white/30 bg-[#233D4D] text-white hover:border-primary"
                      }`}
                    >
                      {formatSlotDate(date)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slot selection – only shown after a date is picked */}
            {
              <div className="mb-6">
                <p className="mb-2 block font-semibold text-white">Uhrzeit</p>
                <div className="grid grid-cols-3 gap-3">
                  {SLOT_TIMES.map((time) => {
                    const selected = form.slot_time === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setForm({ ...form, slot_time: time })}
                        className={`rounded-xl border-2 px-3 py-3 text-sm font-semibold transition hover:scale-105 ${
                          selected ? "border-primary bg-primary text-black" : "border-white/30 bg-[#233D4D] text-white hover:border-primary"
                        }`}
                      >
                        {time} Uhr
                      </button>
                    );
                  })}
                </div>
              </div>
            }

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

            <div className="mb-6 flex items-start gap-3">
              <label htmlFor="marketing_opt_in" className="text-sm text-white">
                Jede*r Spieler*in braucht ein aufgeladenes mobiles Endgerät (Smartphone oder Tablet) für die Teilnahme. Bitte stelle sicher, dass alle Teilnehmer*innen ein geeignetes Gerät dabei haben. 
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
              {status === "loading" ? "Wird gesendet..." : "Jetzt anmelden"}
            </button>
          </form>
        )}
      </Container>
    </section>
  );
}
