import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/sections/home/hero"
import ClientsSection from "@/sections/home/clients"
import ServicesSection from "@/sections/home/services"
import SolutionsSection from "@/sections/home/solutions"

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <ClientsSection />
        <ServicesSection />
        <SolutionsSection />

        {/* CTA Banner */}
        <section className="bg-slate-900 dark:bg-slate-950 py-24 sm:py-28" id="cta-banner">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Build Something{" "}
              <span className="text-gold-gradient">Extraordinary</span>?
            </h2>
            <p className="mt-5 text-lg text-white/60 max-w-2xl mx-auto">
              Let&apos;s turn your vision into reality. Partner with us to create
              digital experiences that matter.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/public/contact"
                className="inline-flex items-center px-9 py-4 rounded-xl bg-brand-gold text-white text-lg font-semibold transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
              >
                Become a Client
              </a>
              <a
                href="/public/clients"
                className="inline-flex items-center px-9 py-4 rounded-xl border-2 border-white/20 text-white text-lg font-semibold transition-all duration-300 hover:bg-white/10 active:scale-[0.97]"
              >
                View Our Clients
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}