"use client";

import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/shared/SidebarProvider";

export default function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 w-full items-center border-b border-border bg-background px-4">
      <button
        type="button"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
        className="flex size-8 items-center justify-center rounded-md hover:bg-muted"
      >
        <PanelLeft className="size-4" />
      </button>
    </header>
  );
}