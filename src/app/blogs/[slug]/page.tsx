"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { API_ENDPOINTS } from "../../../config/api";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_path?: string;
}

export default function BlogPost() {
  const params = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        // First, get all blog posts to find the one with matching slug
        const response = await fetch(API_ENDPOINTS.ENTRIES);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const allPosts = await response.json();
        
        // Find the post that matches the slug
        const foundPost = allPosts.find((post: BlogPost) => {
          const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return slug === params.slug;
        });
        
        if (foundPost) {
          setBlog(foundPost);
          setError(null);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link 
            href="/blogs" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const imageUrl = blog.image_path 
    ? API_ENDPOINTS.IMAGE_URL(blog.image_path) 
    : `https://source.unsplash.com/random/800x400?sig=${blog.id}`;

  console.log('Blog image_path:', blog.image_path);
  console.log('Generated Image URL:', imageUrl);

  return (
    <div className="min-h-screen">
      {/* Back to Blogs link in top-left corner */}
      <div className="fixed top-4 left-4 z-10">
        <Link 
          href="/blogs" 
          className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 border border-gray-200"
        >
          ← Back To All Blogs
        </Link>
      </div>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-16 px-4"
      >
        <article>
          <motion.div
            layoutId={`blog-image-${blog.id}`}
            className="w-full aspect-[16/9] overflow-hidden rounded-2xl mb-8"
          >
            {blog.image_path ? (
              <Image
                src={imageUrl}
                alt={blog.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-6xl">📝</div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
              <time className="text-gray-500">{publishedDate}</time>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
            </div>
          </motion.div>
        </article>
      </motion.main>
    </div>
  );
}