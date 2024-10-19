import { useCallback, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";
import { RootLayout } from "./components/Layouts/RootLayout";
import { ApolloProvider } from "@apollo/client";
import { AppContext } from "./components/AppContext";
import { AdminLayout } from "./components/Layouts/AdminLayout";
import { AppLayout } from "./components/Layouts/AppLayout";
import { Login } from "./components/Login";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { client } from "./lib/apollo-client";
import { Users } from "./components/pages/Users";
import { Settings } from "./components/pages/Settings";
import { Layout } from "./components/Layouts/Layout";

export function RouterProvider() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((isOpen) => !isOpen);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <Layout
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          }
        >
          <Route
            path="admin"
            element={<AdminLayout isSidebarOpen={isSidebarOpen} />}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route
            path="app"
            element={
              <ApolloProvider client={client}>
                <AppLayout isSidebarOpen={isSidebarOpen} />
              </ApolloProvider>
            }
          >
            <Route index element={<AppContext />} />
          </Route>
        </Route>
      </Route>,
    ),
  );

  return <ReactRouterProvider router={router} />;
}
