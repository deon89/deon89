import Link from "next/link"
import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Ruse Guide</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/get-here" className="text-sm font-medium transition-colors hover:text-primary">
            How to Get Here
          </Link>
          <Link href="/plan-visit" className="text-sm font-medium transition-colors hover:text-primary">
            Plan Your Visit
          </Link>
          <Link href="/food-shopping" className="text-sm font-medium transition-colors hover:text-primary">
            Food & Shopping
          </Link>
          <Link href="/emergency" className="text-sm font-medium transition-colors hover:text-primary">
            Emergency Info
          </Link>
          <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
            Events
          </Link>
          <Link href="/business-directory" className="text-sm font-medium transition-colors hover:text-primary">
            Business Directory
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
