"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabaseClient"
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
      const supabase = createClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || "Invalid email address or password")
        return
      }

      router.push("/admin/dashboard")
      router.refresh()
    } catch (err) {
      console.error(err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block">
          <span className="font-heading text-3xl font-bold tracking-tight text-black dark:text-white">
            ZMAM<span className="text-brand-gold">TECH</span>
          </span>
        </Link>
        <h2 className="mt-6 text-2xl font-heading font-bold text-black dark:text-white">
          Admin Console
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Sign in to manage your portfolio and services
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-neutral-900 py-8 px-4 border border-gray-200 dark:border-neutral-800 shadow-soft rounded-xl sm:px-10">
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

            <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
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