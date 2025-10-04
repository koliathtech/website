import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Blog</h1>
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-gray-600">
            <p className="text-xl mb-8">Coming Soon!</p>
            <p>Stay tuned for insightful articles about technology, development, and innovation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
