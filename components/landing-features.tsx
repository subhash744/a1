"use client"

import { motion } from "framer-motion"

export function LandingFeatures() {
  const features = [
    {
      icon: "✨",
      title: "Auto-Ranking Algorithm",
      description: "Intelligent system that ranks profiles based on activity and engagement"
    },
    {
      icon: "📊",
      title: "Daily Leaderboards",
      description: "Compete on fresh leaderboards updated every day"
    },
    {
      icon: "🏆",
      title: "Achievement Badges",
      description: "Earn badges for milestones and accomplishments"
    },
    {
      icon: "📈",
      title: "Profile Analytics",
      description: "Track your growth with detailed analytics"
    },
    {
      icon: "🔗",
      title: "Link Hub",
      description: "Linktree-style hub for all your important links"
    },
    {
      icon: "⚡",
      title: "Instant Updates",
      description: "Real-time updates to your ranking and stats"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#37322F] mb-4 font-bold">Powerful Features</h2>
          <p className="text-lg text-[#605A57]">Everything you need to build in public and grow your audience</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gradient-to-br from-white to-[#F7F5F3] rounded-lg border border-[#E0DEDB] hover:shadow-lg transition group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#37322F] mb-2">{feature.title}</h3>
              <p className="text-[#605A57]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}