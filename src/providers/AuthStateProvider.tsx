"use client";

import { createContext, ReactNode } from "react";
import { useGetCurrentUserQuery } from "@/libs/redux/apiSlices/auth/authApiSlice";
import { TUser } from "@/types/user";

export interface IAuthStateContext {
  user: Partial<TUser> | null;
  isLoading: boolean;
  isError: boolean;
  role?: string;
}

export const AuthStateContext = createContext<IAuthStateContext | null>(null);

export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  // Let RTK Query be the single source of truth
  const { data, isLoading, isFetching, isError } = useGetCurrentUserQuery(
    undefined,
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    },
  );

  // Derive state directly from the query result
  // (No useEffect or useState needed!)
  const user = !isError && data?.data?.user ? data.data.user : null;
  const isAuthLoading = isLoading || isFetching;

  const value: IAuthStateContext = {
    user,
    isLoading: isAuthLoading,
    isError,
    role: user?.role,
  };

  return <AuthStateContext value={value}>{children}</AuthStateContext>;
};
