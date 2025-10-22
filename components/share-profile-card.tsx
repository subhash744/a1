"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { UserProfile } from "@/lib/storage"
import html2canvas from "html2canvas"

interface ShareProfileCardProps {
  user: UserProfile
}

export function ShareProfileCard({ user }: ShareProfileCardProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById(`profile-card-${user.id}`)
      if (!element) return

      const canvas = await html2canvas(element, {
        backgroundColor: "#F7F5F3",
        scale: 2,
      })

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `${user.username}-profile.png`
      link.click()
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div id={`profile-card-${user.id}`} className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-sm">
        <div className="flex items-center gap-4 mb-4">
          <img src={user.avatar || "/placeholder.svg"} alt={user.displayName} className="w-16 h-16 rounded-full" />
          <div>
            <h3 className="font-bold text-lg">{user.displayName}</h3>
            <p className="text-sm text-gray-600">@{user.username}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{user.rank}</p>
            <p className="text-xs text-gray-600">Rank</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.streak}</p>
            <p className="text-xs text-gray-600">Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{user.badges.length}</p>
            <p className="text-xs text-gray-600">Badges</p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExport}
        disabled={isExporting}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50"
      >
        {isExporting ? "Exporting..." : "Export as Image"}
      </motion.button>
    </div>
  )
}
