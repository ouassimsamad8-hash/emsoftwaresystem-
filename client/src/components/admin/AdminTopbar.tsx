import { type ReactNode, useCallback } from "react";
import { Menu, Monitor, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme-context";
import { useAdminAuth } from "@/lib/admin-auth-context";
import { useLocation } from "wouter";

interface AdminTopbarProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  onToggleSidebar: () => void;
}

const themeOrder = ["light", "dark", "system"] as const;

type ThemeOption = typeof themeOrder[number];

export function AdminTopbar({ title, description, actions, onToggleSidebar }: AdminTopbarProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAdminAuth();
  const [, navigate] = useLocation();

  const nextTheme = () => {
    const currentIndex = themeOrder.indexOf(theme as ThemeOption);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const currentThemeIcon = theme === "dark" ? <Moon className="h-4 w-4" /> : theme === "light" ? <Sun className="h-4 w-4" /> : <Monitor className="h-4 w-4" />;

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/admin/login");
  }, [logout, navigate]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg lg:text-xl">{title}</h1>
            {description ? (
              <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden max-w-xs flex-1 md:block">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" type="search" placeholder="Search content, authors, or requests" aria-label="Search" />
            </div>
          </div>
          {user ? (
            <div className="hidden items-center gap-2 whitespace-nowrap md:flex">
              <span className="text-xs text-muted-foreground">
                Signed in as <span className="font-semibold text-foreground">{user.username}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          ) : null}
          {actions}
          <Button variant="outline" size="icon" onClick={nextTheme} aria-label="Toggle theme">
            {currentThemeIcon}
          </Button>
        </div>
      </div>
    </header>
  );
}
