export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Dashboard
        </h1>
        <p className="mt-2 text-text-body">
          Manage your ZMAMTECH website content and business information.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Projects" value="12" change="+2 this month" color="gold" />
        <DashboardCard title="Services" value="6" change="Active" color="blue" />
        <DashboardCard title="Inquiries" value="24" change="+8 this week" color="green" />
        <DashboardCard title="Page Views" value="3.2K" change="+12% vs last month" color="purple" />
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-base-border rounded-2xl p-6 shadow-soft">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {[
            { action: "New project added", detail: "E-Commerce Platform", time: "2 hours ago" },
            { action: "Service updated", detail: "Web Development", time: "5 hours ago" },
            { action: "Contact inquiry received", detail: "john@example.com", time: "1 day ago" },
            { action: "Project updated", detail: "FinTech Dashboard", time: "2 days ago" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-base-border/50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-gold" />
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.action}</p>
                  <p className="text-xs text-text-light">{item.detail}</p>
                </div>
              </div>
              <span className="text-xs text-text-light">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function DashboardCard({
  title,
  value,
  change,
  color,
}: {
  title: string
  value: string
  change: string
  color: "gold" | "blue" | "green" | "purple"
}) {
  const accentColors = {
    gold: "bg-brand-goldLight text-brand-gold",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
  }

  return (
    <div className="bg-white border border-base-border rounded-2xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-text-body font-medium">{title}</p>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${accentColors[color]}`}>
          {change}
        </span>
      </div>
      <h3 className="font-heading text-3xl font-bold text-text-primary group-hover:text-brand-gold transition-colors duration-300">
        {value}
      </h3>
    </div>
  )
}