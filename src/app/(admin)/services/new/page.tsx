"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input, Textarea } from "@/components/input"
import Button from "@/components/button"

export default function NewServicePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    console.log("Creating service:", { title, description })

    // Simulate creation
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
          <span className="text-text-body font-medium">New Service</span>
        </div>
        <h1 className="font-heading text-3xl font-bold text-text-primary">
          Create Service
        </h1>
        <p className="mt-1 text-text-body">
          Add a new service offered by your agency.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-base-border rounded-2xl p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Service Name"
            id="service-title"
            required
            placeholder="e.g. Web Development"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description"
            id="service-desc"
            required
            rows={4}
            placeholder="Describe what the service entails and key features..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-base-border/50">
            <Link href="/services">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Service"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}