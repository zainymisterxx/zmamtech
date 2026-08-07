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

export default function EditClientPage({ params }: Props) {
  const router = useRouter()
  const { id } = use(params)
  const supabase = createClient()

  const [name, setName] = useState("")
  const [industry, setIndustry] = useState("")
  const [description, setDescription] = useState("")
  const [existingLogo, setExistingLogo] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadClient() {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        setError("Failed to load client details.")
        console.error(error)
      } else if (data) {
        setName(data.name || "")
        setIndustry(data.industry || "")
        setDescription(data.description || "")
        setExistingLogo(data.logo_url)
      }
      setFetching(false)
    }
    loadClient()
  }, [id])

  function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let logoUrl = existingLogo

      if (logoFile) {
        logoUrl = await uploadImage(logoFile, "clients")
      }

      const { error: updateError } = await supabase
        .from("clients")
        .update({ name, industry: industry || null, description: description || null, logo_url: logoUrl })
        .eq("id", id)

      if (updateError) throw updateError

      router.push("/admin/clients")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while updating the client.")
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this client?")) return

    setLoading(true)
    try {
      const { error: deleteError } = await supabase
        .from("clients")
        .delete()
        .eq("id", id)

      if (deleteError) throw deleteError

      router.push("/admin/clients")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to delete client.")
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

  const displayLogo = logoPreview || existingLogo

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Link href="/admin/clients" className="hover:text-brand-gold transition">Clients</Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">Edit Client</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-black dark:text-white">Edit Client</h1>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <Input
            label="Client Name"
            id="edit-client-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Industry (optional)"
            id="edit-client-industry"
            placeholder="e.g. Technology, Finance"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            id="edit-client-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-text-secondary">Logo</label>
            {displayLogo && (
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold/30 bg-gray-100 dark:bg-neutral-800">
                <img src={displayLogo} alt="Logo" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
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
              Delete Client
            </button>
            <div className="flex items-center gap-4">
              <Link href="/admin/clients">
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
