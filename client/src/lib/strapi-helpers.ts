import { formatDistanceToNow } from "date-fns";

export function getTranslation(value: unknown, fallback = "—"): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.en === "string" && record.en.trim().length > 0) return record.en;
    if (typeof record.fr === "string" && record.fr.trim().length > 0) return record.fr;
  }
  return fallback;
}

export function getStringAttribute(attributes: Record<string, unknown>, key: string, fallback = "—"): string {
  if (!attributes) return fallback;
  const value = attributes[key];
  if (typeof value === "string" && value.trim().length > 0) return value;
  return fallback;
}

export function getStatus(attributes: Record<string, unknown>, fallback = "Unknown"): string {
  const value = attributes.status ?? attributes.state ?? attributes.stage;
  if (typeof value === "string" && value.trim().length > 0) {
    return value
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return fallback;
}

export function getDate(value: unknown, options?: Intl.DateTimeFormatOptions): string {
  if (!value || typeof value !== "string") return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, options);
}

export function getRelativeTime(value: unknown): string {
  if (!value || typeof value !== "string") return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return formatDistanceToNow(date, { addSuffix: true });
}

export function getBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return ["true", "1", "yes"].includes(value.toLowerCase());
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  return false;
}

export function extractEntityAttributes(entity: unknown): Record<string, unknown> {
  if (!entity || typeof entity !== "object" || Array.isArray(entity)) {
    return {};
  }

  const base = entity as Record<string, unknown>;
  const attributesCandidate = base.attributes;

  const attributes =
    attributesCandidate && typeof attributesCandidate === "object"
      ? (attributesCandidate as Record<string, unknown>)
      : base;

  const result = { ...attributes } as Record<string, unknown>;

  if (base.id !== undefined && !Object.prototype.hasOwnProperty.call(result, "id")) {
    result.id = base.id as unknown;
  }

  if (base.documentId !== undefined && !Object.prototype.hasOwnProperty.call(result, "documentId")) {
    result.documentId = base.documentId;
  }

  return result;
}

export function extractRelationAttributes(input: unknown): Record<string, unknown> {
  if (!input) {
    return {};
  }

  if (Array.isArray(input)) {
    const first = input[0];
    return first ? extractEntityAttributes(first) : {};
  }

  if (typeof input !== "object") {
    return {};
  }

  const record = input as Record<string, unknown>;

  if (record.data !== undefined) {
    const data = record.data as unknown;
    if (Array.isArray(data)) {
      const first = data[0];
      return first ? extractEntityAttributes(first) : {};
    }
    return extractEntityAttributes(data);
  }

  return extractEntityAttributes(record);
}
