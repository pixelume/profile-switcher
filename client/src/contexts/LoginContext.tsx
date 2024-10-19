import React, { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { API_BASE_URL } from "../lib/constants";

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
  const { toast } = useToast();

  const getSession = useCallback(
    (sessionId: string | null) => {
      if (!sessionId) {
        console.log("No sessionId");
        navigate("/login");
        return;
      }
      setIsLoggedIn(true);
      navigate("/admin");
      axios.defaults.headers.common["x-session-id"] = sessionId;
    },
    [navigate],
  );

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
          username,
          password,
        });
        const { sessionId } = response.data;
        localStorage.setItem("sessionId", sessionId);
        axios.defaults.headers.common["x-session-id"] = sessionId;
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
      await axios.post(`${API_BASE_URL}/logout`, {
        sessionId,
      });
      localStorage.removeItem("sessionId");
      delete axios.defaults.headers.common["x-session-id"];
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
