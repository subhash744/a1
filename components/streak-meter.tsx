"use client"

import { motion } from "framer-motion"
import type { UserProfile } from "@/lib/storage"

interface StreakMeterProps {
  user: UserProfile
}

export function StreakMeter({ user }: StreakMeterProps) {
  const streakMilestones = [5, 10, 25, 50]
  const nextMilestone = streakMilestones.find((m) => m > user.streak) || 100
  const progress = (user.streak / nextMilestone) * 100

  const getBadgeColor = (streak: number) => {
    if (streak >= 25) return "from-yellow-400 to-yellow-600"
    if (streak >= 10) return "from-gray-300 to-gray-500"
    if (streak >= 5) return "from-orange-400 to-orange-600"
    return "from-gray-200 to-gray-400"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Streak</span>
        <span
          className={`text-lg font-bold bg-gradient-to-r ${getBadgeColor(user.streak)} bg-clip-text text-transparent`}
        >
          {user.streak} days
        </span>
      </div>
      <motion.div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className={`h-full bg-gradient-to-r ${getBadgeColor(user.streak)}`}
        />
      </motion.div>
      <p className="text-xs text-gray-500">Next milestone: {nextMilestone} days</p>
    </div>
  )
}
