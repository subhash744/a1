"use client"

import { motion } from "framer-motion"
import type { Achievement } from "@/lib/storage"

interface AchievementBadgeProps {
  achievement: Achievement
  unlocked: boolean
}

export function AchievementBadge({ achievement, unlocked }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
        unlocked ? "bg-yellow-50 border-yellow-300" : "bg-gray-100 border-gray-300 opacity-50"
      }`}
    >
      <span className="text-3xl">{achievement.icon}</span>
      <h4 className="font-semibold text-sm text-center">{achievement.name}</h4>
      <p className="text-xs text-gray-600 text-center">{achievement.description}</p>
    </motion.div>
  )
}
