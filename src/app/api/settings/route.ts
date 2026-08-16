import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabase = await createClient()

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    for (const [key, value] of Object.entries(data)) {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value })

      if (error) {
        console.error(`Error upserting setting ${key}:`, error)
        throw new Error(`Failed to update setting: ${key}`)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Settings Update API Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update settings" },
      { status: 500 }
    )
  }
}
