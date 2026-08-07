import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseServer"

const fallbackServices = [
  {
    id: "1",
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with cutting-edge technologies for peak performance.",
    icon: null,
  },
  {
    id: "2",
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps with fluid UX, crafted to engage users and accelerate growth.",
    icon: null,
  },
  {
    id: "3",
    title: "UI/UX Design",
    description:
      "User-centered design that combines aesthetics with usability to deliver delightful digital experiences.",
    icon: null,
  },
  {
    id: "4",
    title: "Cloud & DevOps",
    description:
      "Scalable infrastructure and CI/CD pipelines that keep your applications running smoothly at any scale.",
    icon: null,
  },
]

export default async function ServicesSection() {
  let services: any[] | null = null

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")

  if (isConfigured) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4)

      if (error) {
        console.error("Error fetching home services:", error.message || error.details || "Failed to fetch")
      } else {
        services = data
      }
    } catch (e: any) {
      if (e?.message?.includes("Dynamic server usage") || e?.name === "DynamicServerError") {
        throw e
      }
      console.error("Error connecting to Supabase for services:", e?.message || e)
    }
  }

  const displayServices = services && services.length > 0 ? services : fallbackServices

  return (
    <section className="bg-white dark:bg-[#0F172A] py-24 sm:py-32" id="services-preview">
      <Container>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block">
            What We Do
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
            Services We Offer
          </h2>
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            We deliver end-to-end digital solutions, from strategy and design to
            development and deployment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {displayServices.map((service, idx) => (
            <div
              key={service.id}
              className={`
                group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7
                transition-all duration-500 hover:shadow-elevated hover:-translate-y-1
                animate-fade-in-up stagger-${idx + 1}
              `}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-brand-goldLight flex items-center justify-center text-brand-gold mb-5 transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white group-hover:scale-110">
                {service.icon ? (
                  <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                )}
              </div>

              <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">
                {service.title}
              </h3>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-3">
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
