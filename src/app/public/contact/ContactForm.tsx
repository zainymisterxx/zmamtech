"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Input, Textarea } from "@/components/input"

interface ContactFormProps {
  whatsapp?: string
  phone?: string
  mobile?: string
}

export default function ContactForm({ whatsapp, phone, mobile }: ContactFormProps) {
  const [sent, setSent] = useState(false)

  // Determine the best WhatsApp number available
  const waNumber = (whatsapp || mobile || phone || "").replace(/[^0-9]/g, "")
  const hasWhatsApp = waNumber.length > 0

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!hasWhatsApp) return

    const formData = new FormData(e.currentTarget)
    const name = (formData.get("name") as string || "").trim()
    const userPhone = (formData.get("phone") as string || "").trim()
    const message = (formData.get("message") as string || "").trim()

    const body = [
      `Hello ZMAMTECH,`,
      ``,
      `I would like to get in touch regarding a project.`,
      ``,
      `Name: ${name}`,
      `Phone / WhatsApp: ${userPhone}`,
      ``,
      `Message:`,
      message,
    ].join("\n")

    const encoded = encodeURIComponent(body)
    const url = `https://wa.me/${waNumber}?text=${encoded}`
    window.open(url, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">
          WhatsApp Opened!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Your message has been prepared and WhatsApp has been opened. Complete sending it there.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold transition-all duration-300 hover:bg-[#1ebe57] hover:shadow-hover"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="whatsapp-contact-form">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
              Send us a Message
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">We reply instantly via WhatsApp</p>
          </div>
        </div>
      </div>

      <Input
        label="Full Name"
        id="contact-name"
        name="name"
        placeholder="John Doe"
        required
      />
      <Input
        label="Phone / WhatsApp Number"
        id="contact-phone"
        name="phone"
        type="tel"
        placeholder="+971 50 000 0000"
        required
      />
      <Textarea
        label="Message"
        id="contact-message"
        name="message"
        rows={5}
        placeholder="Tell us about your project or inquiry..."
        required
      />

      {hasWhatsApp ? (
        <button
          type="submit"
          id="contact-whatsapp-submit"
          className="inline-flex items-center gap-3 w-full sm:w-auto justify-center px-8 py-4 rounded-xl bg-[#25D366] text-white text-base font-semibold transition-all duration-300 hover:bg-[#1ebe57] hover:shadow-hover active:scale-[0.97]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message us on WhatsApp
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 text-sm">
          WhatsApp contact is not configured. Please call us directly.
        </div>
      )}
    </form>
  )
}
