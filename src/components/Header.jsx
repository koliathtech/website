 import React from 'react' 
 import { Search, Menu, X } from 'lucide-react' 
 export default function Header({ 
  showSearch, 
  setShowSearch, searchQuery, 
  setSearchQuery,
   menuOpen, 
   setMenuOpen, 
  })
  { return (
 <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
  <div className="w-full px-6">
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">DevBlog</h1>
      </div>

      <nav className="hidden md:flex space-x-8">
        <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">Articles</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">Categories</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">About</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition font-medium">Contact</a>
      </nav>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        <button className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Write
        </button>

        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </div>

    {showSearch && (
      <div className="pb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    )}

    {menuOpen && (
      <div className="md:hidden py-4 border-t border-gray-200">
        <nav className="flex flex-col space-y-3">
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">Articles</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">Categories</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
        </nav>
      </div>
    )}
  </div>
</header>
  )
  }

