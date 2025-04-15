"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  Calendar,
  CheckCircle,
  XCircle,
  Star,
  Trash2,
  BarChart3,
  Loader2,
  AlertTriangle,
  Eye,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalBusinesses: 0,
    pendingBusinesses: 0,
    totalEvents: 0,
    totalUsers: 0,
    totalViews: 0,
  })
  const [businesses, setBusinesses] = useState<any[]>([])
  const [pendingBusinesses, setPendingBusinesses] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [businessToDelete, setBusinessToDelete] = useState<any>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/admin/login")
        return
      }

      // Check if user is admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError || profile?.role !== "admin") {
        toast({
          title: "Access denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        })
        router.push("/")
        return
      }

      setUser(data.user)
      await fetchData()
    }

    checkUser()
  }, [router])

  const fetchData = async () => {
    setIsLoading(true)
    const supabase = getSupabaseBrowser()

    try {
      // Fetch all businesses
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("*")
        .order("created_at", { ascending: false })

      if (!businessError && businessData) {
        setBusinesses(businessData)

        // Filter pending businesses
        const pending = businessData.filter((b) => b.status === "pending")
        setPendingBusinesses(pending)

        // Update stats
        setStats((prev) => ({
          ...prev,
          totalBusinesses: businessData.length,
          pendingBusinesses: pending.length,
        }))
      }

      // Fetch events
      try {
        const { data: eventData, error: eventError } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true })

        if (!eventError && eventData) {
          setEvents(eventData)
          setStats((prev) => ({
            ...prev,
            totalEvents: eventData.length,
          }))
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      }

      // Fetch users count
      try {
        const { count, error: usersError } = await supabase.from("profiles").select("*", { count: "exact", head: true })

        if (!usersError) {
          setStats((prev) => ({
            ...prev,
            totalUsers: count || 0,
          }))
        }
      } catch (error) {
        console.error("Error fetching users count:", error)
      }

      // Fetch total views
      try {
        const { data: viewsData, error: viewsError } = await supabase
          .from("business_views")
          .select("*", { count: "exact", head: true })

        if (!viewsError) {
          setStats((prev) => ({
            ...prev,
            totalViews: viewsData?.length || 0,
          }))
        }
      } catch (error) {
        console.error("Error fetching views:", error)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (business: any) => {
    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from("businesses").update({ status: "approved" }).eq("id", business.id)

      if (error) throw error

      toast({
        title: "Business approved",
        description: `${business.name} has been approved and is now visible on the site.`,
      })

      // Update local state
      setPendingBusinesses((prev) => prev.filter((b) => b.id !== business.id))
      setBusinesses((prev) => prev.map((b) => (b.id === business.id ? { ...b, status: "approved" } : b)))
      setStats((prev) => ({
        ...prev,
        pendingBusinesses: prev.pendingBusinesses - 1,
      }))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to approve business.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (business: any) => {
    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from("businesses").update({ status: "rejected" }).eq("id", business.id)

      if (error) throw error

      toast({
        title: "Business rejected",
        description: `${business.name} has been rejected.`,
      })

      // Update local state
      setPendingBusinesses((prev) => prev.filter((b) => b.id !== business.id))
      setBusinesses((prev) => prev.map((b) => (b.id === business.id ? { ...b, status: "rejected" } : b)))
      setStats((prev) => ({
        ...prev,
        pendingBusinesses: prev.pendingBusinesses - 1,
      }))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reject business.",
        variant: "destructive",
      })
    }
  }

  const handleFeature = async (business: any) => {
    const supabase = getSupabaseBrowser()
    const newFeaturedStatus = !business.is_featured

    try {
      const { error } = await supabase
        .from("businesses")
        .update({ is_featured: newFeaturedStatus })
        .eq("id", business.id)

      if (error) throw error

      toast({
        title: newFeaturedStatus ? "Business featured" : "Business unfeatured",
        description: `${business.name} has been ${newFeaturedStatus ? "added to" : "removed from"} featured businesses.`,
      })

      // Update local state
      setBusinesses((prev) => prev.map((b) => (b.id === business.id ? { ...b, is_featured: newFeaturedStatus } : b)))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update featured status.",
        variant: "destructive",
      })
    }
  }

  const confirmDelete = (business: any) => {
    setBusinessToDelete(business)
    setIsDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!businessToDelete) return

    const supabase = getSupabaseBrowser()

    try {
      const { error } = await supabase.from("businesses").delete().eq("id", businessToDelete.id)

      if (error) throw error

      toast({
        title: "Business deleted",
        description: `${businessToDelete.name} has been permanently deleted.`,
      })

      // Update local state
      setBusinesses((prev) => prev.filter((b) => b.id !== businessToDelete.id))
      setPendingBusinesses((prev) => prev.filter((b) => b.id !== businessToDelete.id))
      setStats((prev) => ({
        ...prev,
        totalBusinesses: prev.totalBusinesses - 1,
        pendingBusinesses: businessToDelete.status === "pending" ? prev.pendingBusinesses - 1 : prev.pendingBusinesses,
      }))
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete business.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setBusinessToDelete(null)
    }
  }

  const viewBusinessDetails = (business: any) => {
    setSelectedBusiness(business)
    setIsDetailsDialogOpen(true)
  }

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowser()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content and monitor performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
          <Button asChild>
            <Link href="/">View Website</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBusinesses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingBusinesses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={stats.pendingBusinesses > 0 ? "pending" : "businesses"} className="mt-8">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Pending Approval</span>
            {stats.pendingBusinesses > 0 && (
              <Badge variant="destructive" className="ml-1">
                {stats.pendingBusinesses}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="businesses" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>All Businesses</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Pending Approval Tab */}
        <TabsContent value="pending">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Pending Businesses</h2>
          </div>

          {pendingBusinesses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No businesses pending approval</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingBusinesses.map((business) => (
                <Card key={business.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{business.name}</CardTitle>
                        <CardDescription>{business.category}</CardDescription>
                      </div>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{business.description}</p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Submitted by:</span> {business.contact_email}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => viewBusinessDetails(business)}>
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/business/${business.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => confirmDelete(business)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleReject(business)}>
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(business)}>
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* All Businesses Tab */}
        <TabsContent value="businesses">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Businesses</h2>
            <Button asChild>
              <Link href="/admin/business/new">Add Business</Link>
            </Button>
          </div>

          {businesses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No businesses found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {businesses.map((business) => (
                <Card key={business.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {business.name}
                          {business.is_featured && <Star className="h-4 w-4 ml-2 text-yellow-500 fill-yellow-500" />}
                        </CardTitle>
                        <CardDescription>{business.category}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          business.status === "approved"
                            ? "success"
                            : business.status === "pending"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{business.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{business.view_count || 0} views</span>
                      </div>
                      <div>
                        <span className="font-medium">Added:</span> {new Date(business.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/business/${business.id}`} target="_blank">
                          View on Site
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/business/${business.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => confirmDelete(business)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                      <Button
                        size="sm"
                        variant={business.is_featured ? "outline" : "default"}
                        onClick={() => handleFeature(business)}
                      >
                        <Star className="h-4 w-4 mr-1" /> {business.is_featured ? "Unfeature" : "Feature"}
                      </Button>
                      {business.status !== "approved" && (
                        <Button size="sm" onClick={() => handleApprove(business)}>
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Events</h2>
            <Button asChild>
              <Link href="/admin/events/add">Add Event</Link>
            </Button>
          </div>

          {events.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No events found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">Location:</span> {event.location}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/events/${event.id}`} target="_blank">
                          View on Site
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/events/${event.id}/edit`}>Edit</Link>
                      </Button>
                    </div>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>Overview of your website performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Business Listings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalBusinesses}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Approved</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {businesses.filter((b) => b.status === "approved").length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Featured</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{businesses.filter((b) => b.is_featured).length}</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">User Engagement</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalViews}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Events</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.totalEvents}</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Analytics in Development</AlertTitle>
                  <AlertDescription>
                    Detailed analytics with charts and graphs will be available in a future update.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {businessToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Business Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedBusiness?.name}</DialogTitle>
            <DialogDescription>
              Submitted on {selectedBusiness && new Date(selectedBusiness.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedBusiness && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Category:</span>
                <span className="col-span-3">{selectedBusiness.category}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-medium">Description:</span>
                <div className="col-span-3">{selectedBusiness.description}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Address:</span>
                <span className="col-span-3">{selectedBusiness.address}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Phone:</span>
                <span className="col-span-3">{selectedBusiness.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Email:</span>
                <span className="col-span-3">{selectedBusiness.contact_email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Website:</span>
                <span className="col-span-3">
                  {selectedBusiness.website ? (
                    <a
                      href={selectedBusiness.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selectedBusiness.website}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-medium">Images:</span>
                <div className="col-span-3">
                  {selectedBusiness.images && selectedBusiness.images.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.images.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`${selectedBusiness.name} - image ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    "No images provided"
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="font-medium">Amenities:</span>
                <div className="col-span-3">
                  {selectedBusiness.amenities && selectedBusiness.amenities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedBusiness.amenities.map((amenity: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "No amenities listed"
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/business/${selectedBusiness?.id}/edit`}>Edit</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsDetailsDialogOpen(false)
                  confirmDelete(selectedBusiness)
                }}
              >
                Delete
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleReject(selectedBusiness)}>
                Reject
              </Button>
              <Button
                onClick={() => {
                  handleApprove(selectedBusiness)
                  setIsDetailsDialogOpen(false)
                }}
              >
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
