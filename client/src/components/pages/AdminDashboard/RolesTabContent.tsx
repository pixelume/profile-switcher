import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useGetRoles } from "@/queries";
import { useCreateRole, useDeleteRole, useUpdateRole } from "@/mutations";

export function RolesTabContent() {
  const { data: roles, isLoading, isError } = useGetRoles();
  const { mutate: createRole, isPending: isCreating } = useCreateRole();
  const { mutate: updateRole, isPending: isUpdating } = useUpdateRole();
  const { mutate: deleteRole, isPending: isDeleting } = useDeleteRole();

  // TODO: Loading spinner
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Roles</h2>
        <Button
          disabled={isCreating}
          onClick={() =>
            createRole({
              type: "roles",
              data: { name: "New Role" },
            })
          }
        >
          Create Role
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    disabled={isUpdating}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateRole({
                        type: "roles",
                        id: role.id,
                        data: {
                          ...role,
                          name: `${role.name} (Updated)`,
                        },
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={isDeleting}
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      deleteRole({
                        type: "roles",
                        id: role.id,
                      })
                    }
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
