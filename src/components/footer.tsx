import Link from "next/link"
import Container from "@/components/container"

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/public/projects" },
  { label: "Services", href: "/public/services" },
  { label: "About", href: "/public/about" },
  { label: "Contact", href: "/public/contact" },
]

export default function Footer() {
  return (
    <footer className="border-t border-base-border bg-white" id="footer">
      <Container className="py-16">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-tight text-text-primary">
                ZMAM<span className="text-brand-gold">TECH</span>
              </span>
            </Link>
            <p className="mt-4 text-text-body text-sm leading-relaxed">
              Transforming ideas into scalable digital solutions. We craft premium
              software experiences that drive growth and deliver results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-body text-sm transition-colors duration-300 hover:text-brand-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-text-body text-sm">
              <li>hello@zmamtech.com</li>
              <li>+1 (555) 000-0000</li>
              <li>Remote · Worldwide</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-base-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-light text-sm">
              © {new Date().getFullYear()} ZMAMTECH. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-text-light text-sm transition-colors duration-300 hover:text-brand-gold"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-text-light text-sm transition-colors duration-300 hover:text-brand-gold"
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
