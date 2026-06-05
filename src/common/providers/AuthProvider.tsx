"use client";

import { createContext, ReactNode, useContext } from "react";
import { UserRole } from "@/constants/user";
import { useGetCurrentUserQuery } from "@/features/user/api/user.api.slice";
import { IUser } from "@/features/user/types/user";

export interface IAuthContext {
  user: Partial<IUser> | null;
  isLoading: boolean;
  role?: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isSuperAdmin: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Let RTK Query be the single source of truth
  const { data, isLoading, isError } = useGetCurrentUserQuery(undefined, {
    refetchOnReconnect: true,
  });

  const user = !isError && data?.data?.user ? data.data.user : null;

  const role = user?.role;
  const isCustomer = role === UserRole.CUSTOMER;
  const isAdmin = role === UserRole.ADMIN;
  const isSuperAdmin = role === UserRole.SUPERADMIN;

  const value: IAuthContext = {
    user,
    isLoading: isLoading,
    role,
    isAdmin,
    isCustomer,
    isSuperAdmin,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuthState = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthState must be used within an <AuthProvider>");
  }

  return context;
};
