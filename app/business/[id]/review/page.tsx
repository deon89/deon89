"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Star } from "lucide-react"

export default function ReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "You must select a rating between 1 and 5 stars.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const supabase = getSupabaseBrowser()

      // Insert the review into the database
      const { error } = await supabase.from("reviews").insert([
        {
          business_id: params.id,
          name: formData.name,
          email: formData.email,
          rating,
          comment: formData.comment,
          is_approved: false, // Requires moderation
        },
      ])

      if (error) {
        throw error
      }

      toast({
        title: "Review submitted successfully!",
        description: "Your review will be published after moderation.",
      })

      // Redirect back to the business page
      router.push(`/business/${params.id}`)
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error submitting review",
        description: "There was an error submitting your review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>Share your experience with other visitors</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
                <p className="text-xs text-muted-foreground">Your email will not be published.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Your Review *</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  required
                  value={formData.comment}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href={`/business/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
