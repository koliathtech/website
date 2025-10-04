export const About: React.FC = () => (
    <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
            {/* Hero Section */}
            <div className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 leading-tight">
                    We build technology that matters
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Founded in 2020, Koliath Technology has been at the
                    forefront of innovation, creating solutions that transform
                    industries and improve lives around the world.
                </p>
            </div>

            {/* Mission Section */}
            <div className="mb-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We believe technology should be accessible,
                            intuitive, and transformative. Our mission is to
                            create products that seamlessly integrate into
                            people's lives while pushing the boundaries of
                            what's possible.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Every day, we work to bridge the gap between complex
                            technology and simple user experiences, ensuring our
                            solutions are both powerful and easy to use.
                        </p>
                    </div>
                    <div className="h-96 bg-gray-100 rounded-2xl overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                            alt="Team collaboration"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-semibold text-gray-900 mb-12 text-center">
                    Our Values
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <div className="w-12 h-12 bg-black rounded-xl mb-6 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Innovation First
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            We constantly challenge ourselves to think
                            differently and explore new possibilities that push
                            the industry forward.
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <div className="w-12 h-12 bg-black rounded-xl mb-6 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            People Centered
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our products are designed with empathy, always
                            keeping the end user's needs and experiences at the
                            heart of everything we create.
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                        <div className="w-12 h-12 bg-black rounded-xl mb-6 flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Quality Always
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            We never compromise on quality. Every detail
                            matters, and we're committed to delivering
                            excellence in every project we undertake.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-20">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="h-96 bg-gray-100 rounded-2xl overflow-hidden order-2 md:order-1">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                            alt="Modern office"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                            Our Team
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We're a diverse group of designers, engineers, and
                            problem solvers united by a common goal: creating
                            technology that makes a difference.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            With backgrounds spanning multiple industries and
                            disciplines, we bring unique perspectives to every
                            challenge we face.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Our collaborative culture encourages innovation and
                            creativity, ensuring that the best ideas always rise
                            to the top.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-black text-white rounded-3xl p-12 mb-20">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold mb-2">500+</div>
                        <div className="text-gray-400">Projects Delivered</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">50+</div>
                        <div className="text-gray-400">Team Members</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">25+</div>
                        <div className="text-gray-400">Countries Served</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">99%</div>
                        <div className="text-gray-400">Client Satisfaction</div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                    Want to work with us?
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    We're always looking for talented individuals who share our
                    passion for innovation and excellence.
                </p>
                <button className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105">
                    Join Our Team
                </button>
            </div>
        </div>
    </div>
)
