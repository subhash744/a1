"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

interface GlobalSearchProps {
  className?: string
  placeholder?: string
}

export function GlobalSearch({ className = "", placeholder = "Search profiles, projects, or users..." }: GlobalSearchProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 bg-white border border-[#E0DEDB] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#37322F] w-full"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#605A57]" />
    </form>
  )
}