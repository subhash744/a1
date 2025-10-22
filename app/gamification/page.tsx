"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import { GamificationDashboard } from "@/components/gamification-dashboard"

export default function GamificationPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col">
      <Navigation />
      <GamificationDashboard />
    </div>
  )
}