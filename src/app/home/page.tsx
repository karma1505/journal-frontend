"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollDownButton from "../../components/ScrollDownButton";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 z-9">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl mx-auto gap-6 sm:gap-8 lg:gap-12 relative mt-16 lg:mt-24">
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-gray-300 z-9 pointer-events-none -top-24 hidden lg:block"
          style={{ height: "calc(100% + 16rem)" }}
        />
        <motion.div
          className="flex-shrink-0 order-1 lg:order-none"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <Image
            src="/hero.jpg"
            alt="Hero"
            width={384}
            height={384}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl drop-shadow-lg"
          />
        </motion.div>
        <motion.div
          className="flex-1 text-center lg:text-left text-gray-900 lg:ml-16 relative order-2 lg:order-none px-2 sm:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="relative z-10">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 underline underline-offset-4 sm:underline-offset-8 decoration-gray-900 leading-tight">
              Welcome to My Developer Journal
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
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