import Link from "next/link"
import { createClient } from "@/lib/supabaseServer"
import { formatDate } from "@/lib/helpers"

export default async function AdminServicesPage() {
  const supabase = await createClient()

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching services:", error)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Services</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Manage your service offerings.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Service
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!services || services.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-700 dark:text-gray-300">
                  No services found. Add one to get started.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-200 dark:border-neutral-800/50 last:border-0 hover:bg-gray-100 dark:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden p-1 shrink-0">
                        {service.icon ? (
                          <img src={service.icon} alt="" className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-brand-gold text-xs">Icon</span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-black dark:text-white">{service.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {service.created_at ? formatDate(service.created_at) : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="text-sm text-brand-gold hover:text-brand-goldHover font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
