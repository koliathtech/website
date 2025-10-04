import React from 'react'
import { Calendar, Eye, Heart, MessageCircle, ArrowRight } from 'lucide-react'

export default function FeaturedPost({ post }) {
  if (!post) return null
  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">{post.category}</span>
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" />{post.date}</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition">{post.title}</h2>
          <p className="text-gray-600 mb-4 text-lg">{post.excerpt}</p>

          <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
            <span className="flex items-center"><Eye className="w-4 h-4 mr-1" />{post.views}</span>
            <span className="flex items-center"><Heart className="w-4 h-4 mr-1" />{post.likes}</span>
            <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" />{post.comments}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">{post.readTime}</p>
              </div>
            </div>

            <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
              Read More <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
