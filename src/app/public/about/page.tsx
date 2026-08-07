import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ZMAMTECH — a premium software agency building scalable digital solutions that drive business growth.",
}

const values = [
  {
    title: "Quality First",
    description: "We never compromise on code quality, design standards, or user experience.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Client Partnership",
    description: "We work as an extension of your team, deeply invested in your success.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "We stay ahead of the curve, leveraging the latest technologies and best practices.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Transparency",
    description: "Open communication, honest timelines, and clear expectations — always.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-white pt-16 pb-20" id="about-hero">
          <Container>
            <div className="max-w-3xl">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block animate-fade-in">
                About Us
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight animate-fade-in-up">
                We Craft Digital{" "}
                <span className="text-gold-gradient">Experiences</span>{" "}
                That Matter
              </h1>
              <p className="mt-6 text-text-body text-lg leading-relaxed animate-fade-in-up stagger-1">
                ZMAMTECH is a premium software agency specializing in designing and
                building scalable digital solutions. Founded with a passion for clean
                code and elegant design, we help businesses transform their ideas
                into powerful software products.
              </p>
              <p className="mt-4 text-text-body text-lg leading-relaxed animate-fade-in-up stagger-2">
                Our team combines deep technical expertise with creative thinking to
                deliver solutions that not only look stunning but also perform
                exceptionally. We believe great software is born at the intersection
                of design, engineering, and strategy.
              </p>
            </div>
          </Container>
        </section>

        {/* Stats */}
        <section className="bg-text-primary py-16" id="about-stats">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "30+", label: "Happy Clients" },
                { value: "5+", label: "Years Experience" },
                { value: "98%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="animate-scale-in">
                  <div className="font-heading text-4xl sm:text-5xl font-bold text-brand-gold">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="bg-base-section py-20 sm:py-24" id="about-values">
          <Container>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block">
                Our Values
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
                What Drives Us
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {values.map((item, idx) => (
                <div
                  key={item.title}
                  className={`
                    group bg-white rounded-2xl border border-base-border p-7
                    shadow-soft transition-all duration-500
                    hover:shadow-elevated hover:-translate-y-1
                    animate-fade-in-up stagger-${idx + 1}
                  `}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-goldLight flex items-center justify-center text-brand-gold mb-5 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-body text-sm leading-relaxed">
                    {item.description}
                  </p>
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
