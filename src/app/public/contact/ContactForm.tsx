"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send message.")
      }

      setSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while sending your message.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-brand-goldLight flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Message Sent!
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Thank you for reaching out. We&apos;ll be in touch shortly.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-4 rounded-xl border border-red-100 dark:border-red-800/50 mb-6">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="contact-name"
          name="name"
          placeholder="John Doe"
          required
        />
        <Input
          label="Email Address"
          id="contact-email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </div>
      <Input
        label="Subject"
        id="contact-subject"
        name="subject"
        placeholder="Client Inquiry"
      />
      <Textarea
        label="Message"
        id="contact-message"
        name="message"
        rows={5}
        placeholder="Tell us about your company..."
        required
      />
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
        {!loading && (
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        )}
      </Button>
    </form>
  )
}
