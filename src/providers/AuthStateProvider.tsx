"use client";

import { createContext, ReactNode, useContext } from "react";
import { UserRole } from "@/constants/user";
import { useGetCurrentUserQuery } from "@api-slices/auth.api.slice";
import { IUser } from "@/types/user";

export interface IAuthStateContext {
  user: Partial<IUser> | null;
  isLoading: boolean;
  role?: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isSuperAdmin: boolean;
}

export const AuthStateContext = createContext<IAuthStateContext | null>(null);

export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  // Let RTK Query be the single source of truth
  const { data, isLoading, isError } = useGetCurrentUserQuery(undefined, {
    refetchOnReconnect: true,
  });

  const user = !isError && data?.data?.user ? data.data.user : null;

  const role = user?.role;
  const isCustomer = role === UserRole.CUSTOMER;
  const isAdmin = role === UserRole.ADMIN;
  const isSuperAdmin = role === UserRole.SUPERADMIN;

  const value: IAuthStateContext = {
    user,
    isLoading: isLoading,
    role,
    isAdmin,
    isCustomer,
    isSuperAdmin,
  };

  return <AuthStateContext value={value}>{children}</AuthStateContext>;
};

export const useAuthState = (): IAuthStateContext => {
  const context = useContext(AuthStateContext);

  if (!context) {
    throw new Error("useAuthState must be used within an <AuthStateProvider>");
  }

  return context;
};
