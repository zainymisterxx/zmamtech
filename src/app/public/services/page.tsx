import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"
import Link from "next/link"
import { createClient } from "@/lib/supabaseServer"

import { getSiteSettings, getSettingValue } from "@/lib/settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  
  return {
    title: "Services",
    description: `End-to-end digital solutions from ${brandName} — web development, mobile apps, UI/UX design, cloud & DevOps, and more.`,
  }
}

const fallbackServices = [
  {
    id: "1",
    title: "UI/UX Design",
    description: "Creating intuitive, engaging, and beautiful user experiences that drive conversion and satisfaction.",
    icon: null,
  },
  {
    id: "2",
    title: "Web Development",
    description: "Building blazing fast, secure, and scalable web applications using cutting-edge technologies.",
    icon: null,
  },
  {
    id: "3",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile solutions that connect you with your audience anywhere.",
    icon: null,
  },
  {
    id: "4",
    title: "Digital Strategy",
    description: "Data-driven roadmaps to accelerate your digital transformation and business growth.",
    icon: null,
  },
]

export default async function PublicServicesPage() {
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

      if (error) {
        console.error("Error fetching services:", error.message || error.details || "Failed to fetch")
      } else {
        services = data
      }
    } catch (e: any) {
      if (e?.message?.includes("Dynamic server usage") || e?.name === "DynamicServerError") {
        throw e
      }
      console.error("Error connecting to Supabase for public services:", e?.message || e)
    }
  }

  const displayServices = services && services.length > 0 ? services : fallbackServices

  const settings = await getSiteSettings()
  const bannerImgUrl = getSettingValue(settings, "pages.services_banner_image", "")

  return (
    <>
      <Navbar />
      <main>
        {/* Page Banner */}
        <section
          className="relative overflow-hidden bg-slate-50 dark:bg-[#0A0F1E] border-b border-slate-200 dark:border-slate-800"
          id="services-header"
          style={{ minHeight: "280px" }}
        >
          {bannerImgUrl ? (
            <div className="absolute inset-0 pointer-events-none z-0">
              <img
                src={bannerImgUrl}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-white/80 dark:bg-[#0A0F1E]/80" />
            </div>
          ) : (
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[120px] -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[80px] translate-y-1/2 -translate-x-1/3" />
            </div>
          )}
          <Container className="relative z-10 flex flex-col justify-center py-20 pt-36">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4 block animate-fade-in">
              What We Do
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight animate-fade-in-up">
              Our <span className="text-brand-gold">Services</span>
            </h1>
            <p className="mt-5 text-slate-700 dark:text-slate-300 text-lg max-w-2xl animate-fade-in-up stagger-1">
              Comprehensive digital solutions tailored to elevate your business. From concept to deployment, we deliver excellence at every stage.
            </p>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="bg-slate-100 dark:bg-[#0F172A] py-16 sm:py-20" id="services-grid">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-goldLight flex items-center justify-center text-brand-gold mb-8 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                    {service.icon ? (
                      <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                    ) : (
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    )}
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                    {service.description}
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
