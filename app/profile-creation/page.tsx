// Profile creation wizard with 6 steps
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, saveUserProfile } from "@/lib/storage"

export default function ProfileCreationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [user, setUser] = useState<any>(null)
  const [displayName, setDisplayName] = useState("")
  const [quote, setQuote] = useState("")
  const [bio, setBio] = useState("")
  const [links, setLinks] = useState<{ title: string; url: string }[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [avatar, setAvatar] = useState("")
  const [social, setSocial] = useState({ x: "", github: "", website: "", linkedin: "" })
  const [goal, setGoal] = useState({ title: "", description: "", progressPercent: 0 })
  const [location, setLocation] = useState({ lat: 0, lng: 0, city: "", country: "" })
  const [hideLocation, setHideLocation] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    setUser(currentUser)
    setDisplayName(currentUser.displayName)
    setAvatar(currentUser.avatar)
    setQuote(currentUser.quote || "")
    setBio(currentUser.bio || "")
    setLinks(currentUser.links || [])
    setInterests(currentUser.interests || [])
    setSocial(currentUser.social || { x: "", github: "", website: "", linkedin: "" })
    setGoal(currentUser.goal || { title: "", description: "", progressPercent: 0 })
    setLocation(currentUser.location || { lat: 0, lng: 0, city: "", country: "" })
  }, [router])

  const handleNext = () => {
    if (step < 9) {
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
        displayName,
        quote,
        bio,
        links,
        interests,
        avatar,
        social,
        goal: goal.title ? goal : undefined,
        location: hideLocation ? { lat: 0, lng: 0, city: "", country: "" } : location,
      }
      saveUserProfile(updatedUser)
      router.push("/leaderboard")
    }
  }

  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ ...location, lat: latitude, lng: longitude })

          // Reverse geocode to get city/country
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            )
            const data = await response.json()
            setLocation({
              lat: latitude,
              lng: longitude,
              city: data.address?.city || data.address?.town || "Unknown",
              country: data.address?.country || "Unknown",
            })
          } catch (error) {
            console.error("Geocoding failed:", error)
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
        },
      )
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
    setLinks(links.filter((_, i) => i !== index))
  }

  const toggleInterest = (interest: string) => {
    setInterests(interests.includes(interest) ? interests.filter((i) => i !== interest) : [...interests, interest])
  }

  const updateSocial = (field: string, value: string) => {
    setSocial({ ...social, [field]: value })
  }

  const interestOptions = [
    "Technology",
    "Design",
    "Business",
    "Art",
    "Music",
    "Sports",
    "Gaming",
    "Travel",
    "Food",
    "Fashion",
  ]

  if (!user) return null

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex flex-col">
      {/* Header */}
      <div className="border-b border-rgba(55,50,47,0.12) px-6 py-4">
        <h1 className="text-2xl font-semibold text-[#37322F]">Create Your Profile</h1>
        <p className="text-sm text-[#605A57]">Step {step} of 9</p>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#E0DEDB]">
        <div className="h-full bg-[#37322F] transition-all" style={{ width: `${(step / 9) * 100}%` }}></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Step 1: Display Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">What's your display name?</h2>
                <p className="text-[#605A57] mb-4">This is how others will see you on the leaderboard</p>
              </div>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                placeholder="Enter display name"
              />
            </div>
          )}

          {/* Step 2: Avatar */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Choose your avatar</h2>
                <p className="text-[#605A57] mb-4">Select from preset avatars or upload your own</p>
              </div>
              <div className="flex justify-center mb-6">
                <img
                  src={avatar || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-4 border-[#E0DEDB]"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["avataaars", "adventurer", "big-ears"].map((style) => (
                  <button
                    key={style}
                    onClick={() => setAvatar(`https://api.dicebear.com/7.x/${style}/svg?seed=${user.username}`)}
                    className={`p-4 rounded-lg border-2 transition ${
                      avatar.includes(style) ? "border-[#37322F] bg-white" : "border-[#E0DEDB] hover:border-[#37322F]"
                    }`}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/${style}/svg?seed=${user.username}`}
                      alt={style}
                      className="w-full rounded"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Where are you located?</h2>
                <p className="text-[#605A57] mb-4">Share your location so others can find you on the map (optional)</p>
              </div>

              <button
                onClick={requestGeolocation}
                className="w-full py-3 border border-[#E0DEDB] text-[#37322F] rounded-lg font-medium hover:bg-white transition"
              >
                Use My Current Location
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E0DEDB]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F7F5F3] text-[#605A57]">or enter manually</span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={location.city}
                  onChange={(e) => setLocation({ ...location, city: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={location.country}
                  onChange={(e) => setLocation({ ...location, country: e.target.value })}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="Country"
                />
                <input
                  type="number"
                  step="0.0001"
                  value={location.lat || ""}
                  onChange={(e) => setLocation({ ...location, lat: Number.parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="Latitude"
                />
                <input
                  type="number"
                  step="0.0001"
                  value={location.lng || ""}
                  onChange={(e) => setLocation({ ...location, lng: Number.parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="Longitude"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hideLocation}
                  onChange={(e) => setHideLocation(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E0DEDB]"
                />
                <span className="text-sm text-[#605A57]">Hide my location from the map</span>
              </label>
            </div>
          )}

          {/* Step 4: Quote */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Add a quote</h2>
                <p className="text-[#605A57] mb-4">Share your favorite quote or motto (optional)</p>
              </div>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F] resize-none"
                placeholder="Your quote here..."
                rows={3}
              />
            </div>
          )}

          {/* Step 5: Bio */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Tell us about yourself</h2>
                <p className="text-[#605A57] mb-4">Write a short bio (optional)</p>
              </div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F] resize-none"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            </div>
          )}

          {/* Step 6: Social Links */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Add your social links</h2>
                <p className="text-[#605A57] mb-4">Connect your social profiles (optional)</p>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={social.x}
                  onChange={(e) => updateSocial("x", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="Twitter handle (without @)"
                />
                <input
                  type="text"
                  value={social.github}
                  onChange={(e) => updateSocial("github", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="GitHub username"
                />
                <input
                  type="url"
                  value={social.website}
                  onChange={(e) => updateSocial("website", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="Website URL"
                />
                <input
                  type="text"
                  value={social.linkedin}
                  onChange={(e) => updateSocial("linkedin", e.target.value)}
                  className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                  placeholder="LinkedIn username"
                />
              </div>
            </div>
          )}

          {/* Step 7: Goal */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">What are you building?</h2>
                <p className="text-[#605A57] mb-4">Share your current goal (optional)</p>
              </div>
              <input
                type="text"
                value={goal.title}
                onChange={(e) => setGoal({ ...goal, title: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                placeholder="Goal title"
              />
              <textarea
                value={goal.description}
                onChange={(e) => setGoal({ ...goal, description: e.target.value })}
                className="w-full px-4 py-2 border border-[#E0DEDB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#37322F] resize-none"
                placeholder="Goal description"
                rows={3}
              />
              <div>
                <label className="block text-sm font-medium text-[#37322F] mb-2">
                  Progress: {goal.progressPercent}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progressPercent}
                  onChange={(e) => setGoal({ ...goal, progressPercent: Number.parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Step 8: Links */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">Add your links</h2>
                <p className="text-[#605A57] mb-4">Share your portfolio, social media, or website (optional)</p>
              </div>
              <div className="space-y-3">
                {links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => updateLink(index, "title", e.target.value)}
                      className="flex-1 px-3 py-2 border border-[#E0DEDB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                      placeholder="Link title"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(index, "url", e.target.value)}
                      className="flex-1 px-3 py-2 border border-[#E0DEDB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#37322F]"
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeLink(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addLink}
                className="w-full py-2 border border-[#E0DEDB] text-[#37322F] rounded-lg font-medium hover:bg-white transition"
              >
                + Add Link
              </button>
            </div>
          )}

          {/* Step 9: Interests */}
          {step === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#37322F] mb-2">What are your interests?</h2>
                <p className="text-[#605A57] mb-4">Select your interests (optional)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full font-medium transition ${
                      interests.includes(interest)
                        ? "bg-[#37322F] text-white"
                        : "border border-[#E0DEDB] text-[#37322F] hover:border-[#37322F]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
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
            {step < 9 ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex-1 py-3 bg-[#37322F] text-white rounded-lg font-medium hover:bg-[#2a2520] transition"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
