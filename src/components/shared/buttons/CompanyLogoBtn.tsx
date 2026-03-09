"use client";

import Image from "next/image";
import Link from "next/link";

interface ICompanyLogoBtnProps {
  className?: string;
  orientation?: "landscape" | "portrait";
}

export const CompanyLogoBtn = ({
  className = "",
  orientation = "landscape",
}: ICompanyLogoBtnProps) => {
  const logoSrc =
    orientation === "landscape" ? "/logo-wide.png" : "/logo-tall.png";

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src={logoSrc}
        alt="Lumora Logo"
        width={300}
        height={100}
        className="object-contain"
        priority
      />
    </Link>
  );
};
