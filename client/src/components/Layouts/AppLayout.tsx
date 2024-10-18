// import { Home, Settings, Users } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    /* Main content area with sidebar */
    <div className="flex flex-grow">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-secondary p-4 text-secondary-foreground transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-2">
          App Sidebar Content Here
          {/* <a
            href="/admin"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="/admin/users"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <Users className="h-5 w-5" />
            <span>Users</span>
          </a>
          <a
            href="/admin/settings"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a> */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
