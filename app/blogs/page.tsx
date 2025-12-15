"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorId: string;
  thumbnail: string;
  status: "published" | "draft";
  createdAt: string;
  views: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    fetchBlogs();
  }, [session, router]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      // Filter for published blogs only
      const publishedBlogs = Array.isArray(data) 
        ? data.filter((blog: Blog) => blog.status === "published")
        : (data.blogs || []).filter((blog: Blog) => blog.status === "published");
      setBlogs(publishedBlogs);
      setFilteredBlogs(publishedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        blog.author.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term)
    );
    setFilteredBlogs(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            All Blogs
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover insightful articles and stories from our expert
            contributors. Learn about the latest in farming and agricultural
            technology.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <input
              type="text"
              placeholder="Search blogs by title, author, or content..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-900 font-medium"
            />
            <p className="text-gray-600 text-sm mt-2">
              Found {filteredBlogs.length} blog
              {filteredBlogs.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog._id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-400"
              >
                {/* Blog Card */}
                <div className="h-full flex flex-col">


                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Status Badge */}
                    <div className="mb-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150)}...
                    </p>


                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">
                          {blog.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                          {blog.views}
                        </span>
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17c0 5.25 3.07 9.772 7.555 11.979M12 6.253c5.5 0 10 4.745 10 10.747 0 5.25-3.07 9.772-7.555 11.979"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or check back later for new
              content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
