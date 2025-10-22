"use client"

import { motion } from "framer-motion"

interface LevelDisplayProps {
  level: number
  xp: number
  xpToNextLevel: number
}

export function LevelDisplay({ level, xp, xpToNextLevel }: LevelDisplayProps) {
  const progressPercentage = xpToNextLevel > 0 ? Math.min(100, (xp / xpToNextLevel) * 100) : 0
  const xpToNext = xpToNextLevel - xp

  // Get level benefits
  const getLevelBenefits = (level: number): string => {
    if (level >= 20) return "Profile spotlight"
    if (level >= 15) return "Custom badge"
    if (level >= 10) return "Featured profile boost"
    if (level >= 5) return "Custom profile colors"
    return "Unlock at level 5"
  }

  const levelBenefits = getLevelBenefits(level)

  return (
    <div className="bg-white rounded-xl border border-[#E0DEDB] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#37322F]">Level {level} ⭐</h3>
        <span className="text-sm bg-[#37322F] text-white px-2 py-1 rounded-full">
          {xp} XP
        </span>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[#605A57]">Next Level</span>
          <span className="font-medium text-[#37322F]">{xpToNext} XP to go</span>
        </div>
        <div className="w-full bg-[#E0DEDB] rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-[#37322F] to-[#2a2520] h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <div className="text-sm">
        <p className="text-[#605A57] mb-2">Level Benefits:</p>
        <p className="font-medium text-[#37322F]">{levelBenefits}</p>
      </div>
      
      <div className="mt-4 text-xs text-[#605A57]">
        <p>XP Earned by:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Getting upvotes: +5 XP each</li>
          <li>Getting views: +1 XP each</li>
          <li>Adding projects: +50 XP</li>
          <li>Daily streak: +10 XP per day</li>
          <li>Badges earned: +100 XP each</li>
        </ul>
      </div>
    </div>
  )
}