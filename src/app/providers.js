"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { theme } from "../theme/theme";
import { store } from "./redux/store";
import Navbar from "./(Components)/Navbar/Navbar";
import ProtectedRoute from "./(Components)/ProtectedRoute/ProtectedRoute";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/Login" || pathname === "/Signup";

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          {isAuthPage ? children : (
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          )}
          <Toaster />
        </Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
