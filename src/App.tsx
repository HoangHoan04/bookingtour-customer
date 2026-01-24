import "@/assets/styles/style.scss";
import "@/assets/styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "./context/ConfigContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import AppRouter from "./routes";

// Create QueryClient instance outside component to prevent recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <ConfigProvider>
            <LoadingProvider>
              <ToastProvider>
                <AppRouter />
              </ToastProvider>
            </LoadingProvider>
          </ConfigProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}
