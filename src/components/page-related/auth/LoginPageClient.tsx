"use client";

import { AuthForm, TAuthForm } from "./AuthForm";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { UseFormSetError } from "react-hook-form";

export const LoginPageMain = () => {
  const { localLogin, isLocalLoginLoading, loginWithGoogle } = useAuthMethods();

  const handleLogin = async (
    data: TAuthForm,
    setError: UseFormSetError<TAuthForm>,
  ) => {
    await localLogin({
      data,
      setError,
    });
  };

  return (
    <div className="max-w-md w-full">
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        onGoogleLogin={loginWithGoogle}
        isLoading={isLocalLoginLoading}
      />
    </div>
  );
};
