"use client";

import { PanelLeft } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-16 w-full items-center border-b border-[#E5E5E5] px-4">
      <button
        type="button"
        aria-label="Toggle sidebar"
        className="flex size-5 items-center justify-center"
      >
        <PanelLeft className="size-4"/>
      </button>
    </header>
  );
}
