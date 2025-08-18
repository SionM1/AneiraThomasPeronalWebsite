import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs' // ensure Node serverless runtime on Vercel
export const dynamic = 'force-dynamic' // never cache this route

function escape(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string
  )
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, inquiryType = 'general' } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // You did not set the key for this deployment environment
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Until you verify your own sending domain in Resend, use their onboarding address.
    // Once verified, set RESEND_FROM in Vercel to something like "Contact <contact@aneirathomas.com>"
    const from = process.env.RESEND_FROM ?? 'Contact <onboarding@resend.dev>'
    const to = process.env.CONTACT_TO ?? 'aneirathomas@outlook.com'

    const html = `
      <h2>New contact form submission</h2>
      <p><b>Name:</b> ${escape(name)}</p>
      <p><b>Email:</b> <a href="mailto:${escape(email)}">${escape(email)}</a></p>
      <p><b>Type:</b> ${escape(inquiryType)}</p>
      <p><b>Subject:</b> ${escape(subject)}</p>
      <hr/>
      <pre style="white-space:pre-wrap;font-family:inherit">${escape(message)}</pre>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[${inquiryType}] ${subject}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nType: ${inquiryType}\nSubject: ${subject}\n\n${message}`,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      // Typical causes: 401 wrong key, 403 unverified from domain, 422 bad payload
      console.error('Resend error:', data)
      return NextResponse.json({ error: 'Failed to send email', details: data }, { status: 502 })
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
