import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "adminToken";

interface AdminUser {
  username: string;
  role: string;
}

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AdminAuthContextValue {
  token: string | null;
  user: AdminUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

function readStoredToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage.getItem(STORAGE_KEY);
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => readStoredToken());
  const [user, setUser] = useState<AdminUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      clearSession();
      setStatus("unauthenticated");
      return;
    }

    if (status === "authenticated") {
      return;
    }

    let cancelled = false;

    async function verifyToken() {
      try {
        setStatus("loading");
        const response = await fetch("/api/admin/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        const payload = (await response.json()) as { valid: boolean; user?: AdminUser };

        if (cancelled) {
          return;
        }

        if (payload.valid && payload.user) {
          setUser(payload.user);
          setStatus("authenticated");
        } else {
          clearSession();
          setStatus("unauthenticated");
        }
      } catch (error) {
        if (!cancelled) {
          clearSession();
          setStatus("unauthenticated");
        }
      }
    }

    verifyToken();

    return () => {
      cancelled = true;
    };
  }, [token, status, clearSession]);

  const login = useCallback(
    async ({ username, password }: { username: string; password: string }) => {
      setStatus("loading");
      try {
        const response = await fetch("/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          token?: string;
          user?: AdminUser;
          message?: string;
        };

        if (!response.ok || !payload.token || !payload.user) {
          throw new Error(payload.message ?? "Authentication failed");
        }

        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, payload.token);
        }

        setToken(payload.token);
        setUser(payload.user);
        setStatus("authenticated");
      } catch (error) {
        clearSession();
        setStatus("unauthenticated");
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Authentication failed");
      }
    },
    [clearSession],
  );

  const logout = useCallback(async () => {
    try {
      if (token) {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      // Swallow network errors—logging out locally is sufficient.
    } finally {
      clearSession();
      setStatus("unauthenticated");
    }
  }, [token, clearSession]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      token,
      user,
      status,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      login,
      logout,
    }),
    [token, user, status, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
