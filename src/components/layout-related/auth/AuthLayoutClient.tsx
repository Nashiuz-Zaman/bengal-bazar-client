"use client";

import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";
import { OuterContainer } from "@containers/OuterContainer";
import { ReactNode } from "react";

export const AuthLayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <OuterContainer className="py-10 min-h-screen w-full flex flex-col items-center justify-center">
      <CompanyLogoBtn className="mx-auto md:mx-0 md:fixed md:top-10 md:left-10" />
      <main className="w-full h-full ">
        {children}
      </main>
    </OuterContainer>
  );
};
