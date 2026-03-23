import { AuthLayoutClient } from "@/components/layout-related/auth/AuthLayoutClient";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AuthLayoutClient>{children}</AuthLayoutClient>
);

export default Layout;
