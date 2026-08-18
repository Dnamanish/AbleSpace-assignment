"use client";

import { PanelLeft } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 w-full items-center border-b border-border bg-background px-4">
      <button
        type="button"
        aria-label="Toggle sidebar"
        className="flex size-5 items-center justify-center rounded-md hover:bg-muted"
      >
        <PanelLeft className="size-4" />
      </button>
    </header>
  );
}