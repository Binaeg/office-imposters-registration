import { NextRequest, NextResponse, after } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { VALID_SLOT_IDS, SLOT_MAX_CAPACITY } from '@/lib/slots';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const { name, email, people_count, marketing_opt_in, time_slot } = body as {
    name?: string;
    email?: string;
    people_count?: number;
    marketing_opt_in?: boolean;
    time_slot?: string;
  };

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name ist erforderlich' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Gültige E-Mail-Adresse ist erforderlich' }, { status: 400 });
  }
  if (!people_count || typeof people_count !== 'number' || people_count < 1 || people_count > 5) {
    return NextResponse.json({ error: 'Anzahl Personen muss zwischen 1 und 5 liegen' }, { status: 400 });
  }
  if (!time_slot || !VALID_SLOT_IDS.has(time_slot)) {
    return NextResponse.json({ error: 'Bitte wähle einen gültigen Termin' }, { status: 400 });
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanName = name.trim();

  // Check remaining capacity for the selected slot
  const db = supabaseServer.schema('marketing');
  const { data: existing, error: countError } = await db
    .from('signups')
    .select('people_count')
    .eq('time_slot', time_slot);

  if (countError) {
    console.error('Capacity check error:', countError);
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }

  const bookedCount = existing?.reduce((sum, row) => sum + (row.people_count as number), 0) ?? 0;
  if (bookedCount + people_count > SLOT_MAX_CAPACITY) {
    const remaining = SLOT_MAX_CAPACITY - bookedCount;
    const msg = remaining <= 0
      ? 'Dieser Termin ist leider ausgebucht.'
      : `Für diesen Termin sind nur noch ${remaining} Plätze verfügbar.`;
    return NextResponse.json({ error: msg }, { status: 409 });
  }

  // Insert into Supabase and get back the generated ID
  const { data: inserted, error: dbError } = await db.from('signups').insert({
    name: cleanName,
    email: cleanEmail,
    people_count,
    marketing_opt_in: Boolean(marketing_opt_in),
    time_slot,
  }).select('id').single();

  if (dbError) {
    console.error('Supabase error:', dbError);
    if (dbError.code === '23505') {
      return NextResponse.json(
        { error: 'Diese E-Mail-Adresse ist bereits angemeldet' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Datenbankfehler' }, { status: 500 });
  }

  const signupId = (inserted as { id: string }).id;

  // Use after() so Vercel keeps the function alive until the email fetch completes
  const baseUrl = request.nextUrl.origin;
  after(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/send-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, time_slot, base_url: baseUrl, signup_id: signupId }),
      });
      if (!res.ok) console.error('send-confirmation failed:', await res.text());
    } catch (err) {
      console.error('Email route error:', err);
    }
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
