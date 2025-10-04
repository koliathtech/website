 import React from 'react';

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = [
    'All',
    'Technology',
    'Programming',
    'Design',
    'AI',
    'Lifestyle',
  ];

  const trendingPosts = [
    { id: 1, title: 'Mastering React Hooks in 2025', date: 'Oct 1, 2025' },
    { id: 2, title: 'Top 10 AI Tools for Developers', date: 'Sep 28, 2025' },
    { id: 3, title: 'Design Trends Shaping 2025', date: 'Sep 25, 2025' },
  ];

  const comments = [
    { id: 1, name: 'Ravi', text: 'This article really helped me!' },
    { id: 2, name: 'Priya', text: 'Loved the explanation on AI tools.' },
    { id: 3, name: 'Amit', text: 'Thanks for sharing your insights!' },
  ];

  return (
    <aside className="space-y-8">
      {/* 📂 Categories */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
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

      {/* 📰 Newsletter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Subscribe to Newsletter
        </h3>
        <p className="text-gray-600 mb-3 text-sm">
          Get the latest articles delivered directly to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Subscribe
        </button>
      </div>

      {/* 🔥 Trending Posts */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Trending Posts
        </h3>
        <ul className="space-y-3">
          {trendingPosts.map((post) => (
            <li key={post.id} className="hover:text-blue-600 cursor-pointer">
              <h4 className="font-medium">{post.title}</h4>
              <p className="text-sm text-gray-500">{post.date}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* 💬 Recent Comments */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Recent Comments
        </h3>
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id}>
              <p className="text-sm">
                <span className="font-semibold text-gray-800">{c.name}</span> —{' '}
                <span className="text-gray-600">{c.text}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
