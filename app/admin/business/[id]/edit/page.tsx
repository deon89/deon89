"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"

const categories = [
  { value: "restaurant", label: "Restaurant" },
  { value: "cafe", label: "Café" },
  { value: "bar", label: "Bar" },
  { value: "hotel", label: "Hotel" },
  { value: "shop", label: "Shop" },
  { value: "attraction", label: "Attraction" },
  { value: "service", label: "Service" },
  { value: "other", label: "Other" },
]

const amenities = [
  { id: "wifi", label: "Free Wi-Fi" },
  { id: "parking", label: "Parking Available" },
  { id: "credit_card", label: "Credit Card Accepted" },
  { id: "outdoor_seating", label: "Outdoor Seating" },
  { id: "pet_friendly", label: "Pet Friendly" },
  { id: "delivery", label: "Delivery Available" },
  { id: "takeout", label: "Takeout Available" },
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "air_conditioning", label: "Air Conditioning" },
  { id: "english_menu", label: "English Menu" },
  { id: "romanian_menu", label: "Romanian Menu" },
]

export default function AdminEditBusinessPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    phone: "",
    website: "",
    email: "",
    image_url: "",
    is_approved: false,
    is_featured: false,
  })

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        setIsLoading(true)
        const supabase = getSupabaseBrowser()

        // Fetch business data
        const { data, error } = await supabase.from("businesses").select("*").eq("id", params.id).single()

        if (error) throw error

        if (!data) {
          toast({
            title: "Business not found",
            description: "The requested business could not be found",
            variant: "destructive",
          })
          router.push("/admin")
          return
        }

        // Set form data
        setFormData({
          name: data.name || "",
          description: data.description || "",
          category: data.category || "",
          address: data.address || "",
          phone: data.phone || "",
          website: data.website || "",
          email: data.contact_email || "",
          image_url: data.image_url || "",
          is_approved: data.is_approved || false,
          is_featured: data.is_featured || false,
        })

        // Set amenities
        setSelectedAmenities(data.amenities || [])
      } catch (error) {
        console.error("Error fetching business:", error)
        toast({
          title: "Error loading business",
          description: "There was a problem loading the business data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusiness()
  }, [params.id, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities((prev) => [...prev, amenityId])
    } else {
      setSelectedAmenities((prev) => prev.filter((id) => id !== amenityId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const supabase = getSupabaseBrowser()

      // Update the business in the database
      const { error } = await supabase
        .from("businesses")
        .update({
          name: formData.name,
          description: formData.description,
          category: formData.category,
          address: formData.address,
          phone: formData.phone,
          website: formData.website,
          contact_email: formData.email,
          image_url: formData.image_url,
          amenities: selectedAmenities,
          is_approved: formData.is_approved,
          is_featured: formData.is_featured,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      toast({
        title: "Business updated successfully",
        description: "The business information has been updated",
      })

      router.push("/admin")
    } catch (error: any) {
      console.error("Error updating business:", error)
      toast({
        title: "Error updating business",
        description: error.message || "There was a problem updating the business",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Business</h1>
        <p className="text-muted-foreground mt-1">Update business information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Manage the business listing status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_approved">Approved</Label>
                <p className="text-sm text-muted-foreground">
                  When approved, the business will be visible in the directory
                </p>
              </div>
              <Switch
                id="is_approved"
                checked={formData.is_approved}
                onCheckedChange={(checked) => handleSwitchChange("is_approved", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_featured">Featured</Label>
                <p className="text-sm text-muted-foreground">
                  Featured businesses appear in prominent sections of the website
                </p>
              </div>
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Edit the essential details about this business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Business Name *</Label>
              <Input id="name" name="name" required value={formData.name} onChange={handleChange} disabled={isSaving} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                disabled={isSaving}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                required
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Edit how customers can reach this business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                id="website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                disabled={isSaving}
                placeholder="https://"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
            <CardDescription>Select the amenities this business offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                    disabled={isSaving}
                  />
                  <label
                    htmlFor={amenity.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Edit the business image</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                value={formData.image_url}
                onChange={handleChange}
                disabled={isSaving}
                placeholder="https://"
              />
              <p className="text-xs text-muted-foreground">
                Enter a URL for the business image. Image upload functionality coming soon.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild disabled={isSaving}>
            <Link href="/admin">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
