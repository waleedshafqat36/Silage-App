"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/components/Toast/Toast";

interface Blog {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  status: "published" | "draft";
  views: number;
  excerpt?: string;
  thumbnail?: string;
}

interface DeleteConfirmDialog {
  isOpen: boolean;
  blogId: string;
  blogTitle: string;
}

export default function ManageBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft"
  >("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteConfirmDialog>({
    isOpen: false,
    blogId: "",
    blogTitle: "",
  });

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/blogs", {
        cache: "no-store",
      });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : data.blogs || []);
    } catch (error) {
      console.error("[Fetch Blogs Error]:", error);
      showToast("Failed to load blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openDeleteDialog = (id: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      blogId: id,
      blogTitle: title,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      blogId: "",
      blogTitle: "",
    });
  };

  const handleDeleteBlog = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete blog");
      }

      // Remove from state immediately
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
      
      showToast("✅ Blog deleted successfully", "success");
      closeDeleteDialog();
      
      // Refresh to ensure consistency
      setTimeout(() => {
        fetchBlogs();
      }, 500);
    } catch (error) {
      console.error("[Delete Blog Error]:", error);
      showToast(`❌ Failed to delete blog: ${error}`, "error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">📝 Manage Blogs</h1>
          <p className="text-gray-600 mt-2">
            Create, edit, and manage all your blog posts
          </p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Blog
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search blogs by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
          />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as "all" | "published" | "draft")
            }
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 bg-white"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <svg
              className="animate-spin h-12 w-12 text-green-600"
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
          </div>
          <p className="text-gray-600 mt-4">Loading blogs...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-600 text-lg">No blogs found</p>
          <p className="text-gray-500 text-sm mt-2">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter"
              : "Create your first blog to get started"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              {/* Thumbnail */}
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/400x200?text=Blog";
                  }}
                />
              )}

              {/* Content */}
              <div className="p-5 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg line-clamp-2">
                    {blog.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm">By {blog.author}</p>

                {blog.excerpt && (
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>👁️ {blog.views} views</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => router.push(`/blog/${blog._id}`)}
                    className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 font-semibold text-sm rounded-lg hover:bg-blue-200 transition-all duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => router.push(`/admin/blogs/${blog._id}/edit`)}
                    className="flex-1 px-3 py-2 bg-purple-100 text-purple-700 font-semibold text-sm rounded-lg hover:bg-purple-200 transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteDialog(blog._id, blog.title)}
                    disabled={loadingId === blog._id}
                    className={`flex-1 px-3 py-2 font-semibold text-sm rounded-lg transition-all duration-300 ${
                      loadingId === blog._id
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-75"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {loadingId === blog._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Icon */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 flex justify-center">
              <div className="text-5xl">🗑️</div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delete Blog?</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Are you sure you want to delete "{deleteDialog.blogTitle}"?
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-xs text-red-700 font-semibold">
                  ⚠️ This action cannot be undone. The blog will be permanently removed.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
              <button
                onClick={closeDeleteDialog}
                disabled={loadingId === deleteDialog.blogId}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBlog(deleteDialog.blogId)}
                disabled={loadingId === deleteDialog.blogId}
                className={`flex-1 px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
                  loadingId === deleteDialog.blogId
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {loadingId === deleteDialog.blogId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
