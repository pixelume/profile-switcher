import {
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
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";
import { SearchInput } from "../ui/search-input";
import { getColumnDefinitions } from "./columnDefenitions";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useCallback, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

interface TableContentProps<T extends Record<string, unknown>> {
  name: string;
  title: string;
  tableData: T[];
  className?: string;
}

export function TableContent<T extends Record<string, unknown>>({
  name,
  title,
  tableData,
  className,
}: TableContentProps<T>) {
  const columns = useMemo(
    () => getColumnDefinitions(name) as ColumnDef<T>[],
    [name],
  );
  const [filteredData, setFilteredData] = useState(tableData);
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = useCallback(
    (searchValue: string) => {
      setFilteredData(
        tableData.filter((row) =>
          Object.values(row).some((value: unknown) => {
            if (typeof value === "string") {
              return value.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (typeof value === "object" && value !== null) {
              return Object.values(value).some((v: unknown) => {
                if (typeof v === "string") {
                  return v.toLowerCase().includes(searchValue.toLowerCase());
                }
                return false;
              });
            }
            return false;
          }),
        ),
      );
    },
    [tableData],
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between gap-x-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <SearchInput
            debounced={false}
            onSearch={handleSearch}
            placeholder="Search"
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {/* <Input type="text" className="max-w-xs" placeholder="Search" /> */}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
