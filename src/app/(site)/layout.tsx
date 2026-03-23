import { Header } from "@layout-related/site/header/Header";
import { ReactNode } from "react";

const SiteLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen relative flex flex-col max-w-480 mx-auto">
      <Header />

      <main className="flex flex-col grow">{children}</main>
    </div>
  );
};

export default SiteLayout;
