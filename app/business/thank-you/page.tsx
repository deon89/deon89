import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-center font-bold">Thank You for Registering!</CardTitle>
            <CardDescription className="text-center">
              Your business listing has been submitted successfully and is now pending review. We'll notify you by email
              once it's approved and published in our directory.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-md text-sm">
              <p>
                <strong>What happens next?</strong>
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Our team will review your business listing</li>
                <li>You'll receive an email notification when your listing is approved</li>
                <li>Your business will appear in our directory once approved</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/">Return to Homepage</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/business-directory">View Business Directory</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
