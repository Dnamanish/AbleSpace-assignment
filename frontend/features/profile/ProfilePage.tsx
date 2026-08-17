"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

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
      } catch (error) {
        console.error("Failed to load profile:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

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
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-semibold">Profile</h1>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
          <span className="text-sm text-gray-600">
            Profile picture
          </span>

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            <span className="text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
          <span className="text-sm text-gray-600">Email</span>

          <span className="text-sm font-medium text-gray-900">
            {user.email}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
          <div>
            <p className="text-sm text-gray-900">Full name</p>
          </div>

          <div className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600">
            {user.name}
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
          <div>
            <p className="text-sm text-gray-900">Title</p>
            <p className="text-xs text-gray-500">
              Your job title or role
            </p>
          </div>

          <div className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600">
            Designer
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-5">
          <div>
            <p className="text-sm text-gray-900">Username</p>
            <p className="text-xs text-gray-500">
              One word, like a nickname or first name
            </p>
          </div>

          <div className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-600">
            {user.name}
          </div>
        </div>
      </div>

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
            {loggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
    </div>
  );
}