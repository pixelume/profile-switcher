import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLogout2,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLogin } from "@/contexts/LoginContext";
import { ModeToggle } from "@/components/mode-toggle";

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  currentProfile: string;
  handleProfileChange: (value: string) => void;
}

export function Header({
  toggleSidebar,
  isSidebarOpen,
  currentProfile,
  handleProfileChange,
}: HeaderProps) {
  const { logout } = useLogin();
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
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
  );
}
