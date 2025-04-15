import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if the route is an admin route
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !req.nextUrl.pathname.startsWith("/admin/login") &&
    !req.nextUrl.pathname.startsWith("/admin/setup") &&
    !req.nextUrl.pathname.startsWith("/admin/create-admin") &&
    !req.nextUrl.pathname.startsWith("/api/")
  ) {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If no session or no user, redirect to admin login
    if (!session?.user) {
      const redirectUrl = new URL("/admin/login", req.url)
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    // If user is not an admin, redirect to home
    if (!profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}
