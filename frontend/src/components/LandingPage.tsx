import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-b-gray-200/50 dark:border-b-gray-700/50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-10 py-3">
        <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
          <div className="size-6 text-primary">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8.41 15l2.58 2.59L11 19.93zm6.91-1.45L13.41 14 12 12.59 14.59 10l4.32 4.32c-.41 1.29-1.12 2.44-2.09 3.42z"></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold">Koliath Technology</h2>
        </div>

        <nav className="flex flex-1 justify-end gap-9">
          <a href="#" className="text-sm text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark">
            Services
          </a>
          <a href="#" className="text-sm text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark">
            About
          </a>
          <a href="#" className="text-sm text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark">
            Testimonials
          </a>
          <a href="#" className="text-sm text-subtext-light dark:text-subtext-dark hover:text-text-light dark:hover:text-text-dark">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center p-4 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%), url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop")',
        }}
      >
        <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-[-0.033em]">
          Innovation for a Better Tomorrow
        </h1>
        <h2 className="text-gray-200 text-lg md:text-xl mt-4">
          Koliath Technology delivers cutting-edge solutions to solve the world's
          most complex problems.
        </h2>
        <div className="flex justify-center gap-4 mt-6">
          <button className="h-12 px-6 rounded-full bg-primary text-white font-semibold hover:bg-blue-600 transition-colors">
            Learn More
          </button>
          <button className="h-12 px-6 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 backdrop-blur-sm transition-colors">
            Get a Demo
          </button>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-white dark:bg-background-dark text-subtext-light dark:text-subtext-dark border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto py-12 px-4 text-center">
          <p className="text-sm">
            © 2024 Koliath Technology. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
