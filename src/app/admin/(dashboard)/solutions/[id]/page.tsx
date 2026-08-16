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

export default function EditSolutionPage({ params }: Props) {
  const router = useRouter()
  const { id } = use(params)
  const supabase = createClient()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadSolution() {
      const { data, error } = await supabase
        .from("solutions")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        setError("Failed to load solution details.")
        console.error(error)
      } else if (data) {
        setTitle(data.title || "")
        setDescription(data.description || "")
        setExistingImage(data.image || null)
      }
      setFetching(false)
    }
    loadSolution()
  }, [id])

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
      let imageUrl = existingImage

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, "solutions")
      }

      const { error: updateError } = await supabase
        .from("solutions")
        .update({ title, description: description || null, image: imageUrl })
        .eq("id", id)

      if (updateError) throw updateError

      router.push("/admin/solutions")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while updating the solution.")
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this solution?")) return

    setLoading(true)
    try {
      const { error: deleteError } = await supabase
        .from("solutions")
        .delete()
        .eq("id", id)

      if (deleteError) throw deleteError

      router.push("/admin/solutions")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to delete solution.")
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

  const displayImage = imagePreview || existingImage

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/admin/solutions" className="hover:text-brand-gold transition">Solutions</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">Edit Solution</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Edit Solution</h1>
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
            id="edit-solution-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            id="edit-solution-desc"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-text-secondary">Image</label>
            {displayImage && (
              <div className="w-full max-w-xs rounded-xl overflow-hidden border-2 border-brand-gold/30 bg-gray-100 dark:bg-neutral-800 aspect-video">
                <img src={displayImage} alt="Solution" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-goldLight file:text-brand-gold hover:file:bg-brand-gold/20 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-neutral-800/50">
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition disabled:opacity-50"
            >
              Delete Solution
            </button>
            <div className="flex items-center gap-4">
              <Link href="/admin/solutions">
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
