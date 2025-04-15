"use server"

import { createClient } from "@supabase/supabase-js"

export async function registerUser(formData: {
  email: string
  password: string
  name: string
}) {
  try {
    // Create a Supabase client with service role key to bypass RLS
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Register the user
    const { data, error } = await supabase.auth.admin.createUser({
      email: formData.email,
      password: formData.password,
      email_confirm: true, // Auto-confirm the email
      user_metadata: {
        full_name: formData.name,
      },
    })

    if (error) throw error

    // Create a profile record if user was created
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: formData.name,
        email: formData.email,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Error creating profile:", profileError)
        // Don't throw here, as the user is already created
      }
    }

    return { success: true, user: data.user }
  } catch (error: any) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: error.message || "Registration failed",
    }
  }
}
