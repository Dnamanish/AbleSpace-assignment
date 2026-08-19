"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

type SidebarContextType = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarContext =
  createContext<SidebarContextType | null>(null);

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used inside SidebarProvider",
    );
  }

  return context;
}