"use server"

import { getSupabaseServer } from "@/lib/supabase"

export async function setupDatabase() {
  const supabase = getSupabaseServer()

  try {
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)

    if (businessesError) throw businessesError

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

    if (eventsError) throw eventsError

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

    if (reviewsError) throw reviewsError

    // Set up RLS policies
    await supabase.query(`
      ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
      ALTER TABLE events ENABLE ROW LEVEL SECURITY;
      ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

      -- Policy for businesses: anyone can read approved businesses
      CREATE POLICY IF NOT EXISTS "Anyone can read approved businesses"
        ON businesses FOR SELECT
        USING (is_approved = TRUE);

      -- Policy for businesses: only authenticated users can insert
      CREATE POLICY IF NOT EXISTS "Authenticated users can insert businesses"
        ON businesses FOR INSERT
        TO authenticated
        WITH CHECK (true);

      -- Policy for events: anyone can read events
      CREATE POLICY IF NOT EXISTS "Anyone can read events"
        ON events FOR SELECT
        USING (true);

      -- Policy for reviews: anyone can read approved reviews
      CREATE POLICY IF NOT EXISTS "Anyone can read approved reviews"
        ON reviews FOR SELECT
        USING (is_approved = TRUE);

      -- Policy for reviews: authenticated users can insert reviews
      CREATE POLICY IF NOT EXISTS "Authenticated users can insert reviews"
        ON reviews FOR INSERT
        TO authenticated
        WITH CHECK (true);
    `)

    return { success: true, message: "Database setup completed successfully" }
  } catch (error) {
    console.error("Error setting up database:", error)
    return { success: false, message: "Failed to set up database", error }
  }
}
