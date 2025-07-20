
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "../styles/theme";
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from "../features/auth/providers/auth-provider";
import { routes } from "../routes";

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
      
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
