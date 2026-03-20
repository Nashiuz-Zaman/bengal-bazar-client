"use client";

import Link from "next/link";

interface ICompanyLogoBtnProps {
  className?: string;
}

export const CompanyLogoBtn = ({ className = "" }: ICompanyLogoBtnProps) => {
  return (
    <Link
      href="/"
      className={`tracking-tighter w-max uppercase font-semibold ${className}`}
    >
      Bengal Bazar
    </Link>
  );
};
