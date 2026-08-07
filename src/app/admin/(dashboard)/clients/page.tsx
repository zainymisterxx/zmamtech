import Link from "next/link"
import { createClient } from "@/lib/supabaseServer"
import { formatDate } from "@/lib/helpers"

export default async function AdminClientsPage() {
  const supabase = await createClient()

  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching clients:", error)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Clients</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Manage your client portfolio.</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Client
        </Link>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Logo</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Industry</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Added</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!clients || clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-gray-700 dark:text-gray-300">
                    <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    <p className="font-medium">No clients yet</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add your first client to get started.</p>
                  </div>
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-gray-200 dark:border-neutral-800/50 last:border-0 hover:bg-gray-100 dark:bg-neutral-800/30 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center">
                      {client.logo_url ? (
                        <img src={client.logo_url} alt={client.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-brand-gold uppercase">{client.name.charAt(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-black dark:text-white">{client.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{client.industry || "—"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {client.created_at ? formatDate(client.created_at) : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-sm text-brand-gold hover:text-brand-goldHover font-medium transition-colors duration-200"
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
