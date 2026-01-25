import nodemailer from "nodemailer";

export async function sendLeadEmail(data: any) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEADS_TO_EMAIL;

  if (!host || !user || !pass || !to) {
    console.warn("SMTP credentials missing. Skipping email notification.");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #0F1113; border-bottom: 2px solid #0F1113; padding-bottom: 10px;">Новая заявка VELIMIR LUX</h2>
      <p><b>Имя:</b> ${data.name}</p>
      <p><b>Телефон:</b> ${data.phone}</p>
      <p><b>Направление:</b> ${data.direction}</p>
      <p><b>Комментарий:</b> ${data.comment || "—"}</p>
      <hr />
      <p style="font-size: 12px; color: #666;">
        <b>Страница:</b> ${data.page || "—"}<br>
        <b>UTM:</b> ${data.utm_source || "—"} / ${data.utm_medium || "—"} / ${data.utm_campaign || "—"}<br>
        <b>Referrer:</b> ${data.referrer || "—"}<br>
        <b>Дата:</b> ${new Date().toLocaleString("ru-RU")}
      </p>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"VELIMIR CRM" <${user}>`,
      to: to,
      subject: `Новая заявка: ${data.name}`,
      html: html,
    });

    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
}
