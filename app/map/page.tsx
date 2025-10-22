"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import { getAllUsers, incrementMapClicks, incrementViewCount, getLeaderboard } from "@/lib/storage"
import type { UserProfile } from "@/lib/storage"

const MapComponent = dynamic(() => import("@/components/map-component"), { ssr: false })

export default function MapPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(searchParams.get("userId"))
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "top" | "newcomers">("all")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    setMounted(true)
    const allUsers = getAllUsers()
    const usersWithLocation = allUsers.filter((u) => u.location && (u.location.lat !== 0 || u.location.lng !== 0))
    setUsers(usersWithLocation)
  }, [])

  useEffect(() => {
    let filtered = users

    if (filterType === "top") {
      const leaderboard = getLeaderboard("all-time")
      const topUserIds = leaderboard.slice(0, 10).map((u) => u.userId)
      filtered = filtered.filter((u) => topUserIds.includes(u.id))
    } else if (filterType === "newcomers") {
      const now = Date.now()
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
      filtered = filtered.filter((u) => u.createdAt > sevenDaysAgo)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (u) =>
          u.displayName.toLowerCase().includes(query) ||
          u.username.toLowerCase().includes(query) ||
          u.location?.city.toLowerCase().includes(query) ||
          u.location?.country.toLowerCase().includes(query),
      )
    }

    setFilteredUsers(filtered)
  }, [users, filterType, searchQuery])

  const handlePinClick = (userId: string) => {
    setSelectedUserId(userId)
    incrementMapClicks(userId)
  }

  const handleViewProfile = (userId: string) => {
    incrementViewCount(userId)
    router.push(`/profile/${userId}`)
  }

  if (!mounted) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col">
      <Navigation />

      <div className="flex-1 flex flex-col">
        <div className="px-6 py-4 border-b border-[#E0DEDB]">
          <h1 className="text-3xl font-serif text-[#37322F]">Global Builders Map</h1>
          <p className="text-[#605A57] mt-1">Discover builders from around the world</p>
        </div>

        <div className="flex-1 flex gap-6 p-6">
          {/* Map Container */}
          <div className="flex-1 rounded-lg overflow-hidden border border-[#E0DEDB] shadow-sm">
            <MapComponent users={filteredUsers} selectedUserId={selectedUserId} onPinClick={handlePinClick} />
          </div>

          {/* Sidebar */}
          {sidebarOpen && (
            <div className="w-80 bg-white rounded-lg border border-[#E0DEDB] p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-[#37322F]">Builders</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-[#605A57] hover:text-[#37322F] transition"
                >
                  ✕
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-[#E0DEDB] rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                placeholder="Search by name or city..."
              />

              {/* Filters */}
              <div className="flex gap-2 mb-4">
                {(["all", "top", "newcomers"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      filterType === type
                        ? "bg-[#37322F] text-white"
                        : "border border-[#E0DEDB] text-[#37322F] hover:border-[#37322F]"
                    }`}
                  >
                    {type === "all" ? "All" : type === "top" ? "Top 10" : "New"}
                  </button>
                ))}
              </div>

              {/* User List */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handlePinClick(user.id)}
                    className={`w-full p-3 rounded-lg text-left transition ${
                      selectedUserId === user.id
                        ? "bg-[#37322F] text-white"
                        : "bg-[#F7F5F3] text-[#37322F] hover:bg-white border border-[#E0DEDB]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E0DEDB] to-[#D0CECC] flex items-center justify-center text-xs font-semibold">
                        {user.displayName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{user.displayName}</p>
                        <p className="text-xs opacity-75 truncate">
                          {user.location?.city}, {user.location?.country}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected User Info */}
              {selectedUserId && (
                <div className="mt-4 pt-4 border-t border-[#E0DEDB]">
                  {(() => {
                    const user = filteredUsers.find((u) => u.id === selectedUserId)
                    if (!user) return null
                    return (
                      <>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="p-2 bg-[#F7F5F3] rounded">
                            <p className="text-xs text-[#605A57]">Views</p>
                            <p className="font-semibold text-[#37322F]">{user.views}</p>
                          </div>
                          <div className="p-2 bg-[#F7F5F3] rounded">
                            <p className="text-xs text-[#605A57]">Upvotes</p>
                            <p className="font-semibold text-[#37322F]">{user.upvotes}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewProfile(user.id)}
                          className="w-full px-3 py-2 bg-[#37322F] text-white rounded-lg text-sm font-medium hover:bg-[#2a2520] transition"
                        >
                          View Profile
                        </button>
                      </>
                    )
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Toggle Sidebar Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed right-6 bottom-6 px-4 py-2 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
            >
              Show Sidebar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
