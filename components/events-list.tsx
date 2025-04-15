import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

type Event = {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  image_url?: string
  website?: string
}

interface EventsListProps {
  events: Event[]
}

export function EventsList({ events }: EventsListProps) {
  // Update the EventsList component to handle empty events array gracefully
  // Add this check at the beginning of the component
  if (!events || events.length === 0) {
    return null // The parent component will handle the empty state
  }

  // Group events by month
  const eventsByMonth = events.reduce(
    (acc, event) => {
      const month = new Date(event.start_date).toLocaleString("default", { month: "long", year: "numeric" })
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(event)
      return acc
    },
    {} as Record<string, Event[]>,
  )

  // If no events, show a message
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No upcoming events</h2>
        <p className="text-muted-foreground mb-6">Check back later for new events in Ruse!</p>
      </div>
    )
  }

  // Function to format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return `${start.toLocaleDateString()} · ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Multi-day event
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }

  return (
    <div className="space-y-12">
      {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
        <div key={month}>
          <h2 className="text-2xl font-bold mb-6">{month}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {monthEvents.map((event) => (
              <Card key={event.id}>
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      event.image_url ||
                      `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(event.title) || "/placeholder.svg"}+event+in+Ruse+Bulgaria`
                    }
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">{formatDateRange(event.start_date, event.end_date)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {event.website && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={event.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" /> Website
                      </a>
                    </Button>
                  )}
                  <Button asChild size="sm">
                    <Link href={`/events/${event.id}`}>Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
