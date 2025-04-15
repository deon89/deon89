import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Wifi, CreditCard, Euro, Clock, Plug, Phone, Umbrella, Languages } from "lucide-react"

export default function PracticalInfoPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-4 text-3xl font-bold">Practical Information</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Essential information to help you plan and enjoy your visit to Ruse.
      </p>

      <Tabs defaultValue="money" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="money" className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" /> Money & Payments
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center gap-1">
            <Euro className="h-4 w-4" /> Transport & Tolls
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-1">
            <Phone className="h-4 w-4" /> Communication
          </TabsTrigger>
          <TabsTrigger value="essentials" className="flex items-center gap-1">
            <Umbrella className="h-4 w-4" /> Travel Essentials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="money">
          <Card>
            <CardHeader>
              <CardTitle>Currency & Payments</CardTitle>
              <CardDescription>Information about the local currency and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Bulgarian Currency</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="relative h-16 w-24 mt-1">
                        <Image
                          src="/placeholder.svg?height=200&width=300&query=Bulgarian+Lev+banknotes"
                          alt="Bulgarian Lev"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Bulgarian Lev (BGN)</p>
                        <p className="text-sm text-muted-foreground">
                          The official currency is the Bulgarian Lev (BGN), which is pegged to the Euro.
                        </p>
                        <p className="text-sm font-medium mt-1">Exchange rate: 1 EUR ≈ 1.95583 BGN</p>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Banknotes & Coins</h4>
                      <p className="text-sm text-muted-foreground">
                        Banknotes: 5, 10, 20, 50, 100 BGN
                        <br />
                        Coins: 1, 2 BGN and 1, 2, 5, 10, 20, 50 stotinki (100 stotinki = 1 BGN)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Card Payments</p>
                        <p className="text-sm text-muted-foreground">
                          Credit and debit cards (Visa, Mastercard) are widely accepted in hotels, restaurants, and
                          larger shops. Smaller establishments may only accept cash.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Euro className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Currency Exchange</p>
                        <p className="text-sm text-muted-foreground">
                          Exchange offices are available throughout the city center. Banks and ATMs also offer currency
                          exchange, often with better rates than airport exchanges.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">ATMs</p>
                        <p className="text-sm text-muted-foreground">
                          ATMs are widely available in Ruse. Inform your bank about your travel plans to avoid card
                          blocks. Some ATMs offer withdrawal in EUR or BGN.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">Tips for Travelers</h3>
                <ul className="text-sm space-y-1">
                  <li>• Always have some cash (BGN) for small purchases and in places that don't accept cards</li>
                  <li>• Avoid exchanging money at the airport or border crossing - rates are usually less favorable</li>
                  <li>• Tipping in restaurants is customary (5-10% is appreciated)</li>
                  <li>• Some places may accept Euros, but usually at an unfavorable exchange rate</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transport">
          <Card>
            <CardHeader>
              <CardTitle>Transport & Tolls</CardTitle>
              <CardDescription>Information about local transportation and road tolls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Danube Bridge Toll</h3>
                  <div className="relative aspect-video overflow-hidden rounded-md mb-4">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=Danube+Bridge+connecting+Bulgaria+and+Romania+toll+booth"
                      alt="Danube Bridge Toll"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      The Danube Bridge connecting Ruse (Bulgaria) and Giurgiu (Romania) has a toll fee that must be
                      paid when crossing.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Toll Fees (one way)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Cars: €6 / 12 BGN</li>
                        <li>• Motorcycles: €3 / 6 BGN</li>
                        <li>• Buses and trucks: €12-25 / 24-50 BGN (depending on size)</li>
                      </ul>
                      <p className="text-sm mt-2">
                        <strong>Payment:</strong> Cash only (EUR or BGN) at the toll booth on the Bulgarian side
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Bulgarian Vignette</h3>
                  <div className="relative aspect-video overflow-hidden rounded-md mb-4">
                    <Image
                      src="/placeholder.svg?height=400&width=600&query=Bulgarian+electronic+vignette+sticker"
                      alt="Bulgarian Vignette"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      To drive on Bulgarian highways and main roads, you need to purchase a vignette (road tax).
                      Bulgaria uses an electronic vignette system.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Vignette Prices for Cars</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Weekend (3-day) vignette: €6 / 12 BGN</li>
                        <li>• Weekly vignette: €8 / 15 BGN</li>
                        <li>• Monthly vignette: €15 / 30 BGN</li>
                      </ul>
                      <p className="text-sm mt-2">
                        <strong>Where to buy:</strong> Border crossings, gas stations, post offices, or online at{" "}
                        <a
                          href="https://www.bgtoll.bg/en"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          bgtoll.bg
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Local Transportation in Ruse</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h4 className="font-medium mb-2">City Buses</h4>
                    <p className="text-sm text-muted-foreground">
                      Ruse has a network of city buses covering most areas. Tickets cost 1 BGN and can be purchased from
                      the driver.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Operating hours:</strong> 5:30 AM - 11:00 PM
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Taxis</h4>
                    <p className="text-sm text-muted-foreground">
                      Taxis are affordable and readily available. Make sure the taxi has a meter and a visible price
                      list.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Starting fee:</strong> 1 BGN
                      <br />
                      <strong>Price per km:</strong> 0.80-1.00 BGN
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Walking</h4>
                    <p className="text-sm text-muted-foreground">
                      Ruse's city center is compact and pedestrian-friendly. Most attractions are within walking
                      distance of each other.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">Driving Tips</h3>
                <ul className="text-sm space-y-1">
                  <li>• Drive on the right side of the road</li>
                  <li>• Seatbelts are mandatory for all passengers</li>
                  <li>• Headlights must be on at all times, even during daylight</li>
                  <li>• Speed limits: 50 km/h in urban areas, 90 km/h on open roads, 140 km/h on highways</li>
                  <li>• Zero tolerance for drinking and driving (0.0% blood alcohol limit)</li>
                  <li>• Fuel prices are generally lower than in Western Europe and Romania</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/get-here">How to Get to Ruse</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <Card>
            <CardHeader>
              <CardTitle>Communication</CardTitle>
              <CardDescription>Information about mobile networks, internet, and languages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mobile Networks & Internet</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Mobile Networks</p>
                        <p className="text-sm text-muted-foreground">
                          The main mobile operators in Bulgaria are A1, Telenor, and Vivacom. All offer good coverage in
                          Ruse and throughout the country.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Wifi className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Wi-Fi</p>
                        <p className="text-sm text-muted-foreground">
                          Free Wi-Fi is available in most hotels, restaurants, cafés, and shopping centers. There are
                          also several free Wi-Fi hotspots in the city center and parks.
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="bg-muted/30 p-4 rounded-md mt-4">
                    <h4 className="font-medium mb-2">Tourist SIM Cards</h4>
                    <p className="text-sm text-muted-foreground">
                      If you're staying for more than a few days, consider purchasing a local prepaid SIM card:
                    </p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Available from mobile operator shops, some convenience stores, and the airport</li>
                      <li>• Prices start from around 10 BGN</li>
                      <li>• Bring your passport for registration</li>
                      <li>• EU visitors: Check if your plan includes roaming in Bulgaria</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Language</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Languages className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Bulgarian Language</p>
                        <p className="text-sm text-muted-foreground">
                          The official language is Bulgarian, which uses the Cyrillic alphabet. In tourist areas, many
                          people speak English, especially younger generations. Some older residents may speak Russian.
                        </p>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Useful Bulgarian Phrases</h4>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr>
                            <td className="py-1 font-medium">Hello</td>
                            <td>Здравейте (Zdraveyte)</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-medium">Thank you</td>
                            <td>Благодаря (Blagodarya)</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-medium">Yes / No</td>
                            <td>Да (Da) / Не (Ne)</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-medium">Please</td>
                            <td>Моля (Molya)</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-medium">Excuse me</td>
                            <td>Извинете (Izvinete)</td>
                          </tr>
                          <tr>
                            <td className="py-1 font-medium">Do you speak English?</td>
                            <td>Говорите ли английски? (Govorite li angliyski?)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> In Bulgaria, nodding means "no" and shaking your head means "yes" - the
                      opposite of most countries! However, many Bulgarians in tourist areas are aware of this difference
                      and may adjust their gestures for visitors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">Communication Tips</h3>
                <ul className="text-sm space-y-1">
                  <li>• Download offline maps and translation apps before your trip</li>
                  <li>• Save important addresses in both English and Bulgarian</li>
                  <li>• Take a business card from your hotel to show to taxi drivers</li>
                  <li>• Learn a few basic Bulgarian phrases - locals appreciate the effort</li>
                  <li>• In restaurants, many menus have English translations or pictures</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="essentials">
          <Card>
            <CardHeader>
              <CardTitle>Travel Essentials</CardTitle>
              <CardDescription>Practical information for a comfortable stay</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Weather & What to Pack</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Summer (Jun-Aug)</h4>
                        <p className="text-sm text-muted-foreground">25-35°C, hot and sunny</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Light clothing</li>
                          <li>• Sun protection</li>
                          <li>• Hat and sunglasses</li>
                          <li>• Light jacket for evenings</li>
                        </ul>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Spring/Fall</h4>
                        <p className="text-sm text-muted-foreground">15-25°C, mild and pleasant</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Light layers</li>
                          <li>• Light jacket or sweater</li>
                          <li>• Comfortable shoes</li>
                          <li>• Umbrella (spring showers)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Winter (Dec-Feb)</h4>
                        <p className="text-sm text-muted-foreground">-5 to 10°C, cold, occasional snow</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Warm coat</li>
                          <li>• Hat, gloves, scarf</li>
                          <li>• Waterproof boots</li>
                          <li>• Thermal layers</li>
                        </ul>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="font-medium mb-1">Year-round Essentials</h4>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Comfortable walking shoes</li>
                          <li>• Adapter (Type C/F plugs)</li>
                          <li>• Medications</li>
                          <li>• Travel insurance documents</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Practical Information</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Opening Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Most shops are open from 9:00 AM to 7:00 PM on weekdays and Saturdays, with shorter hours on
                          Sundays. Museums are typically open from 9:00 AM to 5:00 PM and closed on Mondays.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Plug className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Electricity</p>
                        <p className="text-sm text-muted-foreground">
                          Bulgaria uses 220-240V, 50Hz electricity with European standard Type C and Type F sockets.
                          Travelers from the US will need an adapter and possibly a converter.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Umbrella className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Drinking Water</p>
                        <p className="text-sm text-muted-foreground">
                          Tap water is generally safe to drink in Ruse. However, bottled water is widely available if
                          preferred.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">Customs & Etiquette</h3>
                <ul className="text-sm space-y-1">
                  <li>• Greetings: Handshakes are common when meeting someone</li>
                  <li>• Tipping: 5-10% in restaurants is appreciated (check if service charge is included)</li>
                  <li>• Dress code: Casual attire is fine for most places; modest dress is required for churches</li>
                  <li>• Photography: Ask permission before photographing people, especially in rural areas</li>
                  <li>• Smoking: Still common in Bulgaria, but prohibited in public buildings and some restaurants</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Public Holidays</h3>
                  <ul className="text-sm space-y-1">
                    <li>• January 1: New Year's Day</li>
                    <li>• March 3: National Day (Liberation Day)</li>
                    <li>• May 1: Labor Day</li>
                    <li>• May 6: St. George's Day / Bulgarian Army Day</li>
                    <li>• May 24: Bulgarian Education and Culture Day</li>
                    <li>• September 6: Unification Day</li>
                    <li>• September 22: Independence Day</li>
                    <li>• December 24-26: Christmas</li>
                    <li>• Orthodox Easter (dates vary)</li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Useful Resources</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Tourist Information Center: ul. "Aleksandrovska" 61, Ruse</li>
                    <li>• Emergency number: 112</li>
                    <li>• Romanian Embassy in Bulgaria: +359 2 971 2858</li>
                    <li>
                      • Bulgarian Ministry of Tourism:{" "}
                      <a
                        href="https://www.tourism.government.bg/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        tourism.government.bg
                      </a>
                    </li>
                    <li>
                      • Ruse Municipality:{" "}
                      <a
                        href="https://www.ruse-bg.eu/en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        ruse-bg.eu
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/emergency">Emergency Information</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
