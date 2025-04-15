"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, X } from "lucide-react"

const amenitiesList = [
  { id: "wifi", label: "Free Wi-Fi" },
  { id: "parking", label: "Parking Available" },
  { id: "credit_card", label: "Credit Card Accepted" },
  { id: "outdoor_seating", label: "Outdoor Seating" },
  { id: "pet_friendly", label: "Pet Friendly" },
  { id: "english_menu", label: "English Menu" },
  { id: "romanian_menu", label: "Romanian Menu" },
]

interface BusinessCategoryFilterProps {
  categories: string[]
  selectedCategory: string
  amenities: string[]
}

export function BusinessCategoryFilter({ categories, selectedCategory, amenities }: BusinessCategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(amenities)

  // Update selected amenities when props change
  useEffect(() => {
    setSelectedAmenities(amenities)
  }, [amenities])

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams()

    if (category && category !== selectedCategory) {
      params.set("category", category)
    }

    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","))
    }

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    let newSelectedAmenities: string[]

    if (checked) {
      newSelectedAmenities = [...selectedAmenities, amenityId]
    } else {
      newSelectedAmenities = selectedAmenities.filter((id) => id !== amenityId)
    }

    setSelectedAmenities(newSelectedAmenities)

    const params = new URLSearchParams()

    if (selectedCategory) {
      params.set("category", selectedCategory)
    }

    if (newSelectedAmenities.length > 0) {
      params.set("amenities", newSelectedAmenities.join(","))
    }

    const queryString = params.toString()
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`)
  }

  const clearFilters = () => {
    setSelectedAmenities([])
    router.push(pathname)
  }

  const hasActiveFilters = selectedCategory || selectedAmenities.length > 0

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={isFilterOpen ? "default" : "outline"}
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
        {selectedCategory && (
          <p className="text-sm text-muted-foreground">
            Showing results for <span className="font-medium capitalize">{selectedCategory}</span>
          </p>
        )}
      </div>

      {isFilterOpen && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={!selectedCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryClick("")}
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={category === selectedCategory ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryClick(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity.id}`}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                      />
                      <Label htmlFor={`amenity-${amenity.id}`} className="text-sm font-normal cursor-pointer">
                        {amenity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
