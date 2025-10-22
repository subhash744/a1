"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { getAllUsers, getCurrentUser, incrementViewCount, deleteProject } from "@/lib/storage"
import Navigation from "@/components/navigation"
import UpvoteButton from "@/components/upvote-button"
import ProjectCard from "@/components/project-card"
import ProjectForm from "@/components/project-form"
import { Github, Linkedin, Globe, Twitter, Edit2, Trash2 } from "lucide-react"

const badgeColors: Record<string, string> = {
  Bronze: "bg-amber-700",
  Silver: "bg-gray-400",
  Gold: "bg-yellow-500",
  Diamond: "bg-blue-400",
  Popular: "bg-pink-500",
  Trending: "bg-red-500",
  Viral: "bg-purple-500",
  Consistent: "bg-green-500",
  Dedicated: "bg-indigo-500",
  Unstoppable: "bg-orange-500",
  Builder: "bg-cyan-500",
  Prolific: "bg-violet-500",
}

export default function ProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  const [profile, setProfile] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    const current = getCurrentUser()
    setCurrentUser(current)

    const allUsers = getAllUsers()
    const user = allUsers.find((u) => u.id === userId)

    if (!user) {
      router.push("/leaderboard")
      return
    }

    setProfile(user)
    setIsOwnProfile(user.id === current?.id)

    if (user.id !== current?.id) {
      incrementViewCount(userId)
    }
  }, [userId, router])

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Delete this project?")) {
      deleteProject(userId, projectId)
      setProfile((prev: any) => ({
        ...prev,
        projects: prev.projects.filter((p: any) => p.id !== projectId),
      }))
    }
  }

  const handleProjectSaved = () => {
    const allUsers = getAllUsers()
    const updated = allUsers.find((u) => u.id === userId)
    if (updated) {
      setProfile(updated)
      setShowProjectForm(false)
      setEditingProject(null)
    }
  }

  if (!mounted || !profile) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col">
      <Navigation />

      {/* Profile Header */}
      <div className="bg-white border-b border-[#E0DEDB] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E0DEDB] to-[#D0CECC] flex items-center justify-center text-4xl font-semibold text-[#37322F] flex-shrink-0">
              {profile.displayName.charAt(0)}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-[#37322F] mb-1">{profile.displayName}</h1>
              <p className="text-[#605A57] mb-3">@{profile.username}</p>
              {profile.quote && <p className="text-lg italic text-[#37322F] mb-4">"{profile.quote}"</p>}

              {/* Social Links */}
              {profile.social && Object.values(profile.social).some((v) => v) && (
                <div className="flex gap-3 mb-4">
                  {profile.social.x && (
                    <a
                      href={`https://twitter.com/${profile.social.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#37322F] hover:text-[#605A57]"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {profile.social.github && (
                    <a
                      href={`https://github.com/${profile.social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#37322F] hover:text-[#605A57]"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {profile.social.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${profile.social.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#37322F] hover:text-[#605A57]"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                  {profile.social.website && (
                    <a
                      href={profile.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#37322F] hover:text-[#605A57]"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <UpvoteButton userId={userId} currentUpvotes={profile.upvotes} />
                {isOwnProfile && (
                  <button
                    onClick={() => router.push("/profile-creation")}
                    className="px-4 py-2 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition flex items-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-[#E0DEDB]">
              <p className="text-[#605A57]">{profile.bio}</p>
            </div>
          )}

          {/* Goal Section */}
          {profile.goal && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-[#37322F] mb-2">Currently Building</h3>
              <p className="text-lg font-medium text-[#37322F] mb-2">{profile.goal.title}</p>
              <p className="text-[#605A57] mb-4">{profile.goal.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${profile.goal.progressPercent}%` }}
                />
              </div>
              <p className="text-sm text-[#605A57] mt-2">{profile.goal.progressPercent}% Complete</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white border border-[#E0DEDB] rounded-lg">
              <p className="text-2xl font-semibold text-[#37322F]">{profile.views}</p>
              <p className="text-sm text-[#605A57]">Views</p>
            </div>
            <div className="p-4 bg-white border border-[#E0DEDB] rounded-lg">
              <p className="text-2xl font-semibold text-[#37322F]">{profile.upvotes}</p>
              <p className="text-sm text-[#605A57]">Upvotes</p>
            </div>
            <div className="p-4 bg-white border border-[#E0DEDB] rounded-lg">
              <p className="text-2xl font-semibold text-[#37322F]">{profile.streak}</p>
              <p className="text-sm text-[#605A57]">Streak</p>
            </div>
            <div className="p-4 bg-white border border-[#E0DEDB] rounded-lg">
              <p className="text-2xl font-semibold text-[#37322F]">{profile.projects.length}</p>
              <p className="text-sm text-[#605A57]">Projects</p>
            </div>
          </div>

          {/* Badges */}
          {profile.badges.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-[#37322F] mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((badge: string) => (
                  <span
                    key={badge}
                    className={`${badgeColors[badge] || "bg-gray-300"} text-white px-4 py-2 rounded-full font-medium text-sm`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="px-6 py-12 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#37322F]">Projects</h2>
          {isOwnProfile && (
            <button
              onClick={() => setShowProjectForm(true)}
              className="px-4 py-2 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
            >
              Add Project
            </button>
          )}
        </div>

        {showProjectForm && (
          <div className="mb-8">
            <ProjectForm
              userId={userId}
              project={editingProject}
              onSave={handleProjectSaved}
              onCancel={() => {
                setShowProjectForm(false)
                setEditingProject(null)
              }}
            />
          </div>
        )}

        {profile.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.projects.map((project: any) => (
              <div key={project.id} className="relative">
                <ProjectCard project={project} userId={userId} />
                {isOwnProfile && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(project)
                        setShowProjectForm(true)
                      }}
                      className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
                    >
                      <Edit2 size={16} className="text-[#37322F]" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-[#E0DEDB]">
            <p className="text-[#605A57]">No projects yet</p>
            {isOwnProfile && (
              <button
                onClick={() => setShowProjectForm(true)}
                className="mt-4 px-4 py-2 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
              >
                Create Your First Project
              </button>
            )}
          </div>
        )}
      </div>

      {/* Links */}
      {profile.links.length > 0 && (
        <div className="px-6 py-12 max-w-4xl mx-auto w-full border-t border-[#E0DEDB]">
          <h2 className="text-2xl font-semibold text-[#37322F] mb-6">Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-[#E0DEDB] text-[#37322F] rounded-lg font-medium hover:bg-white transition text-center"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
