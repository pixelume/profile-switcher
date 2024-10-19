import { Link } from "react-router-dom";
import { AppContext } from "../pages/app/AppContext";

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
          <Link
            to="/app"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <span>Home</span>
          </Link>
          <Link
            to="/app/page1"
            className="flex items-center space-x-2 rounded p-2 hover:bg-primary/10"
          >
            <span>Page 1</span>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow overflow-auto p-6">
        <AppContext />
      </main>
    </div>
  );
}
