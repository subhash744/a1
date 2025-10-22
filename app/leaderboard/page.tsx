"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, getLeaderboard, getFeaturedBuilders } from "@/lib/storage"
import LeaderboardTable from "@/components/leaderboard-table"
import Navigation from "@/components/navigation"
import { updateStreaks } from "@/lib/storage"

type SortBy = "today" | "yesterday" | "all-time" | "newcomers"

export default function LeaderboardPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [sortBy, setSortBy] = useState<SortBy>("all-time")
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [featured, setFeatured] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    updateStreaks()
    const user = getCurrentUser()
    setCurrentUser(user)
    updateLeaderboard("all-time")
    setFeatured(getFeaturedBuilders())
  }, [])

  const updateLeaderboard = (sort: SortBy) => {
    setSortBy(sort)
    const data = getLeaderboard(sort)
    setLeaderboard(data)
  }

  if (!mounted) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col">
      <Navigation />

      {/* Featured Builders Section */}
      {featured.length > 0 && (
        <div className="bg-white border-b border-[#E0DEDB] px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif text-[#37322F] mb-6">Today's Featured Builders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((builder) => (
                <div
                  key={builder.id}
                  onClick={() => router.push(`/profile/${builder.id}`)}
                  className="p-6 bg-[#F7F5F3] rounded-lg border border-[#E0DEDB] hover:shadow-lg transition cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E0DEDB] to-[#D0CECC] flex items-center justify-center mb-4 text-2xl font-semibold text-[#37322F]">
                    {builder.displayName.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-[#37322F] mb-2">{builder.displayName}</h3>
                  <p className="text-sm text-[#605A57] mb-4 line-clamp-2">{builder.bio}</p>
                  <div className="flex gap-4 text-xs text-[#605A57]">
                    <span>{builder.views} views</span>
                    <span>{builder.votes} votes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-[rgba(55,50,47,0.12)] px-6 flex gap-8">
        {(["today", "yesterday", "all-time", "newcomers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => updateLeaderboard(tab)}
            className={`py-4 px-2 font-medium transition border-b-2 ${
              sortBy === tab
                ? "border-[#37322F] text-[#37322F]"
                : "border-transparent text-[#605A57] hover:text-[#37322F]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <LeaderboardTable entries={leaderboard} currentUserId={currentUser?.id} />
        </div>
      </div>
    </div>
  )
}
