'use server'

import nodemailer from 'nodemailer'

export type ContactResult = { ok: true } | { ok: false; error: string }

const CONTACT_RECIPIENTS = [
  'Patrizio0512@gmail.com',
  'yulinyan1995@gmail.com',
  'lijulijuliju@gmail.com',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function stripLineBreaks(value: string) {
  return value.replace(/[\r\n]+/g, ' ')
}

export async function sendContactMessage(formData: FormData): Promise<ContactResult> {
  const name = stripLineBreaks(String(formData.get('name') ?? '').trim())
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || name.length > 120) return { ok: false, error: 'Please enter your name.' }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    return { ok: false, error: 'Please enter a valid work email.' }
  }
  if (message.length > 5000) return { ok: false, error: 'Your message is too long.' }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT)
  const user = process.env.SMTP_USERNAME
  const pass = process.env.SMTP_PASSWORD

  if (!host || !port || !user || !pass) {
    console.error('[contact] SMTP is not fully configured')
    return { ok: false, error: 'Email is not configured yet. Please try again later.' }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  try {
    await transporter.sendMail({
      from: `"Website inquiry" <${user}>`,
      to: CONTACT_RECIPIENTS,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Book a call: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message || '(no message)'}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}<br /><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message || '(no message)').replace(/\n/g, '<br />')}</p>`,
    })
    return { ok: true }
  } catch (error) {
    console.error('[contact] Failed to send email', error)
    return { ok: false, error: 'Something went wrong sending your message. Please try again.' }
  }
}
