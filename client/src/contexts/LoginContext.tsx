import React, { createContext, useState, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { API_BASE_URL } from "../lib/constants";
import api from "@/api";

interface LoginContextType {
  isLoggedIn: boolean;
  getSession: (sessionId: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toast } = useToast();

  const getSession = useCallback(
    (sessionId: string | null) => {
      if (!sessionId) {
        console.log("No sessionId");
        setIsLoggedIn(false);
        navigate("/login");
        return;
      }
      if (pathname === "/") {
        navigate("/admin");
      }
      setIsLoggedIn(true);
      api.defaults.headers.common["x-session-id"] = sessionId;
    },
    [navigate, pathname],
  );

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await api.post(`${API_BASE_URL}/login`, {
          username,
          password,
        });
        const { sessionId } = response.data;
        localStorage.setItem("sessionId", sessionId);
        api.defaults.headers.common["x-session-id"] = sessionId;
        setIsLoggedIn(true);
        navigate("/admin");
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } catch (error) {
        console.error("Login error:", error);
        toast({
          title: "Error",
          description:
            "Failed to log in. Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    },
    [navigate, toast],
  );

  const logout = useCallback(async () => {
    try {
      const sessionId = localStorage.getItem("sessionId");
      await api.post(`${API_BASE_URL}/logout`, {
        sessionId,
      });
      localStorage.removeItem("sessionId");
      delete api.defaults.headers.common["x-session-id"];
      setIsLoggedIn(false);
      navigate("/login");
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, getSession, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
