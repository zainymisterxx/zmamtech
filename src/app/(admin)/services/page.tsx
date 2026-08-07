import Link from "next/link"

const services = [
  { id: "1", title: "Web Development", status: "Active", projectCount: 12 },
  { id: "2", title: "Mobile Applications", status: "Active", projectCount: 8 },
  { id: "3", title: "UI/UX Design", status: "Active", projectCount: 15 },
  { id: "4", title: "Cloud & DevOps", status: "Active", projectCount: 6 },
  { id: "5", title: "Consulting & Strategy", status: "Inactive", projectCount: 3 },
  { id: "6", title: "Maintenance & Support", status: "Active", projectCount: 10 },
]

export default function AdminServicesPage() {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-text-primary">
            Services
          </h1>
          <p className="mt-2 text-text-body">Manage the services you offer.</p>
        </div>
        <Link
          href="/services/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Service
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-base-border rounded-2xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-base-border bg-base-section/50">
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Service</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Projects</th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Status</th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-text-light uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-base-border/50 last:border-0 hover:bg-base-section/30 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-text-primary">
                    {service.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-body">{service.projectCount}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${
                      service.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/services/${service.id}`}
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