"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_ENDPOINTS } from "../../config/api";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_path?: string;
}

export default function BlogListPage() {
  const listRef = useRef(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ENTRIES);
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const data = await response.json();
        console.log('Fetched blog posts:', data);
        setBlogPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching blog posts:', err);
      }
    };

    fetchBlogPosts();
  }, []);


  // Error state
  if (error) {
    return (
      <main className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog Posts</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }


  return (
    <div className="min-h-screen">
      {/* Back to Home link in top-left corner */}
      <div className="fixed top-4 left-4 z-10">
        <Link 
          href="/" 
          className="inline-flex items-center px-3 py-2 sm:px-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-gray-600 hover:text-gray-900 hover:bg-white transition-all duration-200 border border-gray-200 text-sm sm:text-base mobile-button"
        >
          ← Back To Home
        </Link>
      </div>

      <main className="max-w-6xl mx-auto py-16 px-4">
        <div className="mb-8 sm:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-center text-gray-900"
          >
            All Blog Posts
          </motion.h1>
        </div>

      {/* Header - Hidden on mobile, shown on desktop */}
      <div className="hidden md:grid grid-cols-[240px_1fr_200px] gap-6 mb-6 px-4 text-sm font-semibold text-gray-500 border-b pb-2">
        <div>Image</div>
        <div>Title & Description</div>
        <div>Published Date</div>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4 sm:space-y-8">
        {blogPosts.map((post) => {
          console.log('Rendering post:', post);
          const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const excerpt = post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content;
          const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          const imageUrl = post.image_path 
            ? API_ENDPOINTS.IMAGE_URL(post.image_path) 
            : `https://source.unsplash.com/random/400x300?sig=${post.id}`;

          console.log('Post image_path:', post.image_path);
          console.log('Generated Image URL:', imageUrl);
          console.log('Title:', post.title);
          console.log('Content:', post.content);

          return (
            <Link key={post.id} href={`/blogs/${slug}`} className="block">
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                {/* Mobile Layout */}
                <div className="flex flex-col md:hidden gap-4">
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {post.image_path ? (
                      <Image 
                        src={imageUrl} 
                        alt={post.title} 
                        width={400}
                        height={192}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">📝</div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                    <time className="text-gray-500 text-sm block mb-2">{publishedDate}</time>
                    <p className="text-gray-600 text-sm">{excerpt}</p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex gap-6">
                  {/* Image */}
                  <div className="w-48 h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {post.image_path ? (
                      <Image 
                        src={imageUrl} 
                        alt={post.title} 
                        width={192}
                        height={144}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">📝</div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
                      <time className="text-gray-500 text-sm">{publishedDate}</time>
                    </div>
                    <p className="text-gray-600">{excerpt}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      </main>
    </div>
  );
}