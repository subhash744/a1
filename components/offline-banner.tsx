"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4 text-sm text-yellow-800"
    >
      Offline Mode - Local data only. Confetti and live updates disabled.
    </motion.div>
  )
}
