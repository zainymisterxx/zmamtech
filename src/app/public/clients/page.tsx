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
    title: "Clients",
    description: `Explore the clients and businesses worldwide that trust ${brandName} for their digital solutions.`,
  }
}

export default async function PublicClientsPage() {
  let clients: any[] | null = null

  const isConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")

  if (isConfigured) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching clients:", error.message || "Failed to fetch")
      } else {
        clients = data
      }
    } catch (e: any) {
      if (e?.message?.includes("Dynamic server usage") || e?.name === "DynamicServerError") {
        throw e
      }
      console.error("Error connecting to Supabase for public clients:", e?.message || e)
    }
  }

  const displayClients = clients && clients.length > 0 ? clients : null

  const settings = await getSiteSettings()
  const bannerImgUrl = getSettingValue(settings, "pages.clients_banner_image", "")

  return (
    <>
      <Navbar />
      <main>
        {/* Page Banner */}
        <section
          className="relative overflow-hidden bg-slate-50 dark:bg-[#0A0F1E] border-b border-slate-200 dark:border-slate-800"
          id="clients-header"
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
              Our Network
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight animate-fade-in-up">
              Our Clients
            </h1>
            <p className="mt-5 text-slate-700 dark:text-slate-300 text-lg max-w-2xl animate-fade-in-up stagger-1">
              A showcase of the businesses we&apos;ve partnered with to deliver exceptional digital solutions across UAE, Oman &amp; Pakistan.
            </p>
          </Container>
        </section>

        {/* Clients Grid */}
        <section className="bg-slate-100 dark:bg-slate-950 py-16 sm:py-20" id="clients-grid">
          <Container>
            {!displayClients ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="w-20 h-20 mb-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-heading font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  Clients will be displayed here soon
                </h2>
                <p className="text-slate-700 dark:text-slate-300 max-w-md">
                  We are currently updating our client roster. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayClients.map((client, idx) => (
                  <article
                    key={client.id}
                    className={`group flex flex-col items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 hover:border-brand-gold/30 animate-fade-in-up stagger-${Math.min(idx + 1, 6)}`}
                    id={`client-card-${client.id}`}
                  >
                    {/* Logo container — rectangular, always full color, no cropping */}
                    <div className="w-full h-28 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4 transition-all duration-300 group-hover:border-brand-gold/20">
                      {client.logo_url ? (
                        <img
                          src={client.logo_url}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <span className="text-4xl font-bold text-brand-gold uppercase select-none">
                          {client.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center w-full">
                      <h2 className="font-heading text-base font-bold text-slate-900 dark:text-slate-50 group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                        {client.name}
                      </h2>
                      {client.industry && (
                        <span className="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                          {client.industry}
                        </span>
                      )}
                      {client.description && (
                        <p className="mt-3 text-slate-700 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
                          {client.description}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
