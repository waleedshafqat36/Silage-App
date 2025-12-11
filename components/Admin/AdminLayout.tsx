"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { showToast } from "@/components/Toast/Toast";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "📊" },
    { label: "Manage Blogs", href: "/admin/blogs", icon: "📝" },
    { label: "Manage Users", href: "/admin/users", icon: "👥" },
    { label: "Stats & Analytics", href: "/admin/stats", icon: "📈" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut({ redirect: false });
      showToast("Logged out successfully", "success");
      setTimeout(() => {
        router.push("/auth/login");
      }, 500);
    } catch (error) {
      showToast("Logout failed", "error");
      setLogoutLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col overflow-hidden border-r border-gray-700`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg">
            🌾
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <h1 className="font-bold text-lg">KM Silage</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
              title={!sidebarOpen ? item.label : ""}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
              logoutLoading
                ? "bg-red-500/50 cursor-not-allowed opacity-75"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
            title={!sidebarOpen ? "Logout" : ""}
          >
            <span className="text-xl flex-shrink-0">🚪</span>
            {sidebarOpen && (
              <span className="font-medium text-sm flex-1 text-left">
                {logoutLoading ? "Logging out..." : "Logout"}
              </span>
            )}
          </button>
        </div>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            title={sidebarOpen ? "Collapse" : "Expand"}
          >
            <span className="text-xl">{sidebarOpen ? "◀" : "▶"}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {navItems.find((item) => isActive(item.href))?.label ||
                "Dashboard"}
            </h2>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
