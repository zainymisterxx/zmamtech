"use client"

import { useState } from "react"
import type { FormEvent, ChangeEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"
import { createClient } from "@/lib/supabaseClient"
import { uploadImage } from "@/lib/upload"

export default function NewSolutionPage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let image_url: string | null = null

      if (imageFile) {
        image_url = await uploadImage(imageFile, "solutions")
      }

      const { error: insertError } = await supabase
        .from("solutions")
        .insert([{ title, description: description || null, image: image_url }])

      if (insertError) throw insertError

      router.push("/admin/solutions")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while adding the solution.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/admin/solutions" className="hover:text-brand-gold transition">
            Solutions
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">New Solution</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Add Solution</h1>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <Input
            label="Solution Title"
            id="solution-title"
            required
            placeholder="e.g. Enterprise ERP System"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            id="solution-desc"
            rows={4}
            placeholder="Brief description of the solution..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-text-secondary">Image (optional)</label>
            {imagePreview && (
              <div className="w-full max-w-xs rounded-xl overflow-hidden border-2 border-brand-gold/30 bg-gray-100 dark:bg-neutral-800 aspect-video">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-goldLight file:text-brand-gold hover:file:bg-brand-gold/20 transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-neutral-800/50">
            <Link href="/admin/solutions">
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Solution"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
