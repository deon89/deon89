import { createClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Clock, Star, Building, Calendar, Users, Eye } from "lucide-react"

export const dynamic = "force-dynamic"

async function getSupabaseServer() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase environment variables")
    return null
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

async function getAdminData() {
  const supabase = await getSupabaseServer()

  if (!supabase) {
    return {
      pendingBusinesses: [],
      approvedBusinesses: [],
      events: [],
      stats: {
        totalBusinesses: 0,
        totalEvents: 0,
        totalViews: 0,
        totalUsers: 0,
      },
    }
  }

  // Get pending businesses
  const { data: pendingBusinesses, error: pendingError } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false })

  // Get approved businesses
  const { data: approvedBusinesses, error: approvedError } = await supabase
    .from("businesses")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })

  // Get events
  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true })

  // Get stats
  const { data: businessCount, error: businessCountError } = await supabase
    .from("businesses")
    .select("id", { count: "exact" })

  const { data: eventCount, error: eventCountError } = await supabase.from("events").select("id", { count: "exact" })

  const { data: viewCount, error: viewCountError } = await supabase
    .from("business_views")
    .select("id", { count: "exact" })

  const { data: userCount, error: userCountError } = await supabase.from("profiles").select("id", { count: "exact" })

  return {
    pendingBusinesses: pendingBusinesses || [],
    approvedBusinesses: approvedBusinesses || [],
    events: events || [],
    stats: {
      totalBusinesses: businessCount?.length || 0,
      totalEvents: eventCount?.length || 0,
      totalViews: viewCount?.length || 0,
      totalUsers: userCount?.length || 0,
    },
  }
}

export default async function AdminDashboardPage() {
  const { pendingBusinesses, approvedBusinesses, events, stats } = await getAdminData()

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your tourism website content and users</p>
        </div>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/admin/events/add">Add New Event</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBusinesses}</div>
            <p className="text-xs text-muted-foreground">{pendingBusinesses.length} pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">Upcoming and past events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
            <p className="text-xs text-muted-foreground">Total business listing views</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Business owners and admins</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> Pending Approval
            {pendingBusinesses.length > 0 && (
              <span className="ml-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {pendingBusinesses.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Approved Businesses
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingBusinesses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No pending businesses to approve</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingBusinesses.map((business) => (
                <Card key={business.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{business.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{business.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Category:</span> {business.category || "Not specified"}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Submitted:</span>{" "}
                      {new Date(business.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" asChild>
                        <Link href={`/admin/business/${business.id}/edit`}>Review</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedBusinesses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No approved businesses found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {approvedBusinesses.map((business) => (
                <Card key={business.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="line-clamp-1">{business.name}</CardTitle>
                      {business.is_featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="h-3 w-3 mr-1" /> Featured
                        </span>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">{business.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Category:</span> {business.category || "Not specified"}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Views:</span> {business.view_count || 0}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/business/${business.id}`}>View</Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href={`/admin/business/${business.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {events.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No events found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Location:</span> {event.location || "Not specified"}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/events/${event.id}`}>View</Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href={`/admin/events/${event.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
