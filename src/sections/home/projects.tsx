import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"

/* Static preview data — will be replaced with Supabase data later */
const previewProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management and seamless checkout experience.",
    category: "Web Development",
  },
  {
    id: "2",
    title: "FinTech Dashboard",
    description:
      "Intuitive analytics dashboard providing real-time financial insights and portfolio tracking for investors.",
    category: "UI/UX Design",
  },
  {
    id: "3",
    title: "Healthcare Mobile App",
    description:
      "Patient-first mobile application streamlining appointment booking, records, and telemedicine consultations.",
    category: "Mobile App",
  },
]

export default function ProjectsSection() {
  return (
    <section className="bg-base-section py-24 sm:py-32" id="projects-preview">
      <Container>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block">
              Portfolio
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
              Featured Projects
            </h2>
            <p className="mt-3 text-text-body max-w-lg">
              A selection of our recent work showcasing innovation, precision, and impact.
            </p>
          </div>
          <Link href="/public/projects">
            <Button variant="outline" size="sm">
              View All Projects
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {previewProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`
                group relative bg-white rounded-2xl border border-base-border
                overflow-hidden shadow-soft transition-all duration-500
                hover:shadow-elevated hover:-translate-y-1
                animate-fade-in-up stagger-${idx + 1}
              `}
            >
              {/* Image placeholder */}
              <div className="relative h-52 bg-gradient-to-br from-base-section to-brand-goldLight/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block text-xs font-medium text-brand-gold uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-brand-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-text-body text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </Container>
    </section>
  )
}
