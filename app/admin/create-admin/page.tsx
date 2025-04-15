"use client"

import type React from "react"

import { useState } from "react"
import { createAdminUser } from "@/app/actions/create-admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function CreateAdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string }>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await createAdminUser(formData)
      setResult(response)
    } catch (error) {
      console.error("Error creating admin:", error)
      setResult({ success: false, message: "An unexpected error occurred" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Create Admin User</CardTitle>
            <CardDescription>Set up an administrator account for the Ruse Tourism Website.</CardDescription>
          </CardHeader>
          <CardContent>
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

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Admin User"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
