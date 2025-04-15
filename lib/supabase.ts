import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
const createBrowserClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
    // Return a mock client that won't throw errors
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () =>
          Promise.resolve({ data: null, error: new Error("Missing Supabase environment variables") }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
          }),
        }),
      }),
    } as any
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Create a singleton instance for the browser
let browserClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowser() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowser should only be called in the browser")
  }

  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Create a server client
export function getSupabaseServer() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Missing Supabase environment variables, returning mock client")

    // Return a mock client that returns empty data
    return {
      from: () => ({
        select: () => ({
          order: () => ({
            data: [],
            error: null,
          }),
        }),
      }),
    } as any
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
