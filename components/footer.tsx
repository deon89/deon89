import Link from "next/link"
import { Facebook, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Ruse Guide</h3>
            <p className="text-sm text-muted-foreground">
              Your comprehensive guide to visiting Ruse, Bulgaria - with practical information for tourists.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/get-here" className="text-muted-foreground transition-colors hover:text-foreground">
                  How to Get Here
                </Link>
              </li>
              <li>
                <Link href="/plan-visit" className="text-muted-foreground transition-colors hover:text-foreground">
                  Plan Your Visit
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-muted-foreground transition-colors hover:text-foreground">
                  Emergency Info
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/business-directory"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Business Directory
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground transition-colors hover:text-foreground">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link href="/practical-info" className="text-muted-foreground transition-colors hover:text-foreground">
                  Practical Info
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-3">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:contact@ruseguide.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ruse Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
