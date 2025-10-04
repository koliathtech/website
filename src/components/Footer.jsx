 import React from 'react' 
 export default function Footer() 
 { return (

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
        <p className="text-gray-400 text-sm">Sharing knowledge and insights on modern web development.</p>
      </div>

      <div>
        <h5 className="font-semibold mb-4">Quick Links</h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">Home</a></li>
          <li><a href="#" className="hover:text-white transition">About</a></li>
          <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
        </ul>
      </div>

      <div>
        <h5 className="font-semibold mb-4">Categories</h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">Development</a></li>
          <li><a href="#" className="hover:text-white transition">Design</a></li>
          <li><a href="#" className="hover:text-white transition">Architecture</a></li>
        </ul>
      </div>

      <div>
        <h5 className="font-semibold mb-4">Connect</h5>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">Twitter</a></li>
          <li><a href="#" className="hover:text-white transition">GitHub</a></li>
          <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
      <p>© 2024 DevBlog. All rights reserved. Made with ❤️ for developers</p>
    </div>
  </div>
</footer>
 )
}
