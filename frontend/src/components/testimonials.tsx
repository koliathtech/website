"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    image: "/professional-woman-software-engineer.png",
    quote:
      "KoliathTech has been the best career decision I've made. The culture of innovation and the supportive team environment have helped me grow both professionally and personally.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Product Designer",
    department: "Design",
    image: "/professional-man-product-designer.jpg",
    quote:
      "The creative freedom and collaborative spirit here are unmatched. I'm constantly inspired by my colleagues and the meaningful work we do together.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Engineering Manager",
    department: "Engineering",
    image: "/professional-woman-engineering-manager.jpg",
    quote:
      "Leading a team at KoliathTech has been incredibly rewarding. The company truly invests in its people and provides the resources needed to succeed.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Park",
    role: "Backend Engineer",
    department: "Engineering",
    image: "/professional-man-backend-engineer.jpg",
    quote:
      "The technical challenges are exciting, and the work-life balance is real. I've learned more in my first year here than in my previous three years combined.",
    rating: 5,
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Product Manager",
    department: "Product",
    image: "/professional-woman-product-manager.png",
    quote:
      "KoliathTech empowers me to make impactful decisions and truly own my product. The cross-functional collaboration is seamless and effective.",
    rating: 5,
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">What Our Team Says</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Hear from the people who make KoliathTech an amazing place to work.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-12 bg-card border-border">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20">
                        <img
                          src={currentTestimonial.image || "/placeholder.svg"}
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="mb-4">
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 fill-primary"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                        "{currentTestimonial.quote}"
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold">{currentTestimonial.name}</h4>
                      <p className="text-muted-foreground">
                        {currentTestimonial.role} • {currentTestimonial.department}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-border hover:bg-secondary hover:border-primary/50 bg-transparent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-border hover:bg-secondary hover:border-primary/50 bg-transparent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Counter */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
