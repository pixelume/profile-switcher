import {
  // ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";
import { SearchInput } from "../ui/search-input";
import { Iteration } from "./types";
import { columnDefinitions } from "./columnDefenitions";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   className?: string;
//   title: string;
interface DataTableProps {
  data: Iteration[];
  className?: string;
  title: string;
}

// export function TempTable<TData, TValue>({
//   columns,
//   data,
//   className,
//   title,
// }: DataTableProps<TData, TValue>) {
export function TempTable({ data, className, title }: DataTableProps) {
  const columns = columnDefinitions;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={cn("rounded-md border", className)}>
      <div className="flex items-center justify-between gap-x-4 bg-secondary p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <SearchInput
          onSearch={(value) => console.log(`debounced search: ${value}`)}
          placeholder="Search"
          className="max-w-xs"
        />
        {/* <Input type="text" className="max-w-xs" placeholder="Search" /> */}
      </div>
      <div className="flex items-center justify-between p-4">
        <span className="text-sm text-muted-foreground">
          {/* TODO: Get row count from data received from server (should probably be paginated) */}
          Total: {table.getRowCount()}
        </span>
        <Button size="sm" onClick={() => console.log("add clicked")}>
          <IconPlus size={16} /> Add
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="whitespace-nowrap" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
