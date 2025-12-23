import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAdminProjects } from "@/hooks/use-admin-resources";
import { extractEntityAttributes, getDate, getStringAttribute, getTranslation } from "@/lib/strapi-helpers";

interface ProjectRow extends Record<string, unknown> {
  id: string;
  title: string;
  category: string;
  technologies: string;
  updatedAt: string;
}

export default function AdminProjects() {
  const projectsQuery = useAdminProjects();

  const rows: ProjectRow[] = useMemo(() => {
    if (!projectsQuery.data?.data) return [];
    return projectsQuery.data.data.reduce<ProjectRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") {
        return acc;
      }

      const attributes = extractEntityAttributes(entity);
      const technologiesValue = attributes.technologies;
      const technologies = Array.isArray(technologiesValue)
        ? technologiesValue.join(", ")
        : getStringAttribute(attributes, "technologies", "");

      acc.push({
        id: String(entity.id),
        title:
          getTranslation(attributes.title, "") ||
          getTranslation(attributes.title_en, "") ||
          getTranslation(attributes.title_fr, "") ||
          getTranslation(attributes.name, "") ||
          "Untitled project",
        category:
          getTranslation(attributes.categoryLabel, "") ||
          getStringAttribute(attributes, "category", "—"),
        technologies: technologies || "—",
        updatedAt: getDate((attributes.updatedAt ?? attributes.updated_at) as string | undefined),
      });

      return acc;
    }, []);
  }, [projectsQuery.data]);

  const isLoading = projectsQuery.isLoading && rows.length === 0;
  const hasError = projectsQuery.isError;

  return (
    <AdminLayout
      title="Projects"
      description="Case studies and portfolio entries displayed on the site."
      actions={
        <Button
          size="sm"
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_STRAPI_URL ?? ""}/admin/content-manager/collectionType/api::project.project`,
              "_blank",
            )
          }
        >
          Open in Strapi
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {projectsQuery.isFetching ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Syncing projects with Strapi…
          </div>
        ) : null}

        {hasError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load projects</AlertTitle>
            <AlertDescription>
              {(projectsQuery.error as Error)?.message ?? "An unexpected error occurred while retrieving projects."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AdminDataTable
          columns={[
            { key: "title", header: "Project", className: "font-medium" },
            { key: "category", header: "Category", className: "hidden md:table-cell" },
            { key: "technologies", header: "Technologies", className: "hidden lg:table-cell" },
            { key: "updatedAt", header: "Last update", className: "w-[160px]" },
          ]}
          data={rows}
          isLoading={isLoading}
          emptyState="No projects recorded yet. Use Strapi to add a case study."
        />
      </div>
    </AdminLayout>
  );
}
