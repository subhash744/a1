"use client"

import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/storage"
import { useState, useEffect } from "react"
import { Search } from "lucide-react"

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
    const user = getCurrentUser()
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  if (!mounted) return null

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Explore", href: "/explore" },
    { label: "Hall of Fame", href: "/hall" },
    ...(currentUser ? [{ label: "Dashboard", href: "/dashboard" }] : []),
  ]

  return (
    <nav className="border-b border-[rgba(55,50,47,0.12)] px-6 py-4 flex justify-between items-center bg-[#F7F5F3]">
      <div className="text-2xl font-semibold text-[#37322F] cursor-pointer" onClick={() => router.push("/")}>
        Rigeo
      </div>

      {/* Centered navigation items */}
      <div className="flex gap-6 items-center absolute left-1/2 transform -translate-x-1/2">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`text-sm font-medium transition ${
              pathname === item.href ? "text-[#37322F] font-semibold" : "text-[#605A57] hover:text-[#37322F]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Search bar and user actions */}
      <div className="flex gap-4 items-center">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-4 py-1.5 bg-white border border-[#E0DEDB] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#37322F] w-40"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#605A57]" />
        </form>

        {currentUser ? (
          <>
            <span className="text-sm text-[#605A57] hidden md:inline">{currentUser.displayName}</span>
            <button
              onClick={() => router.push(`/profile/${currentUser.id}`)}
              className="w-8 h-8 rounded-full bg-[#E0DEDB] flex items-center justify-center text-xs font-semibold text-[#37322F]"
            >
              {currentUser.displayName.charAt(0)}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 border border-[#E0DEDB] text-[#37322F] rounded-full text-sm font-medium hover:bg-white transition hidden md:inline"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/")}
            className="px-3 py-1.5 bg-white border border-[#E0DEDB] text-[#37322F] rounded-full text-sm font-medium hover:bg-[#F7F5F3] transition"
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  )
}