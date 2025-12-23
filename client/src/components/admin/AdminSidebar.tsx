import { useEffect, type ComponentType, type SVGProps } from "react";
import { Link, useLocation } from "wouter";
import {
  CalendarClock,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Layers,
  Settings,
  PenSquare,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: string;
}

const navSections: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Blog Posts",
        href: "/admin/blog-posts",
        icon: FileText,
      },
      {
        label: "Services",
        href: "/admin/services",
        icon: Layers,
      },
      {
        label: "Projects",
        href: "/admin/projects",
        icon: PenSquare,
      },
      {
        label: "FAQs",
        href: "/admin/faqs",
        icon: HelpCircle,
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        label: "Appointments",
        href: "/admin/appointments",
        icon: CalendarClock,
      },
      {
        label: "Site Settings",
        href: "/admin/site-settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar({ open, onOpenChange }: SidebarProps) {
  const [location] = useLocation();

  useEffect(() => {
    onOpenChange(false);
  }, [location, onOpenChange]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => onOpenChange(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card shadow-lg transition-transform duration-300 ease-in-out lg:static lg:z-0 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Admin Panel
            </span>
            <span className="text-lg font-bold text-foreground">E&M Software</span>
          </div>
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-6 px-4 py-6">
            {navSections.map((section) => (
              <div key={section.title} className="space-y-3">
                <p className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active =
                      location === item.href ||
                      (item.href !== "/admin" && location.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent/60",
                          active
                            ? "bg-primary/10 text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={cn(
                              "rounded-md p-1",
                              active ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          {item.label}
                        </span>
                        {item.badge ? (
                          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t border-border p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Need help?</p>
          <p>Contact the web team or check the internal knowledge base for detailed guides.</p>
        </div>
      </aside>
    </>
  );
}
