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
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { SearchInput } from "../ui/search-input";
import { getColumnDefinitions } from "./columnDefenitions";
import { Card, CardHeader, CardContent } from "../ui/card";
import { useCallback, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentNode, useMutation, gql } from "@apollo/client";
import { Badge } from "../ui/badge";
import { GET_PAGE } from "../pages/helpers/queries";

type PrimitiveValue = string | number | boolean | null;
type NestedRecord = Record<string, PrimitiveValue>;
type TableDataItem = Record<string, PrimitiveValue | NestedRecord>;

interface TableContentProps<T extends TableDataItem> {
  dataType: string;
  title: string;
  tableData: T[];
  className?: string;
  getComponentData: DocumentNode;
  createMutation: DocumentNode;
  componentId: string;
}

const RemoveComponentMutation = gql`
  mutation RemoveComponentFromPage1($id: ID!) {
    removeComponentFromPage1(id: $id)
  }
`;

export function TableContent<T extends TableDataItem>({
  componentId,
  dataType,
  title,
  tableData,
  className,
  getComponentData,
  createMutation,
}: TableContentProps<T>) {
  const columns = useMemo(
    () => getColumnDefinitions(dataType) as ColumnDef<T>[],
    [dataType],
  );
  const [filteredData, setFilteredData] = useState(() => tableData);

  const [removeComponent] = useMutation(RemoveComponentMutation, {
    variables: { id: componentId },
    refetchQueries: [{ query: GET_PAGE, variables: { name: "page1" } }],
  });

  const [createEntry] = useMutation(createMutation, {
    refetchQueries: [
      { query: getComponentData, variables: { type: dataType } },
    ],
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
          <div className="flex items-center gap-x-10">
            <SearchInput
              debounced={false}
              onSearch={handleSearch}
              placeholder="Search"
              className="max-w-xs"
            />
            <Button
              className="size-8 rounded-full p-0"
              variant="outline"
              size="sm"
              onClick={() => removeComponent()}
              // onClick={() => removeComponentFromPage1(componentId)}
            >
              <IconTrash className="size-4" stroke={1} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="flex items-center justify-between p-4">
            {/* TODO: Get row count from data received from server (should probably be paginated) */}
            <Badge variant="secondary">Total: {table.getRowCount()}</Badge>
            {dataType === "iterations" && (
              <Button size="sm" onClick={() => createEntry()}>
                <IconPlus size={16} /> Add
              </Button>
            )}
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
