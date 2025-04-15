"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

export default function AdminPage() {
  const [businesses, setBusinesses] = useState([])
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const supabase = getSupabaseBrowser()

      try {
        // Fetch businesses
        const { data: businessesData, error: businessesError } = await supabase
          .from("businesses")
          .select("*")
          .order("created_at", { ascending: false })

        if (businessesError) throw businessesError
        setBusinesses(businessesData || [])

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("start_date", { ascending: true })

        if (eventsError) throw eventsError
        setEvents(eventsData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleApprove = async (id, table, isApproved) => {
    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from(table).update({ is_approved: isApproved }).eq("id", id)

      if (error) throw error

      // Refresh the data
      if (table === "businesses") {
        setBusinesses(businesses.map((item) => (item.id === id ? { ...item, is_approved: isApproved } : item)))
      }
    } catch (error) {
      console.error(`Error updating ${table}:`, error)
    }
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/admin/setup">Database Setup</Link>
          </Button>
          <Button asChild>
            <Link href="/">Back to Site</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="businesses">
        <TabsList className="mb-4">
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="businesses">
          <Card>
            <CardHeader>
              <CardTitle>Businesses</CardTitle>
              <CardDescription>Manage business listings in the directory.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading businesses...</p>
              ) : businesses.length === 0 ? (
                <p>No businesses found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell className="capitalize">{business.category}</TableCell>
                        <TableCell>{business.contact_name}</TableCell>
                        <TableCell>
                          {business.is_approved ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Approved
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {business.is_approved ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(business.id, "businesses", false)}
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Unapprove
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprove(business.id, "businesses", true)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>Manage events in the calendar.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading events...</p>
              ) : events.length === 0 ? (
                <p>No events found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          {new Date(event.start_date).toLocaleDateString()} -{" "}
                          {new Date(event.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/events/${event.id}`}>Edit</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
