// Authentication modal for login/signup
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { setCurrentUser, getAllUsers, generateUserId, getTodayDate } from "@/lib/storage"

interface AuthModalProps {
  onClose: () => void
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Please fill in all fields")
      return
    }

    if (isLogin) {
      // Login: find user by username
      const allUsers = getAllUsers()
      const user = allUsers.find((u) => u.username === username)

      if (!user) {
        setError("User not found")
        return
      }

      // Simple password check (in real app, would be hashed)
      if (user.username !== username) {
        setError("Invalid credentials")
        return
      }

      setCurrentUser(user)
      router.push("/leaderboard")
      onClose()
    } else {
      // Signup: create new user
      const allUsers = getAllUsers()
      const userExists = allUsers.some((u) => u.username === username)

      if (userExists) {
        setError("Username already taken")
        return
      }

      // <CHANGE> Updated schema to include new fields: quote, social, goal, projects, dailyUpvotes
      const newUser = {
        id: generateUserId(),
        username,
        displayName: username,
        quote: "",
        bio: "",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        social: { x: "", github: "", website: "", linkedin: "" },
        goal: undefined,
        projects: [],
        links: [],
        interests: [],
        views: 0,
        upvotes: 0,
        rank: 0,
        createdAt: Date.now(),
        badges: [],
        streak: 0,
        lastActiveDate: Date.now(),
        lastSeenDate: getTodayDate(),
        dailyViews: [],
        dailyUpvotes: [],
        schemaVersion: 2,
      }

      setCurrentUser(newUser)
      router.push("/profile-creation")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-[#37322F]">{isLogin ? "Log In" : "Sign Up"}</h2>
          <button onClick={onClose} className="text-[#605A57] hover:text-[#37322F]">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#37322F] mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#37322F] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
              placeholder="Enter password"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full py-2 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#605A57]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
              className="ml-2 text-[#37322F] font-medium hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
