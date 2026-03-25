"use client";

import React, { useMemo } from "react";
import { HeaderProductsSearchbar } from "./blocks/HeaderProductsSearchbar";
import { CartBtn } from "@buttons/CartBtn";
import { UserMenuWithoutAvatar } from "@shared/UserMenuWithoutAvatar";
import { UserMenuWithAvatar } from "@shared/UserMenuWithAvatar";
import { SearchbarProductCard } from "./blocks/SearchbarProductCard";
import { useAuthMethods } from "@/hooks/useAuthMethods";
import { useAuthState } from "@/providers/AuthStateProvider";
import { ISearchbarResultProduct } from "@/types/product";
import { useLazySearchbarResultsQuery } from "@api-slices/product.api.slice";
import { UserRole } from "@/constants/user";
import { useCartState } from "@/providers/CartStateProvider";
import { LinkBtnTrans } from "@buttons/LinkBtnTrans";
import { LoginIcon } from "@icons/LoginIcon";
import { CompanyLogoBtn } from "@buttons/CompanyLogoBtn";
import { OuterContainer } from "@containers/OuterContainer";
import { BREAKPOINTS, useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import { categories } from "@/data/nav";

const MobileCategoryNav = dynamic(() =>
  import("./blocks/MobileCategoryNav").then((mod) => mod.MobileCategoryNav),
);

export const HeaderTopbar = () => {
  const { logout } = useAuthMethods();
  const { user } = useAuthState();
  const { cart } = useCartState();
  const is2md = useMediaQuery(BREAKPOINTS.max["2md"]!);

  // 1. Auth & Role Logic
  const { isAdmin, isCustomer, isAuthenticated } = useMemo(() => {
    const roleName = user?.role;
    const admin =
      roleName === UserRole.ADMIN || roleName === UserRole.SUPERADMIN;

    return {
      isAdmin: admin,
      isCustomer: roleName === UserRole.CUSTOMER && !admin,
      isAuthenticated: !!user && !!user.id,
    };
  }, [user]);

  // 2. Search Logic
  const [triggerSearch, { data, isFetching, isSuccess }] =
    useLazySearchbarResultsQuery();

  const results = useMemo(
    () => (!isFetching && isSuccess && data?.data?.products) || [],
    [isFetching, isSuccess, data],
  );

  const renderResult = (
    item: ISearchbarResultProduct,
    _index: number,
    onClick: () => void,
  ): React.ReactNode => (
    <SearchbarProductCard
      onClick={onClick}
      title={item.title}
      slug={item?.slug}
      src={item.image}
    />
  );

  return (
    <OuterContainer className="h-27 2md:h-20 grid grid-rows-2 grid-cols-3 2md:grid-cols-[1fr_2fr_1fr] 2md:grid-rows-1 items-center border-b border-neutral-100">
      {is2md && <MobileCategoryNav categories={categories} />}

      <CompanyLogoBtn className="mx-auto! 2md:ml-0! text-xl" />

      {/* Desktop search bar */}
      <HeaderProductsSearchbar<ISearchbarResultProduct>
        results={results}
        renderResult={renderResult}
        showIcon
        trigger={triggerSearch}
        className="lg:max-w-160 order-3 col-span-3 2md:col-span-1 2md:order-2"
        modalClassName="productSearchbarModal"
      />

      <div className="ml-auto flex items-stretch gap-4 font-medium text-sm order-2 2md:order-3">
        {/* Auth / User menu */}
        {!isAuthenticated ? (
          <>
            <LinkBtnTrans
              className="hover:underline flex-col items-center! gap-1!"
              href="/login"
            >
              <LoginIcon className="text-3xl" />
              <span className="hidden lg:inline-block">Sign in</span>
            </LinkBtnTrans>
          </>
        ) : (
          <>
            {isAdmin && <UserMenuWithoutAvatar logoutFunction={logout} />}
            {isCustomer && user && (
              <UserMenuWithAvatar userData={user} logoutFunction={logout} />
            )}
          </>
        )}

        <CartBtn itemsQty={cart?.totalItemQty || 0} />
      </div>
    </OuterContainer>
  );
};
