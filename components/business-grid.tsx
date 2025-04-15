"use client"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import { getSupabaseBrowser } from "@/lib/supabase"

interface BusinessGridProps {
  businesses: any[]
}

export function BusinessGrid({ businesses }: BusinessGridProps) {
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

  if (businesses.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h3 className="text-xl font-medium mb-2">No businesses found</h3>
          <p className="text-muted-foreground mb-6">
            No businesses match your current filters or there are no businesses listed yet.
          </p>
          <Button asChild>
            <Link href="/business/register">Register Your Business</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
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
            {business.amenities && business.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {business.amenities.slice(0, 3).map((amenity: string) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity.replace("_", " ")}
                  </Badge>
                ))}
                {business.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{business.amenities.length - 3} more
                  </Badge>
                )}
              </div>
            )}
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
  )
}
