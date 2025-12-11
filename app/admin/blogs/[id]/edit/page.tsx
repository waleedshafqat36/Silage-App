"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/Admin/AdminLayout";
import { showToast } from "@/components/Toast/Toast";
import { useSession } from "next-auth/react";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    status: "published" as "published" | "draft",
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch blog data on mount
  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/login");
      return;
    }

    if ((session.user as { role?: string })?.role !== "admin") {
      showToast("Only admins can edit blogs", "error");
      router.push("/");
      return;
    }

    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router, blogId]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${blogId}`);
      if (!res.ok) throw new Error("Failed to fetch blog");
      const data = await res.json();
      const blog = data.blog || data;

      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        status: blog.status || "published",
      });
    } catch (error) {
      console.error("Error fetching blog:", error);
      showToast("Failed to load blog", "error");
      router.back();
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.title.trim().length < 3) {
      showToast("Blog title must be at least 3 characters", "error");
      return;
    }

    if (formData.content.trim().length < 10) {
      showToast("Blog content must be at least 10 characters", "error");
      return;
    }

    setLoading(true);
    showToast("Updating blog...", "info");

    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.substring(0, 150),
          status: formData.status,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update blog");

      showToast("Blog updated successfully!", "success");
      router.push("/admin/blogs");
    } catch (error) {
      console.error("Update error:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to update blog",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">✏️ Edit Blog</h1>
            <p className="text-gray-600 mt-2">Update your blog post details</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 font-medium"
              />
              <p className="text-gray-500 text-sm mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Excerpt (Preview){" "}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Short summary of the blog..."
                rows={2}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 resize-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                rows={10}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 resize-none font-mono text-sm"
              />
              <p className="text-gray-500 text-sm mt-1">
                {formData.content.length}/5000 characters
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-75"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
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
                    Updating...
                  </>
                ) : (
                  <>
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
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Update Blog
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
