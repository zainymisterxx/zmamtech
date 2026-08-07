import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white" id="hero">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-goldLight/30 blur-[120px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-goldLight/20 blur-[100px] translate-y-1/2 -translate-x-1/3" />
      </div>

      <Container className="relative py-28 sm:py-36 lg:py-44">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-goldLight/50 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-xs font-medium text-brand-gold tracking-wide uppercase">
              Premium Software Agency
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-text-primary">
            We Build{" "}
            <span className="text-gold-gradient">Digital Products</span>{" "}
            That Drive Growth
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up stagger-2 mt-7 text-lg sm:text-xl text-text-body leading-relaxed max-w-2xl">
            From concept to launch, we design and engineer premium web &amp; mobile
            solutions that elevate brands and accelerate business outcomes.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/public/projects">
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
          <div className="animate-fade-in-up stagger-4 mt-16 flex items-center gap-8 text-text-light text-sm">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-text-primary">50+</span>
              <span>Projects<br />Delivered</span>
            </div>
            <div className="h-8 w-px bg-base-border" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-text-primary">98%</span>
              <span>Client<br />Satisfaction</span>
            </div>
            <div className="h-8 w-px bg-base-border" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-text-primary">5+</span>
              <span>Years of<br />Experience</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
