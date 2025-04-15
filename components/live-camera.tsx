import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LiveCamera() {
  return (
    <section className="container py-12 md:py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Live from Ruse</h2>
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Danube Bridge Live Camera</CardTitle>
            <CardDescription>Check the current traffic situation at the border crossing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src="/placeholder.svg?height=720&width=1280&query=Danube+Bridge+connecting+Romania+and+Bulgaria+with+traffic"
                alt="Live camera from Danube Bridge"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                </span>
                LIVE
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              This camera updates every 5 minutes. Last update: {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
