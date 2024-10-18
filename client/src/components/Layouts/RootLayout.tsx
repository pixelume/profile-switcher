import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LoginProvider, useLogin } from "../../contexts/LoginContext";

const RootLayoutContent = () => {
  const { getSession } = useLogin();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    getSession(sessionId);
  }, [getSession]);

  return <Outlet />;
};

export function RootLayout() {
  return (
    <LoginProvider>
      <RootLayoutContent />
    </LoginProvider>
  );
}
