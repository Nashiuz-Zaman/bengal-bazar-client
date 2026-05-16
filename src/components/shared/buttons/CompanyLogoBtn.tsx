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
      className={`md:tracking-wider bg-linear-to-br from-primary to-primary-dark bg-clip-text text-transparent font-bold! inline-block  uppercase leading-none ${className}`}
    >
      Bengal <br className="xs:hidden"/> Bazar
    </LinkBtnTrans>
  );
};
