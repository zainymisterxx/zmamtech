import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"
import ContactForm from "./ContactForm"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

export default async function ContactPage() {
  const settings = await getSiteSettings()

  const heading = getSettingValue(settings, "contact.heading", "Let's Start a Conversation")
  const description = getSettingValue(settings, "contact.description", "Have a project in mind or need expert advice? Reach out to us, and we'll help you build the perfect solution.")
  
  const email = getSettingValue(settings, "contact.email", "abidshzhad786@gmail.com")
  const phone = getSettingValue(settings, "contact.phone", "+971 6 5283763")
  const mobile = getSettingValue(settings, "contact.mobile", "+971 58 2293724")
  const address = getSettingValue(settings, "contact.address", "Um Al Tarfa Street, Ibrahim Building, Office No B 168, Floor No 1, Sharjah, UAE")
  const lat = getSettingValue(settings, "contact.latitude", "25.352892771771778")
  const lng = getSettingValue(settings, "contact.longitude", "55.38730674229798")

  const mapUrl = lat && lng ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` : null

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
              {heading}
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg max-w-2xl animate-fade-in-up stagger-1 whitespace-pre-wrap">
              {description}
            </p>
          </Container>
        </section>
 
        <section className="bg-slate-100 dark:bg-[#0D1117] py-16 sm:py-20" id="contact-form-section">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
 
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-[#161B27] rounded-xl border border-slate-200 dark:border-slate-700/60 p-8 sm:p-10 shadow-soft dark:shadow-none animate-fade-in-up">
                  <ContactForm />
                </div>
              </div>
 
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-7 animate-fade-in-up stagger-2">
                {[
                  {
                    title: "Email Us",
                    detail: email,
                    sub: "We reply within 24 hours",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ),
                  },
                  {
                    title: "Call Us",
                    detail: phone,
                    sub: "Mon – Fri, 9am – 6pm GST",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    ),
                  },
                  {
                    title: "Mobile / WhatsApp",
                    detail: mobile,
                    sub: "Available 24/7",
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    ),
                  },
                  {
                    title: "Location",
                    detail: address,
                    link: mapUrl,
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
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-1 text-slate-700 dark:text-slate-200 text-sm font-medium whitespace-pre-wrap hover:text-brand-gold transition-colors inline-block">
                            {item.detail}
                          </a>
                        ) : (
                          <p className="mt-1 text-slate-700 dark:text-slate-200 text-sm font-medium whitespace-pre-wrap">
                            {item.detail}
                          </p>
                        )}
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
