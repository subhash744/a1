"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { getTodayDate } from "@/lib/storage"

export function QuoteOfTheDay() {
  const quotes = [
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "Life is what happens when you're busy making other plans.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "The only impossible journey is the one you never begin.",
    "Success is not final, failure is not fatal.",
    "Believe you can and you're halfway there.",
  ]

  const quote = useMemo(() => {
    const today = getTodayDate()
    const seed = today.split("-").reduce((acc, part) => acc + Number.parseInt(part), 0)
    return quotes[seed % quotes.length]
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-4 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
    >
      <p className="text-sm italic text-gray-700">"{quote}"</p>
    </motion.div>
  )
}
