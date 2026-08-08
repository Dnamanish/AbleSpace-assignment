import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
