"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { API_ENDPOINTS } from "../config/api";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_path?: string;
}

export default function BlogsPage() {
  const blogRef = useRef(null);
  const headingRef = useRef(null);
  const isBlogsInView = useInView(blogRef, { amount: 0.2 });
  const isHeadingInView = useInView(headingRef, { amount: 0.2 });
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ENTRIES);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        setBlogPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setBlogPosts([]);
      }
    };

    fetchBlogPosts();
  }, []);

  // Only show real blog posts, no empty spaces
  const displayBlogs = blogPosts.slice(0, 6).map((post) => {
    const imageUrl = post.image_path 
      ? API_ENDPOINTS.IMAGE_URL(post.image_path) 
      : `https://source.unsplash.com/random/400x300?sig=${post.id}`;
    
    return {
      id: post.id,
      title: post.title,
      image: imageUrl,
      isReal: true,
      slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    };
  });

  return (
    <main id="blogs-section" className="max-w-6xl mx-auto py-16 px-4">
      <motion.h1 
        ref={headingRef}
        initial={{ opacity: 0, y: -20 }}
        animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold mb-10 text-center text-black"
      >
        My Blogs
      </motion.h1>
      <motion.div 
        ref={blogRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        animate={isBlogsInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {displayBlogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`}>
            <motion.div
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 20,
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-48 relative rounded-lg mb-4 overflow-hidden">
                <Image 
                  src={blog.image} 
                  alt={blog.title} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9SQHL3w6o9VcKrIozFfKzrLlBKvq6rWaxSivpNSq6/9k="
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 w-full text-left">{blog.title}</h2>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <div className="mt-12 flex justify-center">
        <Link href="/blogs" className="text-lg font-semibold text-gray-700 hover:underline">
          Explore All Blogs...
        </Link>
      </div>
    </main>
  );
}