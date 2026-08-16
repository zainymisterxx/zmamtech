import SettingsForm from "./SettingsForm"
import { getSiteSettings } from "@/lib/settings"

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Manage your website's content and configuration.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  )
}
