import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Create tables using the Supabase client
    // First, check if the tables exist
    const { data: tablesData, error: tablesError } = await supabase
      .from("pg_tables")
      .select("tablename")
      .eq("schemaname", "public")

    if (tablesError) {
      console.error("Error checking tables:", tablesError)
    }

    const existingTables = tablesData?.map((t) => t.tablename) || []
    console.log("Existing tables:", existingTables)

    // Create profiles table if it doesn't exist
    if (!existingTables.includes("profiles")) {
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY,
          full_name TEXT,
          email TEXT UNIQUE,
          role TEXT DEFAULT 'user',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `)

      if (error) {
        return NextResponse.json({ error: `Failed to create profiles table: ${error.message}` }, { status: 500 })
      }
    }

    // Create UUID extension
    await supabase.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    // Create businesses table if it doesn't exist
    if (!existingTables.includes("businesses")) {
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS businesses (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          description TEXT,
          address TEXT,
          phone TEXT,
          contact_email TEXT,
          website TEXT,
          category TEXT,
          images TEXT[],
          amenities TEXT[],
          latitude DOUBLE PRECISION,
          longitude DOUBLE PRECISION,
          user_id UUID,
          status TEXT DEFAULT 'pending',
          is_featured BOOLEAN DEFAULT false,
          view_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `)

      if (error) {
        return NextResponse.json({ error: `Failed to create businesses table: ${error.message}` }, { status: 500 })
      }
    }

    // Create events table if it doesn't exist
    if (!existingTables.includes("events")) {
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          description TEXT,
          location TEXT,
          date DATE,
          time TEXT,
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `)

      if (error) {
        return NextResponse.json({ error: `Failed to create events table: ${error.message}` }, { status: 500 })
      }
    }

    // Create business_views table if it doesn't exist
    if (!existingTables.includes("business_views")) {
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS business_views (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          business_id UUID,
          viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `)

      if (error) {
        return NextResponse.json({ error: `Failed to create business_views table: ${error.message}` }, { status: 500 })
      }
    }

    // Create reviews table if it doesn't exist
    if (!existingTables.includes("reviews")) {
      const { error } = await supabase.query(`
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          business_id UUID,
          user_id UUID,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `)

      if (error) {
        return NextResponse.json({ error: `Failed to create reviews table: ${error.message}` }, { status: 500 })
      }
    }

    // Create admin user
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      return NextResponse.json({ error: `Failed to list users: ${listError.message}` }, { status: 500 })
    }

    let adminUserId = null
    const adminUser = existingUsers.users.find((user) => user.email === "admin@ruse-tourism.com")

    if (adminUser) {
      adminUserId = adminUser.id
    } else {
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

      adminUserId = user.user.id
    }

    // Insert or update admin profile
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: adminUserId,
      full_name: "Admin User",
      email: "admin@ruse-tourism.com",
      role: "admin",
    })

    if (profileError) {
      return NextResponse.json({ error: `Failed to create admin profile: ${profileError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
      admin: {
        email: "admin@ruse-tourism.com",
        password: "Admin123!",
        id: adminUserId,
      },
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json(
      {
        error: `Database setup failed: ${error.message}`,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
