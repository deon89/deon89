import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Globe } from "lucide-react"

type Business = {
  id: string
  name: string
  description: string
  category: string
  address: string
  phone: string
  website?: string
  image_url?: string
}

interface BusinessDirectoryProps {
  businesses: Business[]
}

export function BusinessDirectory({ businesses }: BusinessDirectoryProps) {
  // Group businesses by category
  const businessesByCategory = businesses.reduce(
    (acc, business) => {
      if (!acc[business.category]) {
        acc[business.category] = []
      }
      acc[business.category].push(business)
      return acc
    },
    {} as Record<string, Business[]>,
  )

  // If no businesses, show a message
  if (businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No businesses listed yet</h2>
        <p className="text-muted-foreground mb-6">Be the first to list your business in our directory!</p>
        <Button asChild>
          <Link href="/business/register">Register Your Business</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {Object.entries(businessesByCategory).map(([category, categoryBusinesses]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mb-6 capitalize">{category}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoryBusinesses.map((business) => (
              <Card key={business.id}>
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      business.image_url ||
                      `/placeholder.svg?height=400&width=600&query=${business.name}+in+Ruse+Bulgaria`
                    }
                    alt={business.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{business.name}</CardTitle>
                  <CardDescription>{business.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">{business.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{business.phone}</span>
                  </div>
                  {business.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {business.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/business/${business.id}`}>View Details</Link>
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
