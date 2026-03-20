"use client";
import { UserRole } from "@/constants/user";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/providers/AuthStateProvider";
import {
  ILocalLoginRequest,
  useLocalLoginMutation,
  useSocialLoginMutation,
  useLogoutMutation,
} from "@api-slices/auth.api.slice";
import { useRegisterUserMutation } from "@api-slices/user.api.slice";
import useFirebaseMethods from "./useFirebaseMethods";
import { UseFormSetError } from "react-hook-form";
import { catchAsyncClient } from "@/utils/catchAsyncClient";
import { showToast } from "@/utils/showToast";
import { IUser } from "@/types/user";

const getTargetPath = (userData: IUser) => {
  return userData?.role === UserRole.CUSTOMER
    ? "customer"
    : userData?.role === UserRole.ADMIN
      ? "admin"
      : "";
};

export const useAuthMethods = () => {
  const [login, { isLoading: isLocalLoginLoading }] = useLocalLoginMutation();
  const [logoutTrigger, { isLoading: isLogoutLoading }] = useLogoutMutation();

  // Updated to use the correct hook name from your userApiSlice
  const [register, { isLoading: isSignupUserLoading }] =
    useRegisterUserMutation();

  const [socialLogin, { isLoading: isSocialLoginLoading }] =
    useSocialLoginMutation();

  const router = useRouter();
  const {} = useAuthState();
  const { loginGoogle } = useFirebaseMethods();

  // Sign up using email
  const signupUser = catchAsyncClient(
    async (args) => {
      const data = args?.data;
      const onSuccess = args?.onSuccess; // Fixed typo 'onSucess'

      // Updated to call 'register' instead of 'signup'
      const res = await register(data).unwrap();

      if (res?.success) {
        if (onSuccess && typeof onSuccess === "function") onSuccess();
        showToast({
          message: res?.message,
        });

        router.push(`/auth/confirmation-email-sent?email=${res?.data?.email}`);
      }
    },
    {
      handleError: "function",
      onError: (_, args, message) => {
        const setError = args?.setError as UseFormSetError<any>;

        setError("root", {
          type: "manual",
          message: message,
        });
      },
    },
  );

  // Login using email
  const localLogin = catchAsyncClient(
    async (args) => {
      const data = args?.data as ILocalLoginRequest;
      const onSuccess = args?.onSuccess;

      const res = await login(data).unwrap();

      if (res?.success) {
        const userData = res?.data?.user;

        if (onSuccess && typeof onSuccess === "function") onSuccess();

        showToast({
          message: res?.message,
        });

        router.push(`/${getTargetPath(userData as IUser)}`);
      }
    },
    {
      handleError: "function",
      onError: (_, args, message) => {
        const setError = args?.setError as UseFormSetError<any>;

        setError("root", {
          type: "manual",
          message: message,
        });
      },
    },
  );

  // Login using google
  const loginWithGoogle = catchAsyncClient(async () => {
    const result = await loginGoogle();

    if (result.user) {
      const googleUser: any = {
        name: result.user.displayName!,
        email: result.user.email!,
        image: result.user.photoURL!,
      };

      const res = await socialLogin(googleUser).unwrap();

      if (res?.success) {
        const userData = res?.data?.user;

        showToast({
          message: res?.message,
        });

        router.push(`/${getTargetPath(userData as IUser)}`);
      }
    }
  });

  const logout = catchAsyncClient(async () => {
    const res = await logoutTrigger().unwrap();

    // Check res?.success to match your standard API response pattern
    if (res?.success) {
      router.replace("/");
      showToast({ message: "Signed Out", position: "top-center" });
    }
  });

  return {
    signupUser,
    isSignupUserLoading,
    isLocalLoginLoading,
    isSocialLoginLoading,
    isLogoutLoading,
    logout,
    localLogin,
    loginWithGoogle,
  };
};
