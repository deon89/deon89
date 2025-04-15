"use server"

import { getSupabaseServer } from "@/lib/supabase"

export async function setupDatabase() {
  const supabase = getSupabaseServer()

  try {
    // First, check if we have the necessary extensions
    const { error: extensionError } = await supabase.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `)

    if (extensionError) {
      console.error("Error creating extension:", extensionError)
      return {
        success: false,
        message: "Failed to create required database extension: " + extensionError.message,
      }
    }

    // Create profiles table with role field
    const { error: profilesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id),
        full_name TEXT,
        email TEXT UNIQUE NOT NULL,
        avatar_url TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    if (profilesError) {
      console.error("Error creating profiles table:", profilesError)
      return {
        success: false,
        message: "Failed to create profiles table: " + profilesError.message,
      }
    }

    // Create businesses table
    const { error: businessesError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS businesses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        website TEXT,
        image_url TEXT,
        contact_email TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT FALSE,
        is_featured BOOLEAN DEFAULT FALSE,
        user_id UUID REFERENCES auth.users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    if (businessesError) {
      console.error("Error creating businesses table:", businessesError)
      return {
        success: false,
        message: "Failed to create businesses table: " + businessesError.message,
      }
    }

    // Create events table
    const { error: eventsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        location TEXT NOT NULL,
        image_url TEXT,
        website TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    if (eventsError) {
      console.error("Error creating events table:", eventsError)
      return {
        success: false,
        message: "Failed to create events table: " + eventsError.message,
      }
    }

    // Create reviews table
    const { error: reviewsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        is_approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    if (reviewsError) {
      console.error("Error creating reviews table:", reviewsError)
      return {
        success: false,
        message: "Failed to create reviews table: " + reviewsError.message,
      }
    }

    // Create business_views table for analytics
    const { error: viewsError } = await supabase.query(`
      CREATE TABLE IF NOT EXISTS business_views (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
        viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address TEXT,
        user_agent TEXT
      )
    `)

    if (viewsError) {
      console.error("Error creating business_views table:", viewsError)
      return {
        success: false,
        message: "Failed to create business_views table: " + viewsError.message,
      }
    }

    // Set up RLS policies
    try {
      await supabase.query(`
        ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
        ALTER TABLE events ENABLE ROW LEVEL SECURITY;
        ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE business_views ENABLE ROW LEVEL SECURITY;

        -- Policy for businesses: anyone can read approved businesses
        DROP POLICY IF EXISTS "Anyone can read approved businesses" ON businesses;
        CREATE POLICY "Anyone can read approved businesses"
          ON businesses FOR SELECT
          USING (is_approved = TRUE);

        -- Policy for businesses: only authenticated users can insert
        DROP POLICY IF EXISTS "Authenticated users can insert businesses" ON businesses;
        CREATE POLICY "Authenticated users can insert businesses"
          ON businesses FOR INSERT
          TO authenticated
          WITH CHECK (true);

        -- Policy for businesses: users can update their own businesses
        DROP POLICY IF EXISTS "Users can update their own businesses" ON businesses;
        CREATE POLICY "Users can update their own businesses"
          ON businesses FOR UPDATE
          TO authenticated
          USING (auth.uid() = user_id)
          WITH CHECK (auth.uid() = user_id);

        -- Policy for events: anyone can read events
        DROP POLICY IF EXISTS "Anyone can read events" ON events;
        CREATE POLICY "Anyone can read events"
          ON events FOR SELECT
          USING (true);

        -- Policy for reviews: anyone can read approved reviews
        DROP POLICY IF EXISTS "Anyone can read approved reviews" ON reviews;
        CREATE POLICY "Anyone can read approved reviews"
          ON reviews FOR SELECT
          USING (is_approved = TRUE);

        -- Policy for reviews: authenticated users can insert reviews
        DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON reviews;
        CREATE POLICY "Authenticated users can insert reviews"
          ON reviews FOR INSERT
          TO authenticated
          WITH CHECK (true);

        -- Policy for profiles: anyone can read profiles
        DROP POLICY IF EXISTS "Anyone can read profiles" ON profiles;
        CREATE POLICY "Anyone can read profiles"
          ON profiles FOR SELECT
          USING (true);

        -- Policy for profiles: users can update their own profile
        DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
        CREATE POLICY "Users can update their own profile"
          ON profiles FOR UPDATE
          USING (auth.uid() = id)
          WITH CHECK (auth.uid() = id);

        -- Policy for business_views: anyone can insert views
        DROP POLICY IF EXISTS "Anyone can insert business views" ON business_views;
        CREATE POLICY "Anyone can insert business views"
          ON business_views FOR INSERT
          TO anon, authenticated
          WITH CHECK (true);
      `)
    } catch (policyError) {
      console.error("Error setting up RLS policies:", policyError)
      // Continue even if policies fail - tables are created
    }

    return { success: true, message: "Database setup completed successfully" }
  } catch (error) {
    console.error("Error setting up database:", error)
    return {
      success: false,
      message: "Failed to set up database. Error: " + (error.message || "Unknown error"),
    }
  }
}
