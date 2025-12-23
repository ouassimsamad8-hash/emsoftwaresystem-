import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAdminApi } from "@/lib/admin-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminBlogPosts, useAdminAuthors, type StrapiEntity } from "@/hooks/use-admin-resources";
import {
  extractEntityAttributes,
  extractRelationAttributes,
  getDate,
  getStatus,
  getTranslation,
} from "@/lib/strapi-helpers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const PAGE_SIZE = 10;
const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337").replace(/\/$/, "");

interface BlogRow extends Record<string, unknown> {
  id: string;
  title: string;
  status: string;
  author: string;
  updatedAt: string;
  entity: StrapiEntity<Record<string, unknown>> | null;
}

interface BlogPostFormContentProps {
  mode: "create" | "edit";
  formState: BlogPostFormState;
  setFormState: Dispatch<SetStateAction<BlogPostFormState>>;
  formError: string | null;
  isSubmitting: boolean;
  authorsLoading: boolean;
  authorsError: boolean;
  authorOptions: Array<{ id: string; name: string }>;
  selectedAuthor: { id: string; name: string } | null;
  onFeaturedImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  featuredImagePreview: string | null;
  isLoadingInitial?: boolean;
}

function BlogPostFormContent({
  mode,
  formState,
  setFormState,
  formError,
  isSubmitting,
  authorsLoading,
  authorsError,
  authorOptions,
  selectedAuthor,
  onFeaturedImageChange,
  featuredImagePreview,
  isLoadingInitial = false,
}: BlogPostFormContentProps) {
  if (isLoadingInitial) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 py-16">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading post details…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>{mode === "create" ? "Unable to create post" : "Unable to update post"}</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Article details</CardTitle>
            <CardDescription>Craft the core content and structure readers will see.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${mode}-blog-title`}>Title (FR)</Label>
              <Input
                id={`${mode}-blog-title`}
                placeholder="Article headline"
                value={formState.title}
                onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`${mode}-blog-category`}>Category (optional)</Label>
                <Input
                  id={`${mode}-blog-category`}
                  placeholder="e.g. Développement"
                  value={formState.category}
                  onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${mode}-blog-read-time`}>Read time (minutes)</Label>
                <Input
                  id={`${mode}-blog-read-time`}
                  type="number"
                  min={0}
                  placeholder="5"
                  value={formState.readTime}
                  onChange={(event) => setFormState((prev) => ({ ...prev, readTime: event.target.value }))}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-blog-excerpt`}>Excerpt (optional)</Label>
              <Textarea
                id={`${mode}-blog-excerpt`}
                placeholder="Short summary displayed in listings"
                value={formState.excerpt}
                onChange={(event) => setFormState((prev) => ({ ...prev, excerpt: event.target.value }))}
                rows={3}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${mode}-blog-content`}>Content (FR)</Label>
              <Textarea
                id={`${mode}-blog-content`}
                placeholder="Full article content"
                value={formState.content}
                onChange={(event) => setFormState((prev) => ({ ...prev, content: event.target.value }))}
                required
                rows={10}
                className="min-h-[220px]"
                disabled={isSubmitting}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured image</CardTitle>
              <CardDescription>Upload a cover image to highlight this article.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                id={`${mode}-blog-featured-image`}
                type="file"
                accept="image/*"
                onChange={onFeaturedImageChange}
                disabled={isSubmitting}
              />
              {featuredImagePreview ? (
                <img
                  src={featuredImagePreview}
                  alt="Selected featured"
                  className="h-40 w-full rounded-md object-cover"
                />
              ) : (
                <p className="text-xs text-muted-foreground">Choose a high-resolution landscape image for best results.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visibility & authorship</CardTitle>
              <CardDescription>Set who is credited and whether the post goes live right away.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Author (optional)</Label>
                <Select
                  value={formState.authorId ? formState.authorId : "none"}
                  onValueChange={(value) => {
                    if (value === "none") {
                      setFormState((prev) => ({
                        ...prev,
                        authorId: "",
                      }));
                      return;
                    }

                    const nextAuthor = authorOptions.find((option) => option.id === value);
                    setFormState((prev) => ({
                      ...prev,
                      authorId: value,
                      authorName:
                        prev.authorName.trim().length > 0
                          ? prev.authorName
                          : nextAuthor?.name ?? "",
                    }));
                  }}
                  disabled={authorsLoading || isSubmitting}
                >
                  <SelectTrigger aria-label="Select author">
                    <SelectValue placeholder={authorsLoading ? "Loading authors…" : "No author assigned"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No author</SelectItem>
                    {authorOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {authorsError ? (
                  <p className="text-xs text-destructive">Failed to load authors. You can still enter a name manually.</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${mode}-blog-author-name`}>Author display name (optional)</Label>
                <Input
                  id={`${mode}-blog-author-name`}
                  placeholder={selectedAuthor?.name ?? "Override display name"}
                  value={formState.authorName}
                  onChange={(event) => setFormState((prev) => ({ ...prev, authorName: event.target.value }))}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">Defaults to the selected author’s name.</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-border p-3">
                <div>
                  <p className="text-sm font-medium">Publish immediately</p>
                  <p className="text-xs text-muted-foreground">
                    Enabled posts appear as published in Strapi. Leave off to save as draft.
                  </p>
                </div>
                <Switch
                  checked={formState.publishNow}
                  onCheckedChange={(checked) =>
                    setFormState((prev) => ({
                      ...prev,
                      publishNow: checked,
                      publishedAt:
                        mode === "edit"
                          ? checked
                            ? prev.publishedAt ?? new Date().toISOString()
                            : null
                          : prev.publishedAt,
                    }))
                  }
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO settings</CardTitle>
              <CardDescription>Improve how this post appears in search results and social previews.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${mode}-blog-seo-title`}>SEO title (optional)</Label>
                <Input
                  id={`${mode}-blog-seo-title`}
                  placeholder="Custom meta title"
                  value={formState.seoTitle}
                  onChange={(event) => setFormState((prev) => ({ ...prev, seoTitle: event.target.value }))}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${mode}-blog-seo-description`}>SEO description (optional)</Label>
                <Textarea
                  id={`${mode}-blog-seo-description`}
                  placeholder="Snippet shown in search results"
                  value={formState.seoDescription}
                  onChange={(event) => setFormState((prev) => ({ ...prev, seoDescription: event.target.value }))}
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${mode}-blog-seo-keywords`}>SEO keywords (comma separated)</Label>
                <Input
                  id={`${mode}-blog-seo-keywords`}
                  placeholder="software, développement, conseil"
                  value={formState.seoKeywords}
                  onChange={(event) => setFormState((prev) => ({ ...prev, seoKeywords: event.target.value }))}
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface BlogPostFormState {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishNow: boolean;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  authorId: string;
  authorName: string;
  slug: string;
  imageId: number | null;
  publishedAt: string | null;
}

export default function AdminBlogPosts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const createEmptyFormState = (): BlogPostFormState => ({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    publishNow: false,
    readTime: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    authorId: "",
    authorName: "",
    slug: "",
    imageId: null,
    publishedAt: null,
  });

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [formState, setFormState] = useState<BlogPostFormState>(() => createEmptyFormState());
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editDocumentId, setEditDocumentId] = useState<string | null>(null);
  const [editFormState, setEditFormState] = useState<BlogPostFormState>(() => createEmptyFormState());
  const [editFeaturedImageFile, setEditFeaturedImageFile] = useState<File | null>(null);
  const [editInitialImageUrl, setEditInitialImageUrl] = useState<string | null>(null);
  const [editFeaturedImagePreview, setEditFeaturedImagePreview] = useState<string | null>(null);
  const [editFormError, setEditFormError] = useState<string | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<BlogRow | null>(null);

  const { toast } = useToast();
  const { request } = useAdminApi();
  const queryClient = useQueryClient();

  const authorsQuery = useAdminAuthors();

  const sanitizeOptional = (value: string) => {
    const trimmed = (value ?? "").trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const parseReadTime = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const getStrapiMediaUrl = (path?: string | null) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${STRAPI_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const createPostMutation = useMutation({
    mutationFn: async (payload: BlogPostFormState & { featuredImageFile: File | null }) => {
      const trimmedTitle = payload.title.trim();
      const trimmedContent = payload.content.trim();
      if (!trimmedTitle || !trimmedContent) {
        throw new Error("Title and content are required.");
      }

      const categoryValue = payload.category.trim();
      const excerptValue = payload.excerpt.trim();

      let imageId: number | null = null;
      if (payload.featuredImageFile) {
        const formData = new FormData();
        formData.append("file", payload.featuredImageFile);
        const uploadResponse = await request<{ files?: Array<{ id?: number }> }>("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const uploadedFile = uploadResponse?.files?.[0];
        if (!uploadedFile?.id) {
          throw new Error("Image upload failed. Please try again.");
        }
        imageId = uploadedFile.id;
      }

      const response = await request<Record<string, unknown>>("/api/admin/blog-posts", {
        method: "POST",
        body: JSON.stringify({
          title_fr: trimmedTitle,
          excerpt_fr: excerptValue || null,
          content_fr: trimmedContent,
          category: categoryValue || null,
          categoryLabel_fr: categoryValue || null,
          readTime: payload.readTime.trim() || null,
          publishNow: payload.publishNow,
          seoTitle: payload.seoTitle.trim() || null,
          seoDescription: payload.seoDescription.trim() || null,
          seoKeywords: payload.seoKeywords.trim() || null,
          authorId: payload.authorId ? Number(payload.authorId) : null,
          authorName: payload.authorName.trim() || null,
          imageId,
        }),
      });

      return response;
    },
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "The article has been stored in Strapi.",
      });
      setPage(1);
      setCreateOpen(false);
      setFormState(createEmptyFormState());
      setFeaturedImageFile(null);
      setFeaturedImagePreview(null);
      setFormError(null);
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
    },
    onError: (error: Error) => {
      setFormError(error.message ?? "Unable to create the post.");
      toast({
        title: "Creation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async (payload: { id: string; documentId?: string | null; data: BlogPostFormState; featuredImageFile: File | null }) => {
      const { data } = payload;
      const trimmedTitle = data.title.trim();
      const trimmedContent = data.content.trim();
      if (!trimmedTitle || !trimmedContent) {
        throw new Error("Title and content are required.");
      }

      let imageId = data.imageId ?? null;
      if (payload.featuredImageFile) {
        const formData = new FormData();
        formData.append("file", payload.featuredImageFile);
        const uploadResponse = await request<{ files?: Array<{ id?: number }> }>("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const uploadedFile = uploadResponse?.files?.[0];
        if (!uploadedFile?.id) {
          throw new Error("Image upload failed. Please try again.");
        }
        imageId = uploadedFile.id;
      }

      const publishedAt = data.publishNow ? data.publishedAt ?? new Date().toISOString() : null;

      const updatePayload: Record<string, unknown> = {
        title_fr: trimmedTitle,
        content_fr: trimmedContent,
        excerpt_fr: sanitizeOptional(data.excerpt),
        category: sanitizeOptional(data.category),
        categoryLabel_fr: sanitizeOptional(data.category),
        readTime: parseReadTime(data.readTime),
        seoTitle: sanitizeOptional(data.seoTitle),
        seoDescription: sanitizeOptional(data.seoDescription),
        seoKeywords: sanitizeOptional(data.seoKeywords),
        author: data.authorId ? Number(data.authorId) : undefined,
        authorName: sanitizeOptional(data.authorName) ?? undefined,
        publishedAt,
        image: imageId ?? undefined,
        featuredImage: imageId ?? undefined,
      };

      const trimmedSlug = data.slug.trim();
      if (trimmedSlug.length > 0) {
        updatePayload.slug = trimmedSlug;
      }

      const updateQuery = payload.documentId
        ? `?documentId=${encodeURIComponent(String(payload.documentId))}`
        : "";

      const response = await request<Record<string, unknown>>(`/api/admin/blog-posts/${payload.id}${updateQuery}`, {
        method: "PUT",
        body: JSON.stringify(updatePayload),
      });

      return response;
    },
    onSuccess: () => {
      toast({
        title: "Post updated",
        description: "The article changes are live in Strapi.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
      setEditOpen(false);
      setEditPostId(null);
      setEditDocumentId(null);
      setEditFormState(createEmptyFormState());
      setEditFeaturedImageFile(null);
      setEditInitialImageUrl(null);
      setEditFeaturedImagePreview(null);
      setEditFormError(null);
    },
    onError: (error: Error) => {
      setEditFormError(error.message ?? "Unable to update the post.");
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (postId: string) => {
      await request(`/api/admin/blog-posts/${postId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      toast({
        title: "Post deleted",
        description: "The article has been removed from Strapi.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin", "blog-posts"] });
      setPendingDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Deletion failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const blogPostsQuery = useAdminBlogPosts({
    page,
    pageSize: PAGE_SIZE,
    search: search.trim() === "" ? undefined : search.trim(),
  });

  const rows: BlogRow[] = useMemo(() => {
    if (!blogPostsQuery.data?.data) return [];

    const extractText = (value: unknown, seen: WeakSet<object>): string => {
      if (value === undefined || value === null) return "";

      if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : "";
      }

      if (typeof value === "number") {
        return String(value);
      }

      if (typeof value === "object") {
        const objectValue = value as object;
        if (seen.has(objectValue)) {
          return "";
        }
        seen.add(objectValue);

        const direct = getTranslation(objectValue, "").trim();
        if (direct.length > 0) {
          return direct;
        }

        if (Array.isArray(objectValue)) {
          for (const item of objectValue) {
            const candidate = extractText(item, seen);
            if (candidate.length > 0) {
              return candidate;
            }
          }
          return "";
        }

        const record = objectValue as Record<string, unknown>;

        if (record.data !== undefined) {
          const candidate = extractText(record.data, seen);
          if (candidate.length > 0) {
            return candidate;
          }
        }

        if (record.attributes && typeof record.attributes === "object") {
          const attributesRecord = record.attributes as Record<string, unknown>;
          const attributeKeys = [
            "title_fr",
            "title_en",
            "title",
            "name",
            "label",
            "displayName",
            "fullName",
            "firstName",
            "lastName",
            "slug",
          ];
          for (const key of attributeKeys) {
            const candidate = extractText(attributesRecord[key], seen);
            if (candidate.length > 0) {
              return candidate;
            }
          }
        }

        const fallbackKeys = ["fr", "en", "value", "id"];
        for (const key of fallbackKeys) {
          if (record[key] !== undefined) {
            const candidate = extractText(record[key], seen);
            if (candidate.length > 0) {
              return candidate;
            }
          }
        }

        for (const key of Object.keys(record)) {
          const candidate = extractText(record[key], seen);
          if (candidate.length > 0) {
            return candidate;
          }
        }
      }

      return "";
    };

    const resolveText = (...values: Array<unknown>) => {
      const seen = new WeakSet<object>();
      for (const value of values) {
        const candidate = extractText(value, seen);
        if (candidate.length > 0) {
          return candidate;
        }
      }
      return "";
    };

    return blogPostsQuery.data.data.reduce<BlogRow[]>((acc, entity) => {
      if (!entity || typeof entity !== "object") return acc;
      const typedEntity = entity as StrapiEntity<Record<string, unknown>>;
      const attributes = extractEntityAttributes(typedEntity);
      const authorRelationAttributes = extractRelationAttributes(attributes.author);
      const publishedMarker = (attributes.publishedAt ?? attributes.published_at) as unknown;
      const isPublished = typeof publishedMarker === "string" ? publishedMarker.trim().length > 0 : Boolean(publishedMarker);
      const status = getStatus(attributes, isPublished ? "Published" : "Draft");
      const title = resolveText(
        attributes.title,
        attributes.title_fr,
        attributes.title_en,
        attributes.name,
        attributes.slug,
      );
      const authorName = resolveText(
        authorRelationAttributes,
        authorRelationAttributes["name"],
        authorRelationAttributes["fullName"],
        attributes.authorName,
        attributes.author,
      );
      const updatedAtCandidate = attributes.updatedAt ?? attributes.updated_at;
      const updatedAtRaw =
        typeof updatedAtCandidate === "string"
          ? updatedAtCandidate
          : typeof updatedAtCandidate === "number"
            ? new Date(updatedAtCandidate).toISOString()
            : null;
      const updatedAt = updatedAtRaw ? getDate(updatedAtRaw) : "—";

      acc.push({
        id: String(entity.id),
        title: title || "Untitled",
        status,
        author: authorName || "—",
        updatedAt,
        entity: typedEntity,
      });

      return acc;
    }, []);
  }, [blogPostsQuery.data]);

  const pagination = blogPostsQuery.data?.meta?.pagination;
  const totalPages = pagination?.pageCount ?? 1;
  const totalEntries = pagination?.total ?? rows.length;

  const isLoading = blogPostsQuery.isLoading && rows.length === 0;
  const hasError = blogPostsQuery.isError;
  const isCreating = createPostMutation.isPending;
  const isUpdating = updatePostMutation.isPending;
  const isDeleting = deletePostMutation.isPending;

  useEffect(() => {
    if (!featuredImageFile) {
      setFeaturedImagePreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(featuredImageFile);
    setFeaturedImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [featuredImageFile]);

  useEffect(() => {
    if (editFeaturedImageFile) {
      const objectUrl = URL.createObjectURL(editFeaturedImageFile);
      setEditFeaturedImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setEditFeaturedImagePreview(editInitialImageUrl);
    return undefined;
  }, [editFeaturedImageFile, editInitialImageUrl]);

  const authorOptions = useMemo(() => {
    if (!authorsQuery.data?.data) return [] as Array<{ id: string; name: string }>;
    return authorsQuery.data.data.reduce<Array<{ id: string; name: string }>>((acc, entity) => {
      if (!entity || typeof entity !== "object") return acc;
      const attributes = extractEntityAttributes(entity);
      const name =
        getTranslation(attributes.name, "") ||
        getTranslation(attributes.fullName, "") ||
        (attributes.name as string | undefined) ||
        `Author ${entity.id}`;
      acc.push({ id: String(entity.id), name });
      return acc;
    }, []);
  }, [authorsQuery.data]);

  const createSelectedAuthor = useMemo(
    () => authorOptions.find((option) => option.id === formState.authorId) ?? null,
    [authorOptions, formState.authorId],
  );

  const editSelectedAuthor = useMemo(
    () => authorOptions.find((option) => option.id === editFormState.authorId) ?? null,
    [authorOptions, editFormState.authorId],
  );

  const handleDialogOpenChange = (open: boolean) => {
    if (!open && !isCreating) {
      setFormState(createEmptyFormState());
      setFeaturedImageFile(null);
      setFeaturedImagePreview(null);
      setFormError(null);
    }
    if (open) {
      setFormError(null);
    }
    setCreateOpen(open);
  };

  const handleCreateSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCreating) return;
    setFormError(null);
    createPostMutation.mutate({ ...formState, featuredImageFile });
  };

  const handleFeaturedImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setFeaturedImageFile(null);
      return;
    }
    setFeaturedImageFile(file);
  };

  const resetEditState = () => {
    setEditPostId(null);
    setEditDocumentId(null);
    setEditFormState(createEmptyFormState());
    setEditFeaturedImageFile(null);
    setEditInitialImageUrl(null);
    setEditFeaturedImagePreview(null);
    setEditFormError(null);
    setIsEditLoading(false);
  };

  const handleEditDialogOpenChange = (open: boolean) => {
    if (!open) {
      if (isUpdating) return;
      setEditOpen(false);
      resetEditState();
      return;
    }
    setEditFormError(null);
    setEditOpen(true);
  };

  const handleEditFeaturedImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setEditFeaturedImageFile(file ?? null);
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editPostId || isUpdating) return;
    setEditFormError(null);
    const nextPublishedAt = editFormState.publishNow
      ? editFormState.publishedAt ?? new Date().toISOString()
      : null;
    updatePostMutation.mutate({
      id: editPostId,
      documentId: editDocumentId,
      data: { ...editFormState, publishedAt: nextPublishedAt },
      featuredImageFile: editFeaturedImageFile,
    });
  };

  const handleStartEdit = useCallback(
    async (row: BlogRow) => {
      setEditPostId(row.id);
      const sourceAttributes = row.entity ? extractEntityAttributes(row.entity) : null;
      const sourceDocumentId = sourceAttributes?.documentId;
      setEditDocumentId(
        typeof sourceDocumentId === "string"
          ? sourceDocumentId
          : sourceDocumentId
            ? String(sourceDocumentId)
            : null,
      );
      setEditFormError(null);
      setEditFeaturedImageFile(null);
      setEditInitialImageUrl(null);
      setEditFeaturedImagePreview(null);
      setEditOpen(true);
      setIsEditLoading(true);

      const hydrateFormFromEntity = (input: StrapiEntity<Record<string, unknown>>) => {
        const attributes = extractEntityAttributes(input);
        const detectedDocumentId = attributes.documentId ?? attributes.document_id ?? null;
        setEditDocumentId(
          typeof detectedDocumentId === "string"
            ? detectedDocumentId
            : detectedDocumentId
              ? String(detectedDocumentId)
              : null,
        );
        const titleCandidate =
          (typeof attributes.title_fr === "string" && attributes.title_fr.trim().length > 0
            ? attributes.title_fr
            : getTranslation(attributes.title, "")) ||
          getTranslation(attributes.title_en, "") ||
          "";

        const excerptCandidate =
          (typeof attributes.excerpt_fr === "string" ? attributes.excerpt_fr : getTranslation(attributes.excerpt, "")) ||
          "";

        const contentCandidate =
          (typeof attributes.content_fr === "string" && attributes.content_fr.trim().length > 0
            ? attributes.content_fr
            : typeof attributes.content === "string"
              ? attributes.content
              : "");

        const categoryCandidate = typeof attributes.category === "string" ? attributes.category : "";
        const readTimeValue = attributes.readTime ?? attributes.read_time;
        const readTimeCandidate =
          typeof readTimeValue === "number"
            ? String(readTimeValue)
            : typeof readTimeValue === "string"
              ? readTimeValue
              : "";

        const seoTitleCandidate = typeof attributes.seoTitle === "string" ? attributes.seoTitle : "";
        const seoDescriptionCandidate =
          typeof attributes.seoDescription === "string" ? attributes.seoDescription : "";
        const seoKeywordsCandidate = typeof attributes.seoKeywords === "string" ? attributes.seoKeywords : "";

        const authorRelationAttributes = extractRelationAttributes(attributes.author);
        const authorIdCandidate = (() => {
          const relationId = authorRelationAttributes.id;
          if (typeof relationId === "number" || typeof relationId === "string") {
            return String(relationId);
          }
          if (typeof attributes.authorId === "number" || typeof attributes.authorId === "string") {
            return String(attributes.authorId);
          }
          return "";
        })();

        const relationNameValue = authorRelationAttributes["name"];
        const relationFullNameValue = authorRelationAttributes["fullName"];
        const derivedAuthorName =
          getTranslation(relationNameValue, "") ||
          getTranslation(relationFullNameValue, "") ||
          (typeof relationNameValue === "string" ? relationNameValue : "") ||
          (typeof relationFullNameValue === "string" ? relationFullNameValue : "");

        const authorNameCandidate =
          typeof attributes.authorName === "string" && attributes.authorName.trim().length > 0
            ? attributes.authorName
            : derivedAuthorName;

        const slugCandidate = typeof attributes.slug === "string" ? attributes.slug : "";
        const publishedAtCandidate = (() => {
          const value = attributes.publishedAt ?? attributes.published_at;
          if (typeof value === "string" && value.length > 0) return value;
          return null;
        })();

        const imageRelation = attributes.featuredImage ?? attributes.image;
        const mediaAttributes = extractRelationAttributes(imageRelation);
        const mediaUrl = getStrapiMediaUrl((mediaAttributes.url as string | undefined) ?? null);
        const mediaId = (() => {
          const rawId = mediaAttributes.id;
          if (typeof rawId === "number") return rawId;
          if (typeof rawId === "string") {
            const parsed = Number(rawId);
            return Number.isFinite(parsed) ? parsed : null;
          }
          return null;
        })();

        setEditFormState({
          title: titleCandidate,
          excerpt: excerptCandidate,
          content: contentCandidate,
          category: categoryCandidate,
          publishNow: Boolean(publishedAtCandidate),
          readTime: readTimeCandidate,
          seoTitle: seoTitleCandidate,
          seoDescription: seoDescriptionCandidate,
          seoKeywords: seoKeywordsCandidate,
          authorId: authorIdCandidate,
          authorName: authorNameCandidate ?? "",
          slug: slugCandidate,
          imageId: mediaId,
          publishedAt: publishedAtCandidate,
        });
        setEditInitialImageUrl(mediaUrl);
      };

      try {
        const documentId = sourceDocumentId;
        const querySuffix = documentId
          ? `?preview=true&documentId=${encodeURIComponent(String(documentId))}`
          : "?preview=true";

        const response = await request<{ data?: StrapiEntity<Record<string, unknown>> }>(
          `/api/admin/blog-posts/${row.id}${querySuffix}`,
        );

        const entity = response?.data ?? row.entity;
        if (!entity) {
          throw new Error("Unable to locate this blog post in Strapi.");
        }

        hydrateFormFromEntity(entity);
      } catch (error) {
        if (row.entity) {
          hydrateFormFromEntity(row.entity);
        }
        const message = error instanceof Error ? error.message : "Unable to load the blog post.";
        setEditFormError(message);
      } finally {
        setIsEditLoading(false);
      }
    },
    [request],
  );

  const handleConfirmDelete = async () => {
    if (!pendingDelete || isDeleting) return;
    try {
      await deletePostMutation.mutateAsync(pendingDelete.id);
    } catch (error) {
      // Error handled in mutation onError
    }
  };

  return (
    <AdminLayout
      title="Blog posts"
      description="Review published articles, drafts, and posts awaiting review."
      actions={
        <Dialog open={isCreateOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl overflow-hidden p-0 sm:max-h-[85vh]">
            <form
              onSubmit={handleCreateSubmit}
              className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]"
            >
              <DialogHeader className="border-b px-6 py-4">
                <DialogTitle>Create a blog post</DialogTitle>
                <DialogDescription>Publish new content directly to Strapi without leaving the dashboard.</DialogDescription>
              </DialogHeader>

              <ScrollArea className="h-full px-6 py-4">
                <BlogPostFormContent
                  mode="create"
                  formState={formState}
                  setFormState={setFormState}
                  formError={formError}
                  isSubmitting={isCreating}
                  authorsLoading={authorsQuery.isLoading}
                  authorsError={authorsQuery.isError}
                  authorOptions={authorOptions}
                  selectedAuthor={createSelectedAuthor}
                  onFeaturedImageChange={handleFeaturedImageChange}
                  featuredImagePreview={featuredImagePreview}
                />
              </ScrollArea>

              <DialogFooter className="border-t bg-background px-6 py-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormState(createEmptyFormState());
                    setFeaturedImageFile(null);
                    setFeaturedImagePreview(null);
                    setFormError(null);
                    setCreateOpen(false);
                  }}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {isCreating ? "Saving…" : "Create post"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search title or author"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="w-full md:w-72"
              aria-label="Search blog posts"
            />
            {blogPostsQuery.isFetching ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalEntries} entr{totalEntries === 1 ? "y" : "ies"} • page {pagination?.page ?? page} of {totalPages}
          </p>
        </div>

        {hasError ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to load posts</AlertTitle>
            <AlertDescription>
              {(blogPostsQuery.error as Error)?.message ?? "An unexpected error occurred while retrieving posts."}
            </AlertDescription>
          </Alert>
        ) : null}

        <AdminDataTable
          columns={[
            { key: "title", header: "Title", className: "font-medium" },
            {
              key: "status",
              header: "Status",
              className: "w-[160px]",
              render: (row) => {
                const label = String(row.status ?? "");
                const lowered = label.toLowerCase();
                const variant = lowered === "published" ? "default" : lowered === "draft" ? "secondary" : "outline";
                return <Badge variant={variant}>{label}</Badge>;
              },
            },
            { key: "author", header: "Author", className: "hidden lg:table-cell" },
            { key: "updatedAt", header: "Last update", className: "w-[160px]" },
            {
              key: "actions",
              header: "",
              className: "w-[60px] text-right",
              headerClassName: "w-[60px]",
              render: (row) => (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44" forceMount>
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        handleStartEdit(row as BlogRow);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" /> Edit post
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={(event) => {
                        event.preventDefault();
                        setPendingDelete(row as BlogRow);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            },
          ]}
          data={rows}
          isLoading={isLoading}
          emptyState={search ? "No posts match your search." : "No blog posts yet. Create one to get started."}
        />

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || blogPostsQuery.isFetching}
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
            disabled={page >= totalPages || blogPostsQuery.isFetching}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setPendingDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete "{pendingDelete?.title ?? "this post"}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action removes the article from Strapi. The operation cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditOpen} onOpenChange={handleEditDialogOpenChange}>
        <DialogContent className="max-w-5xl overflow-hidden p-0 sm:max-h-[85vh]">
          <form
            onSubmit={handleEditSubmit}
            className="grid max-h-[85vh] grid-rows-[auto_minmax(0,1fr)_auto]"
          >
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>Edit blog post</DialogTitle>
              <DialogDescription>Update the article content and metadata without leaving the dashboard.</DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-full px-6 py-4">
              <BlogPostFormContent
                mode="edit"
                formState={editFormState}
                setFormState={setEditFormState}
                formError={editFormError}
                isSubmitting={isUpdating}
                authorsLoading={authorsQuery.isLoading}
                authorsError={authorsQuery.isError}
                authorOptions={authorOptions}
                selectedAuthor={editSelectedAuthor}
                onFeaturedImageChange={handleEditFeaturedImageChange}
                featuredImagePreview={editFeaturedImagePreview}
                isLoadingInitial={isEditLoading}
              />
            </ScrollArea>

            <DialogFooter className="border-t bg-background px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleEditDialogOpenChange(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating || isEditLoading}>
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isUpdating ? "Saving…" : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
