import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Globe, Mail, Star, ArrowLeft } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour
export const dynamic = "force-dynamic" // Skip static generation for this page

export default async function BusinessDetailPage({ params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseServer()

    // Fetch business details
    const { data: business, error } = await supabase
      .from("businesses")
      .select("*")
      .eq("id", params.id)
      .eq("is_approved", true)
      .single()

    if (error || !business) {
      notFound()
    }

    // Fetch reviews for this business
    let reviews = []
    try {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("business_id", params.id)
        .eq("is_approved", true)
        .order("created_at", { ascending: false })

      if (data) {
        reviews = data
      }
    } catch (reviewError) {
      console.error("Error fetching reviews:", reviewError)
      // Continue with empty reviews
    }

    // Calculate average rating
    const averageRating = reviews?.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

    return (
      <div className="container py-12">
        <Link
          href="/business-directory"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Directory
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={
                  business.image_url ||
                  `/placeholder.svg?height=600&width=1200&query=${encodeURIComponent(business.name) || "/placeholder.svg"}+in+Ruse+Bulgaria`
                }
                alt={business.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">{business.name}</h1>
              <p className="text-muted-foreground capitalize mt-1">{business.category}</p>

              {reviews?.length ? (
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm ml-2">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
              ) : null}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground">{business.description}</p>
            </div>

            {reviews?.length ? (
              <div>
                <h2 className="text-xl font-semibold mb-3">Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">{business.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href={`tel:${business.phone}`} className="text-sm text-primary hover:underline">
                        {business.phone}
                      </a>
                    </div>
                  </div>

                  {business.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {business.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href={`mailto:${business.contact_email}`} className="text-sm text-primary hover:underline">
                        {business.contact_email}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={`/world-map-continents.png?height=600&width=600&query=Map+of+${encodeURIComponent(
                      business.address,
                    )}+in+Ruse+Bulgaria`}
                    alt={`Map showing location of ${business.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      business.name + " " + business.address + " Ruse Bulgaria",
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
                <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Share your experience with other visitors. Your review will be published after moderation.
                </p>
                <Button className="w-full" asChild>
                  <Link href={`/business/${params.id}/review`}>Write a Review</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading business:", error)
    notFound()
  }
}
