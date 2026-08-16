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

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-slate-100 dark:bg-[#0F172A]">
        <Container>
          <div className="max-w-3xl mb-16 animate-slide-up">
            <h1 className="font-heading text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              Our <span className="text-brand-gold">Solutions</span>
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300">
              Ready-to-deploy, customizable software solutions designed to solve complex business challenges and drive efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displaySolutions.map((solution, index) => (
              <div 
                key={solution.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 animate-slide-up group flex flex-col"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Area */}
                <div className="h-64 relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {solution.image ? (
                    <img 
                      src={solution.image} 
                      alt={solution.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400 bg-brand-goldLight/20 group-hover:scale-105 transition-transform duration-700">
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
      </main>
      <Footer />
    </>
  )
}
