import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Clock, ExternalLink, Car, CarTaxiFrontIcon as Taxi, ParkingSquare, Mail } from "lucide-react"

export default function InRusePage() {
  return (
    <div className="container py-12">
      <h1 className="mb-4 text-3xl font-bold">I am in Ruse</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Essential information for getting around and enjoying your time in Ruse.
      </p>

      <Tabs defaultValue="transportation" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="transportation">Public Transportation</TabsTrigger>
          <TabsTrigger value="taxi">Taxi Services</TabsTrigger>
          <TabsTrigger value="parking">Parking</TabsTrigger>
        </TabsList>

        <TabsContent value="transportation">
          <Card>
            <CardHeader>
              <CardTitle>Public Transportation in Ruse</CardTitle>
              <CardDescription>Information about buses, trolleybuses, trains, and schedules in Ruse.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-8">
                {/* Railway Station Section */}
                <div>
                  <h3 className="text-xl font-semibold">Railway Station</h3>
                  <p className="text-muted-foreground mt-2">
                    Ruse has an international railway station from which you can reach larger settlements in Bulgaria
                    and the capital of Romania, Bucharest.
                  </p>

                  <div className="relative aspect-video overflow-hidden rounded-md my-4">
                    <Image
                      src="/placeholder.svg?key=railway-station-ruse"
                      alt="Ruse Railway Station"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href="tel:+359885397727" className="text-sm text-primary hover:underline">
                      +359 885 397 727
                    </a>
                  </div>

                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <a
                      href="https://live.bdz.bg/bg/ruse/departures"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Check Train Schedule <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>

                {/* Bus Stations Section */}
                <div>
                  <h3 className="text-xl font-semibold">Bus Stations</h3>
                  <p className="text-muted-foreground mt-2">
                    There are two bus stations on the city's territory, which connect the town with the rest of the
                    country and abroad. The South bus station connects with larger cities. International trips also
                    depart from it, while the East bus station is the starting point for access to smaller towns and
                    villages in the Ruse region.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">South Bus Station (Main Station)</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        The main bus station for intercity and international buses. Luggage storage may be available.
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> 4 Tutrakan Boulevard
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <a href="tel:+35982828151" className="hover:underline">
                          +359 82 828151
                        </a>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                        <a
                          href="https://www.avtogararuse.org/EN/index.cgi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Check Schedule <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">East Bus Station</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Secondary bus station serving regional destinations and smaller towns in the Ruse region.
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> 23 Borisova Street
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <a href="tel:+35982845064" className="hover:underline">
                          +359 82 845 064
                        </a>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                        <a
                          href="http://avtogaraiztok.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Check Schedule <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Public Transport Section */}
                <div>
                  <h3 className="text-xl font-semibold">Public Transport</h3>
                  <p className="text-muted-foreground mt-2">
                    Ruse has an extensive bus and trolleybus public transport network that covers the entire city.
                  </p>

                  <div className="bg-muted/30 p-4 rounded-md mt-4">
                    <h4 className="font-medium mb-2">Bus & Trolleybus Network</h4>
                    <p className="text-sm mb-3">
                      The public transport system in Ruse includes both buses and trolleybuses, providing convenient
                      transportation throughout the city.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://www.transport-ruse.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        Transport Website <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* International Airport Section */}
                <div>
                  <h3 className="text-xl font-semibold">International Airport</h3>
                  <p className="text-muted-foreground mt-2">
                    The nearest international airport to Ruse is Otopeni Airport in the capital city of Romania -
                    Bucharest, about 80 km away. In addition to a private car, you can get to the airport also by bus
                    and taxi.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Pegasus Transport</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <a href="tel:+359877344747" className="hover:underline">
                          +359 877 344 747
                        </a>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                        <a
                          href="https://pegasusbg.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Visit Website <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">South Bus Station (International)</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <a href="tel:+35982828151" className="hover:underline">
                          +359 82 828151
                        </a>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                        <a
                          href="https://www.avtogararuse.org/EN/index.cgi"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          Check Schedule <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <a
                      href="https://www.obilet.com/en/bus-ticket/ruse-bucharest"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Book Bus Tickets to Bucharest <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxi">
          <Card>
            <CardHeader>
              <CardTitle>Taxi Services in Ruse</CardTitle>
              <CardDescription>Reliable taxi companies and fare information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image src="/placeholder.svg?key=taxi-ruse" alt="Taxi in Ruse" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Taxi Companies</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <Taxi className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Tochnite</h4>
                        <p className="text-sm text-muted-foreground">Reliable taxi service in Ruse.</p>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <Phone className="h-3 w-3" />
                          <a href="tel:+35982222" className="hover:underline">
                            +359 82 2222
                          </a>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                          <a
                            href="https://taxiruse-to4nite2222.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 text-xs"
                          >
                            Visit Website <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <Taxi className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Green Taxi</h4>
                        <p className="text-sm text-muted-foreground">Eco-friendly taxi service in Ruse.</p>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <Phone className="h-3 w-3" />
                          <a href="tel:+35982808" className="hover:underline">
                            +359 82 8080
                          </a>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                          <a
                            href="https://greentaxiruse.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 text-xs"
                          >
                            Visit Website <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border p-4 rounded-md">
                    <div className="flex items-start gap-3">
                      <Taxi className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Orion</h4>
                        <p className="text-sm text-muted-foreground">
                          Taxi service with international routes to Bucharest.
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <Phone className="h-3 w-3" />
                          <a href="tel:+35982880" className="hover:underline">
                            +359 82 8800
                          </a>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2 w-full" asChild>
                          <a
                            href="https://ruse-bucharest.com/bg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1 text-xs"
                          >
                            Visit Website <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6">Taxi Fares</h3>
                <div className="bg-muted/30 p-4 rounded-md">
                  <p className="text-sm mb-3">
                    Taxi fares in Ruse are regulated and should be displayed inside the vehicle. Always ensure the meter
                    is running.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Initial fare:</span>
                      <span>1.00 - 2.00 BGN</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Price per kilometer (day):</span>
                      <span>0.80 - 1.20 BGN</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Price per kilometer (night):</span>
                      <span>0.90 - 1.40 BGN</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Waiting time (per hour):</span>
                      <span>10.00 - 15.00 BGN</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <h4 className="font-medium text-yellow-800 mb-1">Taxi Safety Tips</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>Use official taxi companies with visible logos and phone numbers</li>
                    <li>Ensure the taxi has a working meter and the driver turns it on</li>
                    <li>Ask for a receipt at the end of your journey</li>
                    <li>Pre-arrange a taxi for early morning or late night journeys</li>
                    <li>Save taxi company phone numbers in your phone</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parking">
          <Card>
            <CardHeader>
              <CardTitle>Parking in Ruse</CardTitle>
              <CardDescription>Information about parking zones, fees, and regulations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image src="/placeholder.svg?key=parking-ruse" alt="Parking in Ruse" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Parking Zones</h3>
                <p className="text-muted-foreground">
                  Ruse has a zoned parking system in the city center, with different rates depending on the location.
                  The beginning of the parking zones is signaled with the appropriate road signs, which also provide
                  additional information about the zone.
                </p>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <ParkingSquare className="h-4 w-4" /> Paid Parking Zone
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex justify-between">
                      <span>Hours:</span>
                      <span>8:00 AM - 5:30 PM (Monday-Friday)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Standard Rate:</span>
                      <span>1.50 BGN/hour (including VAT)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Underground Parking Rate:</span>
                      <span>2.00 BGN/hour (including VAT)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Max duration:</span>
                      <span>3 hours</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-md mt-4">
                  <h4 className="font-medium mb-2">Payment Methods</h4>
                  <p className="text-sm mb-2">
                    In the territory of Ruse, when parking in short-term paid parking zones, the payment of the due fee
                    is made via:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• SMS sent to phone number 1382</li>
                    <li>• Purchasing a ticket from a parking machine</li>
                  </ul>
                  <p className="text-sm mt-2">
                    The validity of the paid fee is 1 hour, after which a new fee must be paid.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6">Underground Parking</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Arena Ruse Underground Parking</div>
                    <p className="text-sm text-muted-foreground">149 parking spaces available.</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 24/7
                      <span className="ml-2">2.00 BGN/hour</span>
                    </div>
                  </div>

                  <div className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Income Building (Ruse Theatre) Underground Parking</div>
                    <p className="text-sm text-muted-foreground">60 parking spaces available.</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 24/7
                      <span className="ml-2">2.00 BGN/hour</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6">Free Parking</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Major Atanas Uzunov Street Parking</div>
                    <p className="text-sm text-muted-foreground">
                      The largest free public parking lot with 169 spaces, located in the city center next to the
                      building of the National Revenue Agency.
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">Free Parking Eligibility</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Electric vehicles powered solely by an electric engine</li>
                      <li>
                        • Vehicles transporting and/or driven by people with disabilities who have a card confirming
                        their right to use such a parking space
                      </li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6">Bus Parking</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Khan Asparuh Street</div>
                    <p className="text-sm text-muted-foreground">
                      Bus parking lot by the National Social Security Institute building.
                    </p>
                  </div>

                  <div className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Alexander Battenberg Square</div>
                    <p className="text-sm text-muted-foreground">
                      Bus parking lot in front of the building of the Regional Historical Museum.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <h4 className="font-medium text-yellow-800 mb-1">Important Warnings</h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>
                      • In case of incorrect parking in the paid zone or exceeding the paid parking time, a wheel clamp
                      may be applied to the vehicle
                    </li>
                    <li>
                      • For information and removal of wheel clamps, call: +359 882 900 144. The fee is paid to the team
                      that arrives on-site
                    </li>
                    <li>
                      • Vehicles that are improperly stopped for parking or standing may be towed. For information in
                      case of a towed vehicle, call: +359 882 900 122
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Find Places to Eat & Shop</CardTitle>
            <CardDescription>Discover restaurants, cafés, and shopping options in Ruse.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image src="/cafe-outdoor-seating.png" alt="Café in Ruse" fill className="object-cover" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/food-shopping">Explore Food & Shopping</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Find out what's happening in Ruse during your stay.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image src="/placeholder.svg?key=events-ruse" alt="Events in Ruse" fill className="object-cover" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rent a Car</CardTitle>
          <CardDescription>Explore Ruse and its surroundings at your own pace.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image src="/placeholder.svg?key=rent-car-ruse" alt="Rent a car in Ruse" fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <div className="border p-4 rounded-md">
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Eurocontact</h4>
                  <p className="text-sm text-muted-foreground">
                    Car rental and transfers to airports in Bulgaria and Romania. Armed security of people and cargo
                    ADN. Accommodation at the University of Ruse. Selection, training, organization, and transport of
                    ship personnel for German river and sea vessels.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <Phone className="h-3 w-3" />
                    <a href="tel:+359888517328" className="hover:underline">
                      +359 888 517 328
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <Mail className="h-3 w-3" />
                    <a href="mailto:schiffspersonal@gmail.com" className="hover:underline">
                      schiffspersonal@gmail.com
                    </a>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <a
                      href="https://rentacarbg.alle.bg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-md">
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Kadi Rent</h4>
                  <p className="text-sm text-muted-foreground">
                    Kadi Rent offers its clients car rentals in the city of Ruse and the surrounding area near the town
                    of Vetovo. Traveling with a rented car under excellent rental conditions and at affordable prices to
                    make your stay in Ruse unforgettable.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    The main goal of the company is to offer one hundred percent security, comfort and assistance to its
                    clients. The prices offered include full comprehensive insurance for the car, all necessary taxes
                    and insurances, as well as unlimited kilometers traveled.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Since the company's main priority is the safety of its customers, all offered cars undergo a full
                    technical inspection before and after rental. 24/7 car reservation is provided. With unlimited
                    kilometers, you have the opportunity to use the rent-a-car service at a competitive price, and to
                    pay via a POS terminal.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <Phone className="h-3 w-3" />
                    <a href="tel:+359878592929" className="hover:underline">
                      +359 878 592 929
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <Mail className="h-3 w-3" />
                    <a href="mailto:kadirent.ruse@gmail.com" className="hover:underline">
                      kadirent.ruse@gmail.com
                    </a>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <a
                      href="https://kadirent.bg/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-md">
              <div className="flex items-start gap-3">
                <Car className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Top Rent A Car</h4>
                  <p className="text-sm text-muted-foreground">
                    Top Rent A Car is a well-established company with over 20 years of experience in providing
                    innovative mobility solutions. The company has 17 offices in key major cities in Bulgaria, including
                    all international airports in the country.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    In early 2024, Top Rent A Car opened its first location abroad - at Otopeni Airport in Bucharest,
                    Romania, taking an important step in its international development. In addition, cars are provided
                    to any point in the country, providing flexibility and convenience to customers.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    In March 2024, Top Rent A Car launched the innovative TopMobility service - a mobile application for
                    shared electric bicycles, and in early September shared electric cars were added to it.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <Phone className="h-3 w-3" />
                    <a href="tel:+359890170170" className="hover:underline">
                      +359 890 170 170
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <Phone className="h-3 w-3" />
                    <span>National phone: 0700 89 050</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <Mail className="h-3 w-3" />
                    <a href="mailto:office@toprentacar.bg" className="hover:underline">
                      office@toprentacar.bg
                    </a>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <a
                      href="https://toprentacar.bg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Visit Website <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-md">
            <h4 className="font-medium mb-2">Rental Requirements</h4>
            <ul className="space-y-1 text-sm">
              <li>Valid driver's license (international license for non-EU citizens)</li>
              <li>Credit card for deposit</li>
              <li>Minimum age: 21 years (may vary by company and car type)</li>
              <li>Passport or ID card</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/business-directory">Find More Car Rentals</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
