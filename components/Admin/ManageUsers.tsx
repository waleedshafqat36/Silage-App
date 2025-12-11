"use client";

import { useState } from "react";
import { showToast } from "@/components/Toast/Toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  registeredAt: string;
  status: "active" | "inactive";
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      role: "user",
      registeredAt: "2024-11-15",
      status: "active",
    },
    {
      id: "2",
      name: "Priya Singh",
      email: "priya@example.com",
      role: "user",
      registeredAt: "2024-11-20",
      status: "active",
    },
    {
      id: "3",
      name: "Vikram Patel",
      email: "vikram@example.com",
      role: "admin",
      registeredAt: "2024-10-01",
      status: "active",
    },
    {
      id: "4",
      name: "Deepak Sharma",
      email: "deepak@example.com",
      role: "user",
      registeredAt: "2024-12-01",
      status: "inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "user" | "admin">("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    type: "delete" | "promote" | "demote";
    userId: string;
    userName: string;
  } | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setConfirmDialog({ type: "delete", userId: id, userName: user.name });
    }
  };

  const handlePromoteUser = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user && user.role === "user") {
      setConfirmDialog({ type: "promote", userId: id, userName: user.name });
    }
  };

  const handleDemoteUser = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user && user.role === "admin") {
      setConfirmDialog({ type: "demote", userId: id, userName: user.name });
    }
  };

  const confirmAction = () => {
    if (!confirmDialog) return;

    setLoadingId(confirmDialog.userId);
    setTimeout(() => {
      if (confirmDialog.type === "delete") {
        setUsers(users.filter((u) => u.id !== confirmDialog.userId));
        showToast("User deleted successfully", "success");
      } else if (confirmDialog.type === "promote") {
        setUsers(
          users.map((u) =>
            u.id === confirmDialog.userId ? { ...u, role: "admin" as const } : u
          )
        );
        showToast("User promoted to admin successfully", "success");
      } else if (confirmDialog.type === "demote") {
        setUsers(
          users.map((u) =>
            u.id === confirmDialog.userId ? { ...u, role: "user" as const } : u
          )
        );
        showToast("User demoted to regular user successfully", "success");
      }
      setLoadingId(null);
      setConfirmDialog(null);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Manage Users</h3>
        <p className="text-gray-600 mt-1">
          View and manage user accounts and roles
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900"
        />
        <select
          value={filterRole}
          onChange={(e) =>
            setFilterRole(e.target.value as "all" | "user" | "admin")
          }
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-gray-900 bg-white"
        >
          <option value="all">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Registered
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.role === "admin" ? "👑 Admin" : "👤 User"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {user.registeredAt}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status === "active" ? "🟢 Active" : "⚪ Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.role === "user" ? (
                          <button
                            onClick={() => handlePromoteUser(user.id)}
                            disabled={loadingId === user.id}
                            className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                          >
                            Promote
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDemoteUser(user.id)}
                            disabled={loadingId === user.id}
                            className="px-3 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors disabled:opacity-50"
                          >
                            Demote
                          </button>
                        )}
                        <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={loadingId === user.id}
                          className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm Action
              </h3>
              <p className="text-gray-600 mb-6">
                {confirmDialog.type === "delete"
                  ? `Are you sure you want to delete ${confirmDialog.userName}? This action cannot be undone.`
                  : confirmDialog.type === "promote"
                  ? `Promote ${confirmDialog.userName} to admin? They will have full access to the dashboard.`
                  : `Demote ${confirmDialog.userName} from admin to regular user?`}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDialog(null)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  disabled={loadingId !== null}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {confirmDialog.type === "delete"
                    ? "Delete"
                    : confirmDialog.type === "promote"
                    ? "Promote"
                    : "Demote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
