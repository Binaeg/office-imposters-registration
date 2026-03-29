import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const supabase = supabaseServer.schema("marketing");
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Bitte fülle alle Felder aus." }, { status: 400 });
    }

    // Save the message to the database
    const { error: dbError } = await supabase.from("messages").insert([{ name, email, message }]);

    if (dbError) {
      console.error("Error saving message to database:", dbError);
      return NextResponse.json({ error: "Datenbankfehler" }, { status: 500 });
    }

    // Send email to us
    const toUsSubject = `Neue Nachricht von ${name}`;
    const toUsText = `Name: ${name}\nE-Mail: ${email}\nNachricht: ${message}`;
    await sendMail({
      to: process.env.CONTACT_FORM_SEND_TO!,
      subject: toUsSubject,
      text: toUsText,
    });

    // Send confirmation email to the client
    const toClientSubject = "Danke für deine Nachricht";
    const toClientText = `Hallo ${name},\n\nvielen Dank für deine Nachricht! Wir haben sie erhalten und melden uns so schnell wie möglich bei dir.\n\nDeine Nachricht:\n${message}\n\nViele Grüße\nSimon und Marc`;
    await sendMail({
      to: email,
      subject: toClientSubject,
      text: toClientText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
