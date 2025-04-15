"use client"

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Globe, ArrowLeft, Share2 } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer()

  // Fetch event details
  const { data: event, error } = await supabase.from("events").select("*").eq("id", params.id).single()

  if (error || !event) {
    notFound()
  }

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // If same day event
    if (start.toDateString() === end.toDateString()) {
      return {
        date: start.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        time: `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      }
    }

    // Multi-day event
    return {
      date: `${start.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })} - ${end.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`,
      time: `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    }
  }

  const dateInfo = formatDateRange(event.start_date, event.end_date)

  return (
    <div className="container py-12">
      <Link
        href="/events"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" /> Back to Events
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={
                event.image_url ||
                `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(event.title) || "/placeholder.svg"}+event+in+Ruse+Bulgaria`
              }
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {dateInfo.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {dateInfo.time}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
          </div>

          {event.website && (
            <div>
              <Button asChild>
                <a href={event.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Visit Event Website <Globe className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">{dateInfo.date}</p>
                    <p className="text-sm text-muted-foreground">{dateInfo.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                {event.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Website</p>
                      <a
                        href={event.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {event.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={`/world-map-continents.png?height=600&width=600&query=Map+of+${encodeURIComponent(
                    event.location,
                  )}+in+Ruse+Bulgaria`}
                  alt={`Map showing location of ${event.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <Button className="w-full mt-4" variant="outline" asChild>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.location + " Ruse Bulgaria",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1"
                >
                  View on Google Maps <Globe className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Share This Event</h2>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://ruseguide.com/events/${event.id}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out ${event.title} in Ruse, Bulgaria!`,
                    )}&url=${encodeURIComponent(`https://ruseguide.com/events/${event.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      `Event in Ruse: ${event.title}`,
                    )}&body=${encodeURIComponent(
                      `Check out this event in Ruse, Bulgaria!\n\n${event.title}\n\nDate: ${dateInfo.date}\nTime: ${
                        dateInfo.time
                      }\nLocation: ${event.location}\n\nMore info: https://ruseguide.com/events/${event.id}`,
                    )}`}
                    aria-label="Share via Email"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
