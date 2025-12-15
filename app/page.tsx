"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/Landing/HeroSection";
import AboutSection from "@/components/Landing/AboutSection";
import WhyChooseSection from "@/components/Landing/WhyChooseSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import Footer from "@/components/Landing/Footer";

export default function Home() {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <main className="bg-white">
      <Navbar />
      
      {/* Admin Dashboard Section - Show for admins BEFORE landing page */}
      {isAdmin && (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Admin Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-2 rounded-full text-sm font-bold text-white mb-4">
                🌾 ADMIN INTERFACE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to KM Silage
                <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Manage your blogging platform with professional admin tools. Create, publish, and manage blog content effortlessly.
              </p>
            </div>

            {/* Admin Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Blog Management Card */}
              <div className="group bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-400/30 rounded-2xl p-8 hover:border-blue-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-white mb-3">Blog Management</h3>
                <p className="text-gray-300 mb-6">Create, edit, and delete blog posts with ease. Control publication status and reach your audience.</p>
                <a href="/admin/blogs" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 font-semibold transition-colors">
                  Manage Blogs →
                </a>
              </div>

              {/* User Management Card */}
              <div className="group bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-400/30 rounded-2xl p-8 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-white mb-3">User Management</h3>
                <p className="text-gray-300 mb-6">Manage user accounts, assign roles, and control admin permissions across your platform.</p>
                <a href="/admin/users" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 font-semibold transition-colors">
                  Manage Users →
                </a>
              </div>

              {/* Statistics Card */}
              <div className="group bg-gradient-to-br from-green-900/50 to-green-800/30 border border-green-400/30 rounded-2xl p-8 hover:border-green-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-white mb-3">Dashboard</h3>
                <p className="text-gray-300 mb-6">View real-time statistics, blog metrics, user analytics, and platform insights at a glance.</p>
                <a href="/admin" className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 font-semibold transition-colors">
                  View Dashboard →
                </a>
              </div>

              {/* Settings Card */}
              <div className="group bg-gradient-to-br from-orange-900/50 to-orange-800/30 border border-orange-400/30 rounded-2xl p-8 hover:border-orange-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold text-white mb-3">Analytics</h3>
                <p className="text-gray-300 mb-6">Track blog performance, engagement metrics, and user behavior with detailed analytics reports.</p>
                <a href="/admin/stats" className="inline-flex items-center gap-2 text-orange-300 hover:text-orange-200 font-semibold transition-colors">
                  View Analytics →
                </a>
              </div>
            </div>

            {/* Quick Stats Section */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-2xl p-12 mb-12">
              <h2 className="text-3xl font-bold text-white mb-8">Platform Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">24/7</div>
                  <p className="text-gray-300">Always Available</p>
                  <p className="text-gray-400 text-sm mt-2">Access your dashboard anytime, anywhere</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">100%</div>
                  <p className="text-gray-300">Secure</p>
                  <p className="text-gray-400 text-sm mt-2">Enterprise-grade security for your data</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">∞</div>
                  <p className="text-gray-300">Scalable</p>
                  <p className="text-gray-400 text-sm mt-2">Grows with your content needs</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">⚡</div>
                  <p className="text-gray-300">Lightning Fast</p>
                  <p className="text-gray-400 text-sm mt-2">Optimized performance at all times</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <a href="/admin" className="inline-block px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                Go to Admin Dashboard →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Regular Landing Page - Show for all users (admins see this AFTER dashboard, others see it from start) */}
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
