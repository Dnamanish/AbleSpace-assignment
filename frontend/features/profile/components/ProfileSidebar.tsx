"use client";

import Link from "next/link";
import { ArrowLeft, Search, User, Sun, Palette } from "lucide-react";

export default function ProfileSidebar() {
  return (
    <aside className="flex min-h-screen w-[240px] shrink-0 flex-col border-r border-border bg-background">
      {/* Back to app */}
      <div className="flex h-16 items-center px-4">
        <Link
          href="/tasks"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>Back to app</span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-muted-foreground"
        >
          <Search className="size-4" />
          <span>Search</span>
        </button>
      </div>

      {/* Settings */}
      <nav className="px-3 py-2">
        {/* Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-foreground"
        >
          <User className="size-4" />
          <span>Profile</span>
        </Link>

        {/* Theme */}
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
        >
          <Sun className="size-4" />
          <span>Theme</span>
        </button>

        {/* Color */}
        <button
          type="button"
          className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
        >
          <Palette className="size-4" />
          <span>Color</span>
        </button>
      </nav>
    </aside>
  );
}