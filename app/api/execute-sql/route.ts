import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { sql } = await request.json()

    if (!sql) {
      return NextResponse.json({ error: "SQL query is required" }, { status: 400 })
    }

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

    // Execute the SQL using the REST API
    const { data, error } = await supabase.rpc("exec_sql", { sql_query: sql })

    if (error) {
      // If the function doesn't exist, create it
      if (error.message.includes("function") && error.message.includes("does not exist")) {
        // Create the function
        const { error: createError } = await supabase.rpc("create_exec_sql_function", {
          function_definition: `
            CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
            RETURNS VOID AS $$
            BEGIN
              EXECUTE sql_query;
            END;
            $$ LANGUAGE plpgsql SECURITY DEFINER;
          `,
        })

        if (createError) {
          // If we can't create the function, try a direct approach
          try {
            // Try to execute the SQL directly
            await fetch(`${supabaseUrl}/rest/v1/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseServiceKey}`,
                apikey: supabaseServiceKey,
                Prefer: "return=minimal",
              },
              body: JSON.stringify({
                query: sql,
              }),
            })

            return NextResponse.json({ success: true })
          } catch (directError: any) {
            return NextResponse.json({ error: `Failed to execute SQL: ${directError.message}` }, { status: 500 })
          }
        }

        // Try again with the newly created function
        const { error: retryError } = await supabase.rpc("exec_sql", { sql_query: sql })

        if (retryError) {
          return NextResponse.json({ error: `Failed to execute SQL: ${retryError.message}` }, { status: 500 })
        }
      } else {
        return NextResponse.json({ error: `Failed to execute SQL: ${error.message}` }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("SQL execution error:", error)
    return NextResponse.json({ error: `Failed to execute SQL: ${error.message}` }, { status: 500 })
  }
}
