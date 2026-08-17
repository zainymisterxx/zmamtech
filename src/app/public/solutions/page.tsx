import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"
import { createClient } from "@/lib/supabaseServer"

import { getSiteSettings, getSettingValue } from "@/lib/settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  
  return {
    title: "Solutions",
    description: `Enterprise-grade software solutions from ${brandName} to streamline your business operations and accelerate growth.`,
  }
}

const fallbackSolutions = [
  {
    id: "1",
    title: "Enterprise ERP System",
    description: "Custom ERP solutions tailored to manage your business resources efficiently and effectively.",
    image: null,
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "Scalable and secure e-commerce platforms designed to maximize conversions and user engagement.",
    image: null,
  },
  {
    id: "3",
    title: "Healthcare Portal",
    description: "Secure, compliant, and user-friendly healthcare solutions for patients and providers.",
    image: null,
  },
  {
    id: "4",
    title: "FinTech Dashboard",
    description: "Data-rich, real-time dashboards for financial technology companies and institutions.",
    image: null,
  },
]

export default async function PublicSolutionsPage() {
  let solutions: any[] | null = null

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")

  if (isConfigured) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from("solutions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching solutions:", error.message || error.details || "Failed to fetch")
      } else {
        solutions = data
      }
    } catch (e: any) {
      if (e?.message?.includes("Dynamic server usage") || e?.name === "DynamicServerError") {
        throw e
      }
      console.error("Error connecting to Supabase for public solutions:", e?.message || e)
    }
  }

  const displaySolutions = solutions && solutions.length > 0 ? solutions : fallbackSolutions

  const settings = await getSiteSettings()
  const bannerImgUrl = getSettingValue(settings, "pages.solutions_banner_image", "")

  return (
    <>
      <Navbar />
      <main>
        {/* Page Banner */}
        <section
          className="relative overflow-hidden bg-slate-50 dark:bg-[#0A0F1E] border-b border-slate-200 dark:border-slate-800"
          id="solutions-header"
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
              What We Offer
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight animate-fade-in-up">
              Our <span className="text-brand-gold">Solutions</span>
            </h1>
            <p className="mt-5 text-slate-700 dark:text-slate-300 text-lg max-w-2xl animate-fade-in-up stagger-1">
              Ready-to-deploy, customizable software solutions designed to solve complex business challenges and drive efficiency.
            </p>
          </Container>
        </section>

        {/* Solutions Grid */}
        <section className="bg-slate-100 dark:bg-[#0F172A] py-16 sm:py-20" id="solutions-grid">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displaySolutions.map((solution, index) => (
                <div 
                  key={solution.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 animate-slide-up group flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Area */}
                  <div className="h-56 relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    {solution.image ? (
                      <img 
                        src={solution.image} 
                        alt={solution.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400 bg-brand-goldLight/20 dark:bg-brand-gold/5 group-hover:scale-105 transition-transform duration-700">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                        </svg>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                      {solution.description}
                    </p>
                  </div>
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
