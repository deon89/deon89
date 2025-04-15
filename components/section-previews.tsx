import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const sections = [
  {
    title: "How to Get to Ruse",
    description: "Directions from Bucharest by car, bus, or train. Info about Danube Bridge, tolls, and parking.",
    image: "/danube-bridge-unity.png",
    link: "/get-here",
  },
  {
    title: "Plan Your Visit",
    description: "3-hour tour, 1-day trip, weekend suggestions. Interactive map of landmarks and UNESCO sites.",
    image: "/liberty-square-tourists-ruse.png",
    link: "/plan-visit",
  },
  {
    title: "Food & Shopping",
    description: "Best restaurants, traditional Bulgarian food, shopping malls, and local markets.",
    image: "/ruse-traditional-feast.png",
    link: "/food-shopping",
  },
  {
    title: "Emergency & Safety",
    description: "List of 24/7 pharmacies, hospitals, police stations, and tourist safety tips.",
    image: "/ruse-hospital-exterior.png",
    link: "/emergency",
  },
  {
    title: "Events Calendar",
    description: "What's happening today or this week. Cultural festivals, concerts, and markets.",
    image: "/placeholder.svg?height=400&width=600&query=cultural+festival+in+Ruse+Bulgaria+with+people",
    link: "/events",
  },
  {
    title: "Business Directory",
    description: "Find local businesses, restaurants, hotels, and services in Ruse.",
    image: "/placeholder.svg?height=400&width=600&query=shopping+street+in+Ruse+Bulgaria+with+stores",
    link: "/business-directory",
  },
]

export function SectionPreviews() {
  return (
    <section className="container py-12 md:py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Explore Ruse</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Card key={section.title} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={section.image || "/placeholder.svg"}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={section.link}>
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
