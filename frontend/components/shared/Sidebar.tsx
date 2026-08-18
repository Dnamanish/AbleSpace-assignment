"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Folder,
  ChevronsUpDown,
  User,
  Sun,
  Palette,
  Settings,
  ChevronRight,
  Check,
} from "lucide-react";
import { useTheme } from "@/components/shared/ThemeProvider";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState<
    "theme" | "color" | null
  >(null);

  const [selectedColor, setSelectedColor] = useState("Blue");

  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (menu: "theme" | "color") => {
    setOpenSubmenu((current) =>
      current === menu ? null : menu,
    );
  };

  return (
    <aside className="relative flex min-h-screen w-[256px] flex-col border-r border-border bg-background">
      {/* Sidebar Header */}
      <div className="flex h-16 w-full items-center justify-between gap-2 px-3">
        <button
          type="button"
          onClick={toggleMenu}
          className="flex items-center gap-2 rounded-md px-1.5 py-1.5 hover:bg-muted"
        >
          <Image
            src="/Image/dexter-avatar.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-md"
          />

          <span className="text-sm font-semibold">
            Dexter
          </span>
        </button>

        <button
          type="button"
          aria-label="Open profile menu"
          onClick={toggleMenu}
          className="flex size-7 items-center justify-center rounded-md hover:bg-muted"
        >
          <ChevronsUpDown className="size-4" />
        </button>
      </div>

      {/* Profile Dropdown */}
      {isMenuOpen && (
        <div className="absolute left-2 top-14 z-50 w-[240px] rounded-lg border border-border bg-background p-2 shadow-lg">
          {/* User Information */}
          <div className="flex flex-col items-center border-b border-border px-3 py-4">
            <Image
              src="/Image/dexter-avatar.png"
              alt="Profile"
              width={48}
              height={48}
              className="rounded-full"
            />

            <p className="mt-2 text-sm font-medium">
              Dexter
            </p>

            <p className="text-xs text-muted-foreground">
              User
            </p>
          </div>

          {/* Profile */}
          <Link
            href="/profile"
            onClick={() => {
              setIsMenuOpen(false);
              setOpenSubmenu(null);
            }}
            className="mt-2 flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <User className="size-4" />
            <span>Profile</span>
          </Link>

          {/* Change Theme */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleSubmenu("theme")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Sun className="size-4" />
                <span>Change Theme</span>
              </div>

              <ChevronRight className="size-3.5 text-muted-foreground" />
            </button>

            {/* Theme Submenu */}
            {openSubmenu === "theme" && (
              <div className="absolute left-[238px] top-0 z-50 w-44 rounded-lg border border-border bg-background p-2 shadow-lg">
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Theme
                </p>

                {/* Light */}
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span>Light</span>

                  {theme === "light" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* Dark */}
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span>Dark</span>

                  {theme === "dark" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* System */}
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span>System</span>

                  {theme === "system" && (
                    <Check className="size-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Color Mode */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleSubmenu("color")}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Palette className="size-4" />
                <span>Color Mode</span>
              </div>

              <ChevronRight className="size-3.5 text-muted-foreground" />
            </button>

            {/* Color Submenu */}
            {openSubmenu === "color" && (
              <div className="absolute left-[238px] top-0 z-50 w-44 rounded-lg border border-border bg-background p-2 shadow-lg">
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  Color Mode
                </p>

                {/* Amber */}
                <button
                  type="button"
                  onClick={() => setSelectedColor("Amber")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-[2px] bg-amber-500" />
                    Amber
                  </span>

                  {selectedColor === "Amber" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* Blue */}
                <button
                  type="button"
                  onClick={() => setSelectedColor("Blue")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-[2px] bg-blue-500" />
                    Blue
                  </span>

                  {selectedColor === "Blue" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* Pink */}
                <button
                  type="button"
                  onClick={() => setSelectedColor("Pink")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-[2px] bg-pink-500" />
                    Pink
                  </span>

                  {selectedColor === "Pink" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* Rose */}
                <button
                  type="button"
                  onClick={() => setSelectedColor("Rose")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-[2px] bg-rose-500" />
                    Rose
                  </span>

                  {selectedColor === "Rose" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* Emerald */}
                <button
                  type="button"
                  onClick={() => setSelectedColor("Emerald")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-[2px] bg-emerald-500" />
                    Emerald
                  </span>

                  {selectedColor === "Emerald" && (
                    <Check className="size-4" />
                  )}
                </button>

                {/* Black */}
                <button
                  type="button"
                  onClick={() => setSelectedColor("Black")}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-[2px] bg-black" />
                    Black
                  </span>

                  {selectedColor === "Black" && (
                    <Check className="size-4" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <Settings className="size-4" />
            <span>Settings</span>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="px-3">
        <p className="mb-2 px-3 text-xs text-muted-foreground">
          Workspace
        </p>

        {/* Tasks */}
        <Link
          href="/tasks"
          className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm"
        >
          <LayoutDashboard className="size-4" />
          <span>Tasks</span>
        </Link>

        {/* Projects */}
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