"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { addFollower, removeFollower, getCurrentUser } from "@/lib/storage"

interface FollowButtonProps {
  userId: string
  initialFollowing?: boolean
}

export function FollowButton({ userId, initialFollowing = false }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing)
  const currentUser = getCurrentUser()

  const handleToggle = () => {
    if (!currentUser || currentUser.id === userId) return

    if (isFollowing) {
      removeFollower(userId, currentUser.id)
    } else {
      addFollower(userId, currentUser.id)
    }
    setIsFollowing(!isFollowing)
  }

  if (!currentUser || currentUser.id === userId) return null

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        isFollowing ? "bg-gray-200 text-gray-900 hover:bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </motion.button>
  )
}
