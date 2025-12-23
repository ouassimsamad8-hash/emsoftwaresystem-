import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminSiteSettings } from "@/hooks/use-admin-resources";
import { getStringAttribute, getTranslation, getBoolean } from "@/lib/strapi-helpers";

interface SettingGroup {
  label: string;
  value: string;
  helper?: string;
}

export default function AdminSiteSettings() {
  const settingsQuery = useAdminSiteSettings();

  const groups = useMemo<SettingGroup[]>(() => {
    const data = settingsQuery.data;
    if (!data || typeof data !== "object") return [];

    // Strapi singleton responses vary: either the attributes are at root (custom API) or nested under data.attributes
    const container = data as Record<string, unknown>;
    const attributes = (container.data && typeof container.data === "object"
      ? (container.data as Record<string, unknown>).attributes
      : container) as Record<string, unknown> | undefined;

    if (!attributes) return [];

    return [
      {
        label: "Site name",
        value:
          getTranslation(attributes["siteName"], "") || getStringAttribute(attributes, "siteName", "—"),
      },
      {
        label: "Tagline",
        value:
          getTranslation(attributes["tagline"], "") || getStringAttribute(attributes, "tagline", "—"),
      },
      {
        label: "Primary email",
        value: getStringAttribute(attributes, "contactEmail", "—"),
      },
      {
        label: "Phone",
        value: getStringAttribute(attributes, "contactPhone", "—"),
      },
      {
        label: "Cookie banner",
        value: getBoolean(attributes["cookieBannerEnabled"]) ? "Enabled" : "Disabled",
        helper: "Controls whether the cookie consent banner is displayed to visitors.",
      },
    ];
  }, [settingsQuery.data]);

  const isLoading = settingsQuery.isLoading && !settingsQuery.data;
  const hasError = settingsQuery.isError;

  return (
    <AdminLayout
      title="Site settings"
      description="Key configuration pulled from Strapi’s site settings singleton."
      actions={
        <Button
          size="sm"
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_STRAPI_URL ?? ""}/admin/content-manager/singleType/api::site-setting.site-setting`,
              "_blank",
            )
          }
        >
          Open in Strapi
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((item) => (
              <Skeleton key={item} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : null}

        {hasError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load settings</AlertTitle>
            <AlertDescription>
              {(settingsQuery.error as Error)?.message ?? "An unexpected error occurred while retrieving settings."}
            </AlertDescription>
          </Alert>
        ) : null}

        {!isLoading && !hasError ? (
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <Card key={group.label}>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {group.label}
                  </CardTitle>
                  {group.helper ? <CardDescription>{group.helper}</CardDescription> : null}
                </CardHeader>
                <CardContent>
                  <p className="text-base font-semibold text-foreground">{group.value || "—"}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {!isLoading && !hasError ? (
          <Card>
            <CardHeader>
              <CardTitle>Raw payload</CardTitle>
              <CardDescription>Developers can reference the raw response for debugging or new fields.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="max-h-80 overflow-auto rounded-lg bg-muted p-4 text-xs">
                {JSON.stringify(settingsQuery.data, null, 2)}
              </pre>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </AdminLayout>
  );
}
