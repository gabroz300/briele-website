"use server";

import { createTransport } from 'nodemailer';

export interface FormState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

export async function sendEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { status: 'error', message: 'Tutti i campi sono obbligatori.' };
  }
  
  // Create a transporter object using SMTP transport
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // Use the authenticated user as the sender
      to: 'info@brielebriele.com', // Correct receiving email
      replyTo: email,
      subject: `Nuovo messaggio da ${name} dal sito`,
      html: `
        <h1>Nuovo messaggio dal form di contatto</h1>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Messaggio:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    return { status: 'success', message: 'Email inviata con successo!' };
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return { status: 'error', message: 'Errore nell\'invio dell\'email. Riprova più tardi.' };
  }
} 