"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { getUserBadges } from "@/lib/badges"
import type { Badge } from "@/lib/badges"

interface BadgeGalleryProps {
  user: any
}

export function BadgeGallery({ user }: BadgeGalleryProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const badges = getUserBadges(user)
  
  const rarityColors = {
    common: "bg-gray-200",
    rare: "bg-blue-200",
    epic: "bg-purple-200",
    legendary: "bg-yellow-200"
  }
  
  const rarityBorders = {
    common: "border-gray-300",
    rare: "border-blue-300",
    epic: "border-purple-300",
    legendary: "border-yellow-300"
  }

  return (
    <div className="bg-white rounded-xl border border-[#E0DEDB] p-6">
      <h3 className="font-semibold text-[#37322F] mb-4">Badges</h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedBadge(badge)}
            className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
              badge.unlocked 
                ? `${rarityColors[badge.rarity]} ${rarityBorders[badge.rarity]}` 
                : "bg-gray-100 border-gray-300 opacity-50"
            }`}
          >
            <span className="text-2xl mb-1">{badge.icon}</span>
            <span className="text-xs font-medium text-center">{badge.name}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Badge Detail Modal */}
      {selectedBadge && (
        <motion.div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedBadge(null)}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 max-w-md w-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedBadge.icon}</span>
                <div>
                  <h4 className="font-bold text-lg">{selectedBadge.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedBadge.rarity === "common" ? "bg-gray-200 text-gray-800" :
                    selectedBadge.rarity === "rare" ? "bg-blue-200 text-blue-800" :
                    selectedBadge.rarity === "epic" ? "bg-purple-200 text-purple-800" :
                    "bg-yellow-200 text-yellow-800"
                  }`}>
                    {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBadge(null)}
                className="text-[#605A57] hover:text-[#37322F]"
              >
                ✕
              </button>
            </div>
            
            <p className="text-[#605A57] mb-4">{selectedBadge.description}</p>
            
            {selectedBadge.target ? (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#605A57]">Progress</span>
                  <span className="font-medium text-[#37322F]">
                    {selectedBadge.progress}/{selectedBadge.target}
                  </span>
                </div>
                <div className="w-full bg-[#E0DEDB] rounded-full h-2">
                  <div 
                    className="bg-[#37322F] h-2 rounded-full"
                    style={{ 
                      width: `${Math.min(100, (selectedBadge.progress || 0) / selectedBadge.target * 100)}%` 
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <p className="text-sm text-[#605A57]">Requirement: {selectedBadge.requirement}</p>
              </div>
            )}
            
            <div className={`px-4 py-2 rounded-lg text-center ${
              selectedBadge.unlocked 
                ? "bg-green-100 text-green-800" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {selectedBadge.unlocked ? "✅ Unlocked" : "🔒 Locked"}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}