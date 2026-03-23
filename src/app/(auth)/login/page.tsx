//  THIS IS A PAGE

import { LoginPageMain } from "@/components/page-related/auth/LoginPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Bengal Bazar",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-8">
      <LoginPageMain />
    </div>
  );
}
