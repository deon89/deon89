import { getSupabaseServer } from "@/lib/supabase"
import { BusinessDirectory } from "@/components/business-directory"

export const revalidate = 3600 // Revalidate every hour

export default async function BusinessDirectoryPage() {
  const supabase = getSupabaseServer()

  // Fetch businesses from Supabase
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching businesses:", error)
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Business Directory</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Find local businesses, restaurants, hotels, and services in Ruse.
      </p>
      <BusinessDirectory businesses={businesses || []} />
    </div>
  )
}
