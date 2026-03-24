"use client";

import { LinkBtnTrans } from "@buttons/LinkBtnTrans";

interface ICompanyLogoBtnProps {
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
}

export const CompanyLogoBtn = ({
  className = "",
  onClick,
}: ICompanyLogoBtnProps) => {
  return (
    <LinkBtnTrans
      onClick={onClick}
      href="/"
      className={`tracking-tighter w-max uppercase font-semibold ${className}`}
    >
      Bengal Bazar
    </LinkBtnTrans>
  );
};
