import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { useGetApps } from "@/queries";
import { useCreateApp, useDeleteApp, useUpdateApp } from "@/mutations";

export function AppsTabContent() {
  const { data: apps, isLoading, isError } = useGetApps();
  const { mutate: createApp, isPending: isCreating } = useCreateApp();
  const { mutate: updateApp, isPending: isUpdating } = useUpdateApp();
  const { mutate: deleteApp, isPending: isDeleting } = useDeleteApp();

  // TODO: Loading spinner
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Apps</h2>
        <Button
          disabled={isCreating}
          onClick={() =>
            createApp({
              type: "apps",
              data: { name: "New App" },
            })
          }
        >
          Create App
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
          {apps?.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.name}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    disabled={isUpdating}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateApp({
                        type: "apps",
                        id: app.id,
                        data: {
                          ...app,
                          name: `${app.name} (Updated)`,
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
                      deleteApp({
                        type: "apps",
                        id: app.id,
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
