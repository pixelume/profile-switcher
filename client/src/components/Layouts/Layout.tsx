import { useState /* useEffect */ } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "../mode-toggle";
import { useLogin } from "@/contexts/LoginContext";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLogout2,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// const API_BASE_URL = "http://localhost:3001/api";

export function Layout({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const { isLoggedIn, logout } = useLogin();
  const { pathname } = useLocation();
  const initialProfile = pathname.split("/")[1];
  console.log(pathname);
  const [currentProfile, setCurrentProfile] = useState(initialProfile);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // const { toast } = useToast();

  // useEffect(() => {
  //   console.log("Layout useEffect");
  //   const sessionId = localStorage.getItem("sessionId");
  //   if (sessionId) {
  //     setIsLoggedIn(true);
  //     axios.defaults.headers.common["x-session-id"] = sessionId;
  //   } else {
  //     console.log("Not logged in");
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleProfileChange = (value: string) => {
    setCurrentProfile(value);
    navigate(`/${value}`);
  };

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // const handleLogout = async () => {
  //   try {
  //     const sessionId = localStorage.getItem("sessionId");
  //     await axios.post(`${API_BASE_URL}/logout`, { sessionId });
  //     localStorage.removeItem("sessionId");
  //     delete axios.defaults.headers.common["x-session-id"];
  //     setIsLoggedIn(false);
  //     navigate("/login");
  //     toast({
  //       title: "Success",
  //       description: "Logged out successfully",
  //     });
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to log out. Please try again.",
  //       variant: "destructive",
  //     });
  //   }
  // };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="bg-primary shadow-md">
        <div className="mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-4 text-primary-foreground hover:bg-transparent hover:text-white"
            >
              <IconLayoutSidebarLeftCollapse
                className={cn(
                  "h-8 w-8 rotate-0 scale-100 transition-all duration-300",
                  {
                    "rotate-90 scale-0": !isSidebarOpen,
                  },
                )}
                stroke={1}
              />
              <IconLayoutSidebarLeftExpand
                className={cn(
                  "absolute h-8 w-8 rotate-0 scale-100 transition-all duration-300",
                  { "-rotate-90 scale-0": isSidebarOpen },
                )}
                stroke={1}
              />
            </Button>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Profile Switcher App
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <Select value={currentProfile} onValueChange={handleProfileChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="app">App</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <ModeToggle />
              {/* <Button variant="secondary" onClick={handleLogout}> */}
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent font-light text-white hover:bg-background/5 hover:text-white"
                onClick={logout}
              >
                <IconLogout2 className="size-7" stroke={1} />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area with sidebar */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Outlet />
        {/* <aside
          className={`w-64 bg-secondary p-4 text-secondary-foreground transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-2">
            <a
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
            </a>
          </nav>
        </aside> */}

        {/* Main content */}
        {/* <main className="flex-grow overflow-auto p-6">
          <Outlet />
        </main> */}
      </div>

      {/* Footer */}
      <footer className="bg-secondary/30 py-4 text-secondary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 text-sm font-light">
          <p>&copy; 2024 Profile Switcher App. All rights reserved.</p>
          <nav className="flex space-x-4">
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
