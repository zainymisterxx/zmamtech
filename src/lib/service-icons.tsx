import type { ReactNode } from "react"

/**
 * Returns a context-appropriate fallback SVG icon based on service title keywords.
 */
export function getServiceFallbackIcon(title: string = ""): ReactNode {
  const t = title.toLowerCase()

  if (t.includes("software") || t.includes("custom") || t.includes("architecture") || t.includes("backend") || t.includes("engineering")) {
    // Code / Brackets / Software Architecture
    return (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  }

  if (t.includes("web") || t.includes("site") || t.includes("portal") || t.includes("frontend") || t.includes("ecommerce")) {
    // Globe / Browser
    return (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-18.432 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    )
  }

  if (t.includes("mobile") || t.includes("app") || t.includes("ios") || t.includes("android")) {
    // Smartphone
    return (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  }

  if (t.includes("design") || t.includes("ui") || t.includes("ux") || t.includes("creative") || t.includes("interface")) {
    // Palette / Pen tool
    return (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.006 2.749a15.998 15.998 0 005.006-2.749m0 0a15.999 15.999 0 003.388 1.62m-3.388-1.62l3.388-3.388a2.25 2.25 0 013.182 0l1.06 1.06a2.25 2.25 0 010 3.182l-3.388 3.388m-4.242-4.242l4.242 4.242" />
      </svg>
    )
  }

  if (t.includes("network") || t.includes("cctv") || t.includes("pabx") || t.includes("security") || t.includes("camera") || t.includes("hardware")) {
    // Network / Server / Security
    return (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0h-18" />
      </svg>
    )
  }

  if (t.includes("strategy") || t.includes("cloud") || t.includes("devops") || t.includes("digital") || t.includes("consult")) {
    // Strategy / Cloud / Rocket
    return (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.58-5.84a14.927 14.927 0 015.84-2.58m-5.84 2.58L9.63 8.41m0 0A14.98 14.98 0 003.47 20.53a14.98 14.98 0 0012.12-6.16" />
      </svg>
    )
  }

  // Default: Tech Sparkle / Lightning / Gear
  return (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  )
}
