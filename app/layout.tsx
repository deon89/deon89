import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { LanguageSelector } from "@/components/language-selector"
import { EmergencyButton } from "@/components/emergency-button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ruse - The Smart Tourist Guide",
  description:
    "Your comprehensive guide to visiting Ruse, Bulgaria - with practical information for tourists from Romania and beyond.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageSelector />
        <Header />
        <main>{children}</main>
        <Footer />
        <EmergencyButton />
        <Toaster />
      </body>
    </html>
  )
}


import './globals.css'