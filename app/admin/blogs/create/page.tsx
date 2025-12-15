"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { showToast } from "@/components/Toast/Toast";
import AdminLayout from "@/components/Admin/AdminLayout";

export default function CreateBlogPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
  });

  const handleImagePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (!file) return;

        showToast("Converting image to base64...", "info");
        
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          const imgMarkdown = `\n![image](${base64})\n`;
          
          if (contentRef.current) {
            const textarea = contentRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = formData.content.substring(0, start);
            const after = formData.content.substring(end);
            
            const newContent = before + imgMarkdown + after;
            setFormData((prev) => ({
              ...prev,
              content: newContent,
            }));
            
            showToast("✅ Image added to content!", "success");
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        showToast("Converting image to base64...", "info");
        
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64 = event.target?.result as string;
          const imgMarkdown = `\n![image](${base64})\n`;
          
          if (contentRef.current) {
            const textarea = contentRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = formData.content.substring(0, start);
            const after = formData.content.substring(end);
            
            const newContent = before + imgMarkdown + after;
            setFormData((prev) => ({
              ...prev,
              content: newContent,
            }));
            
            showToast("✅ Image added to content!", "success");
          }
        };
        reader.readAsDataURL(file);
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      showToast("Title is required", "error");
      return false;
    }
    if (formData.title.length < 3) {
      showToast("Title must be at least 3 characters", "error");
      return false;
    }
    if (!formData.content.trim()) {
      showToast("Content is required", "error");
      return false;
    }
    if (formData.content.length < 10) {
      showToast("Content must be at least 10 characters", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    showToast("Creating blog...", "info");

    try {
      const res = await fetch("/api/admin/blogs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.substring(0, 150),
          author:
            (session?.user as { name?: string; id?: string })?.name ||
            "Anonymous",
          authorId: (session?.user as { name?: string; id?: string })?.id || "",
          status: "published",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create blog");
      }

      showToast("Blog created successfully! 🎉", "success");
      setFormData({ title: "", content: "", excerpt: "" });

      setTimeout(() => {
        router.push("/admin/blogs");
      }, 1500);
    } catch (error) {
      console.error("[Create Blog Error]:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to create blog",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            📝 Create New Blog
          </h1>
          <p className="text-gray-600 mt-2">
            Write and publish a new blog post for your audience
          </p>
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
              <div className="mb-3 flex gap-3 items-center flex-wrap">
                <div className="flex-1 min-w-max p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Tip:</strong> You can paste images directly into content with Ctrl+V.
                  </p>
                </div>
              </div>
              <textarea
                ref={contentRef}
                name="content"
                value={formData.content}
                onChange={handleChange}
                onPaste={handleImagePaste}
                placeholder="Write your blog content here... (You can paste images here)"
                rows={10}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 resize-none font-mono text-sm"
              />
              <p className="text-gray-500 text-sm mt-1">
                {formData.content.length}/5000 characters
              </p>
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
                    Publishing...
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
                    Publish Blog
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
