import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      )
    }

    const { name, email, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    const data = await resend.emails.send({
      from: "ZMAMTECH Contact Form <onboarding@resend.dev>", // Or use a verified domain
      to: "zainy.mister@icloud.com",
      subject: subject || `New Inquiry from ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No subject"}</p>
        <hr />
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    })

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Contact API Error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
  }
}
