import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";
import { RouterProvider } from "./RouterProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // 24 hour stale time
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
