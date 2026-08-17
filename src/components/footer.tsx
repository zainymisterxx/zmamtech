import Link from "next/link"
import Container from "@/components/container"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Clients", href: "/public/clients" },
  { label: "Services", href: "/public/services" },
  { label: "Solutions", href: "/public/solutions" },
  { label: "About", href: "/public/about" },
  { label: "Contact", href: "/public/contact" },
]

export default async function Footer() {
  const settings = await getSiteSettings()

  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  const companyName = getSettingValue(settings, "branding.company_name", "Standby Computer Program Devices LLC")
  const logoUrl = getSettingValue(settings, "branding.logo_url", "")
  const description = getSettingValue(settings, "footer.description", "Delivering innovative software solutions since 2006. Based in UAE, serving clients across UAE, Oman, and Pakistan with enterprise-grade software development.")
  const email = getSettingValue(settings, "contact.email", "abidshzhad786@gmail.com")
  const phone = getSettingValue(settings, "contact.phone", "+971 6 5283763")
  const address = getSettingValue(settings, "contact.address", "Um Al Tarfa Street, Ibrahim Building, Office No B 168, Floor No 1, Sharjah, UAE")
  const lat = getSettingValue(settings, "contact.latitude", "25.352892771771778")
  const lng = getSettingValue(settings, "contact.longitude", "55.38730674229798")
  const whatsapp: string = getSettingValue(settings, "contact.whatsapp", "")

  const facebook = getSettingValue(settings, "social.facebook", "")
  const instagram = getSettingValue(settings, "social.instagram", "")
  const linkedin = getSettingValue(settings, "social.linkedin", "")

  const mapUrl = lat && lng ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}` : null
  const whatsappUrl = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}` : ""

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]" id="footer">
      <Container className="py-16">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-8 w-auto object-contain" />
              ) : (
                <span className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {brandName}
                </span>
              )}
            </Link>
            <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {companyName}
            </p>
            <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {description}
            </p>

            {/* Social Icons */}
            {(facebook || instagram || linkedin) && (
              <div className="flex gap-3 mt-6">
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 hover:border-[#1877F2]/40 hover:bg-[#1877F2]/5 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5 text-[#1877F2] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="group w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="ig-gradient-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFDC80" />
                          <stop offset="25%" stopColor="#FCAF45" />
                          <stop offset="50%" stopColor="#F77737" />
                          <stop offset="75%" stopColor="#E1306C" />
                          <stop offset="100%" stopColor="#833AB4" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-gradient-footer)" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-gradient-footer)" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-gradient-footer)"/>
                    </svg>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="group w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5 text-[#0A66C2] transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-slate-900 dark:text-slate-50 text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-700 dark:text-slate-300 text-sm transition-colors duration-300 hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-slate-900 dark:text-slate-50 text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-sm">
              <li>
                <a href={`mailto:${email}`} className="hover:text-brand-gold transition-colors duration-300">
                  {email}
                </a>
              </li>
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-brand-gold transition-colors duration-300">
                    {phone}
                  </a>
                </li>
              )}
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#1ebe57] transition-colors duration-300 font-medium">
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </li>
              )}
              <li className="text-slate-500 dark:text-slate-400">Est. 2006</li>
            </ul>

            {/* Compact Map Preview */}
            {mapUrl && (
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 flex items-center gap-2.5 text-slate-600 dark:text-slate-400 text-xs hover:text-brand-gold transition-colors duration-300"
                aria-label="Open location in Google Maps"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-goldLight/50 dark:bg-brand-gold/10 flex items-center justify-center text-brand-gold flex-shrink-0 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <span className="leading-tight">
                  {address || "Sharjah, UAE"}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} {companyName}. Brand: {brandName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300 hover:text-brand-gold"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300 hover:text-brand-gold"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

      </Container>
    </footer>
  )
}
