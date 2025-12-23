import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAdminServices } from "@/hooks/use-admin-resources";
import { extractEntityAttributes, getDate, getStringAttribute, getTranslation } from "@/lib/strapi-helpers";

interface ServiceRow extends Record<string, unknown> {
  id: string;
  title: string;
  slug: string;
  category: string;
  updatedAt: string;
}

export default function AdminServices() {
  const servicesQuery = useAdminServices();

  const rows: ServiceRow[] = useMemo(() => {
    if (!servicesQuery.data?.data) return [];
    return servicesQuery.data.data.reduce<ServiceRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") return acc;
      const attributes = extractEntityAttributes(entity);
      if (!attributes) return acc;

      acc.push({
        id: String(entity.id),
        title:
          getTranslation(attributes.title, "") ||
          getTranslation(attributes.title_en, "") ||
          getTranslation(attributes.title_fr, "") ||
          getTranslation(attributes.name, "") ||
          "Untitled",
        slug: getStringAttribute(attributes, "slug", "—"),
        category:
          getTranslation(attributes.categoryLabel, "") ||
          getStringAttribute(attributes, "category", "—"),
        updatedAt: getDate((attributes.updatedAt ?? attributes.updated_at) as string | undefined),
      });

      return acc;
    }, []);
  }, [servicesQuery.data]);

  const isLoading = servicesQuery.isLoading && rows.length === 0;
  const hasError = servicesQuery.isError;

  return (
    <AdminLayout
      title="Services"
      description="Catalogue of services presented on the marketing site."
      actions={
        <Button
          size="sm"
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_STRAPI_URL ?? ""}/admin/content-manager/collectionType/api::service.service`,
              "_blank",
            )
          }
        >
          Open in Strapi
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {servicesQuery.isFetching ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Syncing services with Strapi…
          </div>
        ) : null}

        {hasError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load services</AlertTitle>
            <AlertDescription>
              {(servicesQuery.error as Error)?.message ?? "An unexpected error occurred while retrieving services."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AdminDataTable
          columns={[
            { key: "title", header: "Service", className: "font-medium" },
            { key: "slug", header: "Slug", className: "hidden md:table-cell" },
            { key: "category", header: "Category", className: "hidden lg:table-cell" },
            { key: "updatedAt", header: "Last update", className: "w-[160px]" },
          ]}
          data={rows}
          isLoading={isLoading}
          emptyState="No services available yet. Use Strapi to add your first service."
        />
      </div>
    </AdminLayout>
  );
}
