"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

export function ProfileCompletionCelebration() {
  const router = useRouter()

  useEffect(() => {
    // Fire confetti when component mounts
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    // Redirect to leaderboard after 3 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/leaderboard")
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <div className="w-full min-h-screen bg-[#F7F5F3] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-[#37322F] mb-4">Congratulations!</h1>
        <p className="text-lg text-[#605A57] mb-8">
          Your profile is now live! Visit the leaderboard to get inspired and start climbing the ranks.
        </p>
        <div className="animate-pulse text-[#37322F]">
          Redirecting to leaderboard...
        </div>
      </div>
    </div>
  )
}