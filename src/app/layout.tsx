import "./global.css"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"

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

export const metadata: Metadata = {
  title: {
    default: "ZMAMTECH — Premium Software Agency",
    template: "%s | ZMAMTECH",
  },
  description:
    "Transforming ideas into scalable digital solutions. ZMAMTECH crafts premium web & mobile experiences that drive growth.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${grotesk.variable} bg-base-white text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  )
}