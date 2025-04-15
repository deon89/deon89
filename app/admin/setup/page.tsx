"use client"

import { useState } from "react"
import Link from "next/link"
import { setupDatabase } from "@/app/actions/setup-database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, UserPlus } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string }>({})

  const handleSetup = async () => {
    setIsLoading(true)
    try {
      const response = await setupDatabase()
      setResult(response)
    } catch (error) {
      console.error("Error in setup:", error)
      setResult({ success: false, message: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md">
        <Card className="mb-6">
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

        <Card>
          <CardHeader>
            <CardTitle>Create Admin User</CardTitle>
            <CardDescription>Set up an administrator account to manage the website.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              After setting up the database, create an admin user to access the admin dashboard.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/create-admin">
                <UserPlus className="h-4 w-4 mr-2" />
                Create Admin User
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
