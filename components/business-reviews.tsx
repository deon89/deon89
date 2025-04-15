"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface BusinessReviewsProps {
  businessId: string
  initialReviews: any[]
}

export function BusinessReviews({ businessId, initialReviews }: BusinessReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews)
  const [visibleReviews, setVisibleReviews] = useState(3)

  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3)
  }

  if (reviews.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
        <Card>
          <CardContent className="py-6 text-center">
            <p className="text-muted-foreground mb-4">This business has no reviews yet. Be the first to review!</p>
            <Button asChild>
              <Link href={`/business/${businessId}/review`}>Write a Review</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/business/${businessId}/review`}>Write a Review</Link>
        </Button>
      </div>
      <div className="space-y-4">
        {reviews.slice(0, visibleReviews).map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm">{review.comment}</p>
            </CardContent>
          </Card>
        ))}

        {reviews.length > visibleReviews && (
          <Button variant="outline" className="w-full" onClick={loadMoreReviews}>
            Load More Reviews
          </Button>
        )}
      </div>
    </div>
  )
}
