"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#242323] border-b border-[#eaeaea] shadow z-10">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-center gap-8 py-3 text-[1.1rem] font-medium tracking-wide">
        {navLinks.map(link => (
          <motion.a
            key={link.href}
            href={link.href}
            className="text-white px-4 py-2 rounded-full"
            whileHover={{
              scale: 1.08,
              backgroundColor: "#a06a37",
              boxShadow: "0 4px 16px rgba(160,106,55,0.15)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-white font-bold text-lg">Journal</div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 mobile-button"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#242323] border-t border-gray-600"
          >
            <div className="px-4 py-2 space-y-1">
              {navLinks.map(link => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="block text-white px-4 py-3 rounded-lg hover:bg-[#a06a37] transition-colors mobile-button"
                  onClick={() => setIsMenuOpen(false)}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
