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
      className={`mx-auto w-full max-w-325 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
};
