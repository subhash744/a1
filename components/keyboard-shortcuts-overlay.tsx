"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function KeyboardShortcutsOverlay() {
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "?") {
        setShowOverlay(!showOverlay)
      } else if (e.key === "/") {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
          e.preventDefault()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [showOverlay])

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowOverlay(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Keyboard Shortcuts</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Search</span>
                <kbd className="bg-gray-200 px-2 py-1 rounded">/</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show shortcuts</span>
                <kbd className="bg-gray-200 px-2 py-1 rounded">?</kbd>
              </div>
              <div className="flex justify-between">
                <span>Scroll leaderboard</span>
                <kbd className="bg-gray-200 px-2 py-1 rounded">↑ ↓</kbd>
              </div>
              <div className="flex justify-between">
                <span>Navigate sections</span>
                <kbd className="bg-gray-200 px-2 py-1 rounded">← →</kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
