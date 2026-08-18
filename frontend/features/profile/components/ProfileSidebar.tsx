"use client";

import Link from "next/link";
import { ArrowLeft, Search, User, Sun, Palette } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <aside className="flex min-h-screen w-[240px] shrink-0 flex-col border-r bg-[#FAFAFA]">
      {/* Back to app */}
      <div className="flex h-16 items-center px-4">
        <Link
          href="/tasks"
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
        >
          <ArrowLeft className="size-4" />
          <span>Back to app</span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500"
        >
          <Search className="size-4" />
          <span>Search</span>
        </button>
      </div>

      {/* Settings */}
      <nav className="px-3 py-2">
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium"
        >
          <User className="size-4" />
          <span>Profile</span>
        </Link>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          <Sun className="size-4" />
          <span>Theme</span>
        </button>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          <Palette className="size-4" />
          <span>Color</span>
        </button>
      </nav>
    </aside>
  );
}