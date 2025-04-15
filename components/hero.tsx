import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Utensils, ShoppingBag, AlertCircle } from "lucide-react"

export function Hero() {
  return (
    <div className="relative">
      {/* Hero image */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/ruse-danube-panorama.png"
          alt="Panoramic view of Ruse, Bulgaria"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      {/* Hero content */}
      <div className="container absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to Ruse
          <span className="block text-primary-foreground">The Smart Tourist Guide</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/90">
          Your comprehensive guide to exploring the beautiful city on the Danube River - just across the border from
          Romania.
        </p>
      </div>

      {/* Quick action buttons */}
      <div className="container relative -mt-16 z-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
          <Button variant="default" size="lg" className="flex items-center justify-center gap-2 h-auto py-6" asChild>
            <a href="/get-here">
              <MapPin className="h-5 w-5" />
              <span>How to Get Here</span>
            </a>
          </Button>
          <Button variant="default" size="lg" className="flex items-center justify-center gap-2 h-auto py-6" asChild>
            <a href="/plan-visit">
              <Calendar className="h-5 w-5" />
              <span>Plan Your Day</span>
            </a>
          </Button>
          <Button variant="default" size="lg" className="flex items-center justify-center gap-2 h-auto py-6" asChild>
            <a href="/food-shopping">
              <Utensils className="h-5 w-5" />
              <span>Food & Shopping</span>
            </a>
          </Button>
          <Button variant="default" size="lg" className="flex items-center justify-center gap-2 h-auto py-6" asChild>
            <a href="/emergency">
              <AlertCircle className="h-5 w-5" />
              <span>Emergency Info</span>
            </a>
          </Button>
          <Button variant="default" size="lg" className="flex items-center justify-center gap-2 h-auto py-6" asChild>
            <a href="/events">
              <ShoppingBag className="h-5 w-5" />
              <span>Events Today</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
