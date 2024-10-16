import { createColumnHelper } from "@tanstack/react-table";
import { Iteration } from "./types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";

const columnHelper = createColumnHelper<Iteration>();

export const columnDefinitions = [
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => info.getValue(),
    header: "Iteration",
  }),
  columnHelper.accessor(
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
  columnHelper.accessor(
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
  columnHelper.accessor("status", {
    id: "status",
    cell: (info) => info.getValue(),
    header: "Status",
  }),
  columnHelper.accessor(
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
