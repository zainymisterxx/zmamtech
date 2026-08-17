import NavbarClient from "./navbar-client"
import { getSiteSettings, getSettingValue } from "@/lib/settings"

export default async function Navbar() {
  const settings = await getSiteSettings()
  
  const brandName = getSettingValue(settings, "branding.brand_name", "ZMAMTECH")
  const logoUrl = getSettingValue(settings, "branding.logo_url", "")
  const whatsapp = getSettingValue(settings, "contact.whatsapp", "")
  const lat = getSettingValue(settings, "contact.latitude", "25.352892771771778")
  const lng = getSettingValue(settings, "contact.longitude", "55.38730674229798")
  
  return <NavbarClient brandName={brandName} logoUrl={logoUrl} whatsapp={whatsapp} lat={lat} lng={lng} />
}
