"use client"

import { motion } from "framer-motion"
import { Rocket, Brain, Zap, Database, Smartphone, Shield } from "lucide-react"

const benefits = [
  {
    icon: Rocket,
    title: "AI Strategy & Consulting",
    description: "Align your business goals with cutting-edge AI technologies to drive innovation and growth.",
  },
  {
    icon: Brain,
    title: "Machine Learning Models",
    description: "Custom-trained ML models designed to solve your specific business challenges and optimize workflows.",
  },
  {
    icon: Zap,
    title: "Generative AI Integration",
    description: "Incorporate powerful LLMs and generative capabilities into your existing products and services.",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Build robust, scalable data pipelines to fuel your AI initiatives with clean, reliable data.",
  },
  {
    icon: Smartphone,
    title: "Intelligent App Development",
    description: "Develop smart, intuitive mobile and web applications powered by predictive intelligence.",
  },
  {
    icon: Shield,
    title: "Secure & Compliant AI",
    description: "Ensure your AI solutions meet the highest standards of data privacy, security, and ethical use.",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our AI Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            We transform complex problems into intelligent, scalable solutions for the modern enterprise.
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
                <div className="p-6 h-full border-l-2 border-primary/20 hover:border-primary transition-colors duration-300">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
