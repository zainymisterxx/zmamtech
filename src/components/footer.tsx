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
  
  const facebook = getSettingValue(settings, "social.facebook", "")
  const twitter = getSettingValue(settings, "social.twitter", "")
  const linkedin = getSettingValue(settings, "social.linkedin", "")

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
            
            {(facebook || twitter || linkedin) && (
              <div className="flex gap-4 mt-6">
                {facebook && (
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-gold transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                {twitter && (
                  <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-gold transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-gold transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
              <li>UAE · Oman · Pakistan</li>
              <li className="text-slate-500 dark:text-slate-400">Est. 2006</li>
            </ul>
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
