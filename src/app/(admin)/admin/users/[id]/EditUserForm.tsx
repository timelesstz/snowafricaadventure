"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, Loader2, Trash2, AlertTriangle } from "lucide-react";
import { AdminRole } from "@prisma/client";
import { RoleBadge } from "@/components/admin/RoleBadge";

interface User {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
}

interface Props {
  user: User;
  isCurrentUser: boolean;
}

export function EditUserForm({ user, isCurrentUser }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const data: Record<string, unknown> = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      isActive: formData.get("isActive") === "true",
    };

    // Only include password if provided
    if (password) {
      data.password = password;
    }

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to update user");
      }

      setSuccess("User updated successfully");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Failed to delete user");
      }

      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={user.name}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={user.email}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              minLength={8}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Role *
            </label>
            <select
              id="role"
              name="role"
              required
              defaultValue={user.role}
              disabled={isCurrentUser}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-slate-100"
            >
              <option value={AdminRole.VIEWER}>Viewer - Read-only access</option>
              <option value={AdminRole.EDITOR}>Editor - Can edit content</option>
              <option value={AdminRole.ADMIN}>Admin - Full content access</option>
              <option value={AdminRole.SUPER_ADMIN}>
                Super Admin - Full access including user management
              </option>
            </select>
            {isCurrentUser && (
              <p className="text-sm text-amber-600 mt-1">
                You cannot change your own role
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="isActive"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Status *
            </label>
            <select
              id="isActive"
              name="isActive"
              required
              defaultValue={user.isActive ? "true" : "false"}
              disabled={isCurrentUser}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-slate-100"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {isCurrentUser && (
              <p className="text-sm text-amber-600 mt-1">
                You cannot deactivate your own account
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
            <Link
              href="/admin/users"
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">User Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-slate-500">Current Role:</span>
              <div className="mt-1">
                <RoleBadge role={user.role} />
              </div>
            </div>
            <div>
              <span className="text-slate-500">Created:</span>
              <p className="text-slate-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Last Login:</span>
              <p className="text-slate-900">
                {user.lastLoginAt
                  ? new Date(user.lastLoginAt).toLocaleString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        {!isCurrentUser && (
          <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
            <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete this user
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">
                      Delete this user?
                    </p>
                    <p className="text-sm text-red-700 mt-1">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Confirm Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
