import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"

export const metadata: Metadata = {
  title: "Services",
  description:
    "End-to-end digital solutions from ZMAMTECH — web development, mobile apps, UI/UX design, cloud & DevOps, and more.",
}

const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies for peak performance and scalability.",
    features: ["React & Next.js", "Custom CMS", "E-Commerce", "API Integration"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps with fluid UX, crafted to engage users and accelerate business growth.",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Launch"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with usability to deliver delightful and conversion-focused digital experiences.",
    features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure, CI/CD pipelines, and cloud architecture that keeps your applications running smoothly at any scale.",
    features: ["AWS & GCP", "Docker & K8s", "CI/CD Pipelines", "Monitoring"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: "Consulting & Strategy",
    description:
      "Technology consulting to help you make informed decisions about your digital transformation journey and tech stack.",
    features: ["Tech Audit", "Architecture", "Team Training", "Road Mapping"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing support, updates, and optimization to keep your digital products secure, fast, and up-to-date.",
    features: ["Bug Fixes", "Performance", "Security", "Feature Updates"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18a.748.748 0 01-1.109-.756l1.025-5.982L1.327 7.14a.75.75 0 01.416-1.28l5.997-.87L10.423.67a.75.75 0 011.154 0l2.683 4.32 5.997.87a.75.75 0 01.416 1.28l-4.625 4.472 1.025 5.982a.748.748 0 01-1.11.756l-5.384-3.18z" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="bg-white pt-16 pb-12" id="services-header">
          <Container>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block animate-fade-in">
              What We Offer
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary animate-fade-in-up">
              Our Services
            </h1>
            <p className="mt-4 text-text-body text-lg max-w-2xl animate-fade-in-up stagger-1">
              We deliver end-to-end digital solutions tailored to your unique
              business needs and growth ambitions.
            </p>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="bg-base-section py-16 sm:py-20" id="services-grid">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {services.map((service, idx) => (
                <div
                  key={service.title}
                  className={`
                    group bg-white rounded-2xl border border-base-border p-8
                    shadow-soft transition-all duration-500
                    hover:shadow-elevated hover:-translate-y-1
                    animate-fade-in-up stagger-${Math.min(idx + 1, 6)}
                  `}
                  id={`service-card-${idx}`}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-brand-goldLight flex items-center justify-center text-brand-gold mb-6 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white group-hover:scale-110">
                    {service.icon}
                  </div>

                  <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
                    {service.title}
                  </h2>

                  <p className="text-text-body text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-text-body">
                        <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
