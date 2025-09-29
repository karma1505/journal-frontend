"use client";
import { motion } from "framer-motion";

export default function ScrollDownButton({ targetId = "lower-view" }) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#a06a37] text-white flex items-center justify-center shadow-lg z-50 cursor-pointer transition-colors hover:bg-[#8B5C2A] mobile-button"
      aria-label="Scroll Down"
    >
      <svg width="24" height="24" className="sm:w-8 sm:h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </motion.button>
  );
}
