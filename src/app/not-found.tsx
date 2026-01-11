"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-grey-50 to-white flex items-center justify-center px-6 sm:px-8 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-8 sm:space-y-12"
                >
                    {/* Main heading */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-grey-900 via-grey-700 to-grey-500 bg-clip-text text-transparent">
                            404
                        </h1>
                    </motion.div>

                    {/* Bilingual poetic message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-xl sm:text-2xl md:text-3xl text-grey-800 font-medium italic leading-relaxed">
                            Esta página se ha perdido en la memoria
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl text-grey-700 italic leading-relaxed">
                            This page has been lost to memory
                        </p>
                    </motion.div>

                    {/* Descriptive text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="space-y-4 max-w-2xl mx-auto"
                    >
                        <p className="text-base sm:text-lg text-grey-700 leading-relaxed">
                            Like an untold story, this page has wandered away from its intended path.
                            Perhaps it's exploring new territories, or maybe it's waiting to be rediscovered.
                        </p>
                        <p className="text-sm sm:text-base text-grey-600 leading-relaxed">
                            Every journey begins with a single step. Let's find your way back home.
                        </p>
                    </motion.div>

                    {/* Navigation buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8"
                    >
                        <Link
                            href="/"
                            className="px-6 py-3 bg-grey-200 hover:bg-grey-300 border border-grey-400 rounded-lg text-grey-900 text-sm sm:text-base font-normal transition-all duration-200 hover:border-grey-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2"
                        >
                            Return Home
                        </Link>
                        <Link
                            href="/contact-us"
                            className="px-6 py-3 bg-transparent hover:bg-grey-100 border border-grey-400 rounded-lg text-grey-800 hover:text-grey-900 text-sm sm:text-base font-normal transition-all duration-200 hover:border-grey-500 focus:outline-none focus:ring-2 focus:ring-grey-500 focus:ring-offset-2"
                        >
                            Get in Touch
                        </Link>
                    </motion.div>

                </motion.div>

            </div>
        </div>
    );
}