import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Container from "@/components/container"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore the premium digital products and software solutions built by ZMAMTECH for clients worldwide.",
}

/* Placeholder projects — in production, fetch from Supabase */
const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management, seamless checkout, and analytics dashboard.",
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
  {
    id: "4",
    title: "SaaS Analytics Tool",
    description:
      "Business intelligence platform with custom reports, team collaboration, and real-time data visualization.",
    category: "Web Development",
  },
  {
    id: "5",
    title: "Real Estate Portal",
    description:
      "Property listing and management platform with virtual tours, map integration, and lead management system.",
    category: "Full Stack",
  },
  {
    id: "6",
    title: "EdTech Learning Platform",
    description:
      "Interactive online learning platform with video courses, quizzes, certification, and progress tracking.",
    category: "Web Development",
  },
]

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="bg-white pt-16 pb-12" id="projects-header">
          <Container>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-3 block animate-fade-in">
              Our Work
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary animate-fade-in-up">
              Projects
            </h1>
            <p className="mt-4 text-text-body text-lg max-w-2xl animate-fade-in-up stagger-1">
              A showcase of the digital solutions we&apos;ve designed and built
              for businesses around the world.
            </p>
          </Container>
        </section>

        {/* Projects Grid */}
        <section className="bg-base-section py-16 sm:py-20" id="projects-grid">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {projects.map((project, idx) => (
                <article
                  key={project.id}
                  className={`
                    group relative bg-white rounded-2xl border border-base-border
                    overflow-hidden shadow-soft transition-all duration-500
                    hover:shadow-elevated hover:-translate-y-1
                    animate-fade-in-up stagger-${Math.min(idx + 1, 6)}
                  `}
                  id={`project-card-${project.id}`}
                >
                  {/* Image area */}
                  <div className="relative h-56 bg-gradient-to-br from-base-section to-brand-goldLight/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="inline-block text-xs font-medium text-brand-gold uppercase tracking-wider mb-2">
                      {project.category}
                    </span>
                    <h2 className="font-heading text-xl font-bold text-text-primary group-hover:text-brand-gold transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-text-body text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
