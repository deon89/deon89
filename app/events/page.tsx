import { getSupabaseServer } from "@/lib/supabase"
import { EventsList } from "@/components/events-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour
export const dynamic = "force-dynamic" // Skip static generation for this page

export default async function EventsPage() {
  let events = []
  let setupNeeded = false

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
      // Check if the error is because the table doesn't exist
      if (error.message.includes("does not exist")) {
        setupNeeded = true
      }
    } else if (data) {
      events = data
    }
  } catch (error) {
    console.error("Failed to fetch events:", error)
    setupNeeded = true
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Events in Ruse</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Discover what's happening in Ruse - cultural festivals, concerts, exhibitions, and more.
      </p>

      {setupNeeded ? (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Database Setup Required</AlertTitle>
          <AlertDescription>
            The events table has not been set up yet. Please visit the{" "}
            <Link href="/admin/setup" className="font-medium underline underline-offset-4">
              admin setup page
            </Link>{" "}
            to initialize the database.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="flex justify-end mb-8">
            <Button asChild>
              <Link href="/admin/events/add">Add New Event</Link>
            </Button>
          </div>

          {events.length > 0 ? (
            <EventsList events={events} />
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">There are no upcoming events at the moment.</p>
              <Button asChild>
                <Link href="/admin/events/add">Add the First Event</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
