import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseServer"

export default async function SolutionsSection() {
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
        .limit(2)

      if (error) {
        console.error("Error fetching home solutions:", error.message || error.details || "Failed to fetch")
      } else {
        solutions = data
      }
    } catch (e: any) {
      if (e?.message?.includes("Dynamic server usage") || e?.name === "DynamicServerError") {
        throw e
      }
      console.error("Error connecting to Supabase for solutions:", e?.message || e)
    }
  }

  // Fallback if no data or not connected
  if (!solutions || solutions.length === 0) {
    solutions = [
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
    ]
  }

  return (
    <section className="bg-slate-50 dark:bg-[#0F172A] py-24 sm:py-32" id="solutions-preview">
      <Container>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block">
              Our Products
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
              Enterprise Solutions
            </h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
              Ready-to-deploy, customizable software solutions designed to solve complex business challenges.
            </p>
          </div>
          <Link href="/public/solutions" className="hidden md:block">
            <Button variant="outline">
              View All Solutions
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, idx) => (
            <Link
              key={solution.id}
              href="/public/solutions"
              className={`
                group relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden
                shadow-soft transition-all duration-500 hover:shadow-hover hover:-translate-y-1
                animate-fade-in-up stagger-${idx + 1}
              `}
            >
              <div className="aspect-[16/9] relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {solution.image ? (
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400 bg-brand-goldLight/20 transition-transform duration-700 group-hover:scale-105">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3 group-hover:text-brand-gold transition-colors">
                  {solution.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/public/solutions">
            <Button variant="outline" className="w-full">
              View All Solutions
            </Button>
          </Link>
        </div>

      </Container>
    </section>
  )
}
