"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"

interface Props {
  params: Promise<{
    id: string
  }> | { id: string }
}

export default function ServiceDetailPage({ params }: Props) {
  const router = useRouter()
  // Support both Sync and Async params (React 19 Next 16 compatibility)
  const id = typeof (params as any).then === "function" ? "" : (params as any).id

  const [title, setTitle] = useState("Web Development")
  const [description, setDescription] = useState(
    "Modern, responsive websites and web applications built with cutting-edge technologies for peak performance and scalability."
  )
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    console.log("Updating service:", { id, title, description })

    // Simulate update
    setTimeout(() => {
      setLoading(false)
      router.push("/services")
    }, 800)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Breadcrumb / Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-text-light mb-2">
          <Link href="/services" className="hover:text-brand-gold transition">
            Services
          </Link>
          <span>/</span>
          <span className="text-text-body font-medium">Edit Service</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Edit Service {id && `#${id}`}
        </h1>
        <p className="mt-1 text-text-body">
          Update the details of this service.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-base-border rounded-2xl p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Service Name"
            id="edit-service-title"
            required
            placeholder="e.g. Web Development"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description"
            id="edit-service-desc"
            required
            rows={4}
            placeholder="Describe what the service entails and key features..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center justify-between pt-4 border-t border-base-border/50">
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to delete this service?")) {
                  router.push("/services")
                }
              }}
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition"
            >
              Delete Service
            </button>
            <div className="flex items-center gap-4">
              <Link href="/services">
                <Button type="button" variant="outline">
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