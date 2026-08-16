import { createClient } from "@/lib/supabaseServer"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

export default async function DashboardPage() {
  const supabase = await createClient()
  const settings = await getSiteSettings()
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")

  // Fetch true counts from database
  const { count: clientsCount } = await supabase.from("clients").select("*", { count: "exact", head: true })
  const { count: servicesCount } = await supabase.from("services").select("*", { count: "exact", head: true })
  const { count: teamCount } = await supabase.from("team").select("*", { count: "exact", head: true })
  const { count: solutionsCount } = await supabase.from("solutions").select("*", { count: "exact", head: true })

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Manage your {brandName} website content and business information.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-soft hover:shadow-hover transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4 text-brand-gold">
            <div className="w-12 h-12 rounded-xl bg-brand-goldLight flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
              </svg>
            </div>
            <h3 className="font-semibold text-black dark:text-white text-lg">Clients</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-heading font-bold text-black dark:text-white">{clientsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-soft hover:shadow-hover transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4 text-brand-gold">
            <div className="w-12 h-12 rounded-xl bg-brand-goldLight flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18a.748.748 0 01-1.109-.756l1.025-5.982L1.327 7.14a.75.75 0 01.416-1.28l5.997-.87L10.423.67a.75.75 0 011.154 0l2.683 4.32 5.997.87a.75.75 0 01.416 1.28l-4.625 4.472 1.025 5.982a.748.748 0 01-1.11.756l-5.384-3.18z" />
              </svg>
            </div>
            <h3 className="font-semibold text-black dark:text-white text-lg">Services</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-heading font-bold text-black dark:text-white">{servicesCount || 0}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-soft hover:shadow-hover transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4 text-brand-gold">
            <div className="w-12 h-12 rounded-xl bg-brand-goldLight flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>
            <h3 className="font-semibold text-black dark:text-white text-lg">Solutions</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-heading font-bold text-black dark:text-white">{solutionsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-6 shadow-soft hover:shadow-hover transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4 text-brand-gold">
            <div className="w-12 h-12 rounded-xl bg-brand-goldLight flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-black dark:text-white text-lg">Team</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-heading font-bold text-black dark:text-white">{teamCount || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}