import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Calendar, ExternalLink, Mail, Phone } from "lucide-react"

export default function PlanVisitPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-4 text-3xl font-bold">Plan Your Visit to Ruse</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Whether you have a few hours or a few days, here's how to make the most of your time in Ruse.
      </p>

      <Tabs defaultValue="3hours" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="3hours">3-Hour Tour</TabsTrigger>
          <TabsTrigger value="1day">1-Day Trip</TabsTrigger>
          <TabsTrigger value="weekend">Weekend Stay</TabsTrigger>
        </TabsList>

        <TabsContent value="3hours">
          <Card>
            <CardHeader>
              <CardTitle>Quick 3-Hour Tour of Ruse</CardTitle>
              <CardDescription>
                Perfect for visitors with limited time who want to see the main highlights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image src="/placeholder.svg?key=4jx8t" alt="Liberty Square in Ruse" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Suggested Itinerary</h3>
                <ol className="space-y-4">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Start at Liberty Square (Ploshtad Svoboda)</div>
                    <p className="text-sm text-muted-foreground">
                      Admire the beautiful architecture and take photos of the Monument of Liberty.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 30 minutes
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Visit the Regional Historical Museum</div>
                    <p className="text-sm text-muted-foreground">
                      Explore the history of Ruse and the region in this excellent museum.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 45 minutes
                      <MapPin className="h-3 w-3 ml-2" /> Aleksandrovska St 3
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Stroll down Aleksandrovska Street</div>
                    <p className="text-sm text-muted-foreground">
                      Walk along the main pedestrian street with beautiful 19th-century buildings.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 30 minutes
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Coffee break at a local café</div>
                    <p className="text-sm text-muted-foreground">
                      Try Bulgarian coffee and banitsa (traditional pastry) at one of the street cafés.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 30 minutes
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Visit the Danube Park</div>
                    <p className="text-sm text-muted-foreground">
                      Enjoy views of the Danube River and the Friendship Bridge connecting Bulgaria and Romania.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 45 minutes
                    </div>
                  </li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/food-shopping">Find Places to Eat</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="1day">
          <Card>
            <CardHeader>
              <CardTitle>Full Day in Ruse</CardTitle>
              <CardDescription>A comprehensive one-day itinerary to experience the best of Ruse.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image src="/placeholder.svg?key=98k24" alt="Panorama of Ruse" fill className="object-cover" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Morning</h3>
                <ol className="space-y-4">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Breakfast at a local bakery</div>
                    <p className="text-sm text-muted-foreground">
                      Start your day with banitsa and ayran (yogurt drink) at a local bakery.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 30 minutes
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Liberty Square and Main Street</div>
                    <p className="text-sm text-muted-foreground">
                      Explore the central square and walk down Aleksandrovska Street.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 1 hour
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Regional Historical Museum</div>
                    <p className="text-sm text-muted-foreground">
                      Learn about the rich history of Ruse and the region.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 1 hour
                      <MapPin className="h-3 w-3 ml-2" /> Aleksandrovska St 3
                    </div>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-6">Afternoon</h3>
                <ol className="space-y-4">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Lunch at a traditional restaurant</div>
                    <p className="text-sm text-muted-foreground">
                      Try Bulgarian specialties like shopska salad, kavarma, or kebapche.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 1.5 hours
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Pantheon of National Revival Heroes</div>
                    <p className="text-sm text-muted-foreground">
                      Visit this important monument dedicated to Bulgarian revolutionaries.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 45 minutes
                      <MapPin className="h-3 w-3 ml-2" /> Aleksandrovska St 62
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Eco Museum & Aquarium</div>
                    <p className="text-sm text-muted-foreground">
                      Discover the natural history and aquatic life of the Danube region.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 1 hour
                      <MapPin className="h-3 w-3 ml-2" /> St. Konstantin Irechek 5
                    </div>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-6">Evening</h3>
                <ol className="space-y-4">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Sunset walk in Danube Park</div>
                    <p className="text-sm text-muted-foreground">
                      Enjoy the beautiful sunset views over the Danube River.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 1 hour
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Dinner and drinks</div>
                    <p className="text-sm text-muted-foreground">
                      End your day with dinner at a riverside restaurant and try local wines or rakia.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> 2 hours
                    </div>
                  </li>
                </ol>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/food-shopping">Find Places to Eat</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="weekend">
          <Card>
            <CardHeader>
              <CardTitle>Weekend in Ruse</CardTitle>
              <CardDescription>A two-day itinerary to fully experience Ruse and its surroundings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-md">
                <Image
                  src="/placeholder.svg?key=79t9d"
                  alt="Rock-hewn Churches of Ivanovo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Day 1: Ruse City</h3>
                <p>Follow the one-day itinerary above to explore the main attractions of Ruse.</p>

                <h3 className="text-xl font-semibold mt-6">Day 2: Nearby Attractions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  On your second day, explore these amazing UNESCO sites and natural attractions near Ruse:
                </p>

                <ol className="space-y-4">
                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Rock-hewn Churches of Ivanovo (UNESCO World Heritage Site)</div>
                    <p className="text-sm text-muted-foreground">
                      Medieval churches carved into rock cliffs with remarkable frescoes.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> 20 km south of Ruse
                      <Clock className="h-3 w-3 ml-2" /> 3-4 hour visit including travel time
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Basarbovo Monastery</div>
                    <p className="text-sm text-muted-foreground">
                      The only active rock monastery in Bulgaria, carved into a cliff face.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> 10 km south of Ruse
                      <Clock className="h-3 w-3 ml-2" /> 1-2 hour visit
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Orlova Chuka Cave</div>
                    <p className="text-sm text-muted-foreground">
                      The second-longest cave in Bulgaria with impressive formations.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> 35 km southwest of Ruse
                      <Clock className="h-3 w-3 ml-2" /> 3-4 hour visit including travel time
                    </div>
                  </li>

                  <li className="border-l-2 border-primary pl-4 py-1">
                    <div className="font-medium">Rusenski Lom Nature Park</div>
                    <p className="text-sm text-muted-foreground">
                      Beautiful canyon landscapes with hiking trails and diverse wildlife.
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> 20 km southwest of Ruse
                      <Clock className="h-3 w-3 ml-2" /> Half-day or full-day visit
                    </div>
                  </li>
                </ol>

                <div className="bg-muted/30 p-4 rounded-md mt-6">
                  <h4 className="font-medium mb-2">Transportation Tip</h4>
                  <p className="text-sm">
                    For visiting these attractions, it's best to rent a car or book a guided tour. Public transportation
                    options are limited.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href="/business-directory">Find Tour Operators</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button asChild>
                <Link href="/food-shopping">Find Places to Eat</Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://whc.unesco.org/en/list/45/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  UNESCO Info <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Map</CardTitle>
            <CardDescription>Explore Ruse's main attractions and points of interest.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image src="/placeholder.svg?key=tr0p2" alt="Interactive map of Ruse" fill className="object-cover" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <a
                href="https://www.google.com/maps/place/Ruse,+Bulgaria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                Open in Google Maps <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Check what's happening during your visit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Ruse Wine Festival</h4>
                  <p className="text-sm text-muted-foreground">
                    Sample local and regional wines with food pairings and live music.
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> May 15-17, 2023
                    <MapPin className="h-3 w-3 ml-2" /> Liberty Square
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Danube Day Celebrations</h4>
                  <p className="text-sm text-muted-foreground">
                    Cultural performances, boat races, and environmental activities.
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> June 29, 2023
                    <MapPin className="h-3 w-3 ml-2" /> Danube Park
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Ruse Theatre Festival</h4>
                  <p className="text-sm text-muted-foreground">
                    International theatre performances at various venues around the city.
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> September 10-17, 2023
                    <MapPin className="h-3 w-3 ml-2" /> Multiple venues
                  </div>
                </div>
              </div>
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
          <CardTitle>Best Time to Visit</CardTitle>
          <CardDescription>Seasonal information to help you plan your trip to Ruse.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-2">Spring (April-May)</h3>
              <p className="text-sm text-muted-foreground">
                Mild temperatures and blooming gardens make this a pleasant time to visit. Fewer tourists and several
                cultural events.
              </p>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>15-25°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Crowds:</span>
                  <span>Low</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-2">Summer (June-August)</h3>
              <p className="text-sm text-muted-foreground">
                Hot and sunny with numerous festivals and outdoor events. The Danube provides a cooling effect.
              </p>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>25-35°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Crowds:</span>
                  <span>Medium</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-2">Autumn (September-October)</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful fall colors and harvest festivals. Comfortable temperatures for sightseeing.
              </p>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>15-25°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Crowds:</span>
                  <span>Low</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-md bg-muted/30">
              <h3 className="font-semibold mb-2">Winter (November-March)</h3>
              <p className="text-sm text-muted-foreground">
                Cold with occasional snow. Christmas markets and New Year celebrations are highlights.
              </p>
              <div className="mt-2 text-sm">
                <div className="flex justify-between">
                  <span>Temperature:</span>
                  <span>-5 to 10°C</span>
                </div>
                <div className="flex justify-between">
                  <span>Crowds:</span>
                  <span>Very Low</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-12 mb-6">Essential Services for Visitors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Rent a Car</CardTitle>
            <CardDescription>Explore Ruse and its surroundings at your own pace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Eurocontact</h4>
                <p className="text-sm text-muted-foreground">
                  Car rental and transfers to airports in Bulgaria and Romania.
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" /> +359 888 517 328
                  <Mail className="h-3 w-3 ml-2" /> schiffspersonal@gmail.com
                </div>
              </div>

              <div>
                <h4 className="font-medium">Kadi Rent</h4>
                <p className="text-sm text-muted-foreground">
                  Car rentals in Ruse with full comprehensive insurance and unlimited kilometers.
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" /> +359 878 592 929
                  <Clock className="h-3 w-3 ml-2" /> 24/7 service
                </div>
              </div>

              <div>
                <h4 className="font-medium">Top Rent A Car</h4>
                <p className="text-sm text-muted-foreground">
                  Well-established company with over 20 years of experience and offices throughout Bulgaria.
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" /> +359 890 170 170
                  <Phone className="h-3 w-3 ml-2" /> National: 0700 89 050
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/in-ruse">View Detailed Information</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Travel Agencies</CardTitle>
            <CardDescription>Book guided tours and excursions with local experts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Danube Tours</h4>
                <p className="text-sm text-muted-foreground">
                  Specialized in river cruises and tours along the Danube.
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 45 Borisova Street
                  <Clock className="h-3 w-3 ml-2" /> 9:00 - 17:00
                </div>
              </div>

              <div>
                <h4 className="font-medium">Bulgaria Explorer</h4>
                <p className="text-sm text-muted-foreground">Guided tours to UNESCO sites and natural attractions.</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 78 Aleksandrovska Street
                  <Clock className="h-3 w-3 ml-2" /> 10:00 - 18:00
                </div>
              </div>

              <div>
                <h4 className="font-medium">Ruse City Tours</h4>
                <p className="text-sm text-muted-foreground">Walking tours of Ruse with knowledgeable local guides.</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 15 Liberty Square
                  <Clock className="h-3 w-3 ml-2" /> 9:00 - 18:00
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/business-directory">Find More Travel Agencies</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accommodations</CardTitle>
            <CardDescription>Find the perfect place to stay during your visit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Grand Hotel Riga</h4>
                <p className="text-sm text-muted-foreground">4-star hotel with river views and luxury amenities.</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 22 Danube Boulevard
                </div>
              </div>

              <div>
                <h4 className="font-medium">Hotel Anna Palace</h4>
                <p className="text-sm text-muted-foreground">
                  Boutique hotel in a historic building in the city center.
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 34 Aleksandrovska Street
                </div>
              </div>

              <div>
                <h4 className="font-medium">Danube Apartments</h4>
                <p className="text-sm text-muted-foreground">Self-catering apartments for longer stays and families.</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> 56 Borisova Street
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/business-directory">Find More Accommodations</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
