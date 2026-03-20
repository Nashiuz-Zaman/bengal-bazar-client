import { CategoryDropdown } from "@/components/layout-related/site/header/CategoryDropdown";
import { HeaderSearchAvatarAuthOptions } from "@/components/layout-related/site/header/HeaderSearchAvatarAuthOptions";
import { categories } from "@/dummy-data/nav";
import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";

import { OuterContainer } from "@containers/OuterContainer";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-20 w-full bg-white">
      {/* Top Bar: Search & Logo */}
      <OuterContainer className="h-14 grid grid-cols-3 items-center border-b border-neutral-100">
        <CompanyLogoBtn />
        <HeaderSearchAvatarAuthOptions />
      </OuterContainer>

      {/* Navigation Bar: Categories & Info */}
      <OuterContainer className="h-12 flex items-center border-b border-neutral-100">
        <CategoryDropdown categories={categories} />

        {/* Promo message: Using Secondary for a refreshing callout */}
        <p className="ml-6 text-sm font-medium md:text-left capitalize text-neutral-600">
          USE{" "}
          <span className="text-secondary font-bold px-1.5 py-0.5 bg-primary-light rounded text-xs">
            LUCKY50
          </span>
          <span className="ml-1">to get 50% OFF on orders above TK 7000</span>
        </p>

        <div className="ml-auto text-xs font-medium flex gap-6 text-neutral-500">
          <Link
            href="/track-order"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            Track Your Order
          </Link>
          <Link href="/faq" className="hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link
            href="/returns"
            className="hover:text-primary transition-colors"
          >
            Returns
          </Link>
        </div>
      </OuterContainer>
    </header>
  );
};
