import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAdminAppointments } from "@/hooks/use-admin-resources";
import { extractEntityAttributes, getRelativeTime, getStatus, getTranslation } from "@/lib/strapi-helpers";

const PAGE_SIZE = 10;

const statusFilters = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

interface AppointmentRow extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  status: string;
  submittedAt: string;
}

export default function AdminAppointments() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const appointmentsQuery = useAdminAppointments({
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    pageSize: PAGE_SIZE,
  });

  const rows: AppointmentRow[] = useMemo(() => {
    if (!appointmentsQuery.data?.data) return [];
    return appointmentsQuery.data.data.reduce<AppointmentRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") return acc;
      const attributes = extractEntityAttributes(entity);

      acc.push({
        id: String(entity.id),
        name: getTranslation(attributes.fullName, "") || getTranslation(attributes.name, "") || "—",
        email: getTranslation(attributes.email, "—"),
        status: getStatus(attributes, "New"),
        submittedAt: getRelativeTime((attributes.createdAt ?? attributes.created_at) as string | undefined),
      });

      return acc;
    }, []);
  }, [appointmentsQuery.data]);

  const pagination = appointmentsQuery.data?.meta?.pagination;
  const totalPages = pagination?.pageCount ?? 1;
  const totalEntries = pagination?.total ?? rows.length;

  const isLoading = appointmentsQuery.isLoading && rows.length === 0;
  const hasError = appointmentsQuery.isError;

  return (
    <AdminLayout
      title="Appointment requests"
      description="Inbound booking requests captured from the website."
      actions={
        <Button
          size="sm"
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_STRAPI_URL ?? ""}/admin/content-manager/collectionType/api::appointment-request.appointment-request`,
              "_blank",
            )
          }
        >
          Review in Strapi
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {statusFilters.map((option) => {
            const isActive = statusFilter === option.value;
            return (
              <Button
                key={option.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setStatusFilter(option.value);
                  setPage(1);
                }}
              >
                {option.label}
              </Button>
            );
          })}
          {appointmentsQuery.isFetching ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
        </div>

        <p className="text-xs text-muted-foreground">
          {totalEntries} entr{totalEntries === 1 ? "y" : "ies"} • page {pagination?.page ?? page} of {totalPages}
        </p>

        {hasError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load appointments</AlertTitle>
            <AlertDescription>
              {(appointmentsQuery.error as Error)?.message ?? "An unexpected error occurred while retrieving appointments."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AdminDataTable
          columns={[
            { key: "name", header: "Contact", className: "font-medium" },
            { key: "email", header: "Email", className: "hidden lg:table-cell" },
            {
              key: "status",
              header: "Status",
              className: "w-[140px]",
              render: (row) => (
                <Badge
                  variant={
                    row.status.toLowerCase() === "new"
                      ? "default"
                      : row.status.toLowerCase() === "in progress"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {row.status}
                </Badge>
              ),
            },
            { key: "submittedAt", header: "Submitted", className: "w-[160px]" },
          ]}
          data={rows}
          isLoading={isLoading}
          emptyState="No appointment requests for this filter."
        />

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || appointmentsQuery.isFetching}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {pagination?.page ?? page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || appointmentsQuery.isFetching}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
