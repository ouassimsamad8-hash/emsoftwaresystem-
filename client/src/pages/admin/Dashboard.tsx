import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { useLocation } from "wouter";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, FileText, Layers, Monitor } from "lucide-react";
import {
  extractEntityAttributes,
  extractRelationAttributes,
  getDate,
  getRelativeTime,
  getStatus,
  getTranslation,
} from "@/lib/strapi-helpers";
import { useAdminAppointments, useAdminBlogPosts, useAdminProjects, useAdminServices } from "@/hooks/use-admin-resources";

type BlogRow = {
  id: string;
  title: string;
  status: string;
  author: string;
  updatedAt: string;
};

type AppointmentRow = {
  id: string;
  name: string;
  email: string;
  submittedAt: string;
  status: string;
};

function formatDate(value?: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString(undefined, options);
}

function formatRelativeTime(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return formatDistanceToNow(date, { addSuffix: true });
}

function normaliseTitle(attributes: Record<string, unknown>) {
  return (
    (attributes.title as string | undefined) ??
    (attributes.title_en as string | undefined) ??
    (attributes.title_fr as string | undefined) ??
    (attributes.name as string | undefined) ??
    "Untitled"
  );
}

function extractStatus(attributes: Record<string, unknown>, fallback = "Draft") {
  const status = (attributes.status as string | undefined) ?? (attributes.state as string | undefined);
  return status ? status.replace(/_/g, " ") : fallback;
}

function extractAuthor(attributes: Record<string, unknown>) {
  const relationAttributes = extractRelationAttributes(attributes.author);
  const relationName =
    getTranslation(relationAttributes["name"], "") ||
    getTranslation(relationAttributes["fullName"], "");

  if (relationName.trim().length > 0) {
    return relationName;
  }

  const authorName = getTranslation(attributes.authorName, "");
  if (authorName.trim().length > 0) {
    return authorName;
  }

  const authorFallback = getTranslation(attributes.author, "");
  if (authorFallback.trim().length > 0) {
    return authorFallback;
  }

  return "—";
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();

  const blogPostsQuery = useAdminBlogPosts({ page: 1, pageSize: 5 });
  const servicesQuery = useAdminServices();
  const projectsQuery = useAdminProjects();
  const appointmentsQuery = useAdminAppointments({ page: 1, pageSize: 5 });

  const blogRows: BlogRow[] = useMemo(() => {
    if (!blogPostsQuery.data?.data) return [];
    return blogPostsQuery.data.data.reduce<BlogRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") {
        return acc;
      }

      const attributes = extractEntityAttributes(entity);

      acc.push({
        id: String(entity.id),
        title:
          getTranslation(attributes.title, "") ||
          getTranslation(attributes.title_en, "") ||
          getTranslation(attributes.title_fr, "") ||
          getTranslation(attributes.name, "") ||
          "Untitled",
        status: getStatus(attributes, "Draft"),
        author: extractAuthor(attributes),
        updatedAt: getDate((attributes.updatedAt ?? attributes.updated_at) as string | undefined),
      });

      return acc;
    }, []);
  }, [blogPostsQuery.data]);

  const appointmentRows: AppointmentRow[] = useMemo(() => {
    if (!appointmentsQuery.data?.data) return [];
    return appointmentsQuery.data.data.reduce<AppointmentRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") {
        return acc;
      }

      const attributes = extractEntityAttributes(entity);

      acc.push({
        id: String(entity.id),
        name: getTranslation(attributes.fullName) ?? getTranslation(attributes.name),
        email: getTranslation(attributes.email, "—"),
        submittedAt: getRelativeTime((attributes.createdAt ?? attributes.created_at) as string | undefined),
        status: getStatus(attributes, "New"),
      });

      return acc;
    }, []);
  }, [appointmentsQuery.data]);

  const totalBlogPosts = blogPostsQuery.data?.meta?.pagination?.total ?? blogPostsQuery.data?.data?.length ?? 0;
  const draftsCount = blogRows.filter((row) => row.status.toLowerCase() !== "published").length;
  const totalServices = servicesQuery.data?.meta?.pagination?.total ?? servicesQuery.data?.data?.length ?? 0;
  const totalProjects = projectsQuery.data?.meta?.pagination?.total ?? projectsQuery.data?.data?.length ?? 0;
  const openAppointments = appointmentRows.filter((row) => {
    const status = row.status.toLowerCase();
    return !["resolved", "closed", "completed"].includes(status);
  }).length;
  const newAppointments = appointmentRows.filter((row) => row.status.toLowerCase() === "new").length;

  const stats = [
    {
      label: "Published Articles",
      value: blogPostsQuery.isLoading ? "…" : totalBlogPosts,
      change:
        blogPostsQuery.isLoading
          ? "Syncing with Strapi"
          : draftsCount === 0
            ? "All articles published"
            : `${draftsCount} draft${draftsCount > 1 ? "s" : ""} to review`,
      icon: FileText,
    },
    {
      label: "Active Services",
      value: servicesQuery.isLoading ? "…" : totalServices,
      change: servicesQuery.isLoading ? "Loading services" : "Auto-synced from Strapi",
      icon: Layers,
    },
    {
      label: "Open Appointments",
      value: appointmentsQuery.isLoading ? "…" : openAppointments,
      change:
        appointmentsQuery.isLoading
          ? "Loading appointments"
          : newAppointments > 0
            ? `${newAppointments} new this week`
            : "No pending follow-ups",
      icon: ArrowUpRight,
    },
    {
      label: "Projects",
      value: projectsQuery.isLoading ? "…" : totalProjects,
      change: projectsQuery.isLoading ? "Fetching portfolio" : "Ready to showcase",
      icon: Monitor,
    },
  ];

  const handleManagePosts = () => navigate("/admin/blog-posts");
  const handleOpenPipeline = () => navigate("/admin/appointments");

  return (
    <AdminLayout
      title="Welcome back"
      description="Track site content, requests, and team activities in one place."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline">View Site</Button>
          <Button>Create Content</Button>
        </div>
      }
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {item.label}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-sm text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Draft & Review queue</h2>
              <p className="text-sm text-muted-foreground">Articles requiring attention before publication.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleManagePosts}>
              Manage posts
            </Button>
          </div>
          <AdminDataTable
            columns={[
              { key: "title", header: "Title", className: "font-medium" },
              {
                key: "status",
                header: "Status",
                className: "w-[120px]",
                render: (row) => (
                  <Badge variant={row.status === "Draft" ? "secondary" : "outline"}>{row.status}</Badge>
                ),
              },
              { key: "author", header: "Owner", className: "w-[160px]" },
              { key: "updatedAt", header: "Last update", className: "w-[140px]" },
            ]}
            data={blogRows}
            isLoading={blogPostsQuery.isLoading}
            emptyState="All clear—no drafts pending review."
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent appointment requests</h2>
              <p className="text-sm text-muted-foreground">Quickly triage incoming leads and assign follow-up.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleOpenPipeline}>
              Open pipeline
            </Button>
          </div>
          <AdminDataTable
            columns={[
              { key: "name", header: "Contact", className: "font-medium" },
              { key: "email", header: "Email", className: "hidden xl:table-cell" },
              { key: "submittedAt", header: "Submitted", className: "w-[140px]" },
              {
                key: "status",
                header: "Status",
                className: "w-[130px]",
                render: (row) => (
                  <Badge
                    variant={row.status.toLowerCase() === "new" ? "default" : row.status.toLowerCase() === "in progress" ? "secondary" : "outline"}
                  >
                    {row.status}
                  </Badge>
                ),
              },
            ]}
            data={appointmentRows}
            isLoading={appointmentsQuery.isLoading}
            emptyState="You’re up to date—no new appointment requests."
          />
        </div>
      </section>
    </AdminLayout>
  );
}
