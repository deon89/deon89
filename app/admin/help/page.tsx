"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AdminHelpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false)
  const [adminExists, setAdminExists] = useState<boolean | null>(null)

  const checkAdminExists = async () => {
    setIsCheckingAdmin(true)
    try {
      const supabase = getSupabaseBrowser()
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", "admin@ruse-tourism.com")
        .eq("role", "admin")
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          // No rows found
          setAdminExists(false)
        } else {
          throw error
        }
      } else {
        setAdminExists(true)
      }
    } catch (error: any) {
      console.error("Error checking admin:", error)
      toast({
        title: "Error",
        description: "Failed to check admin status: " + error.message,
        variant: "destructive",
      })
    } finally {
      setIsCheckingAdmin(false)
    }
  }

  const resetAdminPassword = async () => {
    setIsLoading(true)
    try {
      const supabase = getSupabaseBrowser()
      const { error } = await supabase.auth.resetPasswordForEmail("admin@ruse-tourism.com", {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      })

      if (error) throw error

      toast({
        title: "Password reset email sent",
        description: "Check the admin email inbox for instructions to reset the password.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send reset email: " + error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loginAsAdmin = () => {
    router.push("/admin/login")
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Admin Help</CardTitle>
            <CardDescription>Troubleshoot admin access issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Admin Account</AlertTitle>
              <AlertDescription>
                The default admin email is: <strong>admin@ruse-tourism.com</strong>
                <br />
                If you've already set up the admin account, you can log in with these credentials.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Check Admin Status</h3>
                <p className="text-sm text-muted-foreground mb-2">Check if the admin account exists in the database.</p>
                <Button onClick={checkAdminExists} disabled={isCheckingAdmin}>
                  {isCheckingAdmin ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
                    </>
                  ) : (
                    "Check Admin Status"
                  )}
                </Button>

                {adminExists === true && (
                  <Alert className="mt-2">
                    <AlertTitle>Admin Account Exists</AlertTitle>
                    <AlertDescription>
                      The admin account is already set up. You can log in with the admin email and password.
                    </AlertDescription>
                  </Alert>
                )}

                {adminExists === false && (
                  <Alert className="mt-2" variant="destructive">
                    <AlertTitle>Admin Account Not Found</AlertTitle>
                    <AlertDescription>
                      The admin account does not exist. Please visit{" "}
                      <a href="/api/setup-admin" className="underline">
                        /api/setup-admin
                      </a>{" "}
                      to create it.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Reset Admin Password</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  If you forgot the admin password, you can reset it here.
                </p>
                <Button onClick={resetAdminPassword} disabled={isLoading} variant="outline">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Go to Admin Login</h3>
                <p className="text-sm text-muted-foreground mb-2">Log in with your admin credentials.</p>
                <Button onClick={loginAsAdmin}>Go to Admin Login</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
