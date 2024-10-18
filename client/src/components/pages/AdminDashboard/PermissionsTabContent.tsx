import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useGetPermissions } from "@/queries";
import {
  useCreatePermission,
  useDeletePermission,
  useUpdatePermission,
} from "@/mutations";

export function PermissionsTabContent() {
  const { data: permissions, isLoading, isError } = useGetPermissions();
  const { mutate: createPermission, isPending: isCreating } =
    useCreatePermission();
  const { mutate: updatePermission, isPending: isUpdating } =
    useUpdatePermission();
  const { mutate: deletePermission, isPending: isDeleting } =
    useDeletePermission();

  // TODO: Loading spinner
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Permissions</h2>
        <Button
          disabled={isCreating}
          onClick={() =>
            createPermission({
              type: "permissions",
              data: { name: "New Permission" },
            })
          }
        >
          Create Permission
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
          {permissions?.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    disabled={isUpdating}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updatePermission({
                        type: "permissions",
                        id: permission.id,
                        data: {
                          ...permission,
                          name: `${permission.name} (Updated)`,
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
                      deletePermission({
                        type: "permissions",
                        id: permission.id,
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
