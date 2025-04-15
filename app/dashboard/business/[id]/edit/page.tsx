"use client"

import type React from "react"

import { useEffect, useState } from "react"
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
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { BusinessFormSkeleton } from "@/components/dashboard/business-form-skeleton"
import { ImageUpload } from "@/components/image-upload"

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

export default function EditBusinessPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
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
  })

  useEffect(() => {
    const checkUserAndLoadBusiness = async () => {
      const supabase = getSupabaseBrowser()
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        router.push("/auth/login")
        return
      }

      setUser(userData.user)

      // Fetch business data
      const { data: business, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", params.id)
        .eq("user_id", userData.user.id)
        .single()

      if (error || !business) {
        toast({
          title: "Error loading business",
          description: "Could not find the business or you don't have permission to edit it.",
          variant: "destructive",
        })
        router.push("/dashboard")
        return
      }

      // Set form data
      setFormData({
        name: business.name || "",
        description: business.description || "",
        category: business.category || "",
        address: business.address || "",
        phone: business.phone || "",
        website: business.website || "",
        email: business.contact_email || "",
        image_url: business.image_url || "",
      })

      // Set amenities
      setSelectedAmenities(business.amenities || [])

      setIsLoading(false)
    }

    checkUserAndLoadBusiness()
  }, [router, params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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
          updated_at: new Date().toISOString(),
          is_approved: false, // Reset approval status for review
        })
        .eq("id", params.id)
        .eq("user_id", user.id)

      if (error) throw error

      toast({
        title: "Business updated successfully!",
        description: "Your changes will be reviewed and published soon.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Error updating business",
        description: error.message || "There was a problem updating your business. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <BusinessFormSkeleton />
  }

  return (
    <div className="container py-12">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Business</h1>
        <p className="text-muted-foreground mt-1">Update your business information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide the essential details about your business</CardDescription>
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
              <p className="text-xs text-muted-foreground">
                Provide a detailed description of your business, including what makes it unique.
              </p>
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
            <CardDescription>How customers can reach your business</CardDescription>
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
            <CardDescription>Select the amenities your business offers</CardDescription>
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
            <CardDescription>Upload images of your business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ImageUpload
              onImageUploaded={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
              existingImageUrl={formData.image_url}
              businessId={params.id}
            />

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL (optional)</Label>
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
                Enter a URL for your business image or use the upload feature above.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" asChild disabled={isSaving}>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Update Business"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
