import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useAdminFaqs } from "@/hooks/use-admin-resources";
import { extractEntityAttributes, getTranslation } from "@/lib/strapi-helpers";

interface FaqRow extends Record<string, unknown> {
  id: string;
  question: string;
  category: string;
  answer: string;
}

export default function AdminFaqs() {
  const faqsQuery = useAdminFaqs();

  const rows: FaqRow[] = useMemo(() => {
    if (!faqsQuery.data?.data) return [];
    return faqsQuery.data.data.reduce<FaqRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") return acc;
      const attributes = extractEntityAttributes(entity);

      acc.push({
        id: String(entity.id),
        question:
          getTranslation(attributes.question, "") ||
          getTranslation(attributes.question_en, "") ||
          getTranslation(attributes.question_fr, "") ||
          "Untitled question",
        category:
          getTranslation(attributes.categoryLabel, "") ||
          getTranslation(attributes.category, "") ||
          "—",
        answer:
          getTranslation(attributes.answer, "") ||
          getTranslation(attributes.answer_en, "") ||
          getTranslation(attributes.answer_fr, "") ||
          "—",
      });

      return acc;
    }, []);
  }, [faqsQuery.data]);

  const isLoading = faqsQuery.isLoading && rows.length === 0;
  const hasError = faqsQuery.isError;

  return (
    <AdminLayout
      title="FAQs"
      description="Frequently asked questions displayed across the site."
      actions={
        <Button
          size="sm"
          onClick={() =>
            window.open(
              `${import.meta.env.VITE_STRAPI_URL ?? ""}/admin/content-manager/collectionType/api::faq.faq`,
              "_blank",
            )
          }
        >
          Manage in Strapi
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {faqsQuery.isFetching ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading FAQ entries…
          </div>
        ) : null}

        {hasError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load FAQs</AlertTitle>
            <AlertDescription>
              {(faqsQuery.error as Error)?.message ?? "An unexpected error occurred while retrieving FAQs."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AdminDataTable
          columns={[
            { key: "question", header: "Question", className: "font-medium" },
            { key: "category", header: "Category", className: "hidden md:table-cell" },
            { key: "answer", header: "Answer", className: "hidden lg:table-cell" },
          ]}
          data={rows}
          isLoading={isLoading}
          emptyState="No FAQs yet. Use Strapi to add guidelines for visitors."
        />
      </div>
    </AdminLayout>
  );
}
