import { VerifySignupPageClient } from "@/components/page-related/auth/VerifySignupPageClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify Signup | Bengal Bazar",
};

const VerifySignupPage = () => {
  return (
    <Suspense>
      <div className="flex items-center justify-center w-full h-full ">
        <VerifySignupPageClient />
      </div>
    </Suspense>
  );
};

export default VerifySignupPage;
