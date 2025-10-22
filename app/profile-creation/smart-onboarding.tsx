"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, saveUserProfile } from "@/lib/storage"
import { ProfileCompletionCelebration } from "@/components/profile-completion-celebration"

export default function SmartOnboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [user, setUser] = useState<any>(null)
  const [displayName, setDisplayName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [quote, setQuote] = useState("")
  const [links, setLinks] = useState<{ title: string; url: string }[]>([
    { title: "", url: "" },
    { title: "", url: "" },
    { title: "", url: "" }
  ])
  const [avatar, setAvatar] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    setUser(currentUser)
    setDisplayName(currentUser.displayName || "")
    setUsername(currentUser.username || "")
    setAvatar(currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.username}`)
  }, [router])

  const checkUsernameAvailability = (username: string) => {
    // In a real app, this would check against the database
    // For now, we'll just do a basic validation
    const valid = /^[a-zA-Z0-9_]+$/.test(username)
    if (!valid) {
      setUsernameError("Username can only contain letters, numbers, and underscores")
      return false
    }
    
    // Check if it's the current user's username (which is fine)
    if (user && user.username === username) {
      setUsernameError("")
      return true
    }
    
    // In a real app, you would check against existing users
    setUsernameError("")
    return true
  }

  const handleUsernameChange = (value: string) => {
    setUsername(value)
    if (value) {
      checkUsernameAvailability(value)
    } else {
      setUsernameError("")
    }
  }

  const handleNext = () => {
    if (step === 1 && (!displayName || !username)) {
      return
    }
    
    if (step === 1 && usernameError) {
      return
    }
    
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    if (user) {
      const updatedUser = {
        ...user,
        displayName: displayName || username,
        username,
        quote,
        bio,
        links: links.filter(link => link.title && link.url),
        avatar,
      }
      saveUserProfile(updatedUser)
      
      // Show celebration screen
      setShowCelebration(true)
    }
  }

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }])
  }

  const updateLink = (index: number, field: string, value: string) => {
    const newLinks = [...links]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setLinks(newLinks)
  }

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index))
    }
  }

  const getPlatformIcon = (url: string) => {
    if (url.includes("github")) return "🐙"
    if (url.includes("twitter") || url.includes("x.com")) return "🐦"
    if (url.includes("linkedin")) return "💼"
    if (url.includes("youtube")) return "📺"
    if (url.includes("instagram")) return "📸"
    if (url.includes("facebook")) return "📘"
    return "🔗"
  }

  // Show celebration screen when profile is completed
  if (showCelebration) {
    return <ProfileCompletionCelebration />
  }

  if (!user) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col">
      {/* Header */}
      <div className="border-b border-rgba(55,50,47,0.12) px-6 py-4">
        <h1 className="text-2xl font-semibold text-[#37322F]">Create Your Profile</h1>
        <p className="text-sm text-[#605A57]">Step {step} of 3</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#E0DEDB]">
        <div 
          className="h-full bg-[#37322F] transition-all duration-300" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Step 1: Username & Display Name */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Let's get started</h2>
                <p className="text-[#605A57]">Tell us your name and choose your URL</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-[#E0DEDB]">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#37322F] mb-2">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                      placeholder="Your name"
                    />
                    <p className="text-xs text-[#605A57] mt-1">This is how others will see you</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#37322F] mb-2">Username</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-[#605A57]">rigeo.com/@</span>
                      </div>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        className="w-full pl-28 pr-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                        placeholder="username"
                      />
                    </div>
                    {usernameError && (
                      <p className="text-xs text-red-600 mt-1">{usernameError}</p>
                    )}
                    <p className="text-xs text-[#605A57] mt-1">Your profile URL</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profile Basics */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Profile Basics</h2>
                <p className="text-[#605A57]">Add your avatar and bio</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Avatar Section */}
                <div className="bg-white rounded-xl p-6 border border-[#E0DEDB]">
                  <h3 className="font-semibold text-[#37322F] mb-4">Avatar</h3>
                  <div className="flex flex-col items-center">
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full border-4 border-[#E0DEDB] mb-4"
                    />
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {["avataaars", "adventurer", "big-ears"].map((style) => (
                        <button
                          key={style}
                          onClick={() => setAvatar(`https://api.dicebear.com/7.x/${style}/svg?seed=${username || user.username}`)}
                          className={`p-2 rounded-lg border-2 transition ${
                            avatar.includes(style) ? "border-[#37322F] bg-white" : "border-[#E0DEDB] hover:border-[#37322F]"
                          }`}
                        >
                          <img
                            src={`https://api.dicebear.com/7.x/${style}/svg?seed=${username || user.username}`}
                            alt={style}
                            className="w-full rounded"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Bio Section */}
                <div className="bg-white rounded-xl p-6 border border-[#E0DEDB]">
                  <h3 className="font-semibold text-[#37322F] mb-4">Bio</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#37322F] mb-2">Bio (max 160 characters)</label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value.slice(0, 160))}
                        className="w-full px-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F] resize-none"
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                      <div className="text-right text-xs text-[#605A57] mt-1">
                        {bio.length}/160
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#37322F] mb-2">Quote/Motto (optional)</label>
                      <input
                        type="text"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                        placeholder="Your favorite quote"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Your Links */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Your Links</h2>
                <p className="text-[#605A57]">Add 3-5 links to showcase your work</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-[#E0DEDB]">
                <div className="space-y-4">
                  {links.map((link, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="mt-3 text-xl">
                        {link.url ? getPlatformIcon(link.url) : "🔗"}
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => updateLink(index, "title", e.target.value)}
                          className="px-3 py-2 border border-[#E0DEDB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                          placeholder="Link title (e.g. Portfolio, GitHub)"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateLink(index, "url", e.target.value)}
                          className="px-3 py-2 border border-[#E0DEDB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                          placeholder="https://example.com"
                        />
                      </div>
                      {links.length > 1 && (
                        <button
                          onClick={() => removeLink(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition mt-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {links.length < 5 && (
                    <button
                      onClick={addLink}
                      className="w-full py-2 border border-[#E0DEDB] text-[#37322F] rounded-lg font-medium hover:bg-white transition flex items-center justify-center gap-2"
                    >
                      <span>+</span>
                      <span>Add Link</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Preview Panel */}
              <div className="bg-white rounded-xl p-6 border border-[#E0DEDB]">
                <h3 className="font-semibold text-[#37322F] mb-4">Profile Preview</h3>
                <div className="flex items-start gap-4">
                  <img
                    src={avatar || "/placeholder.svg"}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full border-2 border-[#E0DEDB]"
                  />
                  <div>
                    <h4 className="font-semibold text-[#37322F]">{displayName || username}</h4>
                    <p className="text-sm text-[#605A57]">@{username}</p>
                    {bio && (
                      <p className="text-sm text-[#605A57] mt-2">{bio}</p>
                    )}
                    {quote && (
                      <p className="text-sm italic text-[#605A57] mt-2">"{quote}"</p>
                    )}
                    {links.filter(l => l.title && l.url).length > 0 && (
                      <div className="mt-3 space-y-2">
                        {links.filter(l => l.title && l.url).slice(0, 3).map((link, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span>{getPlatformIcon(link.url)}</span>
                            <span className="text-sm text-[#37322F]">{link.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 border border-[#E0DEDB] text-[#37322F] rounded-lg font-medium hover:bg-white transition"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && (!displayName || !username || usernameError !== "")}
                className={`flex-1 py-3 rounded-lg font-medium transition ${
                  step === 1 && (!displayName || !username || usernameError !== "")
                    ? "bg-[#E0DEDB] text-[#605A57] cursor-not-allowed"
                    : "bg-[#37322F] text-white hover:bg-[#2a2520]"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 py-3 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}