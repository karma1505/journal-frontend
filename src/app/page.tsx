"use client";
import BlogsPage from "@/blogs/page";
import HomePage from "./home/page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainTemplate() {
  return (
    <>
      <Navbar />
      <HomePage />
      <BlogsPage />
      <Footer />
    </>
  );
}
