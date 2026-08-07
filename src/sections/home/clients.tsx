import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseServer"

const fallbackClients = [
  { id: "1", name: "Acme Corp", logo_url: null },
  { id: "2", name: "Globex Inc", logo_url: null },
  { id: "3", name: "Soylent Corp", logo_url: null },
  { id: "4", name: "Initech", logo_url: null },
  { id: "5", name: "Umbrella Corp", logo_url: null },
  { id: "6", name: "Dunder Mifflin", logo_url: null },
]

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

  const displayClients = clients && clients.length > 0 ? clients : fallbackClients

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
              Trusted by businesses across UAE, Oman &amp; Pakistan
            </p>
          </div>
          <Link href="/public/clients">
            <Button variant="outline" size="sm">
              View All Clients
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {displayClients.map((client, idx) => (
            <article
              key={client.id}
              className="group flex flex-col items-center gap-3 p-4"
            >
              {/* Circular logo */}
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-soft flex items-center justify-center grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                {client.logo_url ? (
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold text-brand-gold uppercase">
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
