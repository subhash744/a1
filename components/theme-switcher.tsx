"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getCurrentUser, saveUserProfile } from "@/lib/storage"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark" | "gradient">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const currentUser = getCurrentUser()
    if (currentUser) {
      setTheme(currentUser.themePreference)
      applyTheme(currentUser.themePreference)
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "gradient") => {
    const html = document.documentElement
    html.classList.remove("light", "dark", "gradient")
    html.classList.add(newTheme)

    if (newTheme === "dark") {
      html.style.colorScheme = "dark"
    } else if (newTheme === "gradient") {
      html.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    } else {
      html.style.colorScheme = "light"
    }
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "gradient") => {
    setTheme(newTheme)
    applyTheme(newTheme)

    const currentUser = getCurrentUser()
    if (currentUser) {
      currentUser.themePreference = newTheme
      saveUserProfile(currentUser)
    }

    localStorage.setItem("theme", newTheme)
  }

  if (!mounted) return null

  return (
    <div className="flex gap-2">
      {(["light", "dark", "gradient"] as const).map((t) => (
        <motion.button
          key={t}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleThemeChange(t)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            theme === t ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </motion.button>
      ))}
    </div>
  )
}
