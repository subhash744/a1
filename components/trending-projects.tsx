"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { getAllUsers, type Project } from "@/lib/storage"

export function TrendingProjects() {
  const trendingProjects = useMemo(() => {
    const allUsers = getAllUsers()
    const allProjects: (Project & { ownerName: string; ownerId: string })[] = []

    allUsers.forEach((user) => {
      user.projects.forEach((project) => {
        allProjects.push({
          ...project,
          ownerName: user.displayName,
          ownerId: user.id,
        })
      })
    })

    return allProjects.sort((a, b) => b.upvotes - a.upvotes).slice(0, 5)
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Trending Projects</h3>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 overflow-x-auto pb-4">
        {trendingProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h4 className="font-semibold text-gray-900 truncate">{project.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
            <div className="flex gap-4 mt-3 text-sm text-gray-600">
              <span>Upvotes: {project.upvotes}</span>
              <span>Views: {project.views}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">by {project.ownerName}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
