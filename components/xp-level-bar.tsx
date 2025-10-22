"use client"

import { motion } from "framer-motion"
import type { UserProfile } from "@/lib/storage"

interface XPLevelBarProps {
  user: UserProfile
}

export function XPLevelBar({ user }: XPLevelBarProps) {
  const xpPerLevel = 500
  const currentLevelXP = (user.level - 1) * xpPerLevel
  const nextLevelXP = user.level * xpPerLevel
  const progressXP = user.xp - currentLevelXP
  const totalXPForLevel = nextLevelXP - currentLevelXP
  const progress = (progressXP / totalXPForLevel) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Level {user.level}</span>
        <span className="text-sm text-gray-600">{user.xp.toLocaleString()} XP</span>
      </div>
      <motion.div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-purple-400 to-pink-500"
        />
      </motion.div>
      <p className="text-xs text-gray-500">
        {progressXP.toLocaleString()} / {totalXPForLevel.toLocaleString()} XP to next level
      </p>
    </div>
  )
}
