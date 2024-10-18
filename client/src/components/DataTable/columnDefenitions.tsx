import { createColumnHelper } from "@tanstack/react-table";
import { Iteration } from "./types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";

interface OtherTable {
  id: number;
  name: string;
  something: string;
  somethingElse: string;
}

const iterationsColumnHelper = createColumnHelper<Iteration>();
const otherTableColumnHelper = createColumnHelper<OtherTable>();
// Helpers for other Data Tables here

const iterationsColumns = [
  iterationsColumnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: "Iteration",
  }),
  iterationsColumnHelper.accessor(
    (row) => (
      <div className="flex flex-col gap-y-1">
        <span className="text-sm font-semibold">{row.created.employee}</span>
        <span className="text-xs text-gray-500">{row.created.datetime}</span>
      </div>
    ),
    {
      id: "created",
      cell: (info) => info.getValue(),
      header: "Created",
    },
  ),
  iterationsColumnHelper.accessor(
    (row) => (
      <div className="flex flex-col gap-y-1">
        <span className="text-sm font-semibold">{row.updated.employee}</span>
        <span className="text-xs text-gray-500">{row.updated.datetime}</span>
      </div>
    ),
    {
      id: "updated",
      cell: (info) => info.getValue(),
      header: "Updated",
    },
  ),
  iterationsColumnHelper.accessor("status", {
    id: "status",
    cell: (info) => info.getValue(),
    header: "Status",
  }),
  iterationsColumnHelper.accessor(
    (row) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log(`${row.id} - edit`)}
        >
          <IconPencil size={20} stroke={1} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => console.log(`${row.id} - delete`)}
        >
          <IconTrash size={20} stroke={1} />
        </Button>
      </div>
    ),
    {
      id: "actions",
      cell: (info) => info.getValue(),
      header: undefined,
    },
  ),
];

const otherTableColumns = [
  otherTableColumnHelper.accessor("id", {
    id: "id",
    cell: (info) => info.getValue(),
    header: "ID",
  }),
  otherTableColumnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  otherTableColumnHelper.accessor("something", {
    id: "something",
    cell: (info) => info.getValue(),
    header: "Something",
  }),
  otherTableColumnHelper.accessor("somethingElse", {
    id: "somethingElse",
    cell: (info) => info.getValue(),
    header: "Something Else",
  }),
];

// Column definitions for other tables here

export const getColumnDefinitions = (name: string) => {
  switch (name) {
    case "Iterations":
      return iterationsColumns;
    case "Other":
      return otherTableColumns;
    default:
      return [];
  }
};
