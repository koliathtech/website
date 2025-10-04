 import React, { useState } from 'react';
import Header from '../components/Header';
import FeaturedPost from '../components/FeaturedPost';
import BlogCard from '../components/BlogCard';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function BlogFoundation() {
  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Modern Web Development",
      excerpt: "Learn the fundamentals...",
      author: "Sarah Chen",
      date: "Oct 1, 2024",
      readTime: "5 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      likes: 234,
      comments: 45,
      views: 1520,
      featured: true,
    },
    {
      id: 2,
      title: "The Art of Clean Code Architecture",
      excerpt: "Discover patterns...",
      author: "Mike Johnson",
      date: "Sep 28, 2024",
      readTime: "8 min read",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop",
      likes: 189,
      comments: 32,
      views: 980,
    },
    {
      id: 3,
      title: "Performance Optimization Techniques",
      excerpt: "Essential strategies...",
      author: "Emily Rodriguez",
      date: "Sep 25, 2024",
      readTime: "6 min read",
      category: "Performance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      likes: 312,
      comments: 58,
      views: 1840,
    },
    {
      id: 4,
      title: "Understanding React Hooks in Depth",
      excerpt: "A comprehensive guide...",
      author: "David Kim",
      date: "Sep 22, 2024",
      readTime: "10 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      likes: 445,
      comments: 72,
      views: 2340,
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox: When to Use What",
      excerpt: "Learn the best use cases...",
      author: "Lisa Zhang",
      date: "Sep 20, 2024",
      readTime: "7 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop",
      likes: 267,
      comments: 41,
      views: 1450,
    },
    {
      id: 6,
      title: "Building Secure APIs with Node.js",
      excerpt: "Best practices for securing...",
      author: "James Wilson",
      date: "Sep 18, 2024",
      readTime: "9 min read",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      likes: 198,
      comments: 36,
      views: 1120,
    },
  ];

  const trendingPosts = [
    { id: 1, title: "10 JavaScript Tips You Need to Know", views: 5420 },
    { id: 2, title: "The Future of Web Development", views: 4830 },
    { id: 3, title: "Mastering TypeScript", views: 4210 },
    { id: 4, title: "Design Systems 101", views: 3890 },
  ];

  const recentComments = [
    { author: "Alex Thompson", post: "Getting Started with Modern Web Development", comment: "Great article! Really helpful..." },
    { author: "Maria Garcia", post: "The Art of Clean Code", comment: "Thanks for sharing these insights..." },
    { author: "Ryan Lee", post: "Performance Optimization", comment: "This helped me solve my issue..." },
  ];

  const categories = ["All", "Development", "Architecture", "Performance", "Design"];

  // Handlers
  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 2500);
  };

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // ✅ Return layout
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className= "w-full px-6 py-8">
        {/* Featured Post */}
        <div className="mb-12">
          <FeaturedPost post={blogPosts[0]} />
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog posts and sidebar */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({Math.max(0, filteredPosts.length - 1)})
                </span>
              </h2>

              <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Trending</option>
                <option>Most Liked</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.slice(1).map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  toggleLike={toggleLike}
                  toggleBookmark={toggleBookmark}
                  likedPosts={likedPosts}
                  bookmarkedPosts={bookmarkedPosts}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
                Load More Articles
              </button>
            </div>
          </div>

          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            trendingPosts={trendingPosts}
            recentComments={recentComments}
            email={email}
            setEmail={setEmail}
            subscribed={subscribed}
            handleSubscribe={handleSubscribe}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
