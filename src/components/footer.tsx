import Link from "next/link"
import Container from "@/components/container"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Clients", href: "/public/clients" },
  { label: "Services", href: "/public/services" },
  { label: "Solutions", href: "/public/solutions" },
  { label: "About", href: "/public/about" },
  { label: "Contact", href: "/public/contact" },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]" id="footer">
      <Container className="py-16">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                ZMAM<span className="text-brand-gold">TECH</span>
              </span>
            </Link>
            <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Standby Computer Program Devices LLC
            </p>
            <p className="mt-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Delivering innovative software solutions since 2006. Based in UAE, serving clients across UAE, Oman, and Pakistan with enterprise-grade software development.
            </p>
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
                <a href="mailto:zainymister@yahoo.com" className="hover:text-brand-gold transition-colors duration-300">
                  zainymister@yahoo.com
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
              © {new Date().getFullYear()} Standby Computer Program Devices LLC. Brand: ZMAMTECH. All rights reserved.
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
