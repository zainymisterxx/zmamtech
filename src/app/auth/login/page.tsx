"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/input"
import Button from "@/components/button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Demo authentication matching previous behavior
      if (email === "admin@test.com" && password === "123456") {
        router.push("/dashboard")
      } else {
        setError("Invalid email address or password")
      }
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-section flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="font-heading text-3xl font-bold tracking-tight text-text-primary">
            ZMAM<span className="text-brand-gold">TECH</span>
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-heading font-bold text-text-primary">
          Admin Console
        </h2>
        <p className="mt-2 text-sm text-text-body">
          Sign in to manage your portfolio and services
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-base-border shadow-soft rounded-2xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              id="login-email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-xs text-text-light flex justify-between items-center">
              <span>Demo credentials: admin@test.com / 123456</span>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}