import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MapPin, Star } from "lucide-react"

interface BusinessCardProps {
  business: any
}

export function BusinessCard({ business }: BusinessCardProps) {
  // Format the date
  const formattedDate = new Date(business.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden">
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
        {!business.is_approved && (
          <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">Pending Approval</Badge>
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
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Eye className="mr-1 h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">{business.view_count || 0} views</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3 text-yellow-500" />
            <span>{business.average_rating || "No ratings"}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Added on {formattedDate}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link href={`/business/${business.id}`}>
            <Eye className="mr-1 h-4 w-4" /> View
          </Link>
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <Link href={`/dashboard/business/${business.id}/edit`}>
            <Edit className="mr-1 h-4 w-4" /> Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
