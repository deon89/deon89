import { getSupabaseServer } from "@/lib/supabase"
import { BusinessCategoryFilter } from "@/components/business-category-filter"
import { BusinessGrid } from "@/components/business-grid"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour
export const dynamic = "force-dynamic" // Skip static generation for this page

export default async function BusinessDirectoryPage({
  searchParams,
}: {
  searchParams: { category?: string; amenities?: string }
}) {
  const category = searchParams.category || ""
  const amenitiesParam = searchParams.amenities || ""
  const amenities = amenitiesParam ? amenitiesParam.split(",") : []

  let businesses = []
  let categories = []

  try {
    const supabase = getSupabaseServer()

    // Fetch categories
    const { data: categoryData, error: categoryError } = await supabase
      .from("businesses")
      .select("category")
      .eq("is_approved", true)
      .order("category")

    if (!categoryError && categoryData) {
      // Get unique categories
      categories = [...new Set(categoryData.map((item) => item.category))]
    }

    // Build query for businesses
    let query = supabase
      .from("businesses")
      .select("*")
      .eq("is_approved", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })

    // Apply category filter if provided
    if (category) {
      query = query.eq("category", category)
    }

    // Apply amenities filter if provided
    if (amenities.length > 0) {
      // For each amenity, check if it's in the amenities array
      amenities.forEach((amenity) => {
        query = query.contains("amenities", [amenity])
      })
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching businesses:", error)
    } else if (data) {
      businesses = data
    }
  } catch (error) {
    console.error("Failed to fetch businesses:", error)
    // Continue with empty businesses array
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Business Directory</h1>
          <p className="text-muted-foreground mt-1">
            Find local businesses, restaurants, hotels, and services in Ruse.
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0">
          <Link href="/business/register">
            <Plus className="mr-2 h-4 w-4" /> List Your Business
          </Link>
        </Button>
      </div>

      <BusinessCategoryFilter categories={categories} selectedCategory={category} amenities={amenities} />

      <BusinessGrid businesses={businesses} />
    </div>
  )
}
