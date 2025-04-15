"use client"

import { useState, useEffect } from "react"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2, Eye, Star, MousePointer, Calendar } from "lucide-react"

interface BusinessAnalyticsProps {
  businessId: string
}

export function BusinessAnalytics({ businessId }: BusinessAnalyticsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [viewsData, setViewsData] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalViews: 0,
    averageRating: 0,
    reviewCount: 0,
    clickThroughs: 0,
  })

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true)
        const supabase = getSupabaseBrowser()

        // Get total views
        const { data: viewsData, error: viewsError } = await supabase
          .from("business_views")
          .select("created_at")
          .eq("business_id", businessId)
          .order("created_at", { ascending: false })

        if (viewsError) throw viewsError

        // Get reviews data
        const { data: reviewsData, error: reviewsError } = await supabase
          .from("reviews")
          .select("rating")
          .eq("business_id", businessId)
          .eq("is_approved", true)

        if (reviewsError) throw reviewsError

        // Process views data for chart
        const last30Days = Array.from({ length: 30 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return date.toISOString().split("T")[0]
        }).reverse()

        const viewsByDate = viewsData.reduce((acc: Record<string, number>, view) => {
          const date = new Date(view.created_at).toISOString().split("T")[0]
          acc[date] = (acc[date] || 0) + 1
          return acc
        }, {})

        const chartData = last30Days.map((date) => ({
          date,
          views: viewsByDate[date] || 0,
        }))

        // Calculate average rating
        const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0)
        const averageRating = reviewsData.length > 0 ? totalRating / reviewsData.length : 0

        setViewsData(chartData)
        setStats({
          totalViews: viewsData.length,
          averageRating: Number.parseFloat(averageRating.toFixed(1)),
          reviewCount: reviewsData.length,
          clickThroughs: Math.floor(viewsData.length * 0.4), // Simulated data
        })
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (businessId) {
      fetchAnalytics()
    }
  }, [businessId])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Analytics</CardTitle>
        <CardDescription>Performance metrics for your business listing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{stats.totalViews}</p>
                </div>
                <Eye className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold">{stats.averageRating} / 5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500 opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Review Count</p>
                  <p className="text-2xl font-bold">{stats.reviewCount}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Click-throughs</p>
                  <p className="text-2xl font-bold">{stats.clickThroughs}</p>
                </div>
                <MousePointer className="h-8 w-8 text-primary opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="views">
          <TabsList className="mb-4">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="views" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value)
                    return `${date.getDate()}/${date.getMonth() + 1}`
                  }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} views`, "Views"]}
                  labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
                />
                <Bar dataKey="views" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="engagement" className="h-[300px]">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Detailed engagement metrics coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
