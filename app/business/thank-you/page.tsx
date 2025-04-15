import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Thank You for Registering!</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Your business listing has been submitted successfully and is now pending review. We'll notify you by email
          once it's approved and published in our directory.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/business-directory">View Business Directory</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
