import { createClient } from "./supabaseClient"

/**
 * Uploads an image to the 'portfolio-assets' bucket in Supabase Storage.
 * Generates a unique filename and returns the public URL.
 *
 * @param file The File object from an input element
 * @param folder Optional folder name (e.g. 'projects', 'team')
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string = "general"): Promise<string> {
  const supabase = createClient()
  
  // Generate a unique file name to avoid collisions
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage
    .from("portfolio-assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error("Storage upload error:", error)
    if (error.message?.includes("row-level security") || error.message?.includes("security policy")) {
      throw new Error(`Failed to upload image: Storage RLS policy violation. Please ensure public upload policy is enabled for 'portfolio-assets' in Supabase SQL Editor.`)
    }
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  // Get the public URL
  const { data: publicUrlData } = supabase.storage
    .from("portfolio-assets")
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}
