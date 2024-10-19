import {
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

export function AdminLayout({ isSidebarOpen }: { isSidebarOpen: boolean }) {
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
          <Link
            to="/admin"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <IconLayoutDashboard className="h-5 w-5" stroke={1} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <IconUsers className="h-5 w-5" stroke={1} />
            <span>Users</span>
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <IconSettings className="h-5 w-5" stroke={1} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
