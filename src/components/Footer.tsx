"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#242323] text-white py-6 text-center mt-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center px-4">
        <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} My Developer Journal. All rights reserved.</p>
        <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <a 
            href="tel:+919999098900" 
            className="hover:underline text-sm sm:text-base mobile-button px-2 py-1"
          >
            Contact Me: +91 9999098900
          </a>
        </div>
      </div>
    </footer>
  );
}
