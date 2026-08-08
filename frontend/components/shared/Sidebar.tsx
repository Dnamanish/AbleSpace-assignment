"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Folder,
  ChevronsUpDown,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-[256px] flex-col border-r bg-[#FAFAFA]">
      {/* Sidebar Header */}
      <div className="flex h-16 w-full items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2">
          <Image
            src="/Image/dexter-avatar.png"
            alt="Dexter"
            width={32}
            height={32}
            className="rounded-md"
          />

          <span className="text-sm font-semibold">
            Dexter
          </span>
        </div>

        <ChevronsUpDown className="size-4" />
      </div>

      {/* Navigation */}
      <nav className="px-3">
        <p className="mb-2 px-3 text-xs text-muted-foreground">
          Workspace
        </p>

        <Link
          href="/tasks"
          className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm"
        >
          <LayoutDashboard className="size-4" />
          <span>Tasks</span>
        </Link>

        <Link
          href="/projects"
          className="mt-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
        >
          <Folder className="size-4" />
          <span>Projects</span>
        </Link>
      </nav>
    </aside>
  );
}