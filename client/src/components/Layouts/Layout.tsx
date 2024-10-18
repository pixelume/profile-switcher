import { useState /* useEffect */ } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu /* Home, Users, Settings, HelpCircle */ } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "../mode-toggle";
import { useLogin } from "@/contexts/LoginContext";

// const API_BASE_URL = "http://localhost:3001/api";

export function Layout({ toggleSidebar }: { toggleSidebar: () => void }) {
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
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-4 text-primary-foreground"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Profile Switcher App
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={currentProfile} onValueChange={handleProfileChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select profile" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="app">App</SelectItem>
              </SelectContent>
            </Select>
            <ModeToggle />
            {/* <Button variant="secondary" onClick={handleLogout}> */}
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
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
      <footer className="bg-secondary py-4 text-secondary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4">
          <p>&copy; 2023 Profile Switcher App. All rights reserved.</p>
          <nav className="flex space-x-4">
            <a href="/about" className="hover:underline">
              About
            </a>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
