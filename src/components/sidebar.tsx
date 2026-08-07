"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { createClient } from "@/lib/supabaseClient"

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Clients",
    href: "/admin/clients",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18a.748.748 0 01-1.109-.756l1.025-5.982L1.327 7.14a.75.75 0 01.416-1.28l5.997-.87L10.423.67a.75.75 0 011.154 0l2.683 4.32 5.997.87a.75.75 0 01.416 1.28l-4.625 4.472 1.025 5.982a.748.748 0 01-1.11.756l-5.384-3.18z" />
      </svg>
    ),
  },
  {
    label: "Solutions",
    href: "/admin/solutions",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    label: "Team",
    href: "/admin/team",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin")
    router.refresh()
  }

  return (
    <aside className="w-64 min-h-screen bg-neutral-950 border-r border-white/10 flex flex-col" id="admin-sidebar">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <Link href="/admin/dashboard">
          <h1 className="font-heading text-xl font-bold text-white tracking-wide">
            ZMAM<span className="text-brand-gold">TECH</span>
          </h1>
          <p className="text-gray-400 text-xs mt-1 tracking-wider uppercase">
            Admin Panel
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
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
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 transition-all duration-300 hover:bg-neutral-900 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full mt-2 py-2.5 rounded-xl border border-white/15 text-sm text-gray-400 hover:bg-white hover:text-neutral-950 transition-all duration-300 font-medium"
        >
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
            : "text-gray-400 hover:bg-neutral-900 hover:text-white"
        }
      `}
    >
      {icon}
      {children}
    </Link>
  )
}