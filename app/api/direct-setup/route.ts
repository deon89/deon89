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

    // Create tables one by one using the Supabase client
    console.log("Creating profiles table...")
    const { error: profilesError } = await supabase.from("profiles").select("id").limit(1).maybeSingle()

    if (profilesError && profilesError.code !== "PGRST116") {
      // If the error is not "relation does not exist", then it's a different error
      return NextResponse.json({ error: `Error checking profiles table: ${profilesError.message}` }, { status: 500 })
    }

    if (profilesError && profilesError.code === "PGRST116") {
      // Create profiles table
      const { error: createProfilesError } = await supabase.rpc("exec_sql", {
        sql_query: `
          CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY,
            full_name TEXT,
            email TEXT UNIQUE,
            role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      })

      if (createProfilesError) {
        return NextResponse.json(
          { error: `Failed to create profiles table: ${createProfilesError.message}` },
          { status: 500 },
        )
      }
    }

    // Create UUID extension
    console.log("Creating UUID extension...")
    const { error: uuidError } = await supabase.rpc("exec_sql", {
      sql_query: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
    })

    if (uuidError) {
      // Try a different approach if RPC fails
      try {
        await supabase.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
      } catch (err: any) {
        console.log("UUID extension error (ignorable if already exists):", err.message)
      }
    }

    // Check if businesses table exists
    console.log("Creating businesses table...")
    const { error: businessesError } = await supabase.from("businesses").select("id").limit(1).maybeSingle()

    if (businessesError && businessesError.code !== "PGRST116") {
      return NextResponse.json(
        { error: `Error checking businesses table: ${businessesError.message}` },
        { status: 500 },
      )
    }

    if (businessesError && businessesError.code === "PGRST116") {
      // Create businesses table
      const { error: createBusinessesError } = await supabase.rpc("exec_sql", {
        sql_query: `
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
          );
        `,
      })

      if (createBusinessesError) {
        return NextResponse.json(
          { error: `Failed to create businesses table: ${createBusinessesError.message}` },
          { status: 500 },
        )
      }
    }

    // Check if events table exists
    console.log("Creating events table...")
    const { error: eventsError } = await supabase.from("events").select("id").limit(1).maybeSingle()

    if (eventsError && eventsError.code !== "PGRST116") {
      return NextResponse.json({ error: `Error checking events table: ${eventsError.message}` }, { status: 500 })
    }

    if (eventsError && eventsError.code === "PGRST116") {
      // Create events table
      const { error: createEventsError } = await supabase.rpc("exec_sql", {
        sql_query: `
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
          );
        `,
      })

      if (createEventsError) {
        return NextResponse.json(
          { error: `Failed to create events table: ${createEventsError.message}` },
          { status: 500 },
        )
      }
    }

    // Check if business_views table exists
    console.log("Creating business_views table...")
    const { error: viewsError } = await supabase.from("business_views").select("id").limit(1).maybeSingle()

    if (viewsError && viewsError.code !== "PGRST116") {
      return NextResponse.json({ error: `Error checking business_views table: ${viewsError.message}` }, { status: 500 })
    }

    if (viewsError && viewsError.code === "PGRST116") {
      // Create business_views table
      const { error: createViewsError } = await supabase.rpc("exec_sql", {
        sql_query: `
          CREATE TABLE IF NOT EXISTS business_views (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            business_id UUID,
            viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      })

      if (createViewsError) {
        return NextResponse.json(
          { error: `Failed to create business_views table: ${createViewsError.message}` },
          { status: 500 },
        )
      }
    }

    // Check if reviews table exists
    console.log("Creating reviews table...")
    const { error: reviewsError } = await supabase.from("reviews").select("id").limit(1).maybeSingle()

    if (reviewsError && reviewsError.code !== "PGRST116") {
      return NextResponse.json({ error: `Error checking reviews table: ${reviewsError.message}` }, { status: 500 })
    }

    if (reviewsError && reviewsError.code === "PGRST116") {
      // Create reviews table
      const { error: createReviewsError } = await supabase.rpc("exec_sql", {
        sql_query: `
          CREATE TABLE IF NOT EXISTS reviews (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            business_id UUID,
            user_id UUID,
            rating INTEGER CHECK (rating >= 1 AND rating <= 5),
            comment TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      })

      if (createReviewsError) {
        return NextResponse.json(
          { error: `Failed to create reviews table: ${createReviewsError.message}` },
          { status: 500 },
        )
      }
    }

    // Create admin user
    console.log("Creating admin user...")
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      return NextResponse.json({ error: `Failed to list users: ${listError.message}` }, { status: 500 })
    }

    let adminUserId = null
    const adminUser = existingUsers.users.find((user) => user.email === "admin@ruse-tourism.com")

    if (adminUser) {
      adminUserId = adminUser.id
      console.log("Admin user already exists with ID:", adminUserId)
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
      console.log("Created new admin user with ID:", adminUserId)
    }

    // Insert or update admin profile
    console.log("Creating admin profile...")
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
