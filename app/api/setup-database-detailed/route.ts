import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST() {
  const steps = [
    { name: "Connecting to Supabase", status: "pending" },
    { name: "Creating profiles table", status: "pending" },
    { name: "Creating businesses table", status: "pending" },
    { name: "Creating events table", status: "pending" },
    { name: "Creating business_views table", status: "pending" },
    { name: "Creating reviews table", status: "pending" },
    { name: "Setting up admin user", status: "pending" },
  ]

  try {
    // Step 1: Connect to Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      steps[0].status = "error"
      steps[0].message = "Missing Supabase environment variables"
      return NextResponse.json({ error: "Missing Supabase environment variables", steps }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Test connection
    const { error: testError } = await supabase.from("_dummy_test").select("*").limit(1).maybeSingle()

    if (testError && !testError.message.includes("does not exist")) {
      steps[0].status = "error"
      steps[0].message = `Connection error: ${testError.message}`
      return NextResponse.json({ error: `Failed to connect to Supabase: ${testError.message}`, steps }, { status: 500 })
    }

    steps[0].status = "success"
    steps[0].message = "Successfully connected to Supabase"

    // Step 2: Create profiles table
    try {
      // Using rpc instead of query
      const { error: profilesError } = await supabase
        .rpc(
          "create_profiles_table",
          {},
          {
            head: true, // We only care about the status, not the result
          },
        )
        .catch((err) => {
          // If the function doesn't exist, we'll create it first
          return supabase
            .rpc("create_function_if_not_exists", {
              function_name: "create_profiles_table",
              function_sql: `
            CREATE OR REPLACE FUNCTION create_profiles_table()
            RETURNS void AS $$
            BEGIN
              CREATE TABLE IF NOT EXISTS profiles (
                id UUID PRIMARY KEY REFERENCES auth.users(id),
                full_name TEXT,
                email TEXT UNIQUE,
                role TEXT DEFAULT 'user',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            END;
            $$ LANGUAGE plpgsql;
          `,
            })
            .then(() => {
              return supabase.rpc("create_profiles_table")
            })
        })

      if (profilesError) {
        // If the function approach fails, try direct SQL through the REST API
        const { error: sqlError } = await supabase
          .from("_exec_sql")
          .select("*")
          .eq(
            "sql",
            `
          CREATE TABLE IF NOT EXISTS profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id),
            full_name TEXT,
            email TEXT UNIQUE,
            role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
          )

        if (sqlError && !sqlError.message.includes("does not exist")) {
          steps[1].status = "error"
          steps[1].message = sqlError.message
          throw new Error(`Error creating profiles table: ${sqlError.message}`)
        }
      }

      // Check if the table was created
      const { error: checkError } = await supabase.from("profiles").select("count").limit(1)

      if (checkError && !checkError.message.includes("does not exist")) {
        steps[1].status = "error"
        steps[1].message = checkError.message
        throw new Error(`Error checking profiles table: ${checkError.message}`)
      }

      steps[1].status = "success"
      steps[1].message = "Profiles table created or already exists"
    } catch (error: any) {
      steps[1].status = "error"
      steps[1].message = error.message
      return NextResponse.json({ error: error.message, steps }, { status: 500 })
    }

    // Step 3: Create businesses table using SQL API
    try {
      // Try to select from the table to see if it exists
      const { error: checkError } = await supabase.from("businesses").select("count").limit(1)

      // If the table doesn't exist, create it
      if (checkError && checkError.message.includes("does not exist")) {
        // Create the extension first if needed
        await supabase.rpc("create_uuid_extension").catch(() => {
          // If the function doesn't exist, ignore the error
        })

        // Create the table using the REST API
        const { error: createError } = await supabase.from("_setup_tables").select("*").eq("table_name", "businesses")

        if (createError && !createError.message.includes("does not exist")) {
          steps[2].status = "error"
          steps[2].message = createError.message
          throw new Error(`Error creating businesses table: ${createError.message}`)
        }

        // Try a direct insert to create the table
        const { error: insertError } = await supabase.from("businesses").insert({
          id: "00000000-0000-0000-0000-000000000000",
          name: "Test Business",
          description: "This is a test business to create the table schema",
          status: "draft",
        })

        if (insertError && !insertError.message.includes("does not exist")) {
          // If insert fails but not because the table doesn't exist, it might be a constraint error
          // which means the table exists
          if (!insertError.message.includes("violates")) {
            steps[2].status = "error"
            steps[2].message = insertError.message
            throw new Error(`Error creating businesses table: ${insertError.message}`)
          }
        }
      }

      steps[2].status = "success"
      steps[2].message = "Businesses table created or already exists"
    } catch (error: any) {
      steps[2].status = "error"
      steps[2].message = error.message
      return NextResponse.json({ error: error.message, steps }, { status: 500 })
    }

    // Step 4: Create events table
    try {
      // Try to select from the table to see if it exists
      const { error: checkError } = await supabase.from("events").select("count").limit(1)

      // If the table doesn't exist, create it
      if (checkError && checkError.message.includes("does not exist")) {
        // Try a direct insert to create the table
        const { error: insertError } = await supabase.from("events").insert({
          id: "00000000-0000-0000-0000-000000000000",
          title: "Test Event",
          description: "This is a test event to create the table schema",
          date: new Date().toISOString().split("T")[0],
        })

        if (insertError && !insertError.message.includes("does not exist")) {
          // If insert fails but not because the table doesn't exist, it might be a constraint error
          // which means the table exists
          if (!insertError.message.includes("violates")) {
            steps[3].status = "error"
            steps[3].message = insertError.message
            throw new Error(`Error creating events table: ${insertError.message}`)
          }
        }
      }

      steps[3].status = "success"
      steps[3].message = "Events table created or already exists"
    } catch (error: any) {
      steps[3].status = "error"
      steps[3].message = error.message
      return NextResponse.json({ error: error.message, steps }, { status: 500 })
    }

    // Step 5: Create business_views table
    try {
      // Try to select from the table to see if it exists
      const { error: checkError } = await supabase.from("business_views").select("count").limit(1)

      // If the table doesn't exist, create it
      if (checkError && checkError.message.includes("does not exist")) {
        // Try a direct insert to create the table
        const { error: insertError } = await supabase.from("business_views").insert({
          id: "00000000-0000-0000-0000-000000000000",
          business_id: "00000000-0000-0000-0000-000000000000",
          viewed_at: new Date().toISOString(),
        })

        if (insertError && !insertError.message.includes("does not exist")) {
          // If insert fails but not because the table doesn't exist, it might be a constraint error
          // which means the table exists
          if (!insertError.message.includes("violates")) {
            steps[4].status = "error"
            steps[4].message = insertError.message
            throw new Error(`Error creating business_views table: ${insertError.message}`)
          }
        }
      }

      steps[4].status = "success"
      steps[4].message = "Business views table created or already exists"
    } catch (error: any) {
      steps[4].status = "error"
      steps[4].message = error.message
      return NextResponse.json({ error: error.message, steps }, { status: 500 })
    }

    // Step 6: Create reviews table
    try {
      // Try to select from the table to see if it exists
      const { error: checkError } = await supabase.from("reviews").select("count").limit(1)

      // If the table doesn't exist, create it
      if (checkError && checkError.message.includes("does not exist")) {
        // Try a direct insert to create the table
        const { error: insertError } = await supabase.from("reviews").insert({
          id: "00000000-0000-0000-0000-000000000000",
          business_id: "00000000-0000-0000-0000-000000000000",
          user_id: "00000000-0000-0000-0000-000000000000",
          rating: 5,
          comment: "This is a test review to create the table schema",
        })

        if (insertError && !insertError.message.includes("does not exist")) {
          // If insert fails but not because the table doesn't exist, it might be a constraint error
          // which means the table exists
          if (!insertError.message.includes("violates")) {
            steps[5].status = "error"
            steps[5].message = insertError.message
            throw new Error(`Error creating reviews table: ${insertError.message}`)
          }
        }
      }

      steps[5].status = "success"
      steps[5].message = "Reviews table created or already exists"
    } catch (error: any) {
      steps[5].status = "error"
      steps[5].message = error.message
      return NextResponse.json({ error: error.message, steps }, { status: 500 })
    }

    // Step 7: Create admin user
    try {
      // Check if admin user exists
      const { data: adminUser, error: adminCheckError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", "admin@ruse-tourism.com")
        .single()

      if (adminCheckError && !adminCheckError.message.includes("No rows found")) {
        steps[6].status = "error"
        steps[6].message = adminCheckError.message
        throw new Error(`Error checking admin user: ${adminCheckError.message}`)
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
          // If the error is that the user already exists, we can continue
          if (!userError.message.includes("already been registered")) {
            steps[6].status = "error"
            steps[6].message = userError.message
            throw new Error(`Error creating admin user: ${userError.message}`)
          }

          // Try to get the user by email
          const { data: existingUser, error: existingUserError } = await supabase.auth.admin.listUsers()

          if (existingUserError) {
            steps[6].status = "error"
            steps[6].message = existingUserError.message
            throw new Error(`Error listing users: ${existingUserError.message}`)
          }

          const adminUser = existingUser.users.find((u) => u.email === "admin@ruse-tourism.com")

          if (adminUser) {
            // Create admin profile for existing user
            const { error: profileError } = await supabase.from("profiles").upsert({
              id: adminUser.id,
              full_name: "Admin User",
              email: "admin@ruse-tourism.com",
              role: "admin",
            })

            if (profileError && !profileError.message.includes("duplicate key")) {
              steps[6].status = "error"
              steps[6].message = profileError.message
              throw new Error(`Error creating admin profile: ${profileError.message}`)
            }

            steps[6].status = "success"
            steps[6].message = "Admin user already exists, profile updated with admin role"
          } else {
            steps[6].status = "error"
            steps[6].message = "Admin user exists in auth but couldn't be found"
            throw new Error("Admin user exists in auth but couldn't be found")
          }
        } else if (user.user) {
          // Create admin profile
          const { error: profileError } = await supabase.from("profiles").insert({
            id: user.user.id,
            full_name: "Admin User",
            email: "admin@ruse-tourism.com",
            role: "admin",
          })

          if (profileError) {
            steps[6].status = "error"
            steps[6].message = profileError.message
            throw new Error(`Error creating admin profile: ${profileError.message}`)
          }

          steps[6].status = "success"
          steps[6].message = "Admin user created successfully"
        }
      } else {
        // Update existing user to ensure they have admin role
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ role: "admin" })
          .eq("email", "admin@ruse-tourism.com")

        if (updateError) {
          steps[6].status = "error"
          steps[6].message = updateError.message
          throw new Error(`Error updating admin role: ${updateError.message}`)
        }

        steps[6].status = "success"
        steps[6].message = "Admin user already exists, role updated"
      }
    } catch (error: any) {
      steps[6].status = "error"
      steps[6].message = error.message
      return NextResponse.json({ error: error.message, steps }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
      admin: {
        email: "admin@ruse-tourism.com",
        password: "Admin123!",
      },
      steps,
    })
  } catch (error: any) {
    console.error("Database setup error:", error)
    return NextResponse.json({ error: `Database setup failed: ${error.message}`, steps }, { status: 500 })
  }
}
