import { getSupabaseServer } from "@/lib/supabase"
import { EventsList } from "@/components/events-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const revalidate = 3600 // Revalidate every hour
export const dynamic = "force-dynamic" // Skip static generation for this page

export default async function EventsPage() {
  let events = []

  try {
    const supabase = getSupabaseServer()

    // Fetch events from Supabase
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("end_date", new Date().toISOString()) // Only future events
      .order("start_date", { ascending: true })

    if (error) {
      console.error("Error fetching events:", error)
    } else if (data) {
      events = data
    }
  } catch (error) {
    console.error("Failed to fetch events:", error)
    // Continue with empty events array
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Events in Ruse</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Discover what's happening in Ruse - cultural festivals, concerts, exhibitions, and more.
      </p>

      <div className="flex justify-end mb-8">
        <Button asChild>
          <Link href="/admin/events/add">Add New Event</Link>
        </Button>
      </div>

      <EventsList events={events} />
    </div>
  )
}
