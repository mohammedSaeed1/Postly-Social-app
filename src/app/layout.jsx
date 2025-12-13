"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme/theme';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Navbar from './(Components)/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './(Components)/ProtectedRoute/ProtectedRoute';
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {

  const pathName =  usePathname();
 
const isAuthPage = pathName === '/Login' || pathName === '/Signup';
 

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
             <Navbar/>
            {isAuthPage ? children : <ProtectedRoute>
             {children}             
            </ProtectedRoute> }
              <Toaster />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
