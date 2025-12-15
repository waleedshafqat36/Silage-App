"use client";

import AdminLayout from "@/components/Admin/AdminLayout";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Stats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, usersRes] = await Promise.all([
        fetch("/api/admin/blogs"),
        fetch("/api/admin/users"),
      ]);

      const blogs = await blogsRes.json();
      const { users } = await usersRes.json();

      const blogsArray = Array.isArray(blogs) ? blogs : [];
      const publishedCount = blogsArray.filter(b => b.status === "published").length;
      const draftCount = blogsArray.filter(b => b.status === "draft").length;

      setStats({
        totalBlogs: blogsArray.length,
        publishedBlogs: publishedCount,
        draftBlogs: draftCount,
        totalUsers: users?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Welcome Header Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 p-12 text-white shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">🌾 KM Silage Admin Hub</h1>
            <p className="text-lg opacity-90">
              Welcome back! Manage your blogging platform with professional tools and real-time analytics.
            </p>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Blogs */}
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium text-sm">Total Blogs</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{loading ? "-" : stats.totalBlogs}</p>
                <p className="text-xs text-gray-500 mt-2">All published & draft posts</p>
              </div>
              <div className="text-5xl opacity-30 group-hover:scale-110 transition-transform">📝</div>
            </div>
          </div>

          {/* Published Blogs */}
          <div className="group bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium text-sm">Published</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{loading ? "-" : stats.publishedBlogs}</p>
                <p className="text-xs text-gray-500 mt-2">Live on platform</p>
              </div>
              <div className="text-5xl opacity-30 group-hover:scale-110 transition-transform">✅</div>
            </div>
          </div>

          {/* Draft Blogs */}
          <div className="group bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium text-sm">Drafts</p>
                <p className="text-4xl font-bold text-orange-600 mt-2">{loading ? "-" : stats.draftBlogs}</p>
                <p className="text-xs text-gray-500 mt-2">Not yet published</p>
              </div>
              <div className="text-5xl opacity-30 group-hover:scale-110 transition-transform">📄</div>
            </div>
          </div>

          {/* Total Users */}
          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 font-medium text-sm">Total Users</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">{loading ? "-" : stats.totalUsers}</p>
                <p className="text-xs text-gray-500 mt-2">Registered members</p>
              </div>
              <div className="text-5xl opacity-30 group-hover:scale-110 transition-transform">👥</div>
            </div>
          </div>
        </div>

        {/* Main Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">⚡ Quick Actions</h2>

            {/* Create Blog Card */}
            <Link href="/admin/blogs/create" className="group block">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Create New Blog</h3>
                  <span className="text-4xl">✍️</span>
                </div>
                <p className="opacity-90 mb-4">Write and publish engaging blog posts to reach your audience.</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold">
                  Start Writing →
                </div>
              </div>
            </Link>

            {/* Manage Blogs Card */}
            <Link href="/admin/blogs" className="group block">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Manage All Blogs</h3>
                  <span className="text-4xl">📚</span>
                </div>
                <p className="opacity-90 mb-4">Edit, delete, or publish existing blog posts. Control your content.</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold">
                  View All Blogs →
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column - Platform Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">🎯 Platform Tools</h2>

            {/* Manage Users Card */}
            <Link href="/admin/users" className="group block">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Manage Users</h3>
                  <span className="text-4xl">👤</span>
                </div>
                <p className="opacity-90 mb-4">Control user accounts, assign admin roles, and manage permissions.</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold">
                  Manage Users →
                </div>
              </div>
            </Link>

            {/* Analytics Card */}
            <Link href="/admin/stats" className="group block">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">View Analytics</h3>
                  <span className="text-4xl">📊</span>
                </div>
                <p className="opacity-90 mb-4">Track blog performance, user engagement, and detailed statistics.</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold">
                  View Analytics →
                </div>
              </div>
            </Link>

            {/* Image Gallery Card */}
            <Link href="/admin/images" className="group block">
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Image Gallery</h3>
                  <span className="text-4xl">🖼️</span>
                </div>
                <p className="opacity-90 mb-4">Manage and organize all your blog images in one central location.</p>
                <div className="inline-block px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold">
                  View Gallery →
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-gray-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">✨ Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="text-3xl">🔒</div>
              <div>
                <h3 className="font-bold text-gray-900">Secure & Protected</h3>
                <p className="text-gray-600 text-sm">Enterprise-grade security with JWT authentication and encrypted data.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="text-3xl">⚡</div>
              <div>
                <h3 className="font-bold text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Optimized database queries and connection pooling for speed.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-bold text-gray-900">Fully Responsive</h3>
                <p className="text-gray-600 text-sm">Works seamlessly on mobile, tablet, and desktop devices.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="text-3xl">🎨</div>
              <div>
                <h3 className="font-bold text-gray-900">Beautiful Design</h3>
                <p className="text-gray-600 text-sm">Modern UI with smooth animations and professional styling.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex gap-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="font-bold text-gray-900">Real-Time Analytics</h3>
                <p className="text-gray-600 text-sm">Track metrics, user behavior, and content performance instantly.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="flex gap-4">
              <div className="text-3xl">🚀</div>
              <div>
                <h3 className="font-bold text-gray-900">Scalable Platform</h3>
                <p className="text-gray-600 text-sm">Grows with your needs. Handle unlimited content and users.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Creating?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Create your first blog post now and start engaging with your audience. Use our intuitive tools to manage your content.
          </p>
          <Link href="/admin/blogs/create" className="inline-block px-10 py-4 bg-white text-green-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Create Your First Blog →
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
