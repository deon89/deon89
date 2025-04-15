"use server"

import { getSupabaseServer } from "@/lib/supabase"

export async function createAdminUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    }
  }

  const supabase = getSupabaseServer()

  try {
    // Create the user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) throw authError

    // Set the user's role to admin
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: authData.user.id,
      email: email,
      role: "admin",
      full_name: "Admin User",
    })

    if (profileError) throw profileError

    return {
      success: true,
      message: "Admin user created successfully",
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return {
      success: false,
      message: "Failed to create admin user: " + (error.message || "Unknown error"),
    }
  }
}
