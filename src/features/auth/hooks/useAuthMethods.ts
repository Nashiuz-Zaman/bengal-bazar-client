"use client";

import { useRouter } from "next/navigation";
import { UseFormSetError } from "react-hook-form";

// 1. Feature Imports
import { AuthService } from "../services/auth.service";
import useFirebaseMethods from "./useFirebaseMethods";
import {
  useLocalLoginMutation,
  useSocialLoginMutation,
  useLogoutMutation,
} from "../api/auth.api.slice";
import { useRegisterUserMutation } from "@/features/user/api/user.api.slice";
import { ILocalLoginRequest } from "../types/auth.type";

// 2. Global Imports
import { catchAsyncClient } from "@/common/utils/catchAsyncClient";
import { showToast } from "@/common/utils/showToast";

export const useAuthMethods = () => {
  const router = useRouter();
  const { loginGoogle } = useFirebaseMethods();

  const [login, { isLoading: isLocalLoginLoading }] = useLocalLoginMutation();
  const [logoutTrigger, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [register, { isLoading: isSignupUserLoading }] =
    useRegisterUserMutation();
  const [socialLogin, { isLoading: isSocialLoginLoading }] =
    useSocialLoginMutation();

  const signupUser = catchAsyncClient(
    async (args) => {
      const data = args?.data;
      const onSuccess = args?.onSuccess;

      const res = await register(data).unwrap();

      if (res?.success) {
        if (typeof onSuccess === "function") onSuccess();
        showToast({ message: res?.message });
        router.push(`/auth/confirmation-email-sent?email=${res?.data?.email}`);
      }
    },
    {
      handleError: "function",
      onError: (_, args, message) => {
        const setError = args?.setError as UseFormSetError<any>;
        setError("root", { type: "manual", message });
      },
    },
  );

  const localLogin = catchAsyncClient(
    async (args) => {
      const data = args?.data as ILocalLoginRequest;
      const onSuccess = args?.onSuccess;

      const res = await login(data).unwrap();

      if (res?.success) {
        if (typeof onSuccess === "function") onSuccess();
        showToast({ message: res?.message });

        // Delegated pure business logic to the service
        const path = AuthService.getDashboardPath(res?.data?.user);
        router.push(`/${path}`);
      }
    },
    {
      handleError: "function",
      onError: (_, args, message) => {
        const setError = args?.setError as UseFormSetError<any>;
        setError("root", { type: "manual", message });
      },
    },
  );

  const loginWithGoogle = catchAsyncClient(async () => {
    const result = await loginGoogle();

    if (result.user) {
      const googleUser = {
        name: result.user.displayName!,
        email: result.user.email!,
        image: result.user.photoURL!,
      };

      const res = await socialLogin(googleUser).unwrap();

      if (res?.success) {
        showToast({ message: res?.message });

        // Delegated pure business logic to the service
        const path = AuthService.getDashboardPath(res?.data?.user);
        router.push(`/${path}`);
      }
    }
  });

  const logout = catchAsyncClient(async () => {
    const res = await logoutTrigger().unwrap();
    if (res?.success) {
      router.replace("/");
      showToast({ message: "Signed Out", position: "top-center" });
    }
  });

  return {
    signupUser,
    isSignupUserLoading,
    localLogin,
    isLocalLoginLoading,
    loginWithGoogle,
    isSocialLoginLoading,
    logout,
    isLogoutLoading,
  };
};
