import { getSupabaseServer } from "@/lib/supabase"
import { BusinessDirectory } from "@/components/business-directory"

export const revalidate = 3600 // Revalidate every hour
export const dynamic = "force-dynamic" // Skip static generation for this page

export default async function BusinessDirectoryPage() {
  let businesses = []

  try {
    const supabase = getSupabaseServer()

    // Fetch businesses from Supabase
    const { data, error } = await supabase.from("businesses").select("*").order("created_at", { ascending: false })

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
      <h1 className="mb-8 text-3xl font-bold">Business Directory</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Find local businesses, restaurants, hotels, and services in Ruse.
      </p>
      <BusinessDirectory businesses={businesses} />
    </div>
  )
}
