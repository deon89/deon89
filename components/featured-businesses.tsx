"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface FeaturedBusinessesProps {
  category?: string
  limit?: number
  title?: string
  showViewAll?: boolean
}

export function FeaturedBusinesses({
  category,
  limit = 3,
  title = "Featured Businesses",
  showViewAll = true,
}: FeaturedBusinessesProps) {
  const [businesses, setBusinesses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true)
      const supabase = getSupabaseBrowser()

      let query = supabase
        .from("businesses")
        .select("*")
        .eq("is_approved", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(limit)

      if (category) {
        query = query.eq("category", category)
      }

      const { data, error } = await query

      if (!error && data) {
        setBusinesses(data)
      } else {
        console.error("Error fetching businesses:", error)
      }

      setIsLoading(false)
    }

    fetchBusinesses()
  }, [category, limit])

  // Record view when a business card is clicked
  const recordView = async (businessId: string) => {
    try {
      const supabase = getSupabaseBrowser()
      await supabase.from("business_views").insert([
        {
          business_id: businessId,
          user_agent: navigator.userAgent,
        },
      ])
    } catch (error) {
      console.error("Error recording view:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showViewAll && (
          <Button variant="outline" asChild>
            <Link href={category ? `/business-directory?category=${category}` : "/business-directory"}>View All</Link>
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(limit)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No businesses found in this category.</p>
            <Button asChild className="mt-4">
              <Link href="/business/register">Register Your Business</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <Card key={business.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={
                    business.image_url ||
                    `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(business.name) || "/placeholder.svg"}+in+Ruse+Bulgaria`
                  }
                  alt={business.name}
                  fill
                  className="object-cover"
                />
                {business.is_featured && (
                  <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="truncate">{business.name}</span>
                  <Badge variant="outline" className="capitalize">
                    {business.category}
                  </Badge>
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  <span className="truncate">{business.address}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">{business.description}</p>
                {business.average_rating && (
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.round(business.average_rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs ml-2">
                      {business.average_rating.toFixed(1)} ({business.view_count || 0} views)
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild onClick={() => recordView(business.id)}>
                  <Link href={`/business/${business.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
