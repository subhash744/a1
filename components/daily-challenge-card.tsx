"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { getDailyChallenge, completeDailyChallenge, getCurrentUser } from "@/lib/storage"
import confetti from "canvas-confetti"

export function DailyChallengeCard() {
  const [completed, setCompleted] = useState(false)
  const currentUser = getCurrentUser()
  const challenge = getDailyChallenge()

  const handleComplete = () => {
    if (!currentUser) return
    const success = completeDailyChallenge(currentUser.id)
    if (success) {
      setCompleted(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  if (!currentUser) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Daily Challenge</h3>
          <p className="text-sm text-gray-600 mt-1">{challenge.prompt}</p>
          <p className="text-xs text-blue-600 mt-2">+{challenge.reward} XP</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComplete}
          disabled={completed}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            completed ? "bg-green-500 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {completed ? "Completed" : "Complete"}
        </motion.button>
      </div>
    </motion.div>
  )
}
