import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseServer"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

export default async function ClientsSection() {
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
        .limit(8)

      if (error) {
        console.error("Error fetching home clients:", error.message || "Failed to fetch")
      } else {
        clients = data
      }
    } catch (e: any) {
      if (e?.message?.includes("Dynamic server usage") || e?.name === "DynamicServerError") {
        throw e
      }
      console.error("Error connecting to Supabase for clients:", e?.message || e)
    }
  }

  const displayClients = clients && clients.length > 0 ? clients : null

  if (!displayClients) return null

  const settings = await getSiteSettings()
  const subtitle = getSettingValue(settings, "homepage.clients_subtitle", "Trusted by businesses across UAE, Oman & Pakistan")

  return (
    <section className="bg-slate-100 dark:bg-slate-950 py-24 sm:py-32" id="clients-preview">
      <Container>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">
              Our Clients
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 max-w-lg">
              {subtitle}
            </p>
          </div>
          <Link href="/public/clients">
            <Button variant="outline" size="sm">
              View All Clients
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {displayClients.map((client) => (
            <article
              key={client.id}
              className="group flex flex-col items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft hover:shadow-elevated hover:-translate-y-1 hover:border-brand-gold/30 transition-all duration-300"
            >
              {/* Logo container — rectangular, object-contain, always full color */}
              <div className="w-full h-24 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-3 transition-all duration-300 group-hover:border-brand-gold/20">
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-3xl font-bold text-brand-gold uppercase select-none">
                    {client.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="font-heading text-sm font-semibold text-slate-900 dark:text-slate-50 text-center leading-tight">
                {client.name}
              </h3>
            </article>
          ))}
        </div>

      </Container>
    </section>
  )
}
