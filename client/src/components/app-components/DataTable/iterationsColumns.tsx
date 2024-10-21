import { createColumnHelper } from "@tanstack/react-table";
import { Iteration } from "./types";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { gql, useMutation } from "@apollo/client";
import { GET_PAGE } from "@/components/pages/helpers/queries";

const iterationsColumnHelper = createColumnHelper<Iteration>();

export const iterationsColumns = [
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
  iterationsColumnHelper.accessor((row) => <RowActions id={row.id} />, {
    id: "actions",
    cell: (info) => info.getValue(),
    header: undefined,
  }),
];

function RowActions({ id }: { id: string }) {
  const [deleteIteration] = useMutation(DELETE_ITERATION, {
    variables: { id },
    refetchQueries: [{ query: GET_PAGE, variables: { name: "page1" } }],
  });
  const [updateIteration] = useMutation(UPDATE_ITERATION, {
    variables: { id },
    refetchQueries: [{ query: GET_PAGE, variables: { name: "page1" } }],
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

export const DELETE_ITERATION = gql`
  mutation DeleteIteration($id: ID!) {
    deleteIteration(id: $id)
  }
`;

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
