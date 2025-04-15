import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check if admin user exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      return NextResponse.json({ error: `Failed to list users: ${listError.message}` }, { status: 500 })
    }

    const adminUser = existingUsers.users.find((user) => user.email === "admin@ruse-tourism.com")

    if (adminUser) {
      // Admin user exists, ensure they have a profile with admin role
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: adminUser.id,
        full_name: "Admin User",
        email: "admin@ruse-tourism.com",
        role: "admin",
      })

      if (profileError && !profileError.message.includes("duplicate key")) {
        return NextResponse.json({ error: `Failed to update admin profile: ${profileError.message}` }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Admin user already exists, profile updated",
        admin: {
          email: "admin@ruse-tourism.com",
          id: adminUser.id,
        },
      })
    }

    // Create admin user
    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: "admin@ruse-tourism.com",
      password: "Admin123!",
      email_confirm: true,
      user_metadata: {
        full_name: "Admin User",
      },
    })

    if (userError) {
      return NextResponse.json({ error: `Failed to create admin user: ${userError.message}` }, { status: 500 })
    }

    if (!user.user) {
      return NextResponse.json({ error: "Failed to create admin user: No user returned" }, { status: 500 })
    }

    // Create admin profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.user.id,
      full_name: "Admin User",
      email: "admin@ruse-tourism.com",
      role: "admin",
    })

    if (profileError) {
      return NextResponse.json({ error: `Failed to create admin profile: ${profileError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      admin: {
        email: "admin@ruse-tourism.com",
        id: user.user.id,
      },
    })
  } catch (error: any) {
    console.error("Admin creation error:", error)
    return NextResponse.json({ error: `Failed to create admin user: ${error.message}` }, { status: 500 })
  }
}
