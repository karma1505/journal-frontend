"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

// This would normally come from an API or database
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

export default function BlogPost() {
  const params = useParams();
  const blog = blogPosts.find(post => post.slug === params.slug);

  if (!blog) {
    return <div>Blog not found</div>;
  }

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
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
              <time className="text-gray-500">{blog.publishedDate}</time>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">{blog.content}</p>
            </div>
          </motion.div>
        </article>
      </motion.main>
    </div>
  );
}