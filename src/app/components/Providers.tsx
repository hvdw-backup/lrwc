"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
