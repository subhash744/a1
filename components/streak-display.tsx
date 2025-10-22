"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { UserProfile } from "@/lib/storage"

interface StreakDisplayProps {
  user: UserProfile
  onUseFreeze?: () => void
}

export function StreakDisplay({ user, onUseFreeze }: StreakDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)

  useEffect(() => {
    // Calculate time until end of day
    const now = new Date()
    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)
    setTimeLeft(endOfDay.getTime() - now.getTime())

    const timer = setInterval(() => {
      const now = new Date()
      const endOfDay = new Date()
      endOfDay.setHours(23, 59, 59, 999)
      setTimeLeft(endOfDay.getTime() - now.getTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getFlameCount = (streak: number): number => {
    if (streak >= 30) return 4
    if (streak >= 7) return 3
    if (streak >= 3) return 2
    return 1
  }

  const getNextMilestone = (streak: number): { days: number; badge: string } | null => {
    if (streak < 3) return { days: 3 - streak, badge: "Consistent" }
    if (streak < 7) return { days: 7 - streak, badge: "Dedicated" }
    if (streak < 30) return { days: 30 - streak, badge: "Unstoppable" }
    return null
  }

  const nextMilestone = getNextMilestone(user.streak)

  return (
    <div className="bg-white rounded-xl border border-[#E0DEDB] p-6">
      <div className="flex flex-col items-center">
        {/* Streak header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">
            {Array(getFlameCount(user.streak)).fill('🔥').join('')}
          </span>
          <h3 className="text-2xl font-bold text-[#37322F]">{user.streak} Day Streak!</h3>
        </div>

        {/* Time remaining */}
        <div className="text-center mb-4">
          <p className="text-sm text-[#605A57] mb-1">Time remaining today</p>
          <p className="text-lg font-mono font-bold text-[#37322F]">{formatTime(timeLeft)}</p>
        </div>

        {/* Next milestone */}
        {nextMilestone && (
          <div className="text-center mb-4">
            <p className="text-sm text-[#605A57]">
              {nextMilestone.days} days until <span className="font-semibold">{nextMilestone.badge}</span> badge 🎯
            </p>
          </div>
        )}

        {/* Streak freezes */}
        {user.streakFreezes > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-500">❄️</span>
            <span className="text-sm text-[#605A57]">
              You have <span className="font-semibold">{user.streakFreezes}</span> streak freezes available
            </span>
            <button
              onClick={onUseFreeze}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              Use
            </button>
          </div>
        )}

        {/* Streak benefits */}
        <div className="text-center">
          <p className="text-xs text-[#605A57]">
            🔥 Streak benefits: +{user.streak * 2} XP bonus, +{Math.floor(user.streak / 3)} rank boost
          </p>
        </div>
      </div>
    </div>
  )
}