"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Enhanced blog data with more fields
const blogPosts = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "Lorem Ipsum Blog Post " + (i + 1),
  slug: "lorem-ipsum-blog-post-" + (i + 1),
  excerpt: "This is a brief introduction to the blog post that shows the first fifty characters of the content...",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  publishedDate: new Date(2025, 8, 28 - i).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  image: `https://source.unsplash.com/random/400x300?sig=${i}`,
}));

export default function BlogListPage() {
  const listRef = useRef(null);
  const isInView = useInView(listRef, { amount: 0.1 });

  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center text-gray-900"
        >
          All Blog Posts
        </motion.h1>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[240px_1fr_200px] gap-6 mb-6 px-4 text-sm font-semibold text-gray-500 border-b pb-2">
        <div>Image</div>
        <div>Title & Description</div>
        <div>Published Date</div>
      </div>

      {/* Blog Posts List */}
      <motion.div
        ref={listRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="space-y-8"
      >
        {blogPosts.map((post) => (
          <Link href={`/blogs/${post.slug}`} key={post.id} className="block">
            <motion.div
              layout
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
              className="grid grid-cols-[240px_1fr_200px] gap-6 items-center hover:bg-gray-50 rounded-lg p-4 transition-colors cursor-pointer"
            >
              <div className="w-full aspect-[4/3] overflow-hidden rounded-lg relative">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHL3w6o9VcKrIozFfKzrLlBKvq6rWaxSivpNSq6/9k="
                />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
              </div>

              <time className="text-gray-500">{post.publishedDate}</time>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </main>
  );
}