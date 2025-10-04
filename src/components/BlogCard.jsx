 import React from 'react'
import { Clock, Eye, Heart, MessageCircle, Bookmark } from 'lucide-react'

export default function BlogCard({ post, toggleLike, toggleBookmark, likedPosts, bookmarkedPosts }) {
  const liked = likedPosts.has(post.id)
  const bookmarked = bookmarkedPosts.has(post.id)

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group w-full">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => toggleBookmark(post.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="bookmark"
        >
          <Bookmark
            className={`w-4 h-4 ${bookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-600'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-3">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {post.category}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">
          {post.excerpt}
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {post.views}
          </span>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex items-center hover:text-red-500 transition"
              aria-label="like"
            >
              <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {post.comments}
            </span>
          </div>
        </div>

        {/* Author info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full" />
            <span className="text-sm font-medium text-gray-700">{post.author}</span>
          </div>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
      </div>
    </article>
  )
}
