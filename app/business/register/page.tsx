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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

export default function BusinessRegister() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    address: "",
    phone: "",
    website: "",
    email: "",
    contactName: "",
    acceptTerms: false,
  })

  const [imageUrl, setImageUrl] = useState("")

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseBrowser()
        const { data } = await supabase.auth.getUser()
        setIsAuthenticated(!!data.user)
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities((prev) => [...prev, amenityId])
    } else {
      setSelectedAmenities((prev) => prev.filter((id) => id !== amenityId))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      acceptTerms: checked,
    }))
  }

  const handleLogin = () => {
    router.push("/auth/login?returnUrl=/business/register")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to register a business.",
        variant: "destructive",
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Terms and conditions",
        description: "You must accept the terms and conditions to register your business.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const supabase = getSupabaseBrowser()

      // Get current user
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        throw new Error("You must be logged in to register a business")
      }

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
            image_url: imageUrl || formData.website, // Use the uploaded image URL if available
            amenities: selectedAmenities,
            user_id: userData.user.id, // Link to user
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
    } catch (error: any) {
      console.error("Error submitting business:", error)
      toast({
        title: "Error submitting business",
        description: error.message || "There was a problem submitting your business. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        {!isAuthenticated && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Required</AlertTitle>
            <AlertDescription>
              You need to be logged in to register a business. Please{" "}
              <Button variant="link" className="p-0 h-auto text-destructive-foreground underline" onClick={handleLogin}>
                log in
              </Button>{" "}
              or{" "}
              <Link href="/auth/register" className="underline">
                create an account
              </Link>{" "}
              to continue.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Register Your Business</CardTitle>
            <CardDescription>List your business in our directory to reach more tourists visiting Ruse.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Business Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading || !isAuthenticated}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    disabled={isLoading || !isAuthenticated}
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
                    onValueChange={handleSelectChange}
                    disabled={isLoading || !isAuthenticated}
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
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isLoading || !isAuthenticated}
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
                    disabled={isLoading || !isAuthenticated}
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
                    disabled={isLoading || !isAuthenticated}
                    placeholder="https://"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading || !isAuthenticated}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    disabled={isLoading || !isAuthenticated}
                  />
                  <p className="text-xs text-muted-foreground">
                    This information is for our records only and won't be displayed publicly.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Amenities</h3>
                <p className="text-sm text-muted-foreground">Select the amenities your business offers</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                        disabled={isLoading || !isAuthenticated}
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
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Image</h3>
                <p className="text-sm text-muted-foreground">Upload an image of your business</p>
                <ImageUpload onImageUploaded={setImageUrl} existingImageUrl={imageUrl} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading || !isAuthenticated}
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I accept the{" "}
                  <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Register Business"
                  )}
                </Button>
              ) : (
                <Button type="button" className="w-full" onClick={handleLogin}>
                  Log In to Continue
                </Button>
              )}

              {!isAuthenticated && (
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline">
                    Register here
                  </Link>
                </p>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
