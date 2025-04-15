"use client"

import { Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmergencyButton() {
  const handleEmergencyCall = () => {
    window.location.href = "tel:112"
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="emergency-button" aria-label="Emergency">
          <Phone className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Emergency Services</DialogTitle>
          <DialogDescription>
            For immediate assistance, call the European emergency number or access quick help options below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={handleEmergencyCall} variant="destructive" className="w-full">
            Call 112 (Emergency)
          </Button>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" asChild>
              <Link href="/emergency?tab=hospitals">Nearest Hospital</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/emergency?tab=hospitals">24/7 Pharmacy</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
