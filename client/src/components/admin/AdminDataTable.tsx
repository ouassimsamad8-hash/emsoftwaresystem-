import { Fragment, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface AdminTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  headerClassName?: string;
  render?: (row: T) => ReactNode;
}

interface AdminDataTableProps<T> {
  columns: AdminTableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyState?: ReactNode;
  getRowId?: (row: T, index: number) => string | number;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string | undefined;
}

export function AdminDataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading = false,
  emptyState,
  getRowId,
  onRowClick,
  rowClassName,
}: AdminDataTableProps<T>) {
  const renderSkeletonRows = () => (
    <Fragment>
      {[0, 1, 2].map((row) => (
        <TableRow key={`skeleton-${row}`}>
          {columns.map((column) => (
            <TableCell key={column.key}>
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  );

  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="py-10 text-center text-sm text-muted-foreground">
        {emptyState ?? "No data available yet."}
      </TableCell>
    </TableRow>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn("whitespace-nowrap", column.headerClassName)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? renderSkeletonRows()
            : data.length === 0
              ? renderEmptyState()
              : data.map((row, index) => {
                  const rowId = getRowId ? getRowId(row, index) : index;
                  const interactive = Boolean(onRowClick);

                  return (
                    <TableRow
                      key={rowId}
                      onClick={interactive ? () => onRowClick?.(row) : undefined}
                      className={cn(
                        interactive ? "cursor-pointer hover:bg-primary/5" : undefined,
                        rowClassName ? rowClassName(row) : undefined,
                      )}
                    >
                      {columns.map((column) => (
                        <TableCell key={column.key} className={column.className}>
                          {column.render ? column.render(row) : String(row[column.key] ?? "")}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
        </TableBody>
      </Table>
    </div>
  );
}
