import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useGetUsers } from "@/queries";
import { useCreateUser, useDeleteUser, useUpdateUser } from "@/mutations";

export function UsersTabContent() {
  const { data: users, isLoading, isError } = useGetUsers();
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  // TODO: Loading spinner
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button
          disabled={isCreating}
          onClick={() =>
            createUser({
              type: "users",
              data: {
                name: "New User",
                email: "new@example.com",
                role: "User",
              },
            })
          }
        >
          Create User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    disabled={isUpdating}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateUser({
                        type: "users",
                        id: user.id,
                        data: {
                          ...user,
                          name: `${user.name} (Updated)`,
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
                    onClick={() => deleteUser({ type: "users", id: user.id })}
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
