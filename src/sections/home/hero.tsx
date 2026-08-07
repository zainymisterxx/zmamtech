import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#0F172A]" id="hero">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-goldLight/30 blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-goldLight/20 blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <Container className="relative pt-20 pb-28 sm:pt-24 sm:pb-36 lg:pt-28 lg:pb-44">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-goldLight/50 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs font-medium text-brand-gold tracking-wide uppercase">
              20+ Years of Software Excellence
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-slate-50">
            Transforming Ideas into{" "}
            <span className="text-gold-gradient">Scalable, Robust</span>{" "}
            Software
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up stagger-2 mt-7 text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
            Trusted since 2006 to deliver innovative results. At Standby Computer Program Devices LLC,
            we transform ideas into reality with cutting-edge software solutions — from UAE to the world.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/public/clients">
              <Button size="lg">
                View Our Work
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Button>
            </Link>
            <Link href="/public/contact">
              <Button variant="outline" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in-up stagger-4 mt-16 flex flex-wrap items-center gap-8 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">20+</span>
              <span>Years of<br />Experience</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">100+</span>
              <span>Clients<br />Served</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">3</span>
              <span>Countries<br />Served</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
