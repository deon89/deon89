"use client"

import { useState } from "react"
import { setupDatabase } from "@/app/actions/setup-database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

// Add the import for the setupStorage function
import { setupStorage } from "@/app/actions/setup-storage"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string }>({})

  // Update the handleSetup function to also set up storage
  const handleSetup = async () => {
    setIsLoading(true)
    try {
      // Set up database
      const dbResponse = await setupDatabase()

      if (!dbResponse.success) {
        throw new Error(dbResponse.message || "Database setup failed")
      }

      // Set up storage
      const storageResponse = await setupStorage()

      if (!storageResponse.success) {
        throw new Error(storageResponse.message || "Storage setup failed")
      }

      setResult({
        success: true,
        message: "Database and storage setup completed successfully",
      })
    } catch (error) {
      console.error("Error in setup:", error)
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md">
        {/* Add a clear call-to-action at the top of the page */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h2 className="text-lg font-medium text-amber-800 mb-2">Important Setup Required</h2>
          <p className="text-amber-700">
            Before using the website features, you need to initialize the database and storage. Click the setup buttons
            below to create the necessary tables and storage buckets.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Database Setup</CardTitle>
            <CardDescription>Initialize the database tables for the Ruse Tourism Website.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              This will create the necessary tables for businesses, events, and reviews if they don't already exist.
            </p>

            {result.success === true && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">{result.message}</AlertDescription>
              </Alert>
            )}

            {result.success === false && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSetup} disabled={isLoading} className="w-full">
              {isLoading ? "Setting Up..." : "Set Up Database"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
