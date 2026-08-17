import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"
import Link from "next/link"
import { createClient } from "@/lib/supabaseServer"

import { getSiteSettings, getSettingValue } from "@/lib/settings"
import { getServiceFallbackIcon } from "@/lib/service-icons"

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

  return (
    <>
      <Navbar />
      <main>
        {/* Services Grid */}
        <section className="bg-slate-50 dark:bg-[#0F172A] py-16 pt-32 sm:py-24 sm:pt-40" id="services-grid">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {displayServices.map((service, index) => (
                <div 
                  key={service.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up group flex flex-col items-center text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Dedicated Visual/Icon Area (Top Centered) */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center p-4 mb-6 transition-all duration-300 group-hover:scale-105 group-hover:border-brand-gold/50 shadow-sm shrink-0">
                    {service.icon ? (
                      <img 
                        src={service.icon} 
                        alt={service.title} 
                        className="max-w-full max-h-full w-auto h-auto object-contain" 
                      />
                    ) : (
                      <span className="text-brand-gold group-hover:scale-110 transition-transform duration-300">
                        {getServiceFallbackIcon(service.title)}
                      </span>
                    )}
                  </div>
                  
                  {/* Service Title */}
                  <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base max-w-md">
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
