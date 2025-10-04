"use client"

import { motion } from "framer-motion"
import { Card } from "../components/ui/card"
import { Rocket, Users, Heart, TrendingUp, Globe, Zap } from "lucide-react"

const benefits = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "Work on cutting-edge projects that push the boundaries of technology and make a real impact.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a diverse team of talented individuals who support and inspire each other every day.",
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description:
      "Flexible schedules, remote work options, and generous PTO to help you thrive both professionally and personally.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Continuous learning opportunities, mentorship programs, and clear paths for advancement.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Contribute to products and services used by millions of people around the world.",
  },
  {
    icon: Zap,
    title: "Competitive Package",
    description: "Industry-leading compensation, equity options, comprehensive health benefits, and more.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function WhyWorkWithUs() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Why Work With Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            We believe in creating an environment where talent thrives and innovation flourishes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-colors duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
