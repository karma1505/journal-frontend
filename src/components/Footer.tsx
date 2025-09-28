"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#242323] text-white py-6 text-center mt-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Developer Journal. All rights reserved.</p>
        <div className="mt-2 flex gap-4">
          <a href="tel:+919999098900" className="hover:underline">Contact Me: +91 9999098900</a>
        </div>
      </div>
    </footer>
  );
}
