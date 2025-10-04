export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <section
                className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center p-4 text-center bg-cover bg-center"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%), url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop")',
                }}
            >
                <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight">
                    Innovation for a Better Tomorrow
                </h1>
                <h2 className="text-gray-200 text-lg md:text-xl mt-4 max-w-2xl">
                    Koliath Technology delivers cutting-edge solutions to solve
                    the world's most complex problems.
                </h2>
                <div className="flex justify-center gap-4 mt-8">
                    <button className="h-12 px-8 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all hover:scale-105">
                        Learn More
                    </button>
                    <button className="h-12 px-8 rounded-full bg-white/20 text-white font-semibold hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-105">
                        Get a Demo
                    </button>
                </div>
            </section>

            <footer className="bg-white text-gray-600 border-t border-gray-200">
                <div className="max-w-5xl mx-auto py-12 px-4 text-center">
                    <p className="text-sm">
                        © 2025 Koliath Technology. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
