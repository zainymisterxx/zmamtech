"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"

export default function ContactPage() {
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

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white dark:bg-[#0D1117] pt-32 pb-6" id="contact-header">
          <Container>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block animate-fade-in">
              Get in Touch
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white animate-fade-in-up">
              Contact Us
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg max-w-2xl animate-fade-in-up stagger-1">
              Looking to become a client? We&apos;d love to hear from you. Drop us a
              message and we&apos;ll get back to you within 24 hours.
            </p>
          </Container>
        </section>
 
        <section className="bg-slate-100 dark:bg-[#0D1117] py-16 sm:py-20" id="contact-form-section">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
 
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-[#161B27] rounded-xl border border-slate-200 dark:border-slate-700/60 p-8 sm:p-10 shadow-soft dark:shadow-none animate-fade-in-up">
                  {submitted ? (
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
                  ) : (
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
                  )}
                </div>
              </div>
 
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-7 animate-fade-in-up stagger-2">
                {[
                  {
                    title: "Email Us",
                    detail: "zainymister@yahoo.com",
                    sub: "We reply within 24 hours",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                  },
                  {
                    title: "Call Us",
                    detail: "+971 (55) 000-0000",
                    sub: "Mon – Fri, 9am – 6pm GST",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Location",
                    detail: "Dubai, UAE",
                    sub: "Serving clients in UAE, Oman & Pakistan",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group bg-white dark:bg-[#161B27] rounded-xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-soft dark:shadow-none transition-all duration-300 hover:shadow-card dark:hover:border-brand-gold/40"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-goldLight dark:bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-slate-700 dark:text-slate-200 text-sm font-medium">
                          {item.detail}
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
 
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
