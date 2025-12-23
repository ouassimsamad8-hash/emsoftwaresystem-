import { useAdminApi } from "@/lib/admin-api";
import { useQuery, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";

export function useAdminQuery<T>(
  queryKey: QueryKey,
  path: string,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">,
) {
  const { request, token } = useAdminApi();
  const enabled = options?.enabled ?? true;

  return useQuery<T, Error, T, QueryKey>({
    queryKey,
    queryFn: () => request<T>(path),
    ...(options ?? {}),
    enabled: Boolean(token) && enabled,
  });
}
