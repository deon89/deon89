import { Hero } from "@/components/hero"
import { SectionPreviews } from "@/components/section-previews"
import { PracticalInfo } from "@/components/practical-info"
import { LiveCamera } from "@/components/live-camera"
import { FeaturedBusinesses } from "@/components/featured-businesses"

export default function Home() {
  return (
    <div>
      <Hero />
      <SectionPreviews />
      <div className="container py-12">
        <FeaturedBusinesses title="Popular Places to Eat" category="restaurant" />
      </div>
      <div className="container py-12">
        <FeaturedBusinesses title="Where to Stay" category="hotel" />
      </div>
      <PracticalInfo />
      <LiveCamera />
    </div>
  )
}
