import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Euro, CreditCard, Phone, AlertTriangle } from "lucide-react"

export function PracticalInfo() {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-3xl font-bold">Smart Practical Info</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5 text-primary" />
                Toll & Vignette
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Danube Bridge toll: €6 / 12 BGN (one way)</li>
                <li>Bulgarian vignette: €8 / 15 BGN (weekly)</li>
                <li>Pay at border or buy online</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Currency & Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Local currency: Bulgarian Lev (BGN)</li>
                <li>Exchange rate: ~1.95 BGN = €1</li>
                <li>Cards widely accepted, ATMs available</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Emergency: 112</li>
                <li>Police: +359 82 882 222</li>
                <li>Tourist Info: +359 82 824 704</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Tips for Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Tipping: 5-10% in restaurants</li>
                <li>Cheaper fuel than in Romania</li>
                <li>Most locals understand basic English</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
