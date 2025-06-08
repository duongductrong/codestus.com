"use client"

import { cn } from "@/utils/tailwind-utils"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Loader2 } from "lucide-react"
import { ComponentProps, CSSProperties } from "react"
import { composeEvents } from "./compose-events"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends unknown, TValue> {
    className?: string
  }
}

export interface MinimalTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData>[]
  loading?: boolean

  maxHeight?: string

  components?: {
    row?: ComponentProps<"div">
    cell?: ComponentProps<"div">
  }

  onRowClick?: (row: TData) => void
}

export function MinimalTable<TData>({
  data,
  columns,
  loading,
  components,
  maxHeight,
  onRowClick,
}: MinimalTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div
      style={{ "--mt-max-height": maxHeight || undefined } as CSSProperties}
      data-slot="table"
      className={cn(
        "relative",
        "flex flex-col rounded-md border border-border w-full",
        "[&_[data-slot=row]]:flex-1",
        "text-sm overflow-auto min-h-[300px] max-h-[var(--mt-max-height,auto)]"
      )}
    >
      {loading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-background/50 z-10 flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : null}
      {table.getRowModel().rows.map((row) => (
        <div
          {...components?.row}
          key={row.id}
          data-slot="row"
          role="presentation"
          className={cn(
            "flex items-center w-full border-b border-border hover:bg-muted/50",
            "[&>[data-slot=cell]]:flex-1 [&>[data-slot=cell]]:p-4 [&>[data-slot=cell]]:py-5",
            components?.row?.onClick || onRowClick ? "cursor-pointer" : "",
            components?.row?.className
          )}
          onClick={composeEvents(components?.row?.onClick, () => onRowClick?.(row.original))}
        >
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              data-slot="cell"
              className={cn(cell.column.columnDef.meta?.className, components?.cell?.className)}
              {...components?.cell}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
