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
            <label className="text-sm font-medium text-text-secondary">Icon (optional)</label>
            {iconPreview && (
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-brand-gold/30 bg-gray-100 dark:bg-neutral-800">
                <img src={iconPreview} alt="Preview" className="w-full h-full object-contain" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-goldLight file:text-brand-gold hover:file:bg-brand-gold/20 transition-colors"
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
