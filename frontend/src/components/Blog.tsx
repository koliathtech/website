
import React, { useState } from 'react';
import {
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  Calendar,
  ArrowRight,
  Search,
  Menu,
  X,
} from 'lucide-react';

// ----------------------- Types -----------------------
interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  likes: number;
  comments: number;
}

// ----------------------- Blog Component -----------------------
const Blog: React.FC = () => {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const posts: Post[] = [
    {
      id: 1,
      title: 'Mastering React Hooks in 2025',
      excerpt: 'Learn advanced React hooks techniques...',
      image: 'https://via.placeholder.com/600x400',
      category: 'Programming',
      author: 'Ravi Kumar',
      date: 'Oct 1, 2025',
      readTime: '5 min read',
      views: 1234,
      likes: 100,
      comments: 12,
    },
    {
      id: 2,
      title: 'Top 10 AI Tools for Developers',
      excerpt: 'AI is changing development workflows...',
      image: 'https://via.placeholder.com/600x400',
      category: 'AI',
      author: 'Priya Sharma',
      date: 'Sep 28, 2025',
      readTime: '7 min read',
      views: 876,
      likes: 75,
      comments: 8,
    },
  ];

  // ----------------------- Handlers -----------------------
  const toggleLike = (id: number) => {
    const newSet = new Set(likedPosts);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setLikedPosts(newSet);
  };

  const toggleBookmark = (id: number) => {
    const newSet = new Set(bookmarkedPosts);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setBookmarkedPosts(newSet);
  };

  // ----------------------- Components -----------------------
  const Header: React.FC = () => (
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
            {['Home', 'Articles', 'Categories', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                {link}
              </a>
            ))}
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
              {['Home', 'Articles', 'Categories', 'About', 'Contact'].map((link) => (
                <a key={link} href="#" className="text-gray-700 hover:text-blue-600 transition">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  const Footer: React.FC = () => (
    <footer className="w-full bg-gray-900 text-white mt-16">
      <div className="w-full px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <h4 className="text-xl font-bold">DevBlog</h4>
            </div>
            <p className="text-gray-400 text-sm">
              Sharing knowledge and insights on modern web development.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Home', 'About', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Categories</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Development', 'Design', 'Architecture'].map((cat) => (
                <li key={cat}>
                  <a href="#" className="hover:text-white transition">{cat}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Connect</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Twitter', 'GitHub', 'LinkedIn'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 DevBlog. All rights reserved. Made with ❤️ for developers</p>
        </div>
      </div>
    </footer>
  );

  const BlogCard: React.FC<{ post: Post }> = ({ post }) => {
    const liked = likedPosts.has(post.id);
    const bookmarked = bookmarkedPosts.has(post.id);

    return (
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group w-full">
        <div className="relative h-52 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <button
            onClick={() => toggleBookmark(post.id)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Bookmark
              className={`w-4 h-4 ${bookmarked ? 'fill-blue-600 text-blue-600' : 'text-gray-600'}`}
            />
          </button>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-center flex-wrap gap-3 text-sm text-gray-600 mb-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" /> {post.readTime}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">{post.excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" /> {post.views}
            </span>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center hover:text-red-500 transition"
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                {post.likes + (liked ? 1 : 0)}
              </button>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" /> {post.comments}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full" />
              <span className="text-sm font-medium text-gray-700">{post.author}</span>
            </div>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
        </div>
      </article>
    );
  };

  // ----------------------- Layout -----------------------
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h3>
              <ul className="space-y-2">
                {['All', 'Technology', 'Programming', 'Design', 'AI', 'Lifestyle'].map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-blue-50 text-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
