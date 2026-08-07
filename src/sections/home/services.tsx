import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"

const previewServices = [
  {
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies for peak performance.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps with fluid UX, crafted to engage users and accelerate growth.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with usability to deliver delightful digital experiences.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure and CI/CD pipelines that keep your applications running smoothly at any scale.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section className="bg-white py-24 sm:py-32" id="services-preview">
      <Container>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Services We Offer
          </h2>
          <p className="mt-4 text-text-body">
            We deliver end-to-end digital solutions, from strategy and design to
            development and deployment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {previewServices.map((service, idx) => (
            <div
              key={service.title}
              className={`
                group relative rounded-2xl border border-base-border bg-white p-7
                transition-all duration-500 hover:shadow-elevated hover:-translate-y-1
                animate-fade-in-up stagger-${idx + 1}
              `}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-brand-goldLight flex items-center justify-center text-brand-gold mb-5 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                {service.title}
              </h3>

              <p className="text-text-body text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/public/services">
            <Button variant="outline">
              See All Services
            </Button>
          </Link>
        </div>

      </Container>
    </section>
  )
}
