import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Create a Supabase client with service role key
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

    // Check if admin@ruse-tourism.com already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", "admin@ruse-tourism.com")
      .single()

    if (existingUser) {
      // Check if the user has admin role
      if (existingUser.role !== "admin") {
        // Update the role to admin
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ role: "admin" })
          .eq("email", "admin@ruse-tourism.com")

        if (updateError) {
          return NextResponse.json({ error: `Failed to update user role: ${updateError.message}` }, { status: 500 })
        }
      }

      // Set up database tables if they don't exist
      await setupTables(supabase)

      return NextResponse.json({
        message: "Admin user already exists",
        email: "admin@ruse-tourism.com",
        note: "You can log in with your existing password or reset it at /admin/help",
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
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    // Create profile with admin role
    if (user.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: user.user.id,
        full_name: "Admin User",
        email: "admin@ruse-tourism.com",
        role: "admin",
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        return NextResponse.json({ error: `Error creating profile: ${profileError.message}` }, { status: 500 })
      }
    }

    // Set up database tables
    await setupTables(supabase)

    return NextResponse.json({
      message: "Admin user created successfully",
      email: "admin@ruse-tourism.com",
      password: "Admin123!",
      next_steps: "Go to /admin/login to sign in with these credentials",
    })
  } catch (error: any) {
    console.error("Setup error:", error)
    return NextResponse.json({ error: `Failed to set up admin: ${error.message}` }, { status: 500 })
  }
}

async function setupTables(supabase: any) {
  try {
    // Create profiles table if it doesn't exist
    const { error: profilesError } = await supabase.rpc("create_profiles_table_if_not_exists")

    if (profilesError && !profilesError.message.includes("does not exist")) {
      console.error("Error creating profiles table:", profilesError)
    }

    // Create events table if it doesn't exist
    const { error: eventsError } = await supabase.rpc("create_events_table_if_not_exists")

    if (eventsError && !eventsError.message.includes("does not exist")) {
      console.error("Error creating events table:", eventsError)
    }

    // Create business_views table if it doesn't exist
    const { error: viewsError } = await supabase.rpc("create_business_views_table_if_not_exists")

    if (viewsError && !viewsError.message.includes("does not exist")) {
      console.error("Error creating business_views table:", viewsError)
    }

    // Create businesses table if it doesn't exist
    const { error: businessesError } = await supabase.rpc("create_businesses_table_if_not_exists")

    if (businessesError && !businessesError.message.includes("does not exist")) {
      console.error("Error creating businesses table:", businessesError)
    }
  } catch (error) {
    console.error("Error setting up tables:", error)
    // Continue anyway, as the admin user is created
  }
}
