"use client"

import { motion } from "framer-motion"

export function LandingHowItWorks() {
  const steps = [
    { num: 1, title: "Create Your Profile", desc: "Set up your profile with your bio, projects, and goals" },
    { num: 2, title: "Add Your Projects", desc: "Showcase your work and share your achievements" },
    { num: 3, title: "Climb the Ranks", desc: "Earn badges and compete on the leaderboard" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-[#37322F] mb-4 font-bold">How It Works</h2>
          <p className="text-lg text-[#605A57]">Get started in three simple steps</p>
        </motion.div>

        <motion.div
          className="space-y-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} className="flex gap-6 items-start relative" variants={itemVariants}>
              <div className="flex-shrink-0">
                <motion.div
                  className="w-12 h-12 rounded-full bg-[#37322F] text-white flex items-center justify-center font-bold text-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.num}
                </motion.div>
              </div>
              <div className="flex-1 p-4 bg-gradient-to-r from-[#F7F5F3] to-white rounded-lg border border-[#E0DEDB] backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-[#37322F] mb-2">{step.title}</h3>
                <p className="text-[#605A57]">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <motion.div
                  className="absolute left-6 top-20 w-0.5 h-16 bg-gradient-to-b from-[#37322F] to-transparent"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
