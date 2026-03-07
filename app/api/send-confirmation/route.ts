import { NextRequest, NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/lib/mailer';
import { generateCancelToken } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const { name, email, time_slot, base_url, signup_id } = body as {
    name?: string;
    email?: string;
    time_slot?: string;
    base_url?: string;
    signup_id?: string;
  };

  if (!name || !email || !time_slot || !base_url || !signup_id) {
    return NextResponse.json({ error: 'Fehlende Parameter' }, { status: 400 });
  }

  const token = generateCancelToken(signup_id);
  const cancelUrl = `${base_url}/api/cancel?id=${encodeURIComponent(signup_id)}&token=${token}`;

  await sendConfirmationEmail(email, name, time_slot, cancelUrl, base_url);

  return NextResponse.json({ success: true });
}
