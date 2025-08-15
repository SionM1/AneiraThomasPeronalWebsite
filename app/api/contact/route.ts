import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, inquiryType } = await req.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Prepare email content
    const emailContent = `
Name: ${name}
Email: ${email}
Inquiry Type: ${inquiryType}
Subject: ${subject}

Message:
${message}

---
Sent from Aneira Thomas Website Contact Form
Date: ${new Date().toISOString()}
    `.trim()

    // For now, we'll use a simple approach with Resend API (if available)
    // You can also use Nodemailer with SMTP or other email services

    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found in environment variables')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'website@aneirathomas.com', // This needs to be a verified domain
        to: ['aneirathomas@outlook.com'],
        reply_to: email,
        subject: `Website Contact: ${subject}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #DED308;">New Contact Form Submission</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #fff; padding: 20px; border-left: 4px solid #DED308;">
              <h3>Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <div style="margin-top: 20px; font-size: 12px; color: #666;">
              <p>Sent from Aneira Thomas Website Contact Form</p>
              <p>Date: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Resend API error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    const result = await response.json()
    console.log('Email sent successfully:', result)

    return NextResponse.json({ message: 'Email sent successfully', id: result.id }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
