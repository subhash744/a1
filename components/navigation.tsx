"use client"

import { useRouter, usePathname } from "next/navigation"
import { getCurrentUser } from "@/lib/storage"
import { useState, useEffect } from "react"

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

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

  if (!mounted) return null

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Explore Map", href: "/map" },
    { label: "Hall of Fame", href: "/hall" },
    ...(currentUser ? [{ label: "Dashboard", href: "/dashboard" }] : []),
  ]

  return (
    <nav className="border-b border-[rgba(55,50,47,0.12)] px-6 py-4 flex justify-between items-center bg-[#F7F5F3]">
      <div className="text-2xl font-semibold text-[#37322F] cursor-pointer" onClick={() => router.push("/")}>
        Rigeo
      </div>

      <div className="flex gap-6 items-center">
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

        {currentUser ? (
          <>
            <span className="text-sm text-[#605A57]">{currentUser.displayName}</span>
            <button
              onClick={() => router.push(`/profile/${currentUser.id}`)}
              className="w-8 h-8 rounded-full bg-[#E0DEDB] flex items-center justify-center text-xs font-semibold text-[#37322F]"
            >
              {currentUser.displayName.charAt(0)}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-[#E0DEDB] text-[#37322F] rounded-full text-sm font-medium hover:bg-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-white border border-[#E0DEDB] text-[#37322F] rounded-full text-sm font-medium hover:bg-[#F7F5F3] transition"
          >
            Log in
          </button>
        )}
      </div>
    </nav>
  )
}
