"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Project } from "./type";

type ProjectContextType = {
  projects: Project[];
  saveProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function ProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      }
    };

    loadProjects();
  }, []);

  const saveProject = async (project: Project) => {
    try {
      const exists = projects.some(
        (currentProject) => currentProject.id === project.id,
      );

      if (exists) {
        const response = await fetch(
          `${API_URL}/api/projects/${project.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(project),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to update project");
        }

        const updatedProject = await response.json();

        setProjects((currentProjects) =>
          currentProjects.map((currentProject) =>
            currentProject.id === project.id
              ? updatedProject
              : currentProject,
          ),
        );

        return;
      }

      const response = await fetch(
        `${API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(project),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const createdProject = await response.json();

      setProjects((currentProjects) => [
        ...currentProjects,
        createdProject,
      ]);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(
        `${API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((currentProjects) =>
        currentProjects.filter(
          (project) => project.id !== id,
        ),
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        saveProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProjects must be used inside ProjectProvider",
    );
  }

  return context;
}