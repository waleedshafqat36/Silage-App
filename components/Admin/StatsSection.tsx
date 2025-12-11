"use client";

import { useState, useMemo } from "react";

export default function StatsSection() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  // Sample data for charts
  const chartData = {
    week: [
      { day: "Mon", blogs: 5, users: 12, comments: 23 },
      { day: "Tue", blogs: 8, users: 15, comments: 31 },
      { day: "Wed", blogs: 6, users: 18, comments: 28 },
      { day: "Thu", blogs: 9, users: 22, comments: 35 },
      { day: "Fri", blogs: 12, users: 25, comments: 42 },
      { day: "Sat", blogs: 7, users: 20, comments: 38 },
      { day: "Sun", blogs: 4, users: 10, comments: 18 },
    ],
    month: [
      { day: "Week 1", blogs: 35, users: 120, comments: 245 },
      { day: "Week 2", blogs: 42, users: 156, comments: 312 },
      { day: "Week 3", blogs: 38, users: 142, comments: 278 },
      { day: "Week 4", blogs: 45, users: 168, comments: 335 },
    ],
    year: [
      { day: "Jan", blogs: 145, users: 450, comments: 890 },
      { day: "Feb", blogs: 156, users: 480, comments: 920 },
      { day: "Mar", blogs: 168, users: 520, comments: 1050 },
      { day: "Apr", blogs: 172, users: 540, comments: 1120 },
      { day: "May", blogs: 185, users: 580, comments: 1200 },
      { day: "Jun", blogs: 195, users: 620, comments: 1280 },
    ],
  };

  const data = chartData[timeRange];
  const maxValue = useMemo(() => {
    return Math.max(...data.map((d) => Math.max(d.blogs, d.users, d.comments)));
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Statistics & Analytics
          </h3>
          <p className="text-gray-600 mt-1">
            Track platform activity and growth metrics
          </p>
        </div>
        <div className="flex gap-2">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {range === "week"
                ? "This Week"
                : range === "month"
                ? "This Month"
                : "This Year"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blogs Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4">📝 Blogs Created</h4>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{item.day}</span>
                  <span className="font-bold text-green-600">{item.blogs}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.blogs / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4">👥 New Users</h4>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{item.day}</span>
                  <span className="font-bold text-blue-600">{item.users}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.users / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4">💬 Comments</h4>
          <div className="space-y-4">
            {data.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{item.day}</span>
                  <span className="font-bold text-purple-600">
                    {item.comments}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(item.comments / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Combined Line Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-6">
          Platform Activity Overview
        </h4>
        <div className="overflow-x-auto">
          <div className="min-w-full h-64 flex items-end justify-around gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex items-end justify-center gap-2 h-48">
                  {/* Blogs bar */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg transition-all duration-500 hover:shadow-lg"
                      style={{ height: `${(item.blogs / maxValue) * 100}%` }}
                      title={`Blogs: ${item.blogs}`}
                    ></div>
                  </div>
                  {/* Users bar */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg transition-all duration-500 hover:shadow-lg"
                      style={{ height: `${(item.users / maxValue) * 100}%` }}
                      title={`Users: ${item.users}`}
                    ></div>
                  </div>
                  {/* Comments bar */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-lg transition-all duration-500 hover:shadow-lg"
                      style={{ height: `${(item.comments / maxValue) * 100}%` }}
                      title={`Comments: ${item.comments}`}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium text-center">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 justify-center mt-6 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-sm text-gray-600">Blogs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-sm text-gray-600">Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-400 rounded"></div>
            <span className="text-sm text-gray-600">Comments</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4">Engagement Metrics</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Blogs per User</span>
              <span className="font-bold text-lg text-green-600">0.16</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg. Comments per Blog</span>
              <span className="font-bold text-lg text-purple-600">8.6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">User Growth Rate</span>
              <span className="font-bold text-lg text-blue-600">+14.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Blog Activity Rate</span>
              <span className="font-bold text-lg text-orange-600">+18.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h4 className="font-bold text-gray-900 mb-4">
            Top Performing Content
          </h4>
          <div className="space-y-3">
            {[
              { title: "Silage Best Practices", views: 2450, comments: 156 },
              { title: "Winter Feeding Guide", views: 1890, comments: 128 },
              { title: "Fermentation Science", views: 1456, comments: 94 },
            ].map((blog, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 text-sm">
                  {blog.title}
                </p>
                <div className="flex gap-4 mt-1">
                  <span className="text-xs text-gray-500">
                    👁️ {blog.views} views
                  </span>
                  <span className="text-xs text-gray-500">
                    💬 {blog.comments} comments
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
