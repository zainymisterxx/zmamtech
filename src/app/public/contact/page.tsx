import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"
import ContactForm from "./ContactForm"
import { getSiteSettings, getSettingValue } from "@/lib/settings"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  return {
    title: "Contact",
    description: `Get in touch with ${brandName} via WhatsApp. We're based in Sharjah, UAE and serve clients across UAE, Oman, and Pakistan.`,
  }
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const heading = getSettingValue(settings, "contact.heading", "Let's Start a Conversation")
  const description = getSettingValue(settings, "contact.description", "Have a project in mind or need expert advice? Message us on WhatsApp and we'll respond promptly.")
  
  const email: string = getSettingValue(settings, "contact.email", "abidshzhad786@gmail.com")
  const phone: string = getSettingValue(settings, "contact.phone", "+971 6 5283763")
  const mobile: string = getSettingValue(settings, "contact.mobile", "+971 58 2293724")
  const whatsapp: string = getSettingValue(settings, "contact.whatsapp", "")
  const address: string = getSettingValue(settings, "contact.address", "Um Al Tarfa Street, Ibrahim Building, Office No B 168, Floor No 1, Sharjah, UAE")
  const lat: string = getSettingValue(settings, "contact.latitude", "25.352892771771778")
  const lng: string = getSettingValue(settings, "contact.longitude", "55.38730674229798")

  const mapUrl = lat && lng ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` : null
  const mapEmbedUrl = lat && lng
    ? `https://www.google.com/maps?q=${lat},${lng}&output=embed`
    : null

  return (
    <>
      <Navbar />
      <main>
        {/* Contact Form Section (No Banner) */}        <section className="bg-slate-100 dark:bg-[#0D1117] py-16 sm:py-20" id="contact-form-section">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-[#161B27] rounded-2xl border border-slate-200 dark:border-slate-700/60 p-8 sm:p-10 shadow-soft dark:shadow-none animate-fade-in-up">
                  <ContactForm whatsapp={whatsapp} phone={phone} mobile={mobile} />
                </div>
              </div>

              {/* Contact Info sidebar */}
              <div className="lg:col-span-2 space-y-5 animate-fade-in-up stagger-2">

                {/* Phone */}
                <div className="group bg-white dark:bg-[#161B27] rounded-2xl border border-slate-200 dark:border-slate-700/60 p-6 shadow-soft dark:shadow-none transition-all duration-300 hover:shadow-card dark:hover:border-brand-gold/40">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-goldLight dark:bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white">Call Us</h3>
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-brand-gold transition-colors inline-block">
                        {phone}
                      </a>
                      <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">Mon – Fri, 9am – 6pm GST</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp / Mobile */}
                <div className="group bg-white dark:bg-[#161B27] rounded-2xl border border-slate-200 dark:border-[#25D366]/20 p-6 shadow-soft dark:shadow-none transition-all duration-300 hover:shadow-card hover:border-[#25D366]/30 dark:hover:border-[#25D366]/40">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] flex-shrink-0 transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 dark:text-white">WhatsApp / Mobile</h3>
                      <a
                        href={whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}` : `tel:${mobile.replace(/\s/g, "")}`}
                        target={whatsapp ? "_blank" : undefined}
                        rel={whatsapp ? "noopener noreferrer" : undefined}
                        className="mt-1 text-slate-700 dark:text-slate-200 text-sm font-medium hover:text-[#25D366] transition-colors inline-block"
                      >
                        {whatsapp || mobile}
                      </a>
                      <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">Available on WhatsApp</p>
                    </div>
                  </div>
                </div>

                {/* Location with Map Preview */}
                {mapUrl && (
                  <div className="bg-white dark:bg-[#161B27] rounded-2xl border border-slate-200 dark:border-slate-700/60 overflow-hidden shadow-soft dark:shadow-none">
                    {/* Map iframe preview */}
                    {mapEmbedUrl && (
                      <div className="relative w-full h-44 bg-slate-100 dark:bg-slate-800">
                        <iframe
                          src={mapEmbedUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen={false}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="ZMAMTECH Office Location"
                          className="w-full h-full"
                          aria-label="Google Maps preview of our office location"
                        />
                        {/* Clickable overlay with "Open in Google Maps" affordance */}
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-card border border-slate-200 dark:border-slate-700 hover:border-brand-gold/40 hover:text-brand-gold transition-all duration-300"
                          aria-label="Open in Google Maps"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          Open in Maps
                        </a>
                      </div>
                    )}
                    {/* Address card */}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-goldLight dark:bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-slate-900 dark:text-white">Location</h3>
                          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-slate-700 dark:text-slate-200 text-sm font-medium whitespace-pre-wrap hover:text-brand-gold transition-colors inline-block">
                            {address}
                          </a>
                          <p className="text-slate-500 dark:text-slate-500 text-xs mt-0.5">Serving clients in UAE, Oman &amp; Pakistan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
