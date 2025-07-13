import { NextResponse } from 'next/server';
const nodemailer = require("nodemailer");

export async function POST(request: Request) {
  const { to, subject, text } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    user: process.env.GOOGLE_APP_GMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
        <h2 style="color: #2d8cf0;">¡Hola!</h2>
        <p style="font-size: 16px; color: #333;">${text}</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 13px; color: #888;">Este correo fue enviado desde la aplicación Consumidora.</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: 'arturohrh@gmail.com',
      to,
      subject,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 });
  }
}
