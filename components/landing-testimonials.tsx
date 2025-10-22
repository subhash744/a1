"use client"

import { motion } from "framer-motion"

export function LandingTestimonials() {
  const testimonials = [
    {
      quote: "Rigeo helped me connect with amazing creators and showcase my work to the world.",
      author: "Sarah Chen",
      role: "Product Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      quote: "The leaderboard keeps me motivated to build in public and share my progress daily.",
      author: "Alex Rodriguez",
      role: "Full Stack Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      quote: "I've grown my network significantly thanks to the community features on Rigeo.",
      author: "Jordan Kim",
      role: "Indie Hacker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
  ]

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
          <h2 className="text-4xl md:text-5xl font-serif text-[#37322F] mb-4">Loved by Creators</h2>
          <p className="text-lg text-[#605A57]">Hear from independent makers and builders</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-lg border border-[#E0DEDB] hover:shadow-lg transition"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <p className="text-[#605A57] mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-[#37322F]">{testimonial.author}</p>
                  <p className="text-sm text-[#605A57]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
