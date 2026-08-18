"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "./components/ProfileSidebar";

type User = {
  id: string;
  name: string;
  email: string;
  title: string;
  username: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        setUser(data.user);

        setName(data.user.name || "");
        setTitle(data.user.title || "");
        setUsername(data.user.username || "");
      } catch (error) {
        console.error("Failed to load profile:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            title: title.trim(),
            username: username.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile",
        );
      }

      setUser(data.user);

      setName(data.user.name || "");
      setTitle(data.user.title || "");
      setUsername(data.user.username || "");

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Profile Sidebar */}
      <ProfileSidebar />

      {/* Profile Content */}
      <div className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-3xl px-6 py-10">
          <h1 className="mb-8 text-2xl font-semibold">
            Profile
          </h1>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* Profile picture */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
              <span className="text-sm text-gray-600">
                Profile picture
              </span>

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                <span className="text-sm font-medium">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
              <span className="text-sm text-gray-600">
                Email
              </span>

              <span className="text-sm font-medium text-gray-900">
                {user.email}
              </span>
            </div>

            {/* Full name */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
              <div>
                <p className="text-sm text-gray-900">
                  Full name
                </p>
              </div>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-52 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>

            {/* Title */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
              <div>
                <p className="text-sm text-gray-900">
                  Title
                </p>

                <p className="text-xs text-gray-500">
                  Your job title or role
                </p>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="w-52 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>

            {/* Username */}
            <div className="flex items-center justify-between px-5 py-5">
              <div>
                <p className="text-sm text-gray-900">
                  Username
                </p>

                <p className="text-xs text-gray-500">
                  One word, like a nickname or first name
                </p>
              </div>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. manish"
                className="w-52 rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Save */}
          <div className="mt-4 flex items-center justify-end gap-4">
            {message && (
              <p className="text-sm text-gray-600">
                {message}
              </p>
            )}

            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={saving}
              className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>

          {/* Workspace access */}
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-medium">
              Workspace access
            </h2>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-5">
              <p className="text-sm text-gray-500">
                Remove yourself from the workspace
              </p>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loggingOut
                  ? "Logging out..."
                  : "Log out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}