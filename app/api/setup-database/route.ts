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

    // Create profiles table
    const { error: profilesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id),
        full_name TEXT,
        email TEXT UNIQUE,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    if (profilesError) {
      return NextResponse.json({ error: `Error creating profiles table: ${profilesError.message}` }, { status: 500 })
    }

    // Create events table
    const { error: eventsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        description TEXT,
        location TEXT,
        start_date TIMESTAMP WITH TIME ZONE,
        end_date TIMESTAMP WITH TIME ZONE,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    if (eventsError) {
      return NextResponse.json({ error: `Error creating events table: ${eventsError.message}` }, { status: 500 })
    }

    // Create businesses table
    const { error: businessesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS businesses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        description TEXT,
        address TEXT,
        phone TEXT,
        email TEXT,
        website TEXT,
        category TEXT,
        image_url TEXT,
        latitude DOUBLE PRECISION,
        longitude DOUBLE PRECISION,
        user_id UUID REFERENCES auth.users(id),
        status TEXT DEFAULT 'pending',
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    if (businessesError) {
      return NextResponse.json(
        { error: `Error creating businesses table: ${businessesError.message}` },
        { status: 500 },
      )
    }

    // Create business_views table
    const { error: viewsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS business_views (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        business_id UUID REFERENCES businesses(id),
        viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    if (viewsError) {
      return NextResponse.json({ error: `Error creating business_views table: ${viewsError.message}` }, { status: 500 })
    }

    // Create reviews table
    const { error: reviewsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        business_id UUID REFERENCES businesses(id),
        user_id UUID REFERENCES auth.users(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    if (reviewsError) {
      return NextResponse.json({ error: `Error creating reviews table: ${reviewsError.message}` }, { status: 500 })
    }

    // Check if admin user exists
    const { data: adminUser, error: adminCheckError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", "admin@ruse-tourism.com")
      .single()

    if (adminCheckError && !adminCheckError.message.includes("No rows found")) {
      return NextResponse.json({ error: `Error checking admin user: ${adminCheckError.message}` }, { status: 500 })
    }

    // Create admin user if it doesn't exist
    if (!adminUser) {
      // Create admin user in auth
      const { data: user, error: userError } = await supabase.auth.admin.createUser({
        email: "admin@ruse-tourism.com",
        password: "Admin123!",
        email_confirm: true,
        user_metadata: {
          full_name: "Admin User",
        },
      })

      if (userError) {
        return NextResponse.json({ error: `Error creating admin user: ${userError.message}` }, { status: 500 })
      }

      // Create admin profile
      if (user.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.user.id,
          full_name: "Admin User",
          email: "admin@ruse-tourism.com",
          role: "admin",
        })

        if (profileError) {
          return NextResponse.json({ error: `Error creating admin profile: ${profileError.message}` }, { status: 500 })
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
      admin: {
        email: "admin@ruse-tourism.com",
        password: adminUser ? "Your existing password" : "Admin123!",
      },
      next_steps: "Go to /admin/login to sign in with these credentials",
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json({ error: `Database setup failed: ${error.message}` }, { status: 500 })
  }
}
