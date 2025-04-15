-- Function to create events table if it doesn't exist
CREATE OR REPLACE FUNCTION create_events_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'events') THEN
    CREATE TABLE public.events (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT,
      location TEXT,
      start_date TIMESTAMP WITH TIME ZONE,
      end_date TIMESTAMP WITH TIME ZONE,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      status TEXT DEFAULT 'active',
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
    );
    
    -- Add RLS policies
    ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
    
    -- Allow public read access
    CREATE POLICY "Allow public read access" ON public.events
      FOR SELECT USING (true);
      
    -- Allow authenticated users to insert
    CREATE POLICY "Allow authenticated users to insert" ON public.events
      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
      
    -- Allow users to update their own events
    CREATE POLICY "Allow users to update own events" ON public.events
      FOR UPDATE USING (auth.uid() = user_id);
      
    -- Allow users to delete their own events
    CREATE POLICY "Allow users to delete own events" ON public.events
      FOR DELETE USING (auth.uid() = user_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create business_views table if it doesn't exist
CREATE OR REPLACE FUNCTION create_business_views_table_if_not_exists()
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_views') THEN
    CREATE TABLE public.business_views (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      business_id UUID NOT NULL,
      viewed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
      ip_address TEXT,
      user_agent TEXT
    );
    
    -- Add RLS policies
    ALTER TABLE public.business_views ENABLE ROW LEVEL SECURITY;
    
    -- Allow public insert access
    CREATE POLICY "Allow public insert access" ON public.business_views
      FOR INSERT WITH CHECK (true);
      
    -- Allow business owners to view their own business views
    CREATE POLICY "Allow business owners to view their business views" ON public.business_views
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.businesses b
          WHERE b.id = business_views.business_id
          AND b.owner_id = auth.uid()
        )
      );
      
    -- Allow admins to view all business views
    CREATE POLICY "Allow admins to view all business views" ON public.business_views
      FOR SELECT USING (
        EXISTS (
          SELECT 1 FROM public.profiles p
          WHERE p.id = auth.uid()
          AND p.role = 'admin'
        )
      );
  END IF;
END;
$$ LANGUAGE plpgsql;
