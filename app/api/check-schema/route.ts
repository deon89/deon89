import { NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseServer()

    // Query to get table information
    const { data, error } = await supabase.rpc("get_schema_info", {
      table_name: "businesses",
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If the RPC function doesn't exist, try a direct query
    if (!data) {
      // Alternative approach: query the information_schema
      const { data: schemaData, error: schemaError } = await supabase
        .from("information_schema.columns")
        .select("column_name, data_type")
        .eq("table_name", "businesses")

      if (schemaError) {
        return NextResponse.json({ error: schemaError.message }, { status: 500 })
      }

      return NextResponse.json({ columns: schemaData })
    }

    return NextResponse.json({ schema: data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch schema information" }, { status: 500 })
  }
}
