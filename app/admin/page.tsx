"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Trash2, Edit, Eye, AlertTriangle, BarChart3, Loader2, Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminPage() {
  const [businesses, setBusinesses] = useState([])
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)
  const [businessToDelete, setBusinessToDelete] = useState<string | null>(null)
  const [siteStats, setSiteStats] = useState({
    totalBusinesses: 0,
    totalEvents: 0,
    totalViews: 0,
    totalUsers: 0,
  })

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

        // Count pending businesses
        const pendingBusinesses = businessesData?.filter((b) => !b.is_approved) || []
        setPendingCount(pendingBusinesses.length)

        // Fetch events
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("start_date", { ascending: true })

        if (eventsError) throw eventsError
        setEvents(eventsData || [])

        // Fetch site stats
        const { data: viewsData } = await supabase.from("business_views").select("id")

        const { data: usersData } = await supabase.from("profiles").select("id")

        setSiteStats({
          totalBusinesses: businessesData?.length || 0,
          totalEvents: eventsData?.length || 0,
          totalViews: viewsData?.length || 0,
          totalUsers: usersData?.length || 0,
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error fetching data",
          description: "Could not load admin dashboard data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleApprove = async (id, isApproved) => {
    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from("businesses").update({ is_approved: isApproved }).eq("id", id)

      if (error) throw error

      // Update local state
      setBusinesses(businesses.map((item) => (item.id === id ? { ...item, is_approved: isApproved } : item)))

      toast({
        title: isApproved ? "Business approved" : "Business unapproved",
        description: isApproved
          ? "The business is now visible in the directory"
          : "The business has been removed from the directory",
      })
    } catch (error) {
      console.error("Error updating business:", error)
      toast({
        title: "Error updating business",
        description: "There was a problem updating the business status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!businessToDelete) return

    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from("businesses").delete().eq("id", businessToDelete)

      if (error) throw error

      // Update local state
      setBusinesses(businesses.filter((item) => item.id !== businessToDelete))

      toast({
        title: "Business deleted",
        description: "The business has been permanently deleted",
      })

      setBusinessToDelete(null)
    } catch (error) {
      console.error("Error deleting business:", error)
      toast({
        title: "Error deleting business",
        description: "There was a problem deleting the business",
        variant: "destructive",
      })
    }
  }

  const handleFeature = async (id, isFeatured) => {
    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from("businesses").update({ is_featured: isFeatured }).eq("id", id)

      if (error) throw error

      // Update local state
      setBusinesses(businesses.map((item) => (item.id === id ? { ...item, is_featured: isFeatured } : item)))

      toast({
        title: isFeatured ? "Business featured" : "Business unfeatured",
        description: isFeatured
          ? "The business will now appear in featured sections"
          : "The business has been removed from featured sections",
      })
    } catch (error) {
      console.error("Error updating business:", error)
      toast({
        title: "Error updating business",
        description: "There was a problem updating the business status",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
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

      {/* Site Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground">Total Businesses</p>
              <p className="text-3xl font-bold">{siteStats.totalBusinesses}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground">Total Events</p>
              <p className="text-3xl font-bold">{siteStats.totalEvents}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground">Total Page Views</p>
              <p className="text-3xl font-bold">{siteStats.totalViews}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <p className="text-sm font-medium text-muted-foreground">Registered Users</p>
              <p className="text-3xl font-bold">{siteStats.totalUsers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Pending Approval {pendingCount > 0 && <Badge className="ml-1">{pendingCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="businesses">All Businesses</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-1" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Businesses Pending Approval</CardTitle>
              <CardDescription>Review and approve new business listings</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading businesses...</p>
              ) : businesses.filter((b) => !b.is_approved).length === 0 ? (
                <p>No businesses pending approval.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses
                      .filter((business) => !business.is_approved)
                      .map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell className="capitalize">{business.category}</TableCell>
                          <TableCell>{new Date(business.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{business.contact_email}</TableCell>
                          <TableCell className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleApprove(business.id, true)}>
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" /> Approve
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/business/${business.id}`}>
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setBusinessToDelete(business.id)}>
                              <Trash2 className="h-4 w-4 mr-1 text-red-500" /> Delete
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

        <TabsContent value="businesses">
          <Card>
            <CardHeader>
              <CardTitle>All Businesses</CardTitle>
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
                      <TableHead>Featured</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell className="capitalize">{business.category}</TableCell>
                        <TableCell>{business.contact_email}</TableCell>
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
                          {business.is_featured ? (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              Featured
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              Standard
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {business.is_approved ? (
                              <Button variant="outline" size="sm" onClick={() => handleApprove(business.id, false)}>
                                <XCircle className="h-4 w-4 mr-1" /> Unapprove
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" onClick={() => handleApprove(business.id, true)}>
                                <CheckCircle className="h-4 w-4 mr-1" /> Approve
                              </Button>
                            )}

                            {business.is_featured ? (
                              <Button variant="outline" size="sm" onClick={() => handleFeature(business.id, false)}>
                                <XCircle className="h-4 w-4 mr-1" /> Unfeature
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm" onClick={() => handleFeature(business.id, true)}>
                                <Star className="h-4 w-4 mr-1 text-yellow-500" /> Feature
                              </Button>
                            )}

                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/business/${business.id}/edit`}>
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Link>
                            </Button>

                            <Button variant="outline" size="sm" onClick={() => setBusinessToDelete(business.id)}>
                              <Trash2 className="h-4 w-4 mr-1 text-red-500" /> Delete
                            </Button>
                          </div>
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
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/admin/events/${event.id}`}>
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/events/${event.id}`}>
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Delete event functionality would go here
                                toast({
                                  title: "Not implemented",
                                  description: "Event deletion is not yet implemented",
                                })
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1 text-red-500" /> Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>Overview of website performance and user engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Detailed Analytics Dashboard Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  We're working on a comprehensive analytics dashboard to help you track website performance, user
                  engagement, and business metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!businessToDelete} onOpenChange={(open) => !open && setBusinessToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this business? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBusinessToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
