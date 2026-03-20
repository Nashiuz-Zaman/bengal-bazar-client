"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResendVerificationMutation } from "@/libs/redux/api-slices/user.api.slice";
import { showToast } from "@/utils/showToast";
import { catchAsyncClient } from "@/utils/catchAsyncClient";

const RESEND_COOLDOWN = 60;

export const VerifySignupPageClient = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "your email";

  const [countdown, setCountdown] = useState(0);
  const [resendEmail, { isLoading }] = useResendVerificationMutation();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = catchAsyncClient(async () => {
    const res = await resendEmail({ email }).unwrap();

    if (res.success) {
      showToast({
        message: "Verification email resent",
      });

      setCountdown(RESEND_COOLDOWN);
    }
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8 p-8 bg-white border border-neutral-100 shadow-xl rounded-2xl">
        {/* Icon Header */}
        <div className="relative mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon
            icon="heroicons:envelope"
            className="w-10 h-10 text-primary"
          />
          <div className="absolute -top-1 -right-1">
            <Icon
              icon="material-symbols:check-circle"
              className="w-7 h-7 text-green-500 rounded-full bg-white"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight text-balance">
            Check your email
          </h1>
          <p className="text-neutral-500 leading-relaxed">
            We&apos;ve sent a verification link to <br />
            <span className="font-semibold text-neutral-900 underline decoration-purple-200 underline-offset-4 break-all">
              {email}
            </span>
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 text-left flex gap-3">
          <Icon
            icon="heroicons:information-circle-20-solid"
            className="w-5 h-5 flex-shrink-0 text-amber-600"
          />
          <p>
            <strong>Almost there!</strong> Your account is locked. Please click
            the button in the email to activate your account and start shopping.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={countdown > 0 || isLoading}
            className="group w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-neutral-200 font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            <Icon
              icon="solar:restart-bold-duotone"
              className={`w-5 h-5 ${isLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
            />
            {countdown > 0
              ? `Resend in ${countdown}s`
              : "Resend verification email"}
          </button>

          <div className="pt-6 border-t border-neutral-100">
            <p className="text-sm text-neutral-400 mb-4 italic">
              Check your spam folder if you don&apos;t see it.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-light transition-colors"
            >
              Back to Login
              <Icon icon="heroicons:arrow-right-20-solid" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
