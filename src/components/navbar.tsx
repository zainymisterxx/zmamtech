"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { navLinks } from "@/constants/navLinks"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-border/60 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <span className="font-heading text-2xl font-bold tracking-tight text-text-primary transition-colors group-hover:text-brand-gold">
            ZMAM<span className="text-brand-gold">TECH</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${
                      isActive
                        ? "text-brand-gold"
                        : "text-text-body hover:text-text-primary"
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-brand-gold" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <Link
          href="/public/contact"
          id="nav-cta"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-xl bg-brand-gold text-white text-sm font-semibold transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
        >
          Get in Touch
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          <span
            className={`block h-[2px] w-6 bg-text-primary rounded transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-text-primary rounded transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-text-primary rounded transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-base-border/40 bg-white px-6 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300
                  ${
                    isActive
                      ? "bg-brand-goldLight text-brand-gold"
                      : "text-text-body hover:bg-base-section hover:text-text-primary"
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/public/contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 text-center px-6 py-3 rounded-xl bg-brand-gold text-white font-semibold transition-all duration-300 hover:bg-brand-goldHover"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </header>
  )
}
