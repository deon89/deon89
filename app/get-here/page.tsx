import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink, Car, Bus, Train } from "lucide-react"

export default function GetHerePage() {
  return (
    <div className="container py-12">
      <h1 className="mb-4 text-3xl font-bold">How to Get to Ruse</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Ruse is easily accessible from Romania and other parts of Bulgaria. Here's everything you need to know about
        getting here.
      </p>

      <Tabs defaultValue="car" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="car" className="flex items-center gap-1">
            <Car className="h-4 w-4" /> By Car
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center gap-1">
            <Bus className="h-4 w-4" /> By Bus
          </TabsTrigger>
          <TabsTrigger value="train" className="flex items-center gap-1">
            <Train className="h-4 w-4" /> By Train
          </TabsTrigger>
        </TabsList>

        <TabsContent value="car">
          <Card>
            <CardHeader>
              <CardTitle>Driving to Ruse from Bucharest</CardTitle>
              <CardDescription>
                The most convenient way to travel between Bucharest and Ruse is by car, taking approximately 1.5 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src="/bucharest-ruse-route.png"
                  alt="Map showing route from Bucharest to Ruse"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Route Instructions</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Take the DN5 / E70 / E85 from Bucharest towards Giurgiu (67 km)</li>
                  <li>Cross the Danube Bridge (Friendship Bridge) at the Giurgiu-Ruse border crossing</li>
                  <li>Continue on E85 into Ruse city center</li>
                </ol>

                <h3 className="text-xl font-semibold mt-6">Danube Bridge Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Toll fee:</strong> €6 / 12 BGN (one way) for cars
                  </li>
                  <li>
                    <strong>Payment:</strong> Cash only (EUR or BGN) at the toll booth on the Bulgarian side
                  </li>
                  <li>
                    <strong>Border control:</strong> Have your passport or ID card ready
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">Bulgarian Vignette</h3>
                <p>
                  You need to purchase a vignette (road tax) to drive on Bulgarian roads. You can buy it at the border,
                  gas stations, or online.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Weekend (3-day) vignette:</strong> €6 / 12 BGN
                  </li>
                  <li>
                    <strong>Weekly vignette:</strong> €8 / 15 BGN
                  </li>
                  <li>
                    <strong>Monthly vignette:</strong> €15 / 30 BGN
                  </li>
                </ul>
                <Button variant="outline" className="mt-2" asChild>
                  <a
                    href="https://www.bgtoll.bg/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Buy Vignette Online <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>

                <h3 className="text-xl font-semibold mt-6">Parking in Ruse</h3>
                <p>
                  Ruse has both free and paid parking zones. The city center has a blue zone where parking is paid on
                  weekdays from 8:30 AM to 5:30 PM.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Blue zone rate:</strong> 1 BGN per hour
                  </li>
                  <li>
                    <strong>Payment:</strong> Via SMS or at parking meters
                  </li>
                  <li>Several free parking lots are available outside the city center</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bus">
          <Card>
            <CardHeader>
              <CardTitle>Bus Travel to Ruse</CardTitle>
              <CardDescription>
                Regular bus services connect Bucharest to Ruse with multiple departures daily.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Bus Companies & Schedules</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>FLIXBUS:</strong> Daily departures from Bucharest Nord station
                    <div className="text-sm text-muted-foreground">Journey time: approximately 2 hours</div>
                  </li>
                  <li>
                    <strong>ETAP Group:</strong> Multiple daily departures from Bucharest Filaret station
                    <div className="text-sm text-muted-foreground">Journey time: approximately 2.5 hours</div>
                  </li>
                </ul>
                <Button variant="outline" className="mt-2" asChild>
                  <a
                    href="https://www.flixbus.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Check Bus Schedules <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>

                <h3 className="text-xl font-semibold mt-6">Ruse Bus Station</h3>
                <p>
                  The main bus station in Ruse is located at ul. "Tutrakan" 13, about 1.5 km from the city center. Taxis
                  are available at the station, or you can walk to the center in about 20 minutes.
                </p>

                <h3 className="text-xl font-semibold mt-6">Border Crossing</h3>
                <p>
                  The bus will stop at the border for passport control. Make sure to have your ID card or passport
                  ready. EU citizens can travel with just their ID card.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="train">
          <Card>
            <CardHeader>
              <CardTitle>Train Travel to Ruse</CardTitle>
              <CardDescription>
                Train connections between Bucharest and Ruse are limited but can be a scenic option.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Train Schedule</h3>
                <p>
                  There is typically one direct train per day from Bucharest North Station (Gara de Nord) to Ruse. The
                  journey takes approximately 3 hours.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Departure from Bucharest:</strong> Around 12:45 PM (check current schedule)
                  </li>
                  <li>
                    <strong>Arrival in Ruse:</strong> Around 3:45 PM
                  </li>
                  <li>
                    <strong>Price:</strong> Approximately €15 one-way
                  </li>
                </ul>
                <Button variant="outline" className="mt-2" asChild>
                  <a
                    href="https://www.cfrcalatori.ro/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    Check Romanian Railways <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>

                <h3 className="text-xl font-semibold mt-6">Ruse Train Station</h3>
                <p>
                  Ruse Central Railway Station is located about 1 km from the city center. You can easily walk to the
                  center or take a taxi from the station.
                </p>

                <h3 className="text-xl font-semibold mt-6">Border Crossing</h3>
                <p>
                  The train will stop at the border for passport control. Make sure to have your ID card or passport
                  ready. EU citizens can travel with just their ID card.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">Live Border Crossing Status</h2>
        <div className="relative aspect-video overflow-hidden rounded-md">
          <Image src="/danube-bridge-traffic.png" alt="Live camera from Danube Bridge" fill className="object-cover" />
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            LIVE
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Current waiting time: Approximately 15-20 minutes. Last update: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}
