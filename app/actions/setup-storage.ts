"use server"

import { getSupabaseServer } from "@/lib/supabase"

export async function setupStorage() {
  const supabase = getSupabaseServer()

  try {
    // Create the images bucket if it doesn't exist
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()

    if (bucketsError) throw bucketsError

    const imagesBucketExists = buckets.some((bucket) => bucket.name === "images")

    if (!imagesBucketExists) {
      const { error: createBucketError } = await supabase.storage.createBucket("images", {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
      })

      if (createBucketError) throw createBucketError
    }

    // Set up public access policy for the images bucket
    const { error: policyError } = await supabase.storage.from("images").createSignedUrl("test.txt", 1)

    if (policyError && policyError.message.includes("The resource was not found")) {
      // Create a policy to allow public access to the images bucket
      await supabase.query(`
        CREATE POLICY "Public Access" 
        ON storage.objects 
        FOR SELECT 
        USING (bucket_id = 'images');
      `)
    }

    return { success: true, message: "Storage setup completed successfully" }
  } catch (error) {
    console.error("Error setting up storage:", error)
    return { success: false, message: "Failed to set up storage", error }
  }
}
