"use client";

import { motion } from "framer-motion";
import ScrollDownButton from "../../components/ScrollDownButton";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 z-9">
      <div className="flex flex-row items-center justify-center w-full max-w-4xl mx-auto gap-12 relative mt-24">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-gray-300 z-9 pointer-events-none -top-24"
          style={{ height: "calc(100% + 16rem)" }}
        />
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <img
            src="/hero.jpg"
            alt="Hero"
            className="w-96 h-96 object-cover rounded-2xl shadow-2xl drop-shadow-lg"
          />
        </motion.div>
        <motion.div
          className="flex-1 text-left text-gray-900 ml-16 relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4 underline underline-offset-8 decoration-gray-900">
              Welcome to My Developer Journal
            </h1>
            <p className="text-lg text-gray-700">
              This is a simple space to share my journey, ideas, and progress as a developer.
              Explore my blogs and ideas to learn more about my work and interests.
            </p>
          </div>
        </motion.div>
      </div>
      <ScrollDownButton targetId="blogs-section" />
    </main>
  );
}