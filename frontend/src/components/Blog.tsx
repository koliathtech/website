import React, { useState } from "react"
import { ArrowRight, Calendar, Clock } from "lucide-react"

interface Blog {
    id: number
    title: string
    content: string
    date: string
    readTime: string
    image: string
}

const AppleBlog: React.FC = () => {
    const [selectedBlog, setSelectedBlog] = useState(0)

    const blogs: Blog[] = [
        {
            id: 1,
            title: "Introducing Our Revolutionary Product Line",
            content: `We're excited to announce the launch of our newest product line, designed with innovation and simplicity at its core. After months of careful development and testing, we've created something truly special.

Our team has worked tirelessly to ensure every detail meets our high standards. From the sleek design to the intuitive functionality, every aspect has been crafted with precision and care.

This represents a new chapter in our journey, one that we're incredibly proud to share with you. The response from early testers has been overwhelmingly positive, and we can't wait for everyone to experience it.

We believe in creating products that seamlessly integrate into your life, making everyday tasks simpler and more enjoyable. This launch embodies that philosophy completely.

Thank you for being part of our community. Your support and feedback continue to drive us forward, inspiring us to push boundaries and explore new possibilities.`,
            date: "October 5, 2025",
            readTime: "3 min read",
            image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200&h=600&fit=crop",
        },
        {
            id: 2,
            title: "The Future of Design: Minimalism and Function",
            content: `Design is more than aesthetics—it's about creating experiences that feel natural and effortless. We've always believed that the best design is the one you don't notice.

In today's fast-paced world, simplicity has become a luxury. We're committed to cutting through the noise and delivering products that respect your time and attention.

Our design philosophy centers on three core principles: clarity, efficiency, and elegance. Every element serves a purpose, and every interaction is intentional.

We've learned that removing complexity is often harder than adding features. It requires discipline and a deep understanding of what truly matters to our users.

Looking ahead, we're more excited than ever about the possibilities. Technology continues to evolve, but our commitment to thoughtful, user-centered design remains constant.`,
            date: "September 28, 2025",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop",
        },
        {
            id: 3,
            title: "Building a Sustainable Tomorrow",
            content: `Sustainability isn't just a buzzword for us—it's a responsibility we take seriously. Every decision we make considers the environmental impact for generations to come.

We've implemented comprehensive recycling programs across our facilities and are constantly exploring new materials that reduce our carbon footprint without compromising quality.

Our commitment extends beyond our own operations. We work closely with suppliers to ensure they meet our strict environmental standards, creating a ripple effect throughout the industry.

Innovation and sustainability go hand in hand. We're investing heavily in research to develop new manufacturing processes that are both efficient and environmentally friendly.

This is a journey, not a destination. While we're proud of the progress we've made, we know there's always more work to be done. Together, we can make a difference.`,
            date: "September 15, 2025",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=600&fit=crop",
        },
    ]

    const currentBlog = blogs[selectedBlog]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Company Blog
                    </h1>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="lg:sticky lg:top-8 space-y-2">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                                Recent Posts
                            </h2>
                            {blogs.map((blog, index) => (
                                <button
                                    key={blog.id}
                                    onClick={() => setSelectedBlog(index)}
                                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
                                        selectedBlog === index
                                            ? "bg-black text-white"
                                            : "hover:bg-gray-50 text-gray-700"
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3
                                                className={`font-medium mb-1 line-clamp-2 ${
                                                    selectedBlog === index
                                                        ? "text-white"
                                                        : "text-gray-900"
                                                }`}
                                            >
                                                {blog.title}
                                            </h3>
                                            <p
                                                className={`text-sm ${
                                                    selectedBlog === index
                                                        ? "text-gray-300"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {blog.date}
                                            </p>
                                        </div>
                                        <ArrowRight
                                            className={`w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 flex-shrink-0 ${
                                                selectedBlog === index
                                                    ? "text-white"
                                                    : "text-gray-400"
                                            }`}
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <article className="animate-fadeIn">
                            {/* Hero Image */}
                            <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden bg-gray-100">
                                <img
                                    src={currentBlog.image}
                                    alt={currentBlog.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            {/* Meta Information */}
                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {currentBlog.date}
                                </span>
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    {currentBlog.readTime}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8 leading-tight">
                                {currentBlog.title}
                            </h1>

                            {/* Content */}
                            <div className="prose prose-lg max-w-none">
                                {currentBlog.content
                                    .split("\n\n")
                                    .map((paragraph, index) => (
                                        <p
                                            key={index}
                                            className="text-gray-700 leading-relaxed mb-6 text-lg"
                                            style={{
                                                animationDelay: `${
                                                    index * 100
                                                }ms`,
                                            }}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                            </div>

                            {/* Divider */}
                            <div className="mt-12 pt-12 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <button
                                        disabled={selectedBlog === 0}
                                        onClick={() =>
                                            setSelectedBlog(selectedBlog - 1)
                                        }
                                        className="flex items-center text-gray-900 hover:text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed group"
                                    >
                                        <ArrowRight className="w-5 h-5 mr-2 rotate-180 transition-transform group-hover:-translate-x-1" />
                                        <span className="font-medium">
                                            Previous
                                        </span>
                                    </button>
                                    <button
                                        disabled={
                                            selectedBlog === blogs.length - 1
                                        }
                                        onClick={() =>
                                            setSelectedBlog(selectedBlog + 1)
                                        }
                                        className="flex items-center text-gray-900 hover:text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed group"
                                    >
                                        <span className="font-medium">
                                            Next
                                        </span>
                                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    </main>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
        </div>
    )
}

export default AppleBlog
