"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const categories = ["restaurant", "hotel", "cafe", "shop", "attraction", "service", "other"]

export default function BusinessRegister() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    phone: "",
    website: "",
    email: "",
    contactName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = getSupabaseBrowser()

      // Insert the business into the database
      const { data, error } = await supabase
        .from("businesses")
        .insert([
          {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            address: formData.address,
            phone: formData.phone,
            website: formData.website,
            contact_email: formData.email,
            contact_name: formData.contactName,
            is_approved: false, // Requires admin approval
          },
        ])
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Business submitted successfully!",
        description: "Your business listing will be reviewed and published soon.",
      })

      // Redirect to the thank you page
      router.push("/business/thank-you")
    } catch (error) {
      console.error("Error submitting business:", error)
      toast({
        title: "Error submitting business",
        description: "There was an error submitting your business. Please try again.",
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
            <CardTitle>Register Your Business</CardTitle>
            <CardDescription>List your business in our directory to reach more tourists visiting Ruse.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Business Name *</Label>
                <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" name="address" required value={formData.address} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (optional)</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Register Business"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
