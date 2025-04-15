"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SetupDatabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    error?: string
    stack?: string
    details?: any
  } | null>(null)

  const runSetup = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/setup-sql", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to set up database")
      }

      setResult({
        success: true,
        message: "Database setup completed successfully!",
        details: data,
      })
    } catch (error: any) {
      console.error("Setup error:", error)
      setResult({
        success: false,
        message: "Database setup failed",
        error: error.message,
        stack: error.stack,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Database Setup</CardTitle>
            <CardDescription>
              This will set up all necessary database tables and create an admin user for your tourism website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!result && !isLoading && (
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  This process will create the following tables in your Supabase database:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>profiles - For user profiles and roles</li>
                    <li>businesses - For business listings</li>
                    <li>events - For events and activities</li>
                    <li>business_views - For tracking business listing views</li>
                    <li>reviews - For business reviews</li>
                  </ul>
                  <p className="mt-2">
                    It will also create an admin user with email <strong>admin@ruse-tourism.com</strong> and password{" "}
                    <strong>Admin123!</strong>
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {result && (
              <div className="space-y-4">
                <Alert variant={result.success ? "default" : "destructive"}>
                  {result.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>{result.message}</AlertDescription>
                  {result.error && (
                    <div className="mt-2 p-2 bg-destructive/10 rounded text-sm font-mono overflow-auto">
                      <p>{result.error}</p>
                      {result.stack && <p className="mt-2 text-xs opacity-70">{result.stack}</p>}
                    </div>
                  )}
                </Alert>

                {result.success && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Admin Account Created</AlertTitle>
                    <AlertDescription>
                      <p>
                        Email: <strong>admin@ruse-tourism.com</strong>
                      </p>
                      <p>
                        Password: <strong>Admin123!</strong>
                      </p>
                      <p className="mt-2">
                        You can now{" "}
                        <Link href="/admin/login" className="text-primary font-medium hover:underline">
                          log in to the admin dashboard
                        </Link>
                        .
                      </p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-center text-muted-foreground">Setting up database tables and admin user...</p>
                <p className="text-center text-sm text-muted-foreground mt-2">This may take a few moments</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isLoading && !result?.success && (
              <Button onClick={runSetup} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Setting Up...
                  </>
                ) : (
                  <>Set Up Database</>
                )}
              </Button>
            )}
            {result?.success && (
              <Button asChild className="w-full">
                <Link href="/admin/login">
                  Go to Admin Login <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
