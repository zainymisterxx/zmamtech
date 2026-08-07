import Link from "next/link"
import { createClient } from "@/lib/supabaseServer"
import { formatDate } from "@/lib/helpers"

export default async function AdminSolutionsPage() {
  const supabase = await createClient()

  const { data: solutions, error } = await supabase
    .from("solutions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching solutions:", error)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Solutions</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Manage your solution offerings.</p>
        </div>
        <Link
          href="/admin/solutions/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Solution
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
            {!solutions || solutions.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-700 dark:text-gray-300">
                  No solutions found. Add one to get started.
                </td>
              </tr>
            ) : (
              solutions.map((solution) => (
                <tr
                  key={solution.id}
                  className="border-b border-gray-200 dark:border-neutral-800/50 last:border-0 hover:bg-gray-100 dark:bg-neutral-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-black dark:text-white">{solution.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {solution.created_at ? formatDate(solution.created_at) : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/solutions/${solution.id}`}
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
