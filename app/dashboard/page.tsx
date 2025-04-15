"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Plus, Settings, BarChart3, Loader2 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BusinessCard } from "@/components/dashboard/business-card"
import { BusinessAnalytics } from "@/components/dashboard/business-analytics"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [businesses, setBusinesses] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push("/auth/login")
        return
      }

      setUser(data.user)

      // Fetch user's businesses
      const { data: businessData, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false })

      if (!error && businessData) {
        setBusinesses(businessData)
        if (businessData.length > 0) {
          setSelectedBusinessId(businessData[0].id)
        }
      }

      setIsLoading(false)
    }

    checkUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowser()
    await supabase.auth.signOut()
    router.push("/auth/login")
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
      <DashboardHeader user={user} onSignOut={handleSignOut} />

      <Tabs defaultValue="businesses" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="businesses" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">My Businesses</span>
            <span className="sm:hidden">Businesses</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden">Stats</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Account Settings</span>
            <span className="sm:hidden">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="businesses">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Businesses</h2>
            <Button asChild>
              <Link href="/dashboard/business/new">
                <Plus className="mr-2 h-4 w-4" /> Add Business
              </Link>
            </Button>
          </div>

          {businesses.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No businesses yet</CardTitle>
                <CardDescription>
                  You haven't added any businesses to your profile yet. Add your first business to get started.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/dashboard/business/new">
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Business
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          {businesses.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No analytics available</CardTitle>
                <CardDescription>You need to add a business first to see analytics data.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href="/dashboard/business/new">Add Your First Business</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Business Analytics</h2>
                <select
                  className="border rounded p-2"
                  value={selectedBusinessId || ""}
                  onChange={(e) => setSelectedBusinessId(e.target.value)}
                >
                  {businesses.map((business) => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedBusinessId ? (
                <BusinessAnalytics businessId={selectedBusinessId} />
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">Please select a business to view analytics</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Name</h3>
                <p className="text-sm text-muted-foreground">{user?.user_metadata?.full_name || "Not provided"}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/settings/profile">Edit Profile</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/settings/password">Change Password</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
