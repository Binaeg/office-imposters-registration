import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';
import { verifyCancelToken } from '@/lib/tokens';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  const token = request.nextUrl.searchParams.get('token');

  if (!id || !token || !verifyCancelToken(id, token)) {
    return new NextResponse(errorPage('Ungültiger oder abgelaufener Link.'), {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const { error } = await supabaseServer
    .schema('marketing')
    .from('signups')
    .update({ people_count: 0 })
    .eq('id', id);

  if (error) {
    console.error('Cancel error:', error);
    return new NextResponse(errorPage('Ein Fehler ist aufgetreten. Bitte versuche es später erneut.'), {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return new NextResponse(successPage(), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function successPage() {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Anmeldung storniert</title></head>
<body style="margin:0;font-family:Arial,sans-serif;background:#233D4D;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="text-align:center;padding:48px 32px;background:#1a2e3a;border-radius:16px;max-width:480px;">
    <h1 style="color:#FFCC00;margin-bottom:16px;">Anmeldung storniert</h1>
    <p style="font-size:16px;">Deine Anmeldung wurde erfolgreich storniert. Wir würden uns freuen, dich ein anderes Mal begrüßen zu dürfen!</p>
  </div>
</body>
</html>`;
}

function errorPage(message: string) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><title>Fehler</title></head>
<body style="margin:0;font-family:Arial,sans-serif;background:#233D4D;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="text-align:center;padding:48px 32px;background:#1a2e3a;border-radius:16px;max-width:480px;">
    <h1 style="color:#FFCC00;margin-bottom:16px;">Fehler</h1>
    <p style="font-size:16px;">${message}</p>
  </div>
</body>
</html>`;
}
