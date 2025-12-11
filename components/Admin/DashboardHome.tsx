"use client";

import { useState } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: { value: number; isPositive: boolean };
  color: "green" | "blue" | "purple" | "orange";
}

const colorClasses = {
  green: "from-green-50 to-emerald-50 border-green-200",
  blue: "from-blue-50 to-cyan-50 border-blue-200",
  purple: "from-purple-50 to-pink-50 border-purple-200",
  orange: "from-orange-50 to-amber-50 border-orange-200",
};

const iconBackgrounds = {
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

export function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          {trend && (
            <p
              className={`text-xs font-semibold ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last
              month
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 ${iconBackgrounds[color]} rounded-lg flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const [stats] = useState([
    {
      title: "Total Blogs",
      value: 145,
      icon: "📝",
      trend: { value: 12, isPositive: true },
      color: "green" as const,
    },
    {
      title: "Total Users",
      value: 892,
      icon: "👥",
      trend: { value: 8, isPositive: true },
      color: "blue" as const,
    },
    {
      title: "Active Users",
      value: 234,
      icon: "🔥",
      trend: { value: 15, isPositive: true },
      color: "purple" as const,
    },
    {
      title: "Total Comments",
      value: 1250,
      icon: "💬",
      trend: { value: 5, isPositive: true },
      color: "orange" as const,
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Statistics Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Quick Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              color={stat.color}
            />
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Blogs */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Blogs</h3>
          <div className="space-y-3">
            {[
              {
                title: "Silage Best Practices",
                author: "John Doe",
                date: "2 days ago",
              },
              {
                title: "Winter Feeding Guide",
                author: "Jane Smith",
                date: "5 days ago",
              },
              {
                title: "Fermentation Science",
                author: "Mike Johnson",
                date: "1 week ago",
              },
            ].map((blog, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{blog.title}</p>
                  <p className="text-xs text-gray-500">
                    by {blog.author} • {blog.date}
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User Registrations */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Users</h3>
          <div className="space-y-3">
            {[
              { name: "Rajesh Kumar", role: "User", icon: "👨" },
              { name: "Priya Singh", role: "User", icon: "👩" },
              { name: "Vikram Patel", role: "User", icon: "👨" },
            ].map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  {user.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Server Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-green-600">
                  Connected
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Server</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-green-600">
                  Operational
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cache</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span className="text-sm font-medium text-yellow-600">
                  Optimal
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            System Performance
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900">62%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Disk Usage</span>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
