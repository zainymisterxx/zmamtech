import Link from "next/link"

const projects = [
  { id: "1", title: "E-Commerce Platform", category: "Web Development", status: "Published" },
  { id: "2", title: "FinTech Dashboard", category: "UI/UX Design", status: "Published" },
  { id: "3", title: "Healthcare Mobile App", category: "Mobile App", status: "Draft" },
  { id: "4", title: "SaaS Analytics Tool", category: "Web Development", status: "Published" },
  { id: "5", title: "Real Estate Portal", category: "Full Stack", status: "Draft" },
]

export default function AdminProjectsPage() {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary">
            Projects
          </h1>
          <p className="mt-2 text-text-body">Manage your portfolio projects.</p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Project
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-base-border rounded-2xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-border bg-base-section/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Title</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Category</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-base-border/50 last:border-0 hover:bg-base-section/30 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">
                    {project.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-body">{project.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                      project.status === "Published"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-sm text-brand-gold hover:text-brand-goldHover font-medium transition-colors duration-200"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}