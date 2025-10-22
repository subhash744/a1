"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getFeaturedBuilders } from "@/lib/storage"
import type { UserProfile } from "@/lib/storage"

export function LandingShowcase() {
  const router = useRouter()
  const [featured, setFeatured] = useState<UserProfile[]>([])

  useEffect(() => {
    const builders = getFeaturedBuilders()
    setFeatured(builders)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F7F5F3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#37322F] mb-4 font-bold">Creators Building in Public</h2>
          <p className="text-lg text-[#605A57]">Meet today's featured builders</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featured.map((user) => (
            <motion.div
              key={user.id}
              className="p-6 bg-white rounded-lg border border-[#E0DEDB] hover:shadow-lg transition cursor-pointer backdrop-blur-sm group"
              variants={itemVariants}
              onClick={() => router.push(`/profile/${user.id}`)}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.displayName}
                className="w-16 h-16 rounded-full mb-4 group-hover:ring-2 ring-[#37322F] transition"
              />
              <h3 className="font-semibold text-[#37322F] mb-1">{user.displayName}</h3>
              <p className="text-sm text-[#605A57] mb-3">@{user.username}</p>
              <p className="text-sm text-[#605A57] mb-4 line-clamp-2">{user.bio}</p>

              {user.location && (
                <div className="text-xs text-[#605A57] mb-3 flex items-center gap-1">
                  <span>📍</span>
                  <span>
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
              )}

              <div className="flex gap-2 mb-3 text-xs">
                <div className="flex-1 bg-[#F7F5F3] p-2 rounded">
                  <p className="text-[#605A57]">Views</p>
                  <p className="font-semibold text-[#37322F]">{user.views}</p>
                </div>
                <div className="flex-1 bg-[#F7F5F3] p-2 rounded">
                  <p className="text-[#605A57]">Upvotes</p>
                  <p className="font-semibold text-[#37322F]">{user.upvotes}</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {user.badges.slice(0, 3).map((badge) => (
                  <span key={badge} className="text-xs bg-[#F7F5F3] text-[#37322F] px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
