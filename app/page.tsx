import { Hero } from "@/components/hero"
import { SectionPreviews } from "@/components/section-previews"
import { PracticalInfo } from "@/components/practical-info"
import { LiveCamera } from "@/components/live-camera"

export default function Home() {
  return (
    <div>
      <Hero />
      <SectionPreviews />
      <PracticalInfo />
      <LiveCamera />
    </div>
  )
}
