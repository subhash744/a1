"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MapPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the explore page since we're replacing the map with search/discovery
    router.push("/explore")
  }, [router])

  return null
}
