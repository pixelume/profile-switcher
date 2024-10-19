import { createColumnHelper } from "@tanstack/react-table";
import { Iteration } from "./types";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { gql, useMutation } from "@apollo/client";
import { GET_COMPONENT_DATA } from ".";

export const UPDATE_ITERATION = gql`
  mutation UpdateIteration($id: ID!) {
    updateIteration(id: $id) {
      id
      name
      status
      updated {
        datetime
        employee
      }
    }
  }
`;

export const DELETE_ITERATION = gql`
  mutation DeleteIteration($id: ID!) {
    deleteIteration(id: $id)
  }
`;

const iterationsColumnHelper = createColumnHelper<Iteration>();
// Helpers for other Data Tables here

function RowActions({ id, dataType }: { id: string; dataType: string }) {
  const [deleteIteration] = useMutation(DELETE_ITERATION, {
    variables: { id },
    refetchQueries: [
      { query: GET_COMPONENT_DATA, variables: { type: dataType } },
    ],
  });
  const [updateIteration] = useMutation(UPDATE_ITERATION, {
    variables: { id },
    refetchQueries: [
      { query: GET_COMPONENT_DATA, variables: { type: dataType } },
    ],
  });
  return (
    <div className="flex justify-end">
      <Button variant="ghost" size="icon" onClick={() => updateIteration()}>
        <IconPencil size={20} stroke={1} />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => deleteIteration()}>
        <IconTrash size={20} stroke={1} />
      </Button>
    </div>
  );
}

const iterationsColumns = (dataType: string) => [
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
    (row) => <RowActions id={row.id} dataType={dataType} />,
    {
      id: "actions",
      cell: (info) => info.getValue(),
      header: undefined,
    },
  ),
];

// Column definitions for other tables here

export const getColumnDefinitions = (dataType: string) => {
  switch (dataType) {
    case "iterations":
      return iterationsColumns(dataType);
    // ... other tables column definitions
    default:
      return [];
  }
};
