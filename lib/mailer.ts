import nodemailer from 'nodemailer';

function createTransporter() {
  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    // port 465 uses implicit TLS; everything else uses STARTTLS
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
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

export async function sendConfirmationEmail(to: string, name: string, timeSlot: string, cancelUrl: string) {
  const slotLabel = formatSlot(timeSlot);
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Office Imposter" <${process.env.SMTP_FROM}>`,
    to,
    subject: 'Deine Anmeldung bei Office Imposter',
    text: `Hallo ${name},\n\nDanke für deine Anmeldung!\n\nDein Termin: ${slotLabel}\n\nWir freuen uns auf dich!\n\nAnmeldung stornieren: ${cancelUrl}\n\nBis bald,\nDas Office Imposter Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #233D4D; color: #fff; padding: 32px; border-radius: 12px;">
        <h1 style="color: #FFCC00; font-size: 28px; margin-bottom: 16px;">Office Imposter</h1>
        <p style="font-size: 18px; margin-bottom: 12px;">Hallo ${name},</p>
        <p style="font-size: 16px; margin-bottom: 12px;">Danke für deine Anmeldung!</p>
        <p style="font-size: 16px; margin-bottom: 8px;">Dein Termin:</p>
        <p style="font-size: 20px; font-weight: bold; color: #FFCC00; margin-bottom: 24px;">${slotLabel}</p>
        <p style="font-size: 16px; margin-bottom: 32px;">Wir freuen uns auf dich!</p>
        <p style="font-size: 13px; color: #aaa; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 16px;">
          Du kannst deine Anmeldung hier stornieren:<br/>
          <a href="${cancelUrl}" style="color:#FFCC00;">Anmeldung stornieren</a>
        </p>
        <p style="font-size: 14px; color: #aaa; margin-top: 16px;">Bis bald,<br/>Das Office Imposter Team</p>
      </div>
    `,
  });
}
