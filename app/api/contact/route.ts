import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendMail } from '@/lib/mailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save the message to the database
    const { error: dbError } = await supabase
      .from('messages')
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error('Error saving message to database:', dbError);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // Send email to us
    const toUsSubject = `New message from ${name}`;
    const toUsText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    await sendMail({
        to: process.env.CONTACT_FORM_SEND_TO!,
        subject: toUsSubject,
        text: toUsText,
    });

    // Send confirmation email to the client
    const toClientSubject = 'Thank you for your message';
    const toClientText = `Hi ${name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nYour message:\n${message}\n\nBest regards,\nThe Team`;
    await sendMail({
        to: email,
        subject: toClientSubject,
        text: toClientText,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
