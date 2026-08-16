import "./global.css"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Providers } from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
})

import { getSiteSettings, getSettingValue } from "@/lib/settings"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  const faviconUrl = getSettingValue(settings, "branding.favicon_url", "")
  
  return {
    title: {
      default: `${brandName} | Custom Software Development UAE`,
      template: `%s | ${brandName}`,
    },
    description: "20+ years of software excellence delivering custom software, web development, mobile applications and enterprise solutions. Based in UAE, serving clients since 2006.",
    keywords: ["software development UAE", "custom software", "web development", "mobile app development", "enterprise solutions", brandName],
    openGraph: {
      title: `${brandName} | Custom Software Development UAE`,
      description: "20+ years of software excellence. Transforming ideas into scalable, robust software solutions trusted since 2006.",
      type: "website",
      locale: "en_US",
    },
    icons: faviconUrl ? { icon: faviconUrl } : { icon: [] },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable} bg-slate-50 text-slate-900 dark:bg-[#0F172A] dark:text-slate-50 transition-colors duration-300 antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}