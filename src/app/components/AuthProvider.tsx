"use client";

import { SessionProvider } from "next-auth/react";
import { FunctionComponent, ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<ProvidersProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
