import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, AmbulanceIcon as FirstAid, Shield, AlertTriangle, MapPin, Clock, ExternalLink } from "lucide-react"

export default function EmergencyPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-4 text-3xl font-bold">Emergency & Safety Information</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Essential emergency contacts and safety tips for visitors to Ruse.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <Phone className="h-8 w-8 text-red-600 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Emergency Numbers</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="font-semibold text-red-700 w-40">European Emergency Number:</span>
                <Button variant="destructive" size="sm" className="ml-2" asChild>
                  <a href="tel:112">112</a>
                </Button>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-red-700 w-40">Police:</span>
                <Button variant="destructive" size="sm" className="ml-2" asChild>
                  <a href="tel:+35982822222">+359 82 822 222</a>
                </Button>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-red-700 w-40">Ambulance:</span>
                <Button variant="destructive" size="sm" className="ml-2" asChild>
                  <a href="tel:+35982864383">+359 82 864 383</a>
                </Button>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-red-700 w-40">Fire Department:</span>
                <Button variant="destructive" size="sm" className="ml-2" asChild>
                  <a href="tel:+35982845112">+359 82 845 112</a>
                </Button>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-red-700 w-40">Tourist Police:</span>
                <Button variant="destructive" size="sm" className="ml-2" asChild>
                  <a href="tel:+35982845238">+359 82 845 238</a>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Tabs defaultValue="hospitals" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="hospitals" className="flex items-center gap-1">
            <FirstAid className="h-4 w-4" /> Hospitals & Pharmacies
          </TabsTrigger>
          <TabsTrigger value="police" className="flex items-center gap-1">
            <Shield className="h-4 w-4" /> Police Stations
          </TabsTrigger>
          <TabsTrigger value="safety" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> Safety Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hospitals">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Hospitals</CardTitle>
                <CardDescription>Medical facilities in Ruse with emergency services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Umbal Kanev</h3>
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                        <span className="text-sm">ul. "Nezavisimost" 2, Ruse</span>
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                        <a href="tel:+35982887351" className="text-sm text-primary hover:underline">
                          +359 82 887 351
                        </a>
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <ExternalLink className="h-4 w-4 mt-1 text-muted-foreground" />
                        <a
                          href="https://www.umbal.ruse.bg/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          www.umbal.ruse.bg
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The main hospital in Ruse with 24/7 emergency services and various medical departments.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Medica</h3>
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                        <span className="text-sm">ul. "Ferdinandova" 62, Ruse</span>
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                        <a href="tel:+35982830230" className="text-sm text-primary hover:underline">
                          +359 82 830 230
                        </a>
                      </div>
                      <div className="flex items-start gap-2 mb-2">
                        <ExternalLink className="h-4 w-4 mt-1 text-muted-foreground" />
                        <a
                          href="https://medicabg.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          medicabg.com
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Private hospital with emergency services and English-speaking staff.
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Important Information for Tourists</h4>
                    <ul className="text-sm space-y-1">
                      <li>• European Health Insurance Card (EHIC) is accepted in public hospitals</li>
                      <li>• Private hospitals may require upfront payment</li>
                      <li>• Travel insurance is highly recommended</li>
                      <li>• Some medical staff speak English, but a translation app might be helpful</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>24/7 Pharmacies</CardTitle>
                <CardDescription>Pharmacies that are open around the clock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Medica 3</h3>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">54 Lipnik bul., Ruse</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <a href="tel:+359882040693" className="text-sm text-primary hover:underline">
                        +359 882 040 693
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">Open 24/7</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Astra Avicena</h3>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">106 Aleksandrovska str., Ruse</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <a href="tel:+359895434509" className="text-sm text-primary hover:underline">
                        +359 895 434 509
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">Open 24/7</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Gama</h3>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">49 Borisova str., Ruse</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <a href="tel:+359894358525" className="text-sm text-primary hover:underline">
                        +359 894 358 525
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">Open 24/7</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Pharmacy</h3>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">100 Bulgaria bul., Ruse</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">Open 24/7</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    View All Pharmacies on Map <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="police">
          <Card>
            <CardHeader>
              <CardTitle>Police Stations</CardTitle>
              <CardDescription>Law enforcement locations in Ruse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Regional Police Department</h3>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">ul. "Borisova" 12, Ruse</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <a href="tel:+35982822222" className="text-sm text-primary hover:underline">
                        +359 82 822 222
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">Main police headquarters in Ruse with 24/7 service.</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Tourist Police Office</h3>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span className="text-sm">ul. "Aleksandrovska" 61, Ruse</span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <Phone className="h-4 w-4 mt-1 text-muted-foreground" />
                      <a href="tel:+35982845238" className="text-sm text-primary hover:underline">
                        +359 82 845 238
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Specialized police service for tourists with English-speaking officers.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-md">
                  <h4 className="font-medium mb-2">In Case of Emergency</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Call 112 for immediate assistance</li>
                    <li>• Ask for an English-speaking operator if needed</li>
                    <li>• Provide your exact location</li>
                    <li>• Keep a copy of your passport and travel documents</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  View Police Stations on Map <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle>Safety Tips for Visitors</CardTitle>
              <CardDescription>Important information to ensure a safe and enjoyable visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative aspect-video overflow-hidden rounded-md mb-6">
                  <Image src="/placeholder.svg?key=000wz" alt="Tourists in Ruse" fill className="object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" /> General Safety
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li>• Ruse is generally a safe city for tourists</li>
                        <li>• Be aware of your surroundings, especially in crowded areas</li>
                        <li>• Keep valuables secure and out of sight</li>
                        <li>• Use ATMs in well-lit, public areas</li>
                        <li>• Keep a copy of important documents</li>
                      </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-primary" /> Areas to Be Cautious
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li>• Avoid poorly lit areas at night</li>
                        <li>• Be cautious around the train and bus stations after dark</li>
                        <li>• Watch for pickpockets in crowded tourist areas</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <FirstAid className="h-5 w-5 text-primary" /> Health Precautions
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li>• Tap water is generally safe to drink</li>
                        <li>• Pharmacies are well-stocked with common medications</li>
                        <li>• Bring any prescription medications you need</li>
                        <li>• Use sunscreen in summer (temperatures can reach 35°C+)</li>
                        <li>• In winter, be prepared for cold weather (down to -10°C)</li>
                      </ul>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-md">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" /> Stay Connected
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li>• Save emergency numbers in your phone</li>
                        <li>• Consider purchasing a local SIM card for reliable service</li>
                        <li>• Free Wi-Fi is available in many cafés and public spaces</li>
                        <li>• Share your itinerary with someone you trust</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                  <h3 className="font-semibold text-red-800 mb-2">Emergency Contact Card</h3>
                  <p className="text-sm text-red-700 mb-2">
                    We recommend saving or printing this information to keep with you during your visit:
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Emergency: 112</li>
                    <li>• Tourist Police: +359 82 845 238</li>
                    <li>• Your country's embassy in Bulgaria</li>
                    <li>• Your hotel's address and phone number</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/practical-info">View Practical Information</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
