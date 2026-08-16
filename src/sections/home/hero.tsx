import Link from "next/link"
import Container from "@/components/container"
import Button from "@/components/button"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

export default async function HeroSection() {
  const settings = await getSiteSettings()
  
  const badgeText = getSettingValue(settings, "homepage.hero_badge", "20+ Years of Software Excellence")
  const headingText = getSettingValue(settings, "homepage.hero_heading", "Transforming Ideas into Scalable, Robust Software")
  const bgImgUrl = getSettingValue(settings, "homepage.hero_background_image", "")
  
  const descriptionText = getSettingValue(settings, "homepage.hero_description", "Trusted since 2006 to deliver innovative results. At Standby Computer Program Devices LLC, we transform ideas into reality with cutting-edge software solutions — from UAE to the world.")
  
  const statExperience = getSettingValue(settings, "homepage.stat_experience", "20+")
  const statClients = getSettingValue(settings, "homepage.stat_clients", "100+")
  const statCountries = getSettingValue(settings, "homepage.stat_countries", "3")

  // CMS-controlled hero visual settings
  const imgPosition = getSettingValue(settings, "homepage.hero_image_position", "center")
  const imgDisplayMode = getSettingValue(settings, "homepage.hero_image_display_mode", "cover")
  const overlayEnabled = getSettingValue(settings, "homepage.hero_overlay_enabled", true)
  const overlayOpacity = getSettingValue(settings, "homepage.hero_overlay_opacity", "75")
  const heroMinHeight = getSettingValue(settings, "homepage.hero_min_height", "auto")
  const heroBorderRadius = getSettingValue(settings, "homepage.hero_border_radius", "0")
  const heroBorderWidth = getSettingValue(settings, "homepage.hero_border_width", "0")

  // WhatsApp
  const whatsapp = getSettingValue(settings, "contact.whatsapp", "")

  // Map CMS position value to CSS object-position
  const positionMap: Record<string, string> = {
    "center": "center center",
    "center-top": "center top",
    "center-bottom": "center bottom",
    "left": "left center",
    "right": "right center",
  }
  const objectPosition = positionMap[imgPosition] || "center center"

  // Map overlay opacity to Tailwind-style fraction
  const overlayAlpha = overlayEnabled ? Math.max(0, Math.min(100, Number(overlayOpacity) || 75)) / 100 : 0

  // Map min height
  const heightMap: Record<string, string> = {
    "auto": "",
    "small": "min-h-[400px] sm:min-h-[500px]",
    "medium": "min-h-[500px] sm:min-h-[600px]",
    "large": "min-h-[600px] sm:min-h-[700px]",
    "full": "min-h-screen",
  }
  const heightClass = heightMap[heroMinHeight] || ""

  // Map border radius
  const radiusMap: Record<string, string> = {
    "0": "",
    "small": "rounded-lg",
    "medium": "rounded-2xl",
    "large": "rounded-3xl",
    "xl": "rounded-[2rem]",
  }
  const radiusClass = radiusMap[heroBorderRadius] || ""

  // Map border width
  const borderMap: Record<string, string> = {
    "0": "",
    "1": "border border-slate-200 dark:border-slate-700",
    "2": "border-2 border-slate-200 dark:border-slate-700",
    "3": "border-[3px] border-slate-200 dark:border-slate-700",
  }
  const borderClass = borderMap[heroBorderWidth] || ""

  return (
    <section
      className={`relative overflow-hidden bg-white dark:bg-[#0F172A] ${heightClass} ${radiusClass} ${borderClass}`}
      id="hero"
    >
      {/* Background Image & Overlay */}
      {bgImgUrl ? (
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={bgImgUrl}
            alt=""
            className="w-full h-full"
            style={{
              objectFit: (imgDisplayMode as string) === "contain" ? "contain" : "cover",
              objectPosition,
            }}
          />
          {overlayEnabled && (
            <>
              <div
                className="absolute inset-0"
                style={{ backgroundColor: `rgba(255,255,255,${overlayAlpha})` }}
              />
              <div
                className="absolute inset-0 dark:block hidden"
                style={{ backgroundColor: `rgba(15,23,42,${overlayAlpha})` }}
              />
              {/* Light mode overlay — hide in dark */}
              <div className="absolute inset-0 dark:hidden" style={{ backgroundColor: `rgba(255,255,255,${overlayAlpha})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-[#0F172A]/60 dark:via-transparent dark:to-transparent" />
            </>
          )}
        </div>
      ) : (
        /* Subtle background pattern (Fallback) */
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-goldLight/30 blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-goldLight/20 blur-[100px] translate-y-1/2 -translate-x-1/3" />
        </div>
      )}

      <Container className="relative z-10 pt-20 pb-28 sm:pt-24 sm:pb-36 lg:pt-28 lg:pb-40">
        <div className="max-w-3xl">

          {/* Badge */}
          {badgeText && (
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-goldLight/50 px-4 py-1.5 mb-8">
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs font-medium text-brand-gold tracking-wide uppercase">
                {badgeText}
              </span>
            </div>
          )}

          {/* Headline — responsive clamp typography */}
          <h1
            className="animate-fade-in-up font-heading font-bold leading-[1.12] tracking-tight text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(2.25rem, 4vw + 0.5rem, 4rem)", maxWidth: "18ch" }}
          >
            {/* Split heading by ** to add the gold gradient if provided, else use fallback formatting */}
            {headingText.includes("**") ? (
              <>
                {headingText.split("**")[0]}
                <span className="text-gold-gradient">{headingText.split("**")[1]}</span>
                {headingText.split("**")[2]}
              </>
            ) : headingText === "Transforming Ideas into Scalable, Robust Software" ? (
              <>
                Transforming Ideas into{" "}
                <span className="text-gold-gradient">Scalable, Robust</span>{" "}
                Software
              </>
            ) : (
              headingText
            )}
          </h1>

          {/* Subheadline */}
          {descriptionText && (
            <p className="animate-fade-in-up stagger-2 mt-7 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl whitespace-pre-wrap">
              {descriptionText}
            </p>
          )}

          {/* CTAs */}
          <div className="animate-fade-in-up stagger-3 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/public/clients">
              <Button size="lg">
                View Our Work
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </Button>
            </Link>
            {whatsapp ? (
              <a
                href={`https://wa.me/${(whatsapp as string).replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </Button>
              </a>
            ) : (
              <Link href="/public/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            )}
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in-up stagger-4 mt-16 flex flex-wrap items-center gap-8 text-slate-500 dark:text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">{statExperience}</span>
              <span>Years of<br />Experience</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">{statClients}</span>
              <span>Clients<br />Served</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-slate-900 dark:text-slate-50">{statCountries}</span>
              <span>Countries<br />Served</span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
