"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

const adminLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "/projects",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "/services",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18a.748.748 0 01-1.109-.756l1.025-5.982L1.327 7.14a.75.75 0 01.416-1.28l5.997-.87L10.423.67a.75.75 0 011.154 0l2.683 4.32 5.997.87a.75.75 0 01.416 1.28l-4.625 4.472 1.025 5.982a.748.748 0 01-1.11.756l-5.384-3.18z" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-dark-bg border-r border-white/10 flex flex-col" id="admin-sidebar">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <Link href="/dashboard">
          <h1 className="font-heading text-xl font-bold text-white tracking-wide">
            ZMAM<span className="text-brand-gold">TECH</span>
          </h1>
          <p className="text-dark-muted text-xs mt-1 tracking-wider uppercase">
            Admin Panel
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <SidebarLink
              key={link.href}
              href={link.href}
              active={isActive}
              icon={link.icon}
            >
              {link.label}
            </SidebarLink>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-6 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-dark-muted transition-all duration-300 hover:bg-dark-card hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Site
        </Link>
        <button className="w-full mt-2 py-2.5 rounded-xl border border-white/15 text-sm text-dark-muted hover:bg-white hover:text-dark-bg transition-all duration-300 font-medium">
          Logout
        </button>
      </div>

    </aside>
  )
}

function SidebarLink({
  href,
  children,
  active,
  icon,
}: {
  href: string
  children: ReactNode
  active?: boolean
  icon: ReactNode
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
        ${
          active
            ? "bg-brand-gold text-dark-bg shadow-soft"
            : "text-dark-muted hover:bg-dark-card hover:text-white"
        }
      `}
    >
      {icon}
      {children}
    </Link>
  )
}