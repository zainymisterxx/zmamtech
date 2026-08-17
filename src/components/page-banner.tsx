import Container from "@/components/container"
import { getSiteSettings, getSettingValue } from "@/lib/settings"
import type { ReactNode } from "react"

interface PageBannerProps {
  eyebrow: string
  title: ReactNode
  description?: string
  id?: string
}

export default async function PageBanner({
  eyebrow,
  title,
  description,
  id = "page-banner",
}: PageBannerProps) {
  const settings = await getSiteSettings()

  // ── CMS values ────────────────────────────────────────────────
  const imgUrl: string = getSettingValue(settings, "about.banner_image", "")
  const imgPosition: string = getSettingValue(settings, "about.banner_image_position", "center")
  const rawOverlayEnabled = getSettingValue(settings, "about.banner_overlay_enabled", true)
  const overlayEnabled = rawOverlayEnabled === true || rawOverlayEnabled === "true"
  
  const overlayStrength: string = getSettingValue(settings, "about.banner_overlay_strength", "medium")
  const minHeight: string = getSettingValue(settings, "about.banner_min_height", "medium")

  // ── Position map ──────────────────────────────────────────────
  const positionMap: Record<string, string> = {
    center: "center center",
    top: "center top",
    bottom: "center bottom",
    left: "left center",
    right: "right center",
  }
  const objectPosition = positionMap[imgPosition] || "center center"

  // ── Height map ────────────────────────────────────────────────
  const heightMap: Record<string, string> = {
    small: "min-h-[180px] sm:min-h-[220px]",
    medium: "min-h-[220px] sm:min-h-[280px]",
    large: "min-h-[280px] sm:min-h-[360px]",
  }
  const heightClass = heightMap[minHeight] || heightMap["medium"]

  // ── Overlay scrim strengths (dark gradient, transparent toward photo) ───
  const scrimMap: Record<string, string> = {
    low: "linear-gradient(to right, rgba(10,15,30,0.75) 0%, rgba(10,15,30,0.40) 45%, transparent 80%)",
    medium: "linear-gradient(to right, rgba(10,15,30,0.88) 0%, rgba(10,15,30,0.55) 50%, transparent 85%)",
    high: "linear-gradient(to right, rgba(10,15,30,0.96) 0%, rgba(10,15,30,0.75) 55%, transparent 90%)",
  }
  const scrim = overlayEnabled ? (scrimMap[overlayStrength] || scrimMap["medium"]) : null

  const hasImage = !!imgUrl

  return (
    <section
      className={`relative overflow-hidden bg-[#0A0F1E] text-white border-b border-slate-800 ${heightClass}`}
      id={id}
    >
      {/* ── Background layer ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {hasImage ? (
          <>
            {/* Photo — cover, full saturation */}
            <img
              src={imgUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: "cover", objectPosition }}
            />

            {/* Dark readability scrim behind text */}
            {scrim && (
              <div className="absolute inset-0" style={{ background: scrim }} />
            )}
          </>
        ) : (
          /* Fallback: premium gold glow orbs on dark bg */
          <>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[80px] translate-y-1/2 -translate-x-1/3" />
          </>
        )}
      </div>

      {/* ── Content — constant white typography regardless of light/dark theme toggle ── */}
      <Container className="relative z-10 flex flex-col justify-start py-12 pt-32 sm:pt-36">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4 block animate-fade-in">
          {eyebrow}
        </span>

        <h1
          className="font-heading text-4xl sm:text-5xl font-bold leading-tight animate-fade-in-up text-white"
          style={{ maxWidth: "22ch" }}
        >
          {title}
        </h1>

        {description && (
          <p className="mt-5 text-base sm:text-lg max-w-2xl leading-relaxed animate-fade-in-up stagger-1 text-slate-300">
            {description}
          </p>
        )}
      </Container>
    </section>
  )
}
