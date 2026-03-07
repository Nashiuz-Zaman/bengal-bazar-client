"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useGetCurrentUserQuery } from "@/libs/redux/api/user.api";
export interface IUser {
  _id: string;
  email: string;
}

// ----------------------------- Types -----------------------------
export interface IAuthStateContext {
  user: IUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  hasFetched: boolean;
}

// ----------------------------- Context -----------------------------
export const AuthStateContext = createContext<IAuthStateContext | null>(null);

// ----------------------------- Provider -----------------------------
export const AuthStateProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const { data: res, isLoading: queryLoading } = useGetCurrentUserQuery(
    undefined,
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (hasFetched) return;

    if (queryLoading) return;

    if (!user && res?.success) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(res?.data);
    } else {
      setUser(null);
    }

    setIsLoading(false);
    setHasFetched(true);
  }, [res, queryLoading, hasFetched]);

  const value: IAuthStateContext = {
    user,
    isLoading,
    setUser,
    setIsLoading,
    hasFetched,
  };

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
};
