"use client";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  return (
  <nav className="fixed top-0 left-0 w-full bg-[#242323] border-b border-[#eaeaea] py-3 shadow flex items-center justify-center gap-8 text-[1.1rem] font-medium tracking-wide z-10">
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
    </nav>
  );
}
