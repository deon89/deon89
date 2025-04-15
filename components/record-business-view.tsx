"use client"

import { useEffect } from "react"
import { getSupabaseBrowser } from "@/lib/supabase"

interface RecordBusinessViewProps {
  businessId: string
}

export function RecordBusinessView({ businessId }: RecordBusinessViewProps) {
  useEffect(() => {
    const recordView = async () => {
      try {
        const supabase = getSupabaseBrowser()
        await supabase.from("business_views").insert([
          {
            business_id: businessId,
            user_agent: navigator.userAgent,
          },
        ])
      } catch (error) {
        console.error("Error recording view:", error)
      }
    }

    recordView()
  }, [businessId])

  return null
}
