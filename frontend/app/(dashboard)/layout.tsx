import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import {SidebarProvider} from "@/components/shared/SidebarProvider";
import { TaskProvider } from "@/features/tasks/TaskProvider";
import { ProjectProvider } from "@/features/projects/ProjectProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TaskProvider>
      <ProjectProvider>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
              <Topbar />

              <main className="min-w-0 flex-1">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </ProjectProvider>
    </TaskProvider>
  );
}