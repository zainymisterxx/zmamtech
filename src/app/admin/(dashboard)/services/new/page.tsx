"use client"

import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseClient"
import { uploadImage } from "@/lib/upload"

export default function NewServicePage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleIconChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setIconFile(file)
      setIconPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let icon_url: string | null = null

      if (iconFile) {
        icon_url = await uploadImage(iconFile, "services")
      }

      const { error: insertError } = await supabase
        .from("services")
        .insert([{ title, description: description || null, icon: icon_url }])

      if (insertError) throw insertError

      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while adding the service.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/admin/services" className="hover:text-brand-gold transition">
            Services
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">New Service</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Add Service</h1>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <Input
            label="Service Title"
            id="service-title"
            required
            placeholder="e.g. Web Development"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            id="service-desc"
            rows={4}
            placeholder="Brief description of the service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Icon / Image (optional)</label>
            {iconPreview ? (
              <div className="space-y-3">
                <div className="w-28 h-28 rounded-2xl border-2 border-brand-gold/30 bg-slate-50 dark:bg-neutral-800 flex items-center justify-center p-3 relative group overflow-hidden shadow-sm">
                  <img src={iconPreview} alt="Preview" className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("service-icon-file") as HTMLInputElement
                        input?.click()
                      }}
                      className="px-3 py-1.5 rounded-lg bg-brand-gold text-white text-xs font-semibold hover:bg-brand-goldHover transition"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIconFile(null)
                        setIconPreview(null)
                        const input = document.getElementById("service-icon-file") as HTMLInputElement
                        if (input) input.value = ""
                      }}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500">Hover image to Replace or Remove.</p>
              </div>
            ) : (
              <div
                onClick={() => {
                  const input = document.getElementById("service-icon-file") as HTMLInputElement
                  input?.click()
                }}
                className="w-full max-w-sm h-32 border-2 border-dashed border-brand-gold/40 hover:border-brand-gold bg-brand-goldLight/20 hover:bg-brand-goldLight/40 dark:bg-brand-gold/5 dark:hover:bg-brand-gold/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors p-4"
              >
                <svg className="w-8 h-8 text-brand-gold mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-sm font-medium text-brand-gold">Click to upload service icon</span>
                <span className="text-xs text-slate-500 mt-1">PNG, SVG, JPG, WEBP (Max 5MB)</span>
              </div>
            )}
            <input
              id="service-icon-file"
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800/50">
            <Link href="/admin/services">
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
