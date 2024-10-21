import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "@/contexts/LoginContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export function Layout({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) {
  const { isLoggedIn } = useLogin();
  const { pathname } = useLocation();
  const initialProfile = pathname.split("/")[1];
  const [currentProfile, setCurrentProfile] = useState(initialProfile);
  const navigate = useNavigate();

  const handleProfileChange = (value: string) => {
    setCurrentProfile(value);
    navigate(`/${value}`);
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Header
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        currentProfile={currentProfile}
        handleProfileChange={handleProfileChange}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
