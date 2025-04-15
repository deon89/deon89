import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, Coffee, Beer, ShoppingBag, MapPin, Star, ExternalLink } from "lucide-react"

export default function FoodShoppingPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-4 text-3xl font-bold">Food & Shopping in Ruse</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Discover the best places to eat, drink, and shop in Ruse - from traditional Bulgarian cuisine to modern shopping
        centers.
      </p>

      <Tabs defaultValue="restaurants" className="mb-12">
        <TabsList className="mb-4">
          <TabsTrigger value="restaurants" className="flex items-center gap-1">
            <Utensils className="h-4 w-4" /> Restaurants
          </TabsTrigger>
          <TabsTrigger value="cafes" className="flex items-center gap-1">
            <Coffee className="h-4 w-4" /> Cafés
          </TabsTrigger>
          <TabsTrigger value="nightlife" className="flex items-center gap-1">
            <Beer className="h-4 w-4" /> Nightlife
          </TabsTrigger>
          <TabsTrigger value="shopping" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" /> Shopping
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurants">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src="/placeholder.svg?key=36k0w" alt="Leventa Restaurant" fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>Leventa Restaurant</CardTitle>
                  <CardDescription>Traditional Bulgarian cuisine in a rustic setting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-2">4.8/5 (120 reviews)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">ul. "Aleksandrovska" 73, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Known for its authentic Bulgarian dishes like kavarma, kebapche, and shopska salad. Live folk music
                    on weekends.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Signature dishes:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1">
                      <li>Sach (hot plate with meat and vegetables)</li>
                      <li>Kapama (mixed meat stew)</li>
                      <li>Homemade banitsa</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src="/riverside-dining.png" alt="Danube Restaurant" fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>Danube Restaurant</CardTitle>
                  <CardDescription>Modern cuisine with riverside views</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-sm ml-2">4.2/5 (85 reviews)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">Kei Pristanishte, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Elegant restaurant with a beautiful terrace overlooking the Danube River. Offers a mix of Bulgarian
                    and international cuisine.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Signature dishes:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1">
                      <li>Danube fish soup</li>
                      <li>Grilled sturgeon</li>
                      <li>Duck with orange sauce</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Must-Try Bulgarian Dishes</CardTitle>
                <CardDescription>Traditional foods you should taste during your visit</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="relative h-40 w-full rounded-md overflow-hidden">
                      <Image src="/shopska-salad-classic.png" alt="Shopska Salad" fill className="object-cover" />
                    </div>
                    <h3 className="font-medium">Shopska Salad</h3>
                    <p className="text-sm text-muted-foreground">
                      Fresh tomatoes, cucumbers, peppers, and onions topped with grated sirene cheese.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-40 w-full rounded-md overflow-hidden">
                      <Image src="/clay-pot-kavarma.png" alt="Kavarma" fill className="object-cover" />
                    </div>
                    <h3 className="font-medium">Kavarma</h3>
                    <p className="text-sm text-muted-foreground">
                      Slow-cooked meat stew with vegetables, served in a traditional clay pot.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-40 w-full rounded-md overflow-hidden">
                      <Image src="/cheesy-banitsa.png" alt="Banitsa" fill className="object-cover" />
                    </div>
                    <h3 className="font-medium">Banitsa</h3>
                    <p className="text-sm text-muted-foreground">
                      Layered pastry filled with a mixture of eggs and cheese, often eaten for breakfast.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/business-directory">Find More Restaurants</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cafes">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src="/cafe-outdoor-seating.png" alt="Café Central" fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>Café Central</CardTitle>
                  <CardDescription>Artisan coffee and homemade pastries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-2">4.7/5 (95 reviews)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">ul. "Aleksandrovska" 48, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Charming café in the heart of Ruse with a beautiful outdoor seating area. Known for specialty coffee
                    and delicious cakes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=Modern+cafe+with+books+and+coffee"
                    alt="Book & Coffee"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Book & Coffee</CardTitle>
                  <CardDescription>Cozy book café with a relaxing atmosphere</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-sm ml-2">4.3/5 (78 reviews)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">ul. "Borisova" 10, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    A quiet café where you can enjoy a good book with your coffee. They have a small library of books in
                    multiple languages.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Button asChild>
              <Link href="/business-directory">Find More Cafés</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="nightlife">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=Pub+with+craft+beer+selection"
                    alt="The Brewery"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>The Brewery</CardTitle>
                  <CardDescription>Craft beer pub with live music</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4" />
                    <span className="text-sm ml-2">4.4/5 (110 reviews)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">ul. "Slavyanska" 22, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Popular pub with a wide selection of Bulgarian and international craft beers. Live music on Friday
                    and Saturday nights.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=Cocktail+bar+with+modern+interior"
                    alt="Mojito Bar"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Mojito Bar</CardTitle>
                  <CardDescription>Stylish cocktail bar with river views</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm ml-2">4.6/5 (130 reviews)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">Kei Pristanishte 2, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Modern cocktail bar with a terrace overlooking the Danube. Known for creative cocktails and weekend
                    DJ sets.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Button asChild>
              <Link href="/business-directory">Find More Nightlife</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="shopping">
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=Modern+shopping+mall+interior"
                    alt="Mall Rousse"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Mall Rousse</CardTitle>
                  <CardDescription>Modern shopping center with international brands</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">bul. "Lipnik" 121, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    The largest shopping mall in Ruse with international fashion brands, a food court, cinema, and
                    children's play area.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Opening Hours:</h4>
                    <p className="text-sm text-muted-foreground">Monday-Sunday: 10:00 AM - 10:00 PM</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600&query=Traditional+market+with+fresh+produce"
                    alt="Central Market"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Central Market</CardTitle>
                  <CardDescription>Traditional market with local products</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span className="text-sm">ul. "Tsarkovna Nezavisimost" 3, Ruse</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Traditional market where locals shop for fresh produce, cheese, meat, and homemade products. Great
                    place to experience local culture.
                  </p>
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Opening Hours:</h4>
                    <p className="text-sm text-muted-foreground">Monday-Saturday: 7:00 AM - 6:00 PM</p>
                    <p className="text-sm text-muted-foreground">Sunday: 7:00 AM - 2:00 PM</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1"
                    >
                      View on Map <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Souvenirs to Buy in Ruse</CardTitle>
                <CardDescription>Traditional items to take home as memories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="relative h-40 w-full rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=400&query=Bulgarian+rose+products+cosmetics"
                        alt="Rose Products"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Rose Products</h3>
                    <p className="text-sm text-muted-foreground">
                      Bulgaria is famous for its rose oil. Look for rose water, soaps, and cosmetics.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-40 w-full rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=400&query=Traditional+Bulgarian+pottery+ceramics"
                        alt="Traditional Pottery"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Traditional Pottery</h3>
                    <p className="text-sm text-muted-foreground">
                      Handmade ceramic items with traditional Bulgarian patterns and designs.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative h-40 w-full rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=400&query=Bulgarian+wine+bottles"
                        alt="Local Wines"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Local Wines</h3>
                    <p className="text-sm text-muted-foreground">
                      Bulgaria has a long tradition of winemaking. Try local varieties like Mavrud or Melnik.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/business-directory">Find Souvenir Shops</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
