import { useMemo } from "react";
import { useAdminQuery } from "@/hooks/use-admin-query";

export interface StrapiEntity<T> {
  id: number | string;
  attributes?: T & Record<string, unknown>;
  documentId?: string;
  [key: string]: unknown;
}

export interface StrapiCollectionResponse<T> {
  data: Array<StrapiEntity<T>>;
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
}

function buildSearchParams(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      search.set(key, String(value));
    }
  });
  return search.toString();
}

export function useAdminBlogPosts(params?: { page?: number; pageSize?: number; search?: string }) {
  const query = useMemo(
    () =>
      buildSearchParams({
        page: params?.page ?? 1,
        pageSize: params?.pageSize ?? 10,
        search: params?.search,
        sort: "updatedAt:desc",
      }),
    [params?.page, params?.pageSize, params?.search],
  );

  return useAdminQuery<StrapiCollectionResponse<Record<string, unknown>>>(
    ["admin", "blog-posts", query],
    `/api/admin/blog-posts?${query}`,
  );
}

export function useAdminServices(params?: { page?: number; pageSize?: number }) {
  const query = useMemo(
    () => buildSearchParams({ page: params?.page, pageSize: params?.pageSize }),
    [params?.page, params?.pageSize],
  );
  const path = query ? `/api/admin/services?${query}` : "/api/admin/services";
  return useAdminQuery<StrapiCollectionResponse<Record<string, unknown>>>(
    ["admin", "services", query],
    path,
  );
}

export function useAdminAuthors() {
  return useAdminQuery<StrapiCollectionResponse<Record<string, unknown>>>(
    ["admin", "authors"],
    "/api/admin/authors",
  );
}

export function useAdminProjects(params?: { page?: number; pageSize?: number }) {
  const query = useMemo(
    () => buildSearchParams({ page: params?.page, pageSize: params?.pageSize }),
    [params?.page, params?.pageSize],
  );
  const path = query ? `/api/admin/projects?${query}` : "/api/admin/projects";
  return useAdminQuery<StrapiCollectionResponse<Record<string, unknown>>>(
    ["admin", "projects", query],
    path,
  );
}

export function useAdminFaqs() {
  return useAdminQuery<StrapiCollectionResponse<Record<string, unknown>>>(
    ["admin", "faqs"],
    "/api/admin/faqs",
  );
}

export function useAdminAppointments(params?: { status?: string; page?: number; pageSize?: number }) {
  const query = useMemo(
    () =>
      buildSearchParams({
        status: params?.status,
        page: params?.page ?? 1,
        pageSize: params?.pageSize ?? 10,
      }),
    [params?.status, params?.page, params?.pageSize],
  );

  return useAdminQuery<StrapiCollectionResponse<Record<string, unknown>>>(
    ["admin", "appointments", query],
    `/api/admin/appointments?${query}`,
  );
}

export function useAdminSiteSettings() {
  return useAdminQuery<Record<string, unknown>>(["admin", "site-settings"], "/api/admin/site-settings");
}
