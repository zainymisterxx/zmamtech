"use client"

import { useState, useEffect, use } from "react"
import type { FormEvent, ChangeEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseClient"
import { uploadImage } from "@/lib/upload"

interface Props {
  params: Promise<{ id: string }>
}

export default function EditServicePage({ params }: Props) {
  const router = useRouter()
  const { id } = use(params)
  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [existingIcon, setExistingIcon] = useState<string | null>(null)
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadService() {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        setError("Failed to load service details.")
        console.error(error)
      } else if (data) {
        setTitle(data.title || "")
        setDescription(data.description || "")
        setExistingIcon(data.icon || null)
      }
      setFetching(false)
    }
    loadService()
  }, [id])

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
      let iconUrl = existingIcon

      if (iconFile) {
        iconUrl = await uploadImage(iconFile, "services")
      }

      const { error: updateError } = await supabase
        .from("services")
        .update({ title, description: description || null, icon: iconUrl })
        .eq("id", id)

      if (updateError) throw updateError

      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while updating the service.")
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this service?")) return

    setLoading(true)
    try {
      const { error: deleteError } = await supabase
        .from("services")
        .delete()
        .eq("id", id)

      if (deleteError) throw deleteError

      router.push("/admin/services")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to delete service.")
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full" />
      </div>
    )
  }

  const displayIcon = iconPreview || existingIcon

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/admin/services" className="hover:text-brand-gold transition">Services</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">Edit Service</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Edit Service</h1>
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
            id="edit-service-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            id="edit-service-desc"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Service Icon / Image (optional)</label>
            {displayIcon ? (
              <div className="space-y-3">
                <div className="w-28 h-28 rounded-2xl border-2 border-brand-gold/30 bg-slate-50 dark:bg-neutral-800 flex items-center justify-center p-3 relative group overflow-hidden shadow-sm">
                  <img src={displayIcon} alt="Icon Preview" className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("edit-service-icon-file") as HTMLInputElement
                        input?.click()
                      }}
                      className="px-3 py-1.5 rounded-lg bg-brand-gold text-white text-xs font-semibold hover:bg-brand-goldHover transition"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setExistingIcon(null)
                        setIconFile(null)
                        setIconPreview(null)
                        const input = document.getElementById("edit-service-icon-file") as HTMLInputElement
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
                  const input = document.getElementById("edit-service-icon-file") as HTMLInputElement
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
              id="edit-service-icon-file"
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-neutral-800/50">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition disabled:opacity-50"
            >
              Delete Service
            </button>
            <div className="flex items-center gap-4">
              <Link href="/admin/services">
                <Button type="button" variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
