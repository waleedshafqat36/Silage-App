"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

interface Blog {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  views: number;
  excerpt?: string;
}

export default function BlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/blogs/${params.id}`);

      if (!res.ok) {
        if (res.status === 404) {
          setError("Blog not found");
        } else {
          setError("Failed to load blog");
        }
        return;
      }

      const data = await res.json();
      setBlog(data.blog);
    } catch (err) {
      console.error("[Fetch Blog Error]:", err);
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <svg
              className="animate-spin h-12 w-12 text-green-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-600 mt-4">Loading blog...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="text-5xl mb-4">😔</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {error || "Blog Not Found"}
            </h1>
            <p className="text-gray-600 mb-6">
              The blog you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <article className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="relative bg-gradient-to-r from-blue-50 to-green-50 py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-white/90 text-gray-900 font-semibold rounded-lg hover:bg-white transition-all duration-300 flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-gray-600 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {blog.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{blog.author}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>

              <div className="hidden sm:block text-gray-300">•</div>

              <div>
                <p className="font-semibold text-gray-900">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-500">Published</p>
              </div>

              <div className="hidden sm:block text-gray-300">•</div>

              <div>
                <p className="font-semibold text-gray-900">{blog.views}</p>
                <p className="text-sm text-gray-500">Views</p>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="mb-12 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg">
              <p className="text-lg text-gray-700 italic">
                &ldquo;{blog.excerpt}&rdquo;
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12 space-y-6">
            {blog.content.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="text-justify text-lg">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author Section */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <div className="flex items-start gap-6 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {blog.author}
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert blogger at KM Silage sharing insights on animal
                  nutrition and silage preservation.
                </p>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t-2 border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 text-center"
              >
                ← Back to Home
              </Link>
              <Link
                href="/#blogs"
                className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 text-center"
              >
                All Blog Posts →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
