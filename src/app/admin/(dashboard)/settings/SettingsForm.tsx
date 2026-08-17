"use client"

import { useState, useRef } from "react"
import type { ChangeEvent } from "react"
import Button from "@/components/button"
import { Input, Textarea } from "@/components/input"
import { uploadImage } from "@/lib/upload"

type SettingsFormProps = {
  initialData: Record<string, any>
}

// Inline component for image upload
function ImageUploadField({ 
  label, 
  value, 
  onChange, 
  helpText 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void;
  helpText?: string;
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      // Validate file type (basic)
      if (!file.type.startsWith("image/")) {
        throw new Error("Please select a valid image file.")
      }

      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image must be less than 5MB.")
      }

      const url = await uploadImage(file, "settings")
      onChange(url)
    } catch (err: any) {
      setError(err.message || "Failed to upload image")
    } finally {
      setUploading(false)
      // Reset input so the same file can be selected again if removed
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      
      {value ? (
        <div className="space-y-4">
          <div className="w-full max-w-sm rounded-xl overflow-hidden border-2 border-brand-gold/30 bg-gray-100 dark:bg-neutral-800 relative group aspect-video">
            <img src={value} alt="Preview" className="w-full h-full object-contain" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <Button type="button" size="sm" onClick={() => fileInputRef.current?.click()}>
                Replace
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => onChange("")} className="bg-white/10 hover:bg-white/20 border-white/20 text-white">
                Remove
              </Button>
            </div>
          </div>
          {helpText && <p className="text-xs text-slate-500">{helpText}</p>}
        </div>
      ) : (
        <div>
          <div 
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`w-full max-w-sm h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors
              ${uploading ? "border-gray-300 bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800/50 cursor-not-allowed" : "border-brand-gold/40 hover:border-brand-gold bg-brand-goldLight/20 hover:bg-brand-goldLight/40 dark:bg-brand-gold/5 dark:hover:bg-brand-gold/10"}`}
          >
            {uploading ? (
              <span className="text-sm font-medium text-brand-gold animate-pulse">Uploading...</span>
            ) : (
              <>
                <svg className="w-8 h-8 text-brand-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-sm font-medium text-brand-gold">Click to upload image</span>
                <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP, SVG (Max 5MB)</span>
              </>
            )}
          </div>
          {helpText && <p className="text-xs text-slate-500 mt-2">{helpText}</p>}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        className="hidden"
      />
    </div>
  )
}

// Simple select component for CMS controls
function SelectField({
  label,
  value,
  onChange,
  options,
  helpText,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
  helpText?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0D1117] px-5 py-3.5 text-slate-900 dark:text-white transition-all duration-300 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none hover:border-brand-gold/50 dark:hover:border-brand-gold/50 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {helpText && <p className="text-xs text-slate-500 dark:text-slate-400">{helpText}</p>}
    </div>
  )
}

const TABS = [
  { id: "branding", label: "Branding" },
  { id: "homepage", label: "Homepage" },
  { id: "banners", label: "Page Banners" },
  { id: "about", label: "About Page" },
  { id: "contact", label: "Contact Page" },
  { id: "social", label: "Social Links" },
  { id: "footer", label: "Footer" },
]

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState("branding")
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (key: string, value: any) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.error || "Failed to save settings")
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-soft flex flex-col md:flex-row overflow-hidden min-h-[600px]">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50">
        <nav className="flex md:flex-col gap-1 p-4 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
                ${activeTab === tab.id 
                  ? "bg-brand-gold/10 text-brand-gold" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900 dark:hover:text-white"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-8">
        
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm">
            Settings saved successfully!
          </div>
        )}

        <div className="space-y-6 max-w-2xl">
          
          {activeTab === "branding" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Branding Settings</h2>
              <Input
                label="Company Name"
                value={data["branding.company_name"] || ""}
                onChange={(e) => handleChange("branding.company_name", e.target.value)}
                placeholder="Standby Computer Program Devices LLC"
              />
              <Input
                label="Brand Name"
                value={data["branding.brand_name"] || ""}
                onChange={(e) => handleChange("branding.brand_name", e.target.value)}
                placeholder="ZMAMTECH"
              />
              <ImageUploadField
                label="Logo Image"
                value={data["branding.logo_url"] || ""}
                onChange={(val) => handleChange("branding.logo_url", val)}
                helpText="Upload a brand logo. Leave empty to use the text brand name."
              />
              <ImageUploadField
                label="Browser Favicon"
                value={data["branding.favicon_url"] || ""}
                onChange={(val) => handleChange("branding.favicon_url", val)}
                helpText="Recommended: square PNG, SVG, or ICO-style icon."
              />
            </>
          )}

          {activeTab === "homepage" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Homepage Settings</h2>
              
              {/* Hero Background Image */}
              <div className="space-y-5 p-5 rounded-xl border border-slate-200 dark:border-neutral-700 bg-slate-50/50 dark:bg-neutral-800/30">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Hero Background</h3>
                
                <ImageUploadField
                  label="Hero Image"
                  value={data["homepage.hero_background_image"] || ""}
                  onChange={(val) => handleChange("homepage.hero_background_image", val)}
                  helpText="Upload a banner image for the hero section."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Image Position"
                    value={data["homepage.hero_image_position"] || "center"}
                    onChange={(val) => handleChange("homepage.hero_image_position", val)}
                    options={[
                      { value: "center", label: "Center" },
                      { value: "center-top", label: "Center Top" },
                      { value: "center-bottom", label: "Center Bottom" },
                      { value: "left", label: "Left" },
                      { value: "right", label: "Right" },
                    ]}
                    helpText="Controls the focal point of the image."
                  />
                  <SelectField
                    label="Display Mode"
                    value={data["homepage.hero_image_display_mode"] || "cover"}
                    onChange={(val) => handleChange("homepage.hero_image_display_mode", val)}
                    options={[
                      { value: "cover", label: "Cover (fill area)" },
                      { value: "contain", label: "Contain (show full image)" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Overlay"
                    value={data["homepage.hero_overlay_enabled"] === false ? "off" : "on"}
                    onChange={(val) => handleChange("homepage.hero_overlay_enabled", val === "on")}
                    options={[
                      { value: "on", label: "Enabled" },
                      { value: "off", label: "Disabled" },
                    ]}
                    helpText="Dark overlay keeps text readable over the image."
                  />
                  <SelectField
                    label="Overlay Intensity"
                    value={String(data["homepage.hero_overlay_opacity"] || "75")}
                    onChange={(val) => handleChange("homepage.hero_overlay_opacity", val)}
                    options={[
                      { value: "40", label: "Light (40%)" },
                      { value: "55", label: "Medium-Light (55%)" },
                      { value: "65", label: "Medium (65%)" },
                      { value: "75", label: "Standard (75%)" },
                      { value: "85", label: "Heavy (85%)" },
                      { value: "90", label: "Very Heavy (90%)" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <SelectField
                    label="Hero Height"
                    value={data["homepage.hero_min_height"] || "auto"}
                    onChange={(val) => handleChange("homepage.hero_min_height", val)}
                    options={[
                      { value: "auto", label: "Auto" },
                      { value: "small", label: "Small" },
                      { value: "medium", label: "Medium" },
                      { value: "large", label: "Large" },
                      { value: "full", label: "Full Screen" },
                    ]}
                  />
                  <SelectField
                    label="Border Radius"
                    value={data["homepage.hero_border_radius"] || "0"}
                    onChange={(val) => handleChange("homepage.hero_border_radius", val)}
                    options={[
                      { value: "0", label: "None" },
                      { value: "small", label: "Small" },
                      { value: "medium", label: "Medium" },
                      { value: "large", label: "Large" },
                      { value: "xl", label: "Extra Large" },
                    ]}
                  />
                  <SelectField
                    label="Border Width"
                    value={data["homepage.hero_border_width"] || "0"}
                    onChange={(val) => handleChange("homepage.hero_border_width", val)}
                    options={[
                      { value: "0", label: "None" },
                      { value: "1", label: "1px" },
                      { value: "2", label: "2px" },
                      { value: "3", label: "3px" },
                    ]}
                  />
                </div>
              </div>

              <Input
                label="Hero Badge Text"
                value={data["homepage.hero_badge"] || ""}
                onChange={(e) => handleChange("homepage.hero_badge", e.target.value)}
              />
              <Input
                label="Hero Heading"
                value={data["homepage.hero_heading"] || ""}
                onChange={(e) => handleChange("homepage.hero_heading", e.target.value)}
                helpText="Use **text** to wrap the gold gradient part."
              />
              <Textarea
                label="Hero Description"
                value={data["homepage.hero_description"] || ""}
                onChange={(e) => handleChange("homepage.hero_description", e.target.value)}
                rows={4}
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Stat: Experience"
                  value={data["homepage.stat_experience"] || ""}
                  onChange={(e) => handleChange("homepage.stat_experience", e.target.value)}
                />
                <Input
                  label="Stat: Clients"
                  value={data["homepage.stat_clients"] || ""}
                  onChange={(e) => handleChange("homepage.stat_clients", e.target.value)}
                />
                <Input
                  label="Stat: Countries"
                  value={data["homepage.stat_countries"] || ""}
                  onChange={(e) => handleChange("homepage.stat_countries", e.target.value)}
                />
              </div>
            </>
          )}

          {activeTab === "about" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">About Page Settings</h2>
              <Input
                label="Heading"
                value={data["about.heading"] || ""}
                onChange={(e) => handleChange("about.heading", e.target.value)}
                helpText="Use **text** to wrap the gold gradient part."
              />
              <Textarea
                label="Content"
                value={data["about.content"] || ""}
                onChange={(e) => handleChange("about.content", e.target.value)}
                rows={6}
                helpText="Use double newlines for paragraphs. Use **text** for bold."
              />
              {/* Values and Stats are JSON structures, for now provide a basic stringified input if we must, or leave it complex for a V2.
                  Since this is V1 and we have 24-hours, a simple JSON textarea is the robust way to ensure we don't build complex custom form arrays. */}
              <Textarea
                label="Core Values (JSON)"
                value={typeof data["about.values"] === "object" ? JSON.stringify(data["about.values"], null, 2) : (data["about.values"] || "")}
                onChange={(e) => {
                  try {
                    handleChange("about.values", JSON.parse(e.target.value))
                  } catch {
                    handleChange("about.values", e.target.value) // let them edit the string if invalid, but it might break rendering if saved invalid
                  }
                }}
                rows={5}
                helpText='Must be valid JSON array: [{"title": "...", "description": "..."}]'
              />
            </>
          )}

          {activeTab === "contact" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Contact Settings</h2>
              <Input
                label="Heading"
                value={data["contact.heading"] || ""}
                onChange={(e) => handleChange("contact.heading", e.target.value)}
              />
              <Textarea
                label="Description"
                value={data["contact.description"] || ""}
                onChange={(e) => handleChange("contact.description", e.target.value)}
                rows={3}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  value={data["contact.email"] || ""}
                  onChange={(e) => handleChange("contact.email", e.target.value)}
                />
                <Input
                  label="Phone Number"
                  value={data["contact.phone"] || ""}
                  onChange={(e) => handleChange("contact.phone", e.target.value)}
                />
                <Input
                  label="Mobile"
                  value={data["contact.mobile"] || ""}
                  onChange={(e) => handleChange("contact.mobile", e.target.value)}
                />
                <Input
                  label="WhatsApp"
                  value={data["contact.whatsapp"] || ""}
                  onChange={(e) => handleChange("contact.whatsapp", e.target.value)}
                  helpText="Include country code, e.g. +971582293724"
                />
              </div>
              <Textarea
                label="Address"
                value={data["contact.address"] || ""}
                onChange={(e) => handleChange("contact.address", e.target.value)}
                rows={3}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Map Latitude"
                  value={data["contact.latitude"] || ""}
                  onChange={(e) => handleChange("contact.latitude", e.target.value)}
                  placeholder="25.352892771771778"
                />
                <Input
                  label="Map Longitude"
                  value={data["contact.longitude"] || ""}
                  onChange={(e) => handleChange("contact.longitude", e.target.value)}
                  placeholder="55.38730674229798"
                />
              </div>
            </>
          )}

          {activeTab === "social" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Social Media Links</h2>
              <Input
                label="Facebook"
                value={data["social.facebook"] || ""}
                onChange={(e) => handleChange("social.facebook", e.target.value)}
                placeholder="https://facebook.com/zmamtech"
              />
              <Input
                label="Instagram"
                value={data["social.instagram"] || ""}
                onChange={(e) => handleChange("social.instagram", e.target.value)}
                placeholder="https://instagram.com/zmamtech"
              />
              <Input
                label="LinkedIn"
                value={data["social.linkedin"] || ""}
                onChange={(e) => handleChange("social.linkedin", e.target.value)}
                placeholder="https://linkedin.com/company/zmamtech"
              />
            </>
          )}

          {activeTab === "footer" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Footer Settings</h2>
              <Textarea
                label="Footer Description"
                value={data["footer.description"] || ""}
                onChange={(e) => handleChange("footer.description", e.target.value)}
                rows={4}
              />
            </>
          )}

          {activeTab === "banners" && (
            <>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-6">Page Banners</h2>
              <div className="space-y-6">
                <ImageUploadField
                  label="About Page Banner"
                  value={data["pages.about_banner_image"] || ""}
                  onChange={(val) => handleChange("pages.about_banner_image", val)}
                  helpText="Background image for the About page."
                />
                <ImageUploadField
                  label="Services Page Banner"
                  value={data["pages.services_banner_image"] || ""}
                  onChange={(val) => handleChange("pages.services_banner_image", val)}
                  helpText="Background image for the Services page."
                />
                <ImageUploadField
                  label="Solutions Page Banner"
                  value={data["pages.solutions_banner_image"] || ""}
                  onChange={(val) => handleChange("pages.solutions_banner_image", val)}
                  helpText="Background image for the Solutions page."
                />
                <ImageUploadField
                  label="Clients Page Banner"
                  value={data["pages.clients_banner_image"] || ""}
                  onChange={(val) => handleChange("pages.clients_banner_image", val)}
                  helpText="Background image for the Clients page."
                />
              </div>
            </>
          )}

          <div className="pt-6 border-t border-gray-200 dark:border-neutral-800">
            <Button onClick={handleSave} disabled={loading} size="lg">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
