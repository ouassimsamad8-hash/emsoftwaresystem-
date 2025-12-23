import { useCallback } from "react";
import { useAdminAuth } from "@/lib/admin-auth-context";

export function useAdminApi() {
  const { token, logout } = useAdminAuth();

  const request = useCallback(
    async <T>(input: string, init?: RequestInit): Promise<T> => {
      const config: RequestInit = {
        ...init,
      };

      const headers = new Headers(config.headers);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      if (config.body && !(config.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      config.headers = headers;

      const response = await fetch(input, config);

      if (response.status === 401) {
        await logout();
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        const errorBody = await response.json().catch(() => undefined);
        const message = errorBody?.message ?? `Request failed with status ${response.status}`;
        throw new Error(message);
      }

      const text = await response.text();
      return text ? (JSON.parse(text) as T) : (undefined as T);
    },
    [token, logout],
  );

  return {
    token,
    request,
  };
}
