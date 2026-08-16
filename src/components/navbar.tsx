import NavbarClient from "./navbar-client"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

export default async function Navbar() {
  const settings = await getSiteSettings()
  
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  const logoUrl = getSettingValue(settings, "branding.logo_url", "")
  const whatsapp = getSettingValue(settings, "contact.whatsapp", "")
  
  return <NavbarClient brandName={brandName} logoUrl={logoUrl} whatsapp={whatsapp} />
}
