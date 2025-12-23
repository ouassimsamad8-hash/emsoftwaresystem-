import { type ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

interface AdminLayoutProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminLayout({ title, description, actions, children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <div className="flex flex-1 flex-col bg-background">
          <AdminTopbar
            title={title}
            description={description}
            actions={actions}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-20 lg:pb-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
