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

export default function App() {
  const queryClient = new QueryClient();
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
