"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { addUpvote, getCurrentUser } from "@/lib/storage"
import confetti from "canvas-confetti"

interface UpvoteButtonProps {
  userId: string
  currentUpvotes: number
  onUpvote?: () => void
}

export default function UpvoteButton({ userId, currentUpvotes, onUpvote }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(currentUpvotes || 0)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const currentUser = getCurrentUser()
  const visitorId = currentUser?.id || "anonymous"

  useEffect(() => {
    setUpvotes(currentUpvotes || 0)
  }, [currentUpvotes])

  const handleUpvote = () => {
    if (hasUpvoted || isAnimating) return

    const success = addUpvote(userId, visitorId)
    if (success) {
      setUpvotes((prev) => prev + 1)
      setHasUpvoted(true)
      setIsAnimating(true)

      // Confetti burst
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
      })

      setTimeout(() => setIsAnimating(false), 600)
      onUpvote?.()
    }
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={hasUpvoted || isAnimating}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        hasUpvoted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
      } ${isAnimating ? "scale-110" : "scale-100"}`}
    >
      <Heart size={18} fill={hasUpvoted ? "currentColor" : "none"} />
      <span>{String(upvotes)}</span>
    </button>
  )
}
