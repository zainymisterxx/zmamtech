"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { navLinks } from "@/constants/navLinks"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-brand-gold hover:border-brand-gold/40 transition-all duration-300"
      aria-label="Toggle dark mode"
      id="theme-toggle"
    >
      {theme === "dark" ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B]/90 backdrop-blur-xl transition-colors duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 h-[72px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <span className="font-heading text-2xl font-bold tracking-tight text-black dark:text-white transition-colors group-hover:text-brand-gold">
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
                        : "text-gray-700 dark:text-gray-300 hover:text-black dark:text-white"
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

        {/* Right side: CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/public/contact"
            id="nav-cta"
            className="inline-flex items-center px-6 py-2.5 rounded-xl bg-brand-gold text-white text-sm font-semibold transition-all duration-300 hover:bg-brand-goldHover hover:shadow-hover active:scale-[0.97]"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            <span
              className={`block h-[2px] w-6 bg-black dark:bg-white rounded transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-black dark:bg-white rounded transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-black dark:bg-white rounded transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1E293B] px-6 py-6 space-y-1">
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
                        ? "bg-brand-goldLight dark:bg-brand-gold/20 text-brand-gold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50"
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
