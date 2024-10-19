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
import { DocumentNode, useMutation } from "@apollo/client";
import { Badge } from "../ui/badge";

type PrimitiveValue = string | number | boolean | null;
type NestedRecord = Record<string, PrimitiveValue>;
type TableDataItem = Record<string, PrimitiveValue | NestedRecord>;

interface TableContentProps<T extends TableDataItem> {
  name: string;
  title: string;
  tableData: T[];
  className?: string;
  dataId: string;
  getComponentData: DocumentNode;
  createMutation: DocumentNode;
}

export function TableContent<T extends TableDataItem>({
  name,
  title,
  tableData,
  className,
  dataId,
  getComponentData,
  createMutation,
}: TableContentProps<T>) {
  const columns = useMemo(
    () => getColumnDefinitions(name, dataId) as ColumnDef<T>[],
    [name, dataId],
  );
  const [filteredData, setFilteredData] = useState(() => tableData);

  const [createEntry] = useMutation(createMutation, {
    refetchQueries: [{ query: getComponentData, variables: { id: dataId } }],
  });

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
            {/* TODO: Get row count from data received from server (should probably be paginated) */}
            <Badge variant="secondary">Total: {table.getRowCount()}</Badge>
            <Button size="sm" onClick={() => createEntry()}>
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
