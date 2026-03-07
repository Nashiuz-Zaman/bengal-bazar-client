"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUrlPath } from "@hooks/useCurrentUrlPath";
import { LoadingSpinner } from "@shared/LoadingSpinner";
import { useAuthState } from "@hooks/useAuthState";

interface IProtectedRouteProviderProps {
  children: ReactNode;
}

export const ProtectedRouteProvider = ({
  children,
}: IProtectedRouteProviderProps) => {
  const { user, isLoading } = useAuthState();
  const router = useRouter();
  const { fullUrl } = useCurrentUrlPath();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(
        `/zarif-login-admin?redirect=${encodeURIComponent(fullUrl)}`,
      );
    }
  }, [isLoading, user, router, fullUrl]);

  if (isLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner className="static!" />
      </div>
    );
  }

  return <>{children}</>;
};
