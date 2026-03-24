import { ReactNode } from "react";

interface ICenterContainerProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "main";
}

export const CenterContainer = ({
  children,
  className = "",
  as: Component = "section",
}: ICenterContainerProps) => {
  return (
    <Component
      style={{ maxWidth: "1300px", width: "100%" }}
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
};
