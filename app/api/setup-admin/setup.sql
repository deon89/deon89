-- Function to create profiles table if it doesn't exist
CREATE OR REPLACE FUNCTION create_profiles_table_if_not_exists()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        CREATE TABLE public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            full_name TEXT,
            email TEXT UNIQUE,
            role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Set up RLS policies
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        -- Allow users to read their own profile
        CREATE POLICY "Users can read their own profile"
            ON public.profiles
            FOR SELECT
            USING (auth.uid() = id);
            
        -- Allow users to update their own profile
        CREATE POLICY "Users can update their own profile"
            ON public.profiles
            FOR UPDATE
            USING (auth.uid() = id);
            
        -- Allow service role to manage all profiles
        CREATE POLICY "Service role can manage all profiles"
            ON public.profiles
            USING (auth.role() = 'service_role');
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create events table if it doesn't exist
CREATE OR REPLACE FUNCTION create_events_table_if_not_exists()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'events') THEN
        CREATE TABLE public.events (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title TEXT NOT NULL,
            description TEXT,
            date DATE NOT NULL,
            time TEXT,
            location TEXT,
            image_url TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Set up RLS policies
        ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
        
        -- Allow anyone to read events
        CREATE POLICY "Anyone can read events"
            ON public.events
            FOR SELECT
            TO PUBLIC
            USING (true);
            
        -- Allow authenticated users with admin role to manage events
        CREATE POLICY "Admins can manage events"
            ON public.events
            USING (
                auth.role() = 'authenticated' AND 
                EXISTS (
                    SELECT 1 FROM profiles 
                    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
                )
            );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create business_views table if it doesn't exist
CREATE OR REPLACE FUNCTION create_business_views_table_if_not_exists()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'business_views') THEN
        CREATE TABLE public.business_views (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            business_id UUID NOT NULL,
            viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            user_id UUID,
            ip_address TEXT
        );

        -- Set up RLS policies
        ALTER TABLE public.business_views ENABLE ROW LEVEL SECURITY;
        
        -- Allow anyone to insert views
        CREATE POLICY "Anyone can insert views"
            ON public.business_views
            FOR INSERT
            TO PUBLIC
            WITH CHECK (true);
            
        -- Allow business owners to read their own business views
        CREATE POLICY "Business owners can read their business views"
            ON public.business_views
            FOR SELECT
            USING (
                auth.role() = 'authenticated' AND 
                EXISTS (
                    SELECT 1 FROM businesses 
                    WHERE businesses.id = business_views.business_id AND businesses.owner_id = auth.uid()
                )
            );
            
        -- Allow admins to read all views
        CREATE POLICY "Admins can read all views"
            ON public.business_views
            FOR SELECT
            USING (
                auth.role() = 'authenticated' AND 
                EXISTS (
                    SELECT 1 FROM profiles 
                    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
                )
            );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to create businesses table if it doesn't exist
CREATE OR REPLACE FUNCTION create_businesses_table_if_not_exists()
RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'businesses') THEN
        CREATE TABLE public.businesses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            description TEXT,
            category TEXT,
            address TEXT,
            phone TEXT,
            contact_email TEXT,
            website TEXT,
            images TEXT[],
            amenities TEXT[],
            status TEXT DEFAULT 'pending',
            is_featured BOOLEAN DEFAULT false,
            owner_id UUID REFERENCES auth.users(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            view_count INTEGER DEFAULT 0
        );

        -- Set up RLS policies
        ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
        
        -- Allow anyone to read approved businesses
        CREATE POLICY "Anyone can read approved businesses"
            ON public.businesses
            FOR SELECT
            TO PUBLIC
            USING (status = 'approved');
            
        -- Allow business owners to read their own businesses
        CREATE POLICY "Business owners can read their own businesses"
            ON public.businesses
            FOR SELECT
            USING (auth.uid() = owner_id);
            
        -- Allow business owners to update their own businesses
        CREATE POLICY "Business owners can update their own businesses"
            ON public.businesses
            FOR UPDATE
            USING (auth.uid() = owner_id);
            
        -- Allow business owners to delete their own businesses
        CREATE POLICY "Business owners can delete their own businesses"
            ON public.businesses
            FOR DELETE
            USING (auth.uid() = owner_id);
            
        -- Allow authenticated users to insert businesses
        CREATE POLICY "Authenticated users can insert businesses"
            ON public.businesses
            FOR INSERT
            WITH CHECK (auth.role() = 'authenticated');
            
        -- Allow admins to manage all businesses
        CREATE POLICY "Admins can manage all businesses"
            ON public.businesses
            USING (
                auth.role() = 'authenticated' AND 
                EXISTS (
                    SELECT 1 FROM profiles 
                    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
                )
            );
    END IF;
END;
$$ LANGUAGE plpgsql;
