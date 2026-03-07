import nodemailer from 'nodemailer';

// ─── Venue config ─────────────────────────────────────────────────────────────
// TODO: update these to match the real venue
const VENUE_NAME = 'St. Johann';
const VENUE_ADDRESS = 'Brückengasse 1b, 78462 Konstanz';
const VENUE_MAPS_URL = 'https://www.google.com/maps/place/St.+Johann+Konstanz+-+Coworking/@47.6641881,9.172862,17z/data=!3m2!4b1!5s0x479af702b82a7777:0x5e0c900ac248ee71!4m6!3m5!1s0x479af7aa23729df7:0xd3e0ec67cf3f2314!8m2!3d47.6641845!4d9.1754369!16s%2Fg%2F11g6xw4kl7?entry=ttu&g_ep=EgoyMDI2MDMwNC4xIKXMDSoASAFQAw%3D%3D';

// ─── Transporter ──────────────────────────────────────────────────────────────
function createTransporter() {
  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

function formatSlot(slotId: string): string {
  const [datePart, timePart] = slotId.split('T');
  const [year, month, day] = datePart.split('-');
  return `${day}.${month}.${year} um ${timePart} Uhr`;
}

// ─── Plain-text fallback ──────────────────────────────────────────────────────
function buildTextBody(name: string, slotLabel: string, cancelUrl: string): string {
  return [
    `Hallo ${name},`,
    '',
    'danke für deine Anmeldung bei Office Imposters!',
    '',
    `Dein Termin: ${slotLabel}`,
    '',
    `Ort: ${VENUE_NAME}`,
    VENUE_ADDRESS,
    VENUE_MAPS_URL,
    '',
    'Um am Spiel teilnehmen zu können, brauchst du ein aufgeladenes mobiles Endgerät (Smartphone oder Tablet). Bitte stelle sicher, dass alle Spieler*innen ein geeignetes Gerät dabei haben.',
    'Bitte komme 5–10 Minuten vor deinem Termin, damit wir pünktlich starten können.',
    '',
    'Wir freuen uns auf dich!',
    '',
    'Anmeldung stornieren:',
    cancelUrl,
    '',
    '────────────────',
    'Impressum: https://schluesselmomente-escape-rooms.de/impressum/',
    'Datenschutz: https://schluesselmomente-escape-rooms.de/datenschutz/',
    'Instagram: https://www.instagram.com/schluesselmomente.escape.rooms/',
    'Facebook: https://www.facebook.com/people/Schl%C3%BCsselmomente-Escape-Rooms/61551739506717/',
  ].join('\n');
}

// ─── HTML template (Outlook-compatible table layout) ─────────────────────────
function buildHtmlBody(name: string, slotLabel: string, cancelUrl: string, baseUrl: string): string {
  const mapImg = `${baseUrl}/map.png`;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="de">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deine Anmeldung bei Office Imposters</title>
</head>
<body style="margin:0;padding:0;background-color:#1a2e3a;">

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#1a2e3a;">
  <tr>
    <td align="center" style="padding:24px 12px;">

      <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td align="center" bgcolor="#233D4D" style="background-color:#233D4D;padding:32px 40px 24px 40px;">
            <h1 style="margin:0;font-family:Arial,sans-serif;font-size:32px;font-weight:bold;color:#FFCC00;letter-spacing:1px;">Office Imposters</h1>
            <p style="margin:8px 0 0 0;font-family:Arial,sans-serif;font-size:14px;color:#a0b8c4;">Deine Anmeldebestätigung</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td bgcolor="#f9f9f9" style="background-color:#f9f9f9;padding:32px 40px;">

            <p style="margin:0 0 16px 0;font-family:Arial,sans-serif;font-size:18px;color:#1a2e3a;">Hallo ${name},</p>
            <p style="margin:0 0 24px 0;font-family:Arial,sans-serif;font-size:15px;color:#333333;line-height:1.6;">
              danke f&uuml;r deine Anmeldung! Wir freuen uns riesig, dich bei Office Imposters begr&uuml;&szlig;en zu d&uuml;rfen.
            </p>

            <!-- Timeslot box -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              <tr>
                <td bgcolor="#233D4D" style="background-color:#233D4D;padding:20px 24px;">
                  <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:11px;color:#a0b8c4;text-transform:uppercase;letter-spacing:1px;">Dein Termin</p>
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:22px;font-weight:bold;color:#FFCC00;">${slotLabel}</p>
                </td>
              </tr>
            </table>

            <!-- Notes -->
            <p style="margin:0 0 10px 0;font-family:Arial,sans-serif;font-size:14px;color:#333333;line-height:1.6;">
              Bitte stelle sicher, dass alle Spieler*innen ein <strong> aufgeladenes mobiles Endger&auml;t</strong> (Smartphone oder Tablet) dabei haben &ndash; es wird f&uuml;r das Spiel ben&ouml;tigt.
            </p>
            <p style="margin:0 0 28px 0;font-family:Arial,sans-serif;font-size:14px;color:#333333;line-height:1.6;">
              Bitte komme 5&ndash;10 Minuten fr&uuml;her, damit wir p&uuml;nktlich mit allen starten k&ouml;nnen.
            </p>

            <!-- Location heading -->
            <p style="margin:0 0 12px 0;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;color:#1a2e3a;">Wo findet es statt?</p>

            <!-- Map image -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
              <tr>
                <td>
                  <a href="${VENUE_MAPS_URL}" target="_blank" style="display:block;">
                    <img src="${mapImg}" alt="Karte: ${VENUE_NAME}" width="520" height="auto" style="display:block;width:100%;max-width:520px;height:auto;border:0;" />
                  </a>
                </td>
              </tr>
            </table>

            <!-- Venue info -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
              <tr>
                <td style="padding:12px 0;">
                  <p style="margin:0 0 4px 0;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;color:#233D4D;">${VENUE_NAME}</p>
                  <p style="margin:0 0 10px 0;font-family:Arial,sans-serif;font-size:14px;color:#555555;">${VENUE_ADDRESS}</p>
                  <a href="${VENUE_MAPS_URL}" target="_blank" style="font-family:Arial,sans-serif;font-size:13px;color:#233D4D;">In Google Maps &ouml;ffnen &rarr;</a>
                </td>
              </tr>
            </table>

            <!-- Cancel link -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="border-top:1px solid #dddddd;padding-top:20px;">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#888888;">
                    Du kannst nicht kommen? <a href="${cancelUrl}" target="_blank" style="color:#c0392b;text-decoration:underline;">Anmeldung stornieren</a>
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#233D4D" style="background-color:#233D4D;padding:24px 40px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:12px;">
              <tr>
                <td align="center">
                  <a href="https://schluesselmomente-escape-rooms.de/impressum/" target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#a0b8c4;text-decoration:none;">Impressum</a>
                  <span style="font-family:Arial,sans-serif;font-size:12px;color:#a0b8c4;">&nbsp;&nbsp;&bull;&nbsp;&nbsp;</span>
                  <a href="https://schluesselmomente-escape-rooms.de/datenschutz/" target="_blank" style="font-family:Arial,sans-serif;font-size:12px;color:#a0b8c4;text-decoration:none;">Datenschutz</a>
                </td>
              </tr>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:16px;">
              <tr>
                <td align="center">
                  <a href="https://www.instagram.com/schluesselmomente.escape.rooms/" target="_blank" style="display:inline-block;text-decoration:none;margin-right:16px;vertical-align:middle;">
                    <img src="${baseUrl}/instagram.webp" alt="Instagram" width="28" height="28" style="display:inline-block;border:0;vertical-align:middle;" />
                  </a>
                  <a href="https://www.facebook.com/people/Schl%C3%BCsselmomente-Escape-Rooms/61551739506717/" target="_blank" style="display:inline-block;text-decoration:none;vertical-align:middle;">
                    <img src="${baseUrl}/Facebook.webp" alt="Facebook" width="28" height="28" style="display:inline-block;border:0;vertical-align:middle;" />
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6a8a99;text-align:center;">
              &copy; Schlüsselmomente Escape Rooms GbR. Alle Rechte vorbehalten.
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>`;
}

// ─── Public export ────────────────────────────────────────────────────────────
export async function sendConfirmationEmail(
  to: string,
  name: string,
  timeSlot: string,
  cancelUrl: string,
  baseUrl: string,
) {
  const slotLabel = formatSlot(timeSlot);
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Office Imposters" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Office Imposters bei Konstanz spielt! - Deine Anmeldebestätigung',
    text: buildTextBody(name, slotLabel, cancelUrl),
    html: buildHtmlBody(name, slotLabel, cancelUrl, baseUrl),
  });
}

