import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTabContent } from "./UsersTabContent";
import { RolesTabContent } from "./RolesTabContent";
import { PermissionsTabContent } from "./PermissionsTabContent";
import { AppsTabContent } from "./AppsTabContent";

// Define the base URL for the API
// Define interfaces for our data types

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid max-w-xl grid-cols-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="apps">Apps</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="space-y-4">
          <UsersTabContent />
        </TabsContent>
        <TabsContent value="roles" className="space-y-4">
          <RolesTabContent />
        </TabsContent>
        <TabsContent value="permissions" className="space-y-4">
          <PermissionsTabContent />
        </TabsContent>
        <TabsContent value="apps" className="space-y-4">
          <AppsTabContent />
        </TabsContent>
      </Tabs>
      {/* {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={dismissToast} />
      ))} */}
    </div>
  );
}
